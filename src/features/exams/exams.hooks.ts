import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  addExamQuestions,
  createDifficultyLevel,
  createExam,
  deleteDifficultyLevel,
  deleteExam,
  getExam,
  listDifficultyLevels,
  listExams,
  removeExamQuestion,
  updateDifficultyLevel,
  updateExam,
} from "./exams.api";
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

type MutationWithSignal<T> = T & { signal?: AbortSignal };

export const examsQueryKeys = {
  all: ["exams"] as const,
  list: (filters?: ExamFilters) =>
    [
      ...examsQueryKeys.all,
      "list",
      filters?.subject ?? "all-subject",
      filters?.stage ?? "all-stage",
      filters?.difficulty_level ?? "all-difficulty",
      filters?.education_year ?? "all-year",
      typeof filters?.is_active === "boolean"
        ? filters.is_active
        : "all-active",
    ] as const,
  detail: (id: number) => [...examsQueryKeys.all, "detail", id] as const,
  difficultyLevels: (filters?: DifficultyLevelFilters) =>
    [
      ...examsQueryKeys.all,
      "difficulty-levels",
      filters?.subject ?? "all-subject",
    ] as const,
};

export function useExams(
  filters?: ExamFilters,
  enabled = true,
): UseQueryResult<Exam[]> {
  return useQuery({
    queryKey: examsQueryKeys.list(filters),
    queryFn: ({ signal }) => listExams(filters, { signal }),
    enabled,
  });
}

export function useExamDetail(
  id: number | null,
  enabled = true,
): UseQueryResult<Exam> {
  return useQuery({
    queryKey: examsQueryKeys.detail(id ?? -1),
    queryFn: ({ signal }) => getExam(id as number, { signal }),
    enabled: enabled && typeof id === "number" && id > 0,
  });
}

export function useDifficultyLevels(
  filters?: DifficultyLevelFilters,
  enabled = true,
): UseQueryResult<DifficultyLevel[]> {
  return useQuery({
    queryKey: examsQueryKeys.difficultyLevels(filters),
    queryFn: ({ signal }) => listDifficultyLevels(filters, { signal }),
    enabled,
  });
}

export function useCreateExam(): UseMutationResult<
  Exam,
  Error,
  MutationWithSignal<CreateExamRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) => createExam(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: examsQueryKeys.all });
    },
  });
}

export function useUpdateExam(): UseMutationResult<
  Exam,
  Error,
  MutationWithSignal<{ id: number; payload: UpdateExamRequest }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, payload }) =>
      updateExam(id, payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: examsQueryKeys.all });
    },
  });
}

export function useDeleteExam(): UseMutationResult<
  void,
  Error,
  MutationWithSignal<{ id: number }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id }) => deleteExam(id, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: examsQueryKeys.all });
    },
  });
}

export function useAddExamQuestions(): UseMutationResult<
  AddExamQuestionsResponse,
  Error,
  MutationWithSignal<{ id: number; payload: AddExamQuestionsRequest }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, payload }) =>
      addExamQuestions(id, payload, { signal }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: examsQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: examsQueryKeys.detail(variables.id),
      });
    },
  });
}

export function useRemoveExamQuestion(): UseMutationResult<
  void,
  Error,
  MutationWithSignal<{ id: number; eqId: number }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, eqId }) =>
      removeExamQuestion(id, eqId, { signal }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: examsQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: examsQueryKeys.detail(variables.id),
      });
    },
  });
}

export function useCreateDifficultyLevel(): UseMutationResult<
  DifficultyLevel,
  Error,
  MutationWithSignal<CreateDifficultyLevelRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      createDifficultyLevel(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: examsQueryKeys.difficultyLevels(),
      });
    },
  });
}

export function useUpdateDifficultyLevel(): UseMutationResult<
  DifficultyLevel,
  Error,
  MutationWithSignal<{ id: number; payload: UpdateDifficultyLevelRequest }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, payload }) =>
      updateDifficultyLevel(id, payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: examsQueryKeys.difficultyLevels(),
      });
    },
  });
}

export function useDeleteDifficultyLevel(): UseMutationResult<
  void,
  Error,
  MutationWithSignal<{ id: number }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id }) => deleteDifficultyLevel(id, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: examsQueryKeys.difficultyLevels(),
      });
      queryClient.invalidateQueries({ queryKey: examsQueryKeys.list() });
    },
  });
}
