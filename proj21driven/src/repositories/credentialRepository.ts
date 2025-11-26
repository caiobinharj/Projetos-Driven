import { PrismaClient, Credential } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCredential(data: {
  title: string;
  url: string;
  username: string;
  password: string;
  userId: number;
}): Promise<Credential> {
  return prisma.credential.create({ data });
}

export async function findCredentialById(
  id: number,
  userId: number
): Promise<Credential | null> {
  return prisma.credential.findFirst({
    where: { id, userId },
  });
}

export async function findAllCredentialsByUserId(
  userId: number
): Promise<Credential[]> {
  return prisma.credential.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function findCredentialByTitleAndUserId(
  title: string,
  userId: number
): Promise<Credential | null> {
  return prisma.credential.findUnique({
    where: {
      title_userId: {
        title,
        userId,
      },
    },
  });
}

export async function updateCredential(
  id: number,
  userId: number,
  data: {
    title?: string;
    url?: string;
    username?: string;
    password?: string;
  }
): Promise<Credential | null> {
  const credential = await findCredentialById(id, userId);
  if (!credential) {
    return null;
  }

  return prisma.credential.update({
    where: { id },
    data,
  });
}

export async function deleteCredential(id: number, userId: number): Promise<void> {
  await prisma.credential.delete({
    where: { id },
  });
}

