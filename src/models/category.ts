import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
});

// export const createCategorySchema = z.object({
//   name: z.string(),
// });

export type Category = z.infer<typeof categorySchema>;
// export type CreateCategory = z.infer<typeof createCategorySchema>;
