import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  return res.status(500).send({ message: 'Internal server error' });
}






