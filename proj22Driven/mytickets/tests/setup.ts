// IMPORTANTE: Carregar .env.test ANTES de qualquer outro import
import { config } from 'dotenv';
import { resolve } from 'path';

// Carregar variáveis de ambiente do .env.test
config({ path: resolve(__dirname, '../.env.test') });

// Agora importar o prisma que usará a DATABASE_URL do .env.test
import prisma from '../src/database';

beforeAll(async () => {
  // Garantir que o banco está limpo antes de começar os testes
  await cleanDb();
});

afterEach(async () => {
  // Limpar o banco após cada teste
  await cleanDb();
});

afterAll(async () => {
  // Fechar conexão após todos os testes
  await prisma.$disconnect();
});

async function cleanDb() {
  await prisma.ticket.deleteMany({});
  await prisma.event.deleteMany({});
}

