import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../../src/index';
import prisma from '../../src/database';
import { createTicketData } from '../factories/tickets-factory';
import { createEventData } from '../factories/events-factory';

const server = supertest(app);

describe('GET /tickets/:eventId', () => {
  it('should return 400 when eventId is invalid', async () => {
    const response = await server.get('/tickets/invalid');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return 400 when eventId is zero', async () => {
    const response = await server.get('/tickets/0');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return an empty array when event has no tickets', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const response = await server.get(`/tickets/${event.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return all tickets for an event', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const ticket1 = await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event.id,
      },
    });
    const ticket2 = await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event.id,
      },
    });

    const response = await server.get(`/tickets/${event.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: ticket1.id, code: ticket1.code }),
        expect.objectContaining({ id: ticket2.id, code: ticket2.code }),
      ])
    );
  });

  it('should only return tickets for the specified event', async () => {
    const event1 = await prisma.event.create({ data: createEventData() });
    const event2 = await prisma.event.create({ data: createEventData() });
    const ticket1 = await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event1.id,
      },
    });
    await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event2.id,
      },
    });

    const response = await server.get(`/tickets/${event1.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(ticket1.id);
  });
});

describe('POST /tickets', () => {
  it('should return 422 when body is missing', async () => {
    const response = await server.post('/tickets').send({});
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 422 when code is missing', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const ticketData = createTicketData({ eventId: event.id });
    delete (ticketData as any).code;
    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 422 when owner is missing', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const ticketData = createTicketData({ eventId: event.id });
    delete (ticketData as any).owner;
    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 422 when eventId is missing', async () => {
    const ticketData = createTicketData();
    delete (ticketData as any).eventId;
    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 422 when eventId is zero', async () => {
    const ticketData = createTicketData({ eventId: 0 });
    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(422);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return 404 when event does not exist', async () => {
    const ticketData = createTicketData({ eventId: 999999 });
    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(404);
    expect(response.text).toBe('Event with id 999999 not found.');
  });

  it('should return 403 when event has already happened', async () => {
    const event = await prisma.event.create({
      data: createEventData({ date: faker.date.past() }),
    });
    const ticketData = createTicketData({ eventId: event.id });

    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(403);
    expect(response.text).toBe('The event has already happened.');
  });

  it('should return 409 when ticket code already exists for the event', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const code = faker.string.alphanumeric(10);
    await prisma.ticket.create({
      data: {
        code,
        owner: faker.person.fullName(),
        eventId: event.id,
      },
    });

    const ticketData = createTicketData({ eventId: event.id, code });
    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(409);
    expect(response.text).toBe(`Ticket with code ${code} for event id ${event.id} already registered.`);
  });

  it('should create a ticket successfully', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const ticketData = createTicketData({ eventId: event.id });

    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        code: ticketData.code,
        owner: ticketData.owner,
        eventId: event.id,
        used: false,
      })
    );

    const ticketInDb = await prisma.ticket.findUnique({
      where: {
        eventId_code: {
          eventId: event.id,
          code: ticketData.code,
        },
      },
    });
    expect(ticketInDb).not.toBeNull();
    expect(ticketInDb?.owner).toBe(ticketData.owner);
    expect(ticketInDb?.used).toBe(false);
  });

  it('should allow same code for different events', async () => {
    const event1 = await prisma.event.create({ data: createEventData() });
    const event2 = await prisma.event.create({ data: createEventData() });
    const code = faker.string.alphanumeric(10);

    await prisma.ticket.create({
      data: {
        code,
        owner: faker.person.fullName(),
        eventId: event1.id,
      },
    });

    const ticketData = createTicketData({ eventId: event2.id, code });
    const response = await server.post('/tickets').send(ticketData);
    expect(response.status).toBe(201);
    expect(response.body.code).toBe(code);
  });
});

describe('PUT /tickets/use/:id', () => {
  it('should return 400 when id is invalid', async () => {
    const response = await server.put('/tickets/use/invalid');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return 400 when id is zero', async () => {
    const response = await server.put('/tickets/use/0');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid id.');
  });

  it('should return 404 when ticket does not exist', async () => {
    const response = await server.put('/tickets/use/999999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Ticket with id 999999 not found.');
  });

  it('should return 403 when event has already happened', async () => {
    const event = await prisma.event.create({
      data: createEventData({ date: faker.date.past() }),
    });
    const ticket = await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event.id,
        used: false,
      },
    });

    const response = await server.put(`/tickets/use/${ticket.id}`);
    expect(response.status).toBe(403);
    expect(response.text).toBe('The event has already happened or ticket was already used.');
  });

  it('should return 403 when ticket was already used', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const ticket = await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event.id,
        used: true,
      },
    });

    const response = await server.put(`/tickets/use/${ticket.id}`);
    expect(response.status).toBe(403);
    expect(response.text).toBe('The event has already happened or ticket was already used.');
  });

  it('should mark a ticket as used successfully', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const ticket = await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event.id,
        used: false,
      },
    });

    const response = await server.put(`/tickets/use/${ticket.id}`);
    expect(response.status).toBe(204);

    const ticketInDb = await prisma.ticket.findUnique({ where: { id: ticket.id } });
    expect(ticketInDb?.used).toBe(true);
  });

  it('should not allow using the same ticket twice', async () => {
    const event = await prisma.event.create({ data: createEventData() });
    const ticket = await prisma.ticket.create({
      data: {
        code: faker.string.alphanumeric(10),
        owner: faker.person.fullName(),
        eventId: event.id,
        used: false,
      },
    });

    await server.put(`/tickets/use/${ticket.id}`);
    const response = await server.put(`/tickets/use/${ticket.id}`);
    expect(response.status).toBe(403);
    expect(response.text).toBe('The event has already happened or ticket was already used.');
  });
});


