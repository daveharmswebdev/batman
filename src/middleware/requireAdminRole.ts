import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';

export const requireAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user as User;

  if (user.role !== 'ADMIN') {
    return res
      .status(403)
      .json({ error: 'You do not have permission to use this action.' });
  }
  next();
};
