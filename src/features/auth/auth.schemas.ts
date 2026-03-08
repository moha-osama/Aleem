import { z } from "zod";

const userRoleSchema = z.enum(["school_admin", "teacher", "parent", "student"]);
const schoolUserRoleFilterSchema = z.enum(["teacher", "parent", "student"]);
const emailSchema = z.union([z.string().email(), z.literal("")]);

export const apiDetailResponseSchema = z.object({
  detail: z.string(),
});

export const loginResponseSchema = z.object({
  refresh: z.string(),
  access: z.string(),
  role: userRoleSchema,
});

export const refreshTokenResponseSchema = z.object({
  access: z.string(),
});

export const authUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: emailSchema,
  role: userRoleSchema,
});

export const registerAccountResponseSchema = z.object({
  detail: z.string(),
  user_id: z.number(),
  username: z.string(),
});

export const schoolUserSummarySchema = z.object({
  id: z.number(),
  username: z.string(),
  role: schoolUserRoleFilterSchema,
  email: emailSchema,
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  is_active: z.boolean().optional(),
});

export const schoolUsersArraySchema = z.array(schoolUserSummarySchema);

export const paginatedSchoolUsersSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(schoolUserSummarySchema),
});
