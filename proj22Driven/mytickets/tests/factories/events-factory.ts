import { faker } from '@faker-js/faker';
import { CreateEventData } from '../../src/repositories/events-repository';

export function createEventData(overrides?: Partial<CreateEventData>): CreateEventData {
  // Garantir que a data seja pelo menos 1 dia no futuro para evitar problemas de timing com validação
  const futureDate = faker.date.future({ years: 1 });
  // Se a data for muito próxima, adicionar pelo menos 1 dia
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const date = futureDate > minDate ? futureDate : minDate;

  return {
    name: faker.lorem.words(3),
    date,
    ...overrides,
  };
}

