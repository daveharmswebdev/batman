import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types/customTypes';
import prisma from '../prismaClient';
import logger from '../logger';

export const attachUser = () => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({ message: `Invalid id or id ${id}` });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(404).json({ message: 'User Not Found' });
      }
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};
