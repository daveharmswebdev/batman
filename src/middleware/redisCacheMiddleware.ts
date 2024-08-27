import { Request, Response, NextFunction } from 'express';
import redisClient from '../services/redisClient';
import logger from '../logger';

export const redisCacheMiddleware = (
  cacheKeyGenerator: (req: Request) => string,
  ttl: number = 3600,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = cacheKeyGenerator(req);

    try {
      const cachedResponse = await redisClient.get(cacheKey);

      if (cachedResponse) {
        logger.info(`Cache hit for key: ${cachedResponse}`);
        return res.json(JSON.parse(cachedResponse));
      }

      // capture the original res.json function to store the result in cache
      const originalJson = res.json.bind(res);

      // @ts-ignore
      res.json = async (body: any) => {
        try {
          // store response in redis
          await redisClient.set(cacheKey, JSON.stringify(body), { EX: ttl });
          logger.info(`Cache set for key: ${cacheKey}`);
        } catch (err: any) {
          logger.error(`Error setting cache for key ${cacheKey}`, err.message);
        }

        originalJson(body);
      };

      next();
    } catch (err: any) {
      logger.error(`Error checking cache for key ${cacheKey}:`, err.message);
    }
  };
};
