import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  REACT_ENV: z.enum(["dev", "production"]),
  baseURL: z.string().default("http://localhost:3333"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variable", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
