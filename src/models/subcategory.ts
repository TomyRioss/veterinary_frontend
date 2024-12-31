import { z } from 'zod';

export const subcategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  categories: z.array(z.number()).min(1, 'At least one category is required'),
});
