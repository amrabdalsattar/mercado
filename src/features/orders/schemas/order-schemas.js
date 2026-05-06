import { z } from "zod";

export const orderCreateSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().email().trim().toLowerCase(),
  street: z.string().trim().min(4),
  city: z.string().trim().min(2),
  state: z.string().trim().min(2),
  zip: z.string().trim().min(3),
  country: z.string().trim().min(2).default("Egypt"),
});

export const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});
