import { z } from "zod";

export const envSchema = z.object({
  GOOGLE_TAG_ID: z.string().nonempty(),
});

export type Env = z.infer<typeof envSchema>;
