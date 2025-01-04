import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  subcategoryId: z.number(),
  priceInCents: z.number().min(1),
  brandId: z.number(),
  stock: z.number().min(0).default(0),
  isAvailableForPurchase: z.boolean().default(true),
  organizationId: z.number().default(1),
  createdAt: z.date(),
  updatedAt: z.date(),

  Subcategory: z.string().optional(), // Include for relational validation
  Brand: z.string().optional(), // Include for relational validation
  Images: z.array(z.string().url()).nonempty(),
  Attributes: z
    .object({
      attribute: z.string(),
    })
    .optional(),
});
