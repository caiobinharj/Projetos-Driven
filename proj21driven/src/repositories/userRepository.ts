import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  return prisma.user.create({ data });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export async function deleteUser(id: number): Promise<void> {
  await prisma.user.delete({ where: { id } });
}






