import { Request, Response, NextFunction } from 'express';

export function validateIdParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id <= 0) {
    return res.status(400).send({ message: 'Invalid id parameter' });
  }

  next();
}






