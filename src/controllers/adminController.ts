import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export const getAdminReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // code to fetch admin report
    const response = { report: 'This is the report' };

    res.status(200).json(response);
  } catch (error: unknown) {
    next(createError(500, 'Failed to get report'));
  }
};
