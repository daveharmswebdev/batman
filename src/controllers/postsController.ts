import { Request, Response } from 'express';
import prisma from '../prismaClient';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error getting all posts' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id, 10))) {
    return res.status(400).json({ error: 'Invalid or missing post ID' });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error getting post by id' });
  }
};

export const createPost = async (req: Request, res: Response) => {
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
    console.error(error);
    res.status(500).json({ error: 'Error creating post' });
  }
};

export const updatePostById = async (req: Request, res: Response) => {
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
    console.error(error);
    res.status(500).json({ error: 'Error updating post' });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting post' });
  }
};
