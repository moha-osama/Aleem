import { z } from "zod";

export const parentChildSchema = z.object({
  user_id: z.number(),
  username: z.string(),
  full_name: z.string(),
  stage: z.string(),
  education_level: z.string(),
  education_year: z.string(),
});

export const parentChildrenSchema = z.array(parentChildSchema);

export const linkParentChildResponseSchema = z.object({
  detail: z.string(),
  student_id: z.number(),
});
