import { hasDatabaseConfig } from "@/lib/env";

export async function safeDbCall(fn, fallback) {
  if (!hasDatabaseConfig()) {
    return fallback;
  }

  try {
    return await fn();
  } catch (error) {
    console.error(error);
    return fallback;
  }
}
