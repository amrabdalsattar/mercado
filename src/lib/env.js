import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(32).optional(),
  APP_URL: z.string().url().default("http://localhost:3000"),
});

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_URL: process.env.APP_URL ?? "http://localhost:3000",
});

if (!parsed.success) {
  throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
}

export const env = parsed.data;

export function hasDatabaseConfig() {
  return Boolean(env.MONGODB_URI);
}

export function getMongoUri() {
  if (!env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  return env.MONGODB_URI;
}

export function getJwtSecret() {
  if (!env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable.");
  }

  return env.JWT_SECRET;
}
