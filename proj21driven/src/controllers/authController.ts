import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { AuthRequest } from '../middlewares/authMiddleware';

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.signUp(req.body);
    return res.sendStatus(201);
  } catch (error: any) {
    if (error.type === 'CONFLICT') {
      return res.status(409).send({ message: error.message });
    }
    return next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.signIn(req.body);
    return res.status(200).send(result);
  } catch (error: any) {
    if (error.type === 'NOT_FOUND') {
      return res.status(404).send({ message: error.message });
    }
    if (error.type === 'UNAUTHORIZED') {
      return res.status(401).send({ message: error.message });
    }
    return next(error);
  }
}

export async function deleteAccount(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: 'User not authenticated' });
    }
    await authService.deleteUserAccount(req.userId);
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}

