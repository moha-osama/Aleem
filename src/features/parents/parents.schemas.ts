import { z } from "zod";

export const schoolSchema = z.object({
  id: z.number(),
  name: z.string(),
  gouvernement: z.string().optional(),
});

export const schoolsSchema = z.array(schoolSchema);

export const assignSchoolResponseSchema = z.object({
  detail: z.string(),
});

export const updateChildProfileResponseSchema = z.object({
  detail: z.string(),
});

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
