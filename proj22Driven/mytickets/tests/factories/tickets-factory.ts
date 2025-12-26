import { faker } from '@faker-js/faker';
import { CreateTicketData } from '../../src/repositories/tickets-repository';

export function createTicketData(overrides?: Partial<CreateTicketData>): CreateTicketData {
  return {
    code: faker.string.alphanumeric(10),
    owner: faker.person.fullName(),
    eventId: faker.number.int({ min: 1 }),
    ...overrides,
  };
}


