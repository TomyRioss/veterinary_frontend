import { z } from 'zod';

export const specializationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});
