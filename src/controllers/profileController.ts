import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import prisma from '../prismaClient';
import logger from '../logger';
import { CustomRequest } from '../types/customTypes';
import { User } from '@prisma/client';

export const getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Error retrieving profiles: ${err.message}`, {
        stack: err.stack,
      });
    } else {
      logger.error(`Unknown error occurred, ${err}`);
    }

    next(createError(500, 'Error getting all posts'));
  }
};

export const getProfileById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const user = req.user as User;
  if (!user) {
    return next(createError(401, 'Unauthorized: User not found'));
  }

  if (parseInt(id, 10) !== user.id) {
    next(createError(400, 'Invalid user id or password'));
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
    });

    if (profile) {
      res.json(profile);
    } else {
      next(createError(404, 'Error getting profile'));
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(
        `Error retrieving profile with ID ${user.id}: ${err.message}`,
        {
          stack: err.stack,
          userId: req.user?.id,
        },
      );
    } else {
      logger.error(`Unknown error occurred, ${err}`);
    }

    next(createError(500, 'Error'));
  }
};

export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user as User;
  if (!user) {
    return next(createError(401, 'Unauthorized: User not found'));
  }

  try {
    const { id } = user;

    const { bio, address1, address2, city, state, zip } = req.body;
    const profile = await prisma.profile.create({
      data: {
        bio,
        address1,
        address2,
        city,
        state,
        zip,
        user: {
          connect: { id },
        },
      },
    });

    res.status(201).json(profile);
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(`Error creating profile: ${err.message}`, {
        stack: err.stack,
        userId: user.id,
      });
    } else {
      logger.error(`Unknown error occurred, ${err}`);
    }
    next(createError(500, 'Error'));
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const userId = req.user.id;

    if (parseInt(id, 10) !== userId) {
      next(createError(400, 'Invalid user id or password'));
    }

    const { bio, address1, address2, city, state, zip } = req.body;

    await prisma.profile.update({
      where: { userId: parseInt(id, 10) },
      data: {
        bio,
        address1,
        address2,
        city,
        state,
        zip,
      },
    });

    res.status(204).send();
  } catch (err: any) {
    next(createError(500, 'Error'));
  }
};

const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await prisma.profile.delete({
      where: { userId: parseInt(id, 10) },
    });
    res.status(204);
  } catch (err: any) {
    next(createError(500, 'Error'));
  }
};
