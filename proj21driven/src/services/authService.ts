import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository';

export async function signUp(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await userRepository.findUserByEmail(data.email);
  if (existingUser) {
    throw { type: 'CONFLICT', message: 'Email already registered' };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return user;
}

export async function signIn(data: { email: string; password: string }) {
  const user = await userRepository.findUserByEmail(data.email);
  if (!user) {
    throw { type: 'NOT_FOUND', message: 'Email not found' };
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw { type: 'UNAUTHORIZED', message: 'Invalid password' };
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw { type: 'INTERNAL_ERROR', message: 'JWT secret not configured' };
  }

  const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' });

  return { token };
}

export async function deleteUserAccount(userId: number) {
  await userRepository.deleteUser(userId);
}






