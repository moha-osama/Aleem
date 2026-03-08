import { z } from "zod";

export const educationLevelSchema = z.object({
  id: z.number(),
  name: z.string(),
  order: z.number(),
});

export const educationLevelsSchema = z.array(educationLevelSchema);

export const educationStageSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    order: z.number(),
    education_level_id: z.number().optional(),
    education_level: z.number().optional(),
    education_level_name: z.string().optional(),
    school_name: z.string().optional(),
    subjects_count: z.number().optional(),
  })
  .passthrough()
  .refine(
    (stage) =>
      typeof stage.education_level_id === "number" ||
      typeof stage.education_level === "number",
    {
      message:
        "Education stage must include education_level_id or education_level",
    },
  )
  .transform((stage) => ({
    id: stage.id,
    name: stage.name,
    order: stage.order,
    education_level_id: stage.education_level_id ?? stage.education_level!,
    education_level_name: stage.education_level_name,
    school_name: stage.school_name,
    subjects_count: stage.subjects_count,
  }));

export const educationStagesSchema = z.array(educationStageSchema);

export const educationSubjectSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    description: z.union([z.string(), z.null()]).optional(),
    is_active: z.boolean(),
    stage_id: z.number().optional(),
    stage: z
      .union([
        z.number(),
        z
          .object({
            id: z.number().optional(),
          })
          .passthrough(),
        z.null(),
      ])
      .optional(),
  })
  .passthrough()
  .refine(
    (subject) => {
      if (typeof subject.stage_id === "number") {
        return true;
      }

      if (typeof subject.stage === "number") {
        return true;
      }

      if (
        subject.stage &&
        typeof subject.stage === "object" &&
        typeof subject.stage.id === "number"
      ) {
        return true;
      }

      return false;
    },
    {
      message: "Education subject must include stage_id or stage reference",
    },
  )
  .transform((subject) => ({
    id: subject.id,
    name: subject.name,
    description: subject.description ?? "",
    is_active: subject.is_active,
    stage_id:
      subject.stage_id ??
      (typeof subject.stage === "number"
        ? subject.stage
        : subject.stage && typeof subject.stage === "object"
          ? subject.stage.id
          : undefined)!,
  }));

export const educationSubjectsSchema = z.array(educationSubjectSchema);
