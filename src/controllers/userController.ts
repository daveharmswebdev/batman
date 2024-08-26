import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'failed to get all users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating user' });
  }
};
