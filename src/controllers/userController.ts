import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from './tokenHelper';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    (res as Response).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'failed to get all users' });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password, firstName, middleName, lastName } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        middleName,
        lastName,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        middleName: true,
        lastName: true,
      },
    });

    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    next(createError(500, 'Error creating user'));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(createError(401, 'Invalid email or password'));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(createError(401, 'Invalid password or password'));
    }

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/refresh-token',
    });

    res.json({ token });
  } catch (error) {
    console.log('Error logging in user', error);
    next(createError(500, 'Error logging in user'));
  }
};
