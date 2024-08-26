import { z, ZodError } from 'zod';
import { Request, Response } from 'express';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title is too long'),
  content: z
    .string()
    .min(10, 'Minimum content is 10 characters')
    .max(500, 'Content is too long'),
  published: z.boolean().default(false),
  authorId: z.number().int().positive(),
});

export const validateCreatePost = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  try {
    createPostSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
