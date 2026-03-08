import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { MutationWithSignal } from "@/api/types";
import {
  createGame,
  createGameQuestion,
  deleteGame,
  deleteGameQuestion,
  listGameQuestions,
  listGames,
  updateGame,
  updateGameQuestion,
} from "./games.api";
import type {
  CreateGameQuestionRequest,
  CreateGameRequest,
  Game,
  GameQuestion,
  GameQuestionsFilters,
  UpdateGameQuestionRequest,
  UpdateGameRequest,
} from "./games.types";

export const gamesQueryKeys = {
  all: ["games"] as const,
  list: () => [...gamesQueryKeys.all, "list"] as const,
  questions: (filters?: GameQuestionsFilters) =>
    [
      ...gamesQueryKeys.all,
      "questions",
      filters?.subject ?? "all-subject",
      filters?.difficulty_level ?? "all-difficulty",
      filters?.game ?? "all-game",
      filters?.question_type ?? "all-type",
      typeof filters?.is_active === "boolean"
        ? filters.is_active
        : "all-active",
    ] as const,
};

export function useGames(enabled = true): UseQueryResult<Game[]> {
  return useQuery({
    queryKey: gamesQueryKeys.list(),
    queryFn: ({ signal }) => listGames({ signal }),
    enabled,
  });
}

export function useGameQuestions(
  filters?: GameQuestionsFilters,
  enabled = true,
): UseQueryResult<GameQuestion[]> {
  return useQuery({
    queryKey: gamesQueryKeys.questions(filters),
    queryFn: ({ signal }) => listGameQuestions(filters, { signal }),
    enabled,
  });
}

export function useCreateGame(): UseMutationResult<
  Game,
  Error,
  MutationWithSignal<CreateGameRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) => createGame(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gamesQueryKeys.list() });
    },
  });
}

export function useUpdateGame(): UseMutationResult<
  Game,
  Error,
  MutationWithSignal<{ id: number; payload: UpdateGameRequest }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, payload }) =>
      updateGame(id, payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gamesQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: gamesQueryKeys.questions() });
    },
  });
}

export function useDeleteGame(): UseMutationResult<
  void,
  Error,
  MutationWithSignal<{ id: number }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id }) => deleteGame(id, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gamesQueryKeys.list() });
      queryClient.invalidateQueries({ queryKey: gamesQueryKeys.questions() });
    },
  });
}

export function useCreateGameQuestion(): UseMutationResult<
  GameQuestion,
  Error,
  MutationWithSignal<CreateGameQuestionRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      createGameQuestion(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gamesQueryKeys.questions() });
    },
  });
}

export function useUpdateGameQuestion(): UseMutationResult<
  GameQuestion,
  Error,
  MutationWithSignal<{ id: number; payload: UpdateGameQuestionRequest }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, payload }) =>
      updateGameQuestion(id, payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gamesQueryKeys.questions() });
    },
  });
}

export function useDeleteGameQuestion(): UseMutationResult<
  void,
  Error,
  MutationWithSignal<{ id: number }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id }) => deleteGameQuestion(id, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gamesQueryKeys.questions() });
    },
  });
}
