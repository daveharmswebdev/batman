import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

/* eslint-disable @typescript-eslint/no-explicit-any */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = err.status || 500;
  const response = {
    message: err.message || 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  logger.error(
    `${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  res.status(statusCode).json(response);
};

export default errorHandler;
