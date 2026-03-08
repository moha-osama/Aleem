import { z } from "zod";

export const examQuestionRefSchema = z
  .object({
    id: z.number().optional(),
    eq_id: z.number().optional(),
    exam_question_id: z.number().optional(),
    question_id: z.number().optional(),
    question_text: z.string().optional(),
    text: z.string().optional(),
    order: z.number().optional(),
  })
  .passthrough();

export const examSchema = z
  .object({
    id: z.number(),
    title: z.string().optional(),
    name: z.string().optional(),
    duration_minutes: z.number().optional(),
    subject_id: z.union([z.number(), z.null()]).optional(),
    subject: z.union([z.number(), z.string(), z.null()]).optional(),
    stage_id: z.union([z.number(), z.null()]).optional(),
    stage: z.union([z.number(), z.string(), z.null()]).optional(),
    difficulty_level_id: z.union([z.number(), z.null()]).optional(),
    difficulty_level: z.union([z.number(), z.string(), z.null()]).optional(),
    education_year: z.union([z.string(), z.null()]).optional(),
    is_active: z.boolean().optional(),
    questions: z.array(examQuestionRefSchema).optional(),
  })
  .passthrough();

export const examsSchema = z.array(examSchema);

export const difficultyLevelSchema = z
  .object({
    id: z.number(),
    level: z.string().optional(),
    description: z.string().optional(),
    subject_id: z.union([z.number(), z.null()]).optional(),
    name: z.string().optional(),
    label: z.string().optional(),
    subject: z.union([z.number(), z.string(), z.null()]).optional(),
  })
  .passthrough();

export const difficultyLevelsSchema = z.array(difficultyLevelSchema);
