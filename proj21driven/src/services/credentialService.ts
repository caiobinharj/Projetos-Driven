import Cryptr from 'cryptr';
import * as credentialRepository from '../repositories/credentialRepository';

const cryptrSecret = process.env.CRYPTR_SECRET;
if (!cryptrSecret) {
  throw new Error('CRYPTR_SECRET not configured');
}

const cryptr = new Cryptr(cryptrSecret);

function encryptPassword(password: string): string {
  return cryptr.encrypt(password);
}

function decryptPassword(encryptedPassword: string): string {
  return cryptr.decrypt(encryptedPassword);
}

export async function createCredential(
  data: {
    title: string;
    url: string;
    username: string;
    password: string;
  },
  userId: number
) {
  const existingCredential = await credentialRepository.findCredentialByTitleAndUserId(
    data.title,
    userId
  );

  if (existingCredential) {
    throw { type: 'CONFLICT', message: 'Credential title already exists' };
  }

  const encryptedPassword = encryptPassword(data.password);

  const credential = await credentialRepository.createCredential({
    title: data.title,
    url: data.url,
    username: data.username,
    password: encryptedPassword,
    userId,
  });

  return {
    ...credential,
    password: data.password, // Return decrypted password
  };
}

export async function getCredentialById(id: number, userId: number) {
  const credential = await credentialRepository.findCredentialById(id, userId);

  if (!credential) {
    throw { type: 'NOT_FOUND', message: 'Credential not found' };
  }

  return {
    ...credential,
    password: decryptPassword(credential.password),
  };
}

export async function getAllCredentials(userId: number) {
  const credentials = await credentialRepository.findAllCredentialsByUserId(userId);

  return credentials.map((credential) => ({
    ...credential,
    password: decryptPassword(credential.password),
  }));
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
) {
  const existingCredential = await credentialRepository.findCredentialById(id, userId);

  if (!existingCredential) {
    throw { type: 'NOT_FOUND', message: 'Credential not found' };
  }

  // Check if title is being updated and if it conflicts
  if (data.title && data.title !== existingCredential.title) {
    const titleConflict = await credentialRepository.findCredentialByTitleAndUserId(
      data.title,
      userId
    );
    if (titleConflict) {
      throw { type: 'CONFLICT', message: 'Credential title already exists' };
    }
  }

  const updateData: any = { ...data };
  if (data.password) {
    updateData.password = encryptPassword(data.password);
  }

  await credentialRepository.updateCredential(id, userId, updateData);
}

export async function deleteCredential(id: number, userId: number) {
  const credential = await credentialRepository.findCredentialById(id, userId);

  if (!credential) {
    throw { type: 'NOT_FOUND', message: 'Credential not found' };
  }

  await credentialRepository.deleteCredential(id, userId);
}

