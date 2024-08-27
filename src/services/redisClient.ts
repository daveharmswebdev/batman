import { createClient } from 'redis';
import logger from '../logger';

// Log the environment variables to verify their values
console.log('REDIS_HOST:', process.env.REDIS_HOST);
console.log('REDIS_PORT:', process.env.REDIS_PORT);

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`,
});

redisClient.on('error', (err) => {
  logger.error('RedisClient error:', err);
});

redisClient.on('connect', () => {
  logger.info('Connected to redis client');
});

redisClient.on('reconnecting', () => {
  logger.warn(`Redis client reconnecting...`);
});

export default redisClient;
