import { NextFunction, Request, Response } from 'express';
import redisClient from '../services/redisClient';
import logger from '../logger';

const generateCacheKeys = (req: Request): string[] => {
  const keysToInvalidate = [];

  keysToInvalidate.push('all_posts');

  if (req.params.id) {
    keysToInvalidate.push(`post_${req.params.id}`);
  }

  return keysToInvalidate;
};

export const cacheInvalidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const keysToInvalidate = generateCacheKeys(req);

    for (const key of keysToInvalidate) {
      await redisClient.del(key);
      logger.info(`Cache invalidated for key: ${key}`);
    }

    next();
  } catch (error: any) {
    logger.error('Error invalidating cache:', error.message);
    next(error);
  }
};
