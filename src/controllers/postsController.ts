import { NextFunction, Request, Response } from 'express';
import prisma from '../prismaClient';
import createError from 'http-errors';

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    next(createError(500, 'Failed to get all posts'));
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id, 10))) {
    next(createError(400, 'Invalid or missing post ID'));
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (post) {
      res.json(post);
    } else {
      next(createError(404, 'Post not found'));
    }
  } catch (error) {
    next(createError(500, 'Error getting post by id'));
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content, published, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
    });
    res.status(201).json(post);
  } catch (error) {
    next(createError(500, 'Error creating post'));
  }
};

export const updatePostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { title, content, published, authorId } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        content,
        published,
        authorId,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    next(createError(500, 'Error updating post'));
  }
};

export const deletePostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    next(createError(500, 'Error deleting post'));
  }
};
