import { apiClient } from "@/api/client";
import { parseWithSchema } from "@/api/parseWithSchema";
import type { RequestOptions } from "@/api/types";
import {
  difficultyLevelSchema,
  difficultyLevelsSchema,
  examSchema,
  examsSchema,
} from "./exams.schemas";
import type {
  AddExamQuestionsRequest,
  AddExamQuestionsResponse,
  CreateDifficultyLevelRequest,
  CreateExamRequest,
  DifficultyLevel,
  DifficultyLevelFilters,
  Exam,
  ExamFilters,
  UpdateDifficultyLevelRequest,
  UpdateExamRequest,
} from "./exams.types";

export async function listExams(
  filters?: ExamFilters,
  options?: RequestOptions,
): Promise<Exam[]> {
  const response = await apiClient.get("/api/exams/", {
    signal: options?.signal,
    params: {
      ...(typeof filters?.subject === "number"
        ? { subject: filters.subject }
        : {}),
      ...(typeof filters?.stage === "number" ? { stage: filters.stage } : {}),
      ...(typeof filters?.difficulty_level === "number"
        ? { difficulty_level: filters.difficulty_level }
        : {}),
      ...(filters?.education_year
        ? { education_year: filters.education_year }
        : {}),
      ...(typeof filters?.is_active === "boolean"
        ? { is_active: filters.is_active }
        : {}),
    },
  });

  return parseWithSchema(examsSchema, response.data);
}

export async function createExam(
  payload: CreateExamRequest,
  options?: RequestOptions,
): Promise<Exam> {
  const response = await apiClient.post("/api/exams/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(examSchema, response.data);
}

export async function getExam(
  id: number,
  options?: RequestOptions,
): Promise<Exam> {
  const response = await apiClient.get(`/api/exams/${id}/`, {
    signal: options?.signal,
  });

  return parseWithSchema(examSchema, response.data);
}

export async function updateExam(
  id: number,
  payload: UpdateExamRequest,
  options?: RequestOptions,
): Promise<Exam> {
  const response = await apiClient.put(`/api/exams/${id}/`, payload, {
    signal: options?.signal,
  });

  return parseWithSchema(examSchema, response.data);
}

export async function deleteExam(
  id: number,
  options?: RequestOptions,
): Promise<void> {
  await apiClient.delete(`/api/exams/${id}/`, {
    signal: options?.signal,
  });
}

export async function addExamQuestions(
  id: number,
  payload: AddExamQuestionsRequest,
  options?: RequestOptions,
): Promise<AddExamQuestionsResponse> {
  const response = await apiClient.post(
    `/api/exams/${id}/add-questions/`,
    payload,
    {
      signal: options?.signal,
    },
  );

  return response.data as AddExamQuestionsResponse;
}

export async function removeExamQuestion(
  id: number,
  eqId: number,
  options?: RequestOptions,
): Promise<void> {
  await apiClient.delete(`/api/exams/${id}/remove-question/${eqId}/`, {
    signal: options?.signal,
  });
}

export async function listDifficultyLevels(
  filters?: DifficultyLevelFilters,
  options?: RequestOptions,
): Promise<DifficultyLevel[]> {
  const response = await apiClient.get("/api/exams/difficulty-levels/", {
    signal: options?.signal,
    params: {
      ...(typeof filters?.subject === "number"
        ? { subject: filters.subject }
        : {}),
    },
  });

  return parseWithSchema(difficultyLevelsSchema, response.data);
}

export async function createDifficultyLevel(
  payload: CreateDifficultyLevelRequest,
  options?: RequestOptions,
): Promise<DifficultyLevel> {
  const response = await apiClient.post(
    "/api/exams/difficulty-levels/",
    payload,
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(difficultyLevelSchema, response.data);
}

export async function getDifficultyLevel(
  id: number,
  options?: RequestOptions,
): Promise<DifficultyLevel> {
  const response = await apiClient.get(`/api/exams/difficulty-levels/${id}/`, {
    signal: options?.signal,
  });

  return parseWithSchema(difficultyLevelSchema, response.data);
}

export async function updateDifficultyLevel(
  id: number,
  payload: UpdateDifficultyLevelRequest,
  options?: RequestOptions,
): Promise<DifficultyLevel> {
  const response = await apiClient.put(
    `/api/exams/difficulty-levels/${id}/`,
    payload,
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(difficultyLevelSchema, response.data);
}

export async function deleteDifficultyLevel(
  id: number,
  options?: RequestOptions,
): Promise<void> {
  await apiClient.delete(`/api/exams/difficulty-levels/${id}/`, {
    signal: options?.signal,
  });
}
