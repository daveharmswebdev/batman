import { z } from 'zod';

export const createProfileSchema = z.object({
  bio: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City be required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(5, { message: 'Zip is required' }),
});
