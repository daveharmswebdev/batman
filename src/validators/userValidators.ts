import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  firstName: z.string().min(1, { message: 'Name is required' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Name is required' }),
});

export const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
