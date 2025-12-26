import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../src/index';
import prisma from '../../src/database';
import { createEventData } from '../factories/events-factory';

const server = supertest(app);

describe('GET /events', () => {
  it('should return an empty array when there are no events', async () => {
    const response = await server.get('/events');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return all events', async () => {
    const event1 = await prisma.event.create({ data: createEventData() });
    const event2 = await prisma.event.create({ data: createEventData() });

    const response = await server.get('/events');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: event1.id, name: event1.name }),
        expect.objectContaining({ id: event2.id, name: event2.name }),
      ])
    );
  });
});

describe('GET /events/:id', () => {
  it('should return 400 when id is invalid', async () => {
    const response = await server.get('/events/invalid');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return 400 when id is zero', async () => {
    const response = await server.get('/events/0');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return 400 when id is negative', async () => {
    const response = await server.get('/events/-1');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return 404 when event does not exist', async () => {
    const response = await server.get('/events/999999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Event with id 999999 not found.');
  });

  it('should return the event when it exists', async () => {
    const eventData = createEventData();
    const event = await prisma.event.create({ data: eventData });

    const response = await server.get(`/events/${event.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: event.id,
        name: event.name,
      })
    );
    expect(new Date(response.body.date)).toEqual(event.date);
  });
});

describe('POST /events', () => {
  it('should return 422 when body is missing', async () => {
    const response = await server.post('/events').send({});
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 422 when name is missing', async () => {
    const eventData = createEventData();
    delete (eventData as any).name;
    const response = await server.post('/events').send(eventData);
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 422 when date is missing', async () => {
    const eventData = createEventData();
    delete (eventData as any).date;
    const response = await server.post('/events').send(eventData);
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 422 when date is in the past', async () => {
    const eventData = createEventData({ date: faker.date.past() });
    const response = await server.post('/events').send(eventData);
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 409 when event name already exists', async () => {
    const eventData = createEventData();
    await prisma.event.create({ data: eventData });

    const response = await server.post('/events').send(eventData);
    expect(response.status).toBe(409);
    expect(response.text).toBe(`Event with name ${eventData.name} already registered.`);
  });

  it('should create an event successfully', async () => {
    const eventData = createEventData();
    const response = await server.post('/events').send(eventData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: eventData.name,
      })
    );
    expect(new Date(response.body.date)).toEqual(eventData.date);

    const eventInDb = await prisma.event.findUnique({ where: { id: response.body.id } });
    expect(eventInDb).not.toBeNull();
    expect(eventInDb?.name).toBe(eventData.name);
  });
});

describe('PUT /events/:id', () => {
  it('should return 400 when id is invalid', async () => {
    const eventData = createEventData();
    const response = await server.put('/events/invalid').send(eventData);
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return 404 when event does not exist', async () => {
    const eventData = createEventData();
    const response = await server.put('/events/999999').send(eventData);
    expect(response.status).toBe(404);
    expect(response.text).toBe('Event with id 999999 not found.');
  });

  it('should return 422 when body is invalid', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const response = await server.put(`/events/${event.id}`).send({});
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 409 when updating to a name that already exists', async () => {
    const event1 = await prisma.event.create({ data: createEventData() });
    const event2 = await prisma.event.create({ data: createEventData() });

    const response = await server.put(`/events/${event1.id}`).send({
      name: event2.name,
      date: faker.date.future(),
    });
    expect(response.status).toBe(409);
    expect(response.text).toBe(`Event with name ${event2.name} already registered.`);
  });

  it('should update an event successfully', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const updateData = createEventData();

    const response = await server.put(`/events/${event.id}`).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: event.id,
        name: updateData.name,
      })
    );
    expect(new Date(response.body.date)).toEqual(updateData.date);

    const eventInDb = await prisma.event.findUnique({ where: { id: event.id } });
    expect(eventInDb?.name).toBe(updateData.name);
  });

  it('should update an event with the same name successfully', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const updateData = createEventData({ name: event.name });

    const response = await server.put(`/events/${event.id}`).send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(event.name);
  });
});

describe('DELETE /events/:id', () => {
  it('should return 400 when id is invalid', async () => {
    const response = await server.delete('/events/invalid');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return 404 when event does not exist', async () => {
    const response = await server.delete('/events/999999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Event with id 999999 not found.');
  });

  it('should delete an event successfully', async () => {
    const event = await prisma.event.create({ data: createEventData() });

    const response = await server.delete(`/events/${event.id}`);
    expect(response.status).toBe(204);

    const eventInDb = await prisma.event.findUnique({ where: { id: event.id } });
    expect(eventInDb).toBeNull();
  });

  it('should delete an event and its tickets (cascade)', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event.id,
      },
    });

    const response = await server.delete(`/events/${event.id}`);
    expect(response.status).toBe(204);

    const eventInDb = await prisma.event.findUnique({ where: { id: event.id } });
    expect(eventInDb).toBeNull();

    const tickets = await prisma.ticket.findMany({ where: { eventId: event.id } });
    expect(tickets).toHaveLength(0);
  });
});


