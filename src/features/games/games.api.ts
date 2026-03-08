import { z } from "zod";
import { apiClient } from "@/api/client";
import {
  gameQuestionSchema,
  gameQuestionsSchema,
  gameSchema,
  gamesSchema,
} from "./games.schemas";
import type {
  CreateGameQuestionRequest,
  CreateGameRequest,
  Game,
  GameQuestion,
  GameQuestionsFilters,
  RequestOptions,
  UpdateGameQuestionRequest,
  UpdateGameRequest,
} from "./games.types";

const ENABLE_API_RESPONSE_VALIDATION =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_API_VALIDATION === "true";

function parseWithSchema<T>(schema: z.ZodType<T>, data: unknown): T {
  if (!ENABLE_API_RESPONSE_VALIDATION) {
    return data as T;
  }

  return schema.parse(data);
}

export async function listGames(options?: RequestOptions): Promise<Game[]> {
  const response = await apiClient.get("/api/games/", {
    signal: options?.signal,
  });

  return parseWithSchema(gamesSchema, response.data);
}

export async function createGame(
  payload: CreateGameRequest,
  options?: RequestOptions,
): Promise<Game> {
  const response = await apiClient.post(
    "/api/games/",
    {
      name: payload.name,
      description: payload.description,
    },
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(gameSchema, response.data);
}

export async function getGame(
  id: number,
  options?: RequestOptions,
): Promise<Game> {
  const response = await apiClient.get(`/api/games/${id}/`, {
    signal: options?.signal,
  });

  return parseWithSchema(gameSchema, response.data);
}

export async function updateGame(
  id: number,
  payload: UpdateGameRequest,
  options?: RequestOptions,
): Promise<Game> {
  const response = await apiClient.put(
    `/api/games/${id}/`,
    {
      name: payload.name,
      description: payload.description,
    },
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(gameSchema, response.data);
}

export async function deleteGame(
  id: number,
  options?: RequestOptions,
): Promise<void> {
  await apiClient.delete(`/api/games/${id}/`, {
    signal: options?.signal,
  });
}

export async function listGameQuestions(
  filters?: GameQuestionsFilters,
  options?: RequestOptions,
): Promise<GameQuestion[]> {
  const response = await apiClient.get("/api/games/questions/", {
    signal: options?.signal,
    params: {
      ...(typeof filters?.subject === "number"
        ? { subject: filters.subject }
        : {}),
      ...(typeof filters?.difficulty_level === "number"
        ? { difficulty_level: filters.difficulty_level }
        : {}),
      ...(typeof filters?.game === "number" ? { game: filters.game } : {}),
      ...(filters?.question_type
        ? { question_type: filters.question_type }
        : {}),
      ...(typeof filters?.is_active === "boolean"
        ? { is_active: filters.is_active }
        : {}),
    },
  });

  return parseWithSchema(gameQuestionsSchema, response.data);
}

export async function createGameQuestion(
  payload: CreateGameQuestionRequest,
  options?: RequestOptions,
): Promise<GameQuestion> {
  const response = await apiClient.post("/api/games/questions/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(gameQuestionSchema, response.data);
}

export async function getGameQuestion(
  id: number,
  options?: RequestOptions,
): Promise<GameQuestion> {
  const response = await apiClient.get(`/api/games/questions/${id}/`, {
    signal: options?.signal,
  });

  return parseWithSchema(gameQuestionSchema, response.data);
}

export async function updateGameQuestion(
  id: number,
  payload: UpdateGameQuestionRequest,
  options?: RequestOptions,
): Promise<GameQuestion> {
  const response = await apiClient.put(`/api/games/questions/${id}/`, payload, {
    signal: options?.signal,
  });

  return parseWithSchema(gameQuestionSchema, response.data);
}

export async function deleteGameQuestion(
  id: number,
  options?: RequestOptions,
): Promise<void> {
  await apiClient.delete(`/api/games/questions/${id}/`, {
    signal: options?.signal,
  });
}
