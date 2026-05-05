import { z } from "zod";

export const productQuerySchema = z.object({
  q: z.string().optional().default(""),
  category: z.string().optional().default(""),
  sort: z.enum(["featured", "price-asc", "price-desc", "rating", "newest"]).optional().default("featured"),
  availability: z.string().optional().default(""),
  price: z.string().optional().default(""),
});

export const productCreateSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().trim().min(10),
  price: z.coerce.number().min(0),
  salePrice: z.coerce.number().min(0).nullable().optional(),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string().min(1),
  coverImage: z.string().trim().optional().default(""),
  featured: z.coerce.boolean().optional().default(false),
});

export const categoryCreateSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().trim().optional().default(""),
});
