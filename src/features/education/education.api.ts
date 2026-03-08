import { apiClient } from "@/api/client";
import { parseWithSchema } from "@/api/parseWithSchema";
import type { RequestOptions } from "@/api/types";
import {
  educationLevelSchema,
  educationLevelsSchema,
  educationStageSchema,
  educationStagesSchema,
  educationSubjectSchema,
  educationSubjectsSchema,
} from "./education.schemas";
import type {
  CreateEducationLevelRequest,
  CreateEducationStageRequest,
  CreateEducationSubjectRequest,
  EducationLevel,
  EducationStage,
  EducationSubject,
  StageListParams,
  SubjectListParams,
  UpdateEducationLevelRequest,
  UpdateEducationStageRequest,
  UpdateEducationSubjectRequest,
} from "./education.types";

export async function listEducationLevels(
  options?: RequestOptions,
): Promise<EducationLevel[]> {
  const response = await apiClient.get("/api/education/levels/", {
    signal: options?.signal,
  });

  return parseWithSchema(educationLevelsSchema, response.data);
}

export async function createEducationLevel(
  payload: CreateEducationLevelRequest,
  options?: RequestOptions,
): Promise<EducationLevel> {
  const response = await apiClient.post("/api/education/levels/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(educationLevelSchema, response.data);
}

export async function getEducationLevel(
  id: number,
  options?: RequestOptions,
): Promise<EducationLevel> {
  const response = await apiClient.get(`/api/education/levels/${id}/`, {
    signal: options?.signal,
  });

  return parseWithSchema(educationLevelSchema, response.data);
}

export async function updateEducationLevel(
  id: number,
  payload: UpdateEducationLevelRequest,
  options?: RequestOptions,
): Promise<EducationLevel> {
  const response = await apiClient.put(
    `/api/education/levels/${id}/`,
    payload,
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(educationLevelSchema, response.data);
}

export async function deleteEducationLevel(
  id: number,
  options?: RequestOptions,
): Promise<void> {
  await apiClient.delete(`/api/education/levels/${id}/`, {
    signal: options?.signal,
  });
}

export async function listEducationStages(
  params?: StageListParams,
  options?: RequestOptions,
): Promise<EducationStage[]> {
  const response = await apiClient.get("/api/education/stages/", {
    signal: options?.signal,
    params: params?.education_level
      ? { education_level: params.education_level }
      : undefined,
  });

  return parseWithSchema(educationStagesSchema, response.data);
}

export async function createEducationStage(
  payload: CreateEducationStageRequest,
  options?: RequestOptions,
): Promise<EducationStage> {
  const response = await apiClient.post("/api/education/stages/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(educationStageSchema, response.data);
}

export async function getEducationStage(
  id: number,
  options?: RequestOptions,
): Promise<EducationStage> {
  const response = await apiClient.get(`/api/education/stages/${id}/`, {
    signal: options?.signal,
  });

  return parseWithSchema(educationStageSchema, response.data);
}

export async function updateEducationStage(
  id: number,
  payload: UpdateEducationStageRequest,
  options?: RequestOptions,
): Promise<EducationStage> {
  const response = await apiClient.put(
    `/api/education/stages/${id}/`,
    payload,
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(educationStageSchema, response.data);
}

export async function deleteEducationStage(
  id: number,
  options?: RequestOptions,
): Promise<void> {
  await apiClient.delete(`/api/education/stages/${id}/`, {
    signal: options?.signal,
  });
}

export async function listEducationSubjects(
  params?: SubjectListParams,
  options?: RequestOptions,
): Promise<EducationSubject[]> {
  const response = await apiClient.get("/api/education/subjects/", {
    signal: options?.signal,
    params: {
      ...(params?.stage ? { stage: params.stage } : {}),
      ...(params?.education_level
        ? { education_level: params.education_level }
        : {}),
      ...(typeof params?.is_active === "boolean"
        ? { is_active: params.is_active }
        : {}),
    },
  });

  return parseWithSchema(educationSubjectsSchema, response.data);
}

export async function createEducationSubject(
  payload: CreateEducationSubjectRequest,
  options?: RequestOptions,
): Promise<EducationSubject> {
  const response = await apiClient.post("/api/education/subjects/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(educationSubjectSchema, response.data);
}

export async function getEducationSubject(
  id: number,
  options?: RequestOptions,
): Promise<EducationSubject> {
  const response = await apiClient.get(`/api/education/subjects/${id}/`, {
    signal: options?.signal,
  });

  return parseWithSchema(educationSubjectSchema, response.data);
}

export async function updateEducationSubject(
  id: number,
  payload: UpdateEducationSubjectRequest,
  options?: RequestOptions,
): Promise<EducationSubject> {
  const response = await apiClient.put(
    `/api/education/subjects/${id}/`,
    payload,
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(educationSubjectSchema, response.data);
}

export async function deleteEducationSubject(
  id: number,
  options?: RequestOptions,
): Promise<void> {
  await apiClient.delete(`/api/education/subjects/${id}/`, {
    signal: options?.signal,
  });
}
