import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('demo123', 10);

  await prisma.user.upsert({
    where: { email: 'demo@driven.com.br' },
    update: {},
    create: {
      name: 'Demo',
      email: 'demo@driven.com.br',
      password: hashedPassword,
    },
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });






