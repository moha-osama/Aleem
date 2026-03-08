import { z } from "zod";

const ENABLE_API_RESPONSE_VALIDATION =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_API_VALIDATION === "true";

/**
 * Conditionally validates API responses with Zod.
 * Enabled in dev and when VITE_ENABLE_API_VALIDATION is set.
 * In production, skips parsing for performance.
 */
export function parseWithSchema<T>(schema: z.ZodType<T>, data: unknown): T {
  if (!ENABLE_API_RESPONSE_VALIDATION) {
    return data as T;
  }
  return schema.parse(data);
}
