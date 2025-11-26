import { Response, NextFunction } from 'express';
import * as credentialService from '../services/credentialService';
import { AuthRequest } from '../middlewares/authMiddleware';

export async function createCredential(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: 'User not authenticated' });
    }
    const credential = await credentialService.createCredential(req.body, req.userId);
    return res.status(201).send(credential);
  } catch (error: any) {
    if (error.type === 'CONFLICT') {
      return res.status(409).send({ message: error.message });
    }
    return next(error);
  }
}

export async function getCredential(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: 'User not authenticated' });
    }
    const id = parseInt(req.params.id, 10);
    const credential = await credentialService.getCredentialById(id, req.userId);
    return res.status(200).send(credential);
  } catch (error: any) {
    if (error.type === 'NOT_FOUND') {
      return res.status(404).send({ message: error.message });
    }
    return next(error);
  }
}

export async function getAllCredentials(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: 'User not authenticated' });
    }
    const credentials = await credentialService.getAllCredentials(req.userId);
    return res.status(200).send(credentials);
  } catch (error) {
    return next(error);
  }
}

export async function updateCredential(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: 'User not authenticated' });
    }
    const id = parseInt(req.params.id, 10);
    await credentialService.updateCredential(id, req.userId, req.body);
    return res.sendStatus(204);
  } catch (error: any) {
    if (error.type === 'NOT_FOUND') {
      return res.status(404).send({ message: error.message });
    }
    if (error.type === 'CONFLICT') {
      return res.status(409).send({ message: error.message });
    }
    return next(error);
  }
}

export async function deleteCredential(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.userId) {
      return res.status(401).send({ message: 'User not authenticated' });
    }
    const id = parseInt(req.params.id, 10);
    await credentialService.deleteCredential(id, req.userId);
    return res.sendStatus(204);
  } catch (error: any) {
    if (error.type === 'NOT_FOUND') {
      return res.status(404).send({ message: error.message });
    }
    return next(error);
  }
}

