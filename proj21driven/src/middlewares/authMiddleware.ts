import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Token not provided' });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).send({ message: 'JWT secret not configured' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid or expired token' });
  }
}






