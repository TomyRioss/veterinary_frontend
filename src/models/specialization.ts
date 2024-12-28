import { z } from 'zod';

export const specializationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
});
