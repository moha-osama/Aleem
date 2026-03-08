import { z } from "zod";

export const gameSchema = z
  .object({
    id: z.number(),
    name: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    is_active: z.boolean().optional(),
  })
  .passthrough();

export const gamesSchema = z.array(gameSchema);

export const gameQuestionChoiceSchema = z
  .object({
    id: z.number().optional(),
    text: z.string(),
    is_correct: z.boolean(),
  })
  .passthrough();

export const gameQuestionSchema = z
  .object({
    id: z.number(),
    text: z.string().optional(),
    question_text: z.string().optional(),
    points: z.number().optional(),
    difficulty_level_id: z.number().nullable().optional(),
    difficulty_level: z.union([z.number(), z.string(), z.null()]).optional(),
    question_type: z.string().optional(),
    is_active: z.boolean().optional(),
    game_id: z.number().nullable().optional(),
    game: z
      .union([
        z.number(),
        z
          .object({
            id: z.number().optional(),
            name: z.string().optional(),
            title: z.string().optional(),
          })
          .passthrough(),
        z.null(),
      ])
      .optional(),
    subject_id: z.number().nullable().optional(),
    subject: z.union([z.number(), z.string(), z.null()]).optional(),
    choices: z.array(gameQuestionChoiceSchema).optional(),
  })
  .passthrough();

export const gameQuestionsSchema = z.array(gameQuestionSchema);
