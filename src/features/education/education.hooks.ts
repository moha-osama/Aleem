import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  createEducationLevel,
  createEducationStage,
  createEducationSubject,
  deleteEducationLevel,
  deleteEducationStage,
  deleteEducationSubject,
  listEducationLevels,
  listEducationStages,
  listEducationSubjects,
  updateEducationLevel,
  updateEducationStage,
  updateEducationSubject,
} from "./education.api";
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

type MutationWithSignal<T> = T & { signal?: AbortSignal };

export const educationQueryKeys = {
  all: ["education"] as const,
  levels: () => [...educationQueryKeys.all, "levels"] as const,
  stages: (educationLevelId?: number) =>
    [...educationQueryKeys.all, "stages", educationLevelId ?? "all"] as const,
  subjects: (filters?: SubjectListParams) =>
    [
      ...educationQueryKeys.all,
      "subjects",
      filters?.stage ?? "all-stage",
      filters?.education_level ?? "all-level",
      typeof filters?.is_active === "boolean"
        ? filters.is_active
        : "all-active",
    ] as const,
};

export function useEducationLevels(
  enabled = true,
): UseQueryResult<EducationLevel[]> {
  return useQuery({
    queryKey: educationQueryKeys.levels(),
    queryFn: ({ signal }) => listEducationLevels({ signal }),
    enabled,
  });
}

export function useEducationStages(
  params?: StageListParams,
  enabled = true,
): UseQueryResult<EducationStage[]> {
  return useQuery({
    queryKey: educationQueryKeys.stages(params?.education_level),
    queryFn: ({ signal }) => listEducationStages(params, { signal }),
    enabled,
  });
}

export function useEducationSubjects(
  filters?: SubjectListParams,
  enabled = true,
): UseQueryResult<EducationSubject[]> {
  return useQuery({
    queryKey: educationQueryKeys.subjects(filters),
    queryFn: ({ signal }) => listEducationSubjects(filters, { signal }),
    enabled,
  });
}

export function useCreateEducationLevel(): UseMutationResult<
  EducationLevel,
  Error,
  MutationWithSignal<CreateEducationLevelRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      createEducationLevel(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.levels() });
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.stages() });
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}

export function useUpdateEducationLevel(): UseMutationResult<
  EducationLevel,
  Error,
  MutationWithSignal<{ id: number; payload: UpdateEducationLevelRequest }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, payload }) =>
      updateEducationLevel(id, payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.levels() });
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.stages() });
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}

export function useDeleteEducationLevel(): UseMutationResult<
  void,
  Error,
  MutationWithSignal<{ id: number }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id }) => deleteEducationLevel(id, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.levels() });
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.stages() });
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}

export function useCreateEducationStage(): UseMutationResult<
  EducationStage,
  Error,
  MutationWithSignal<CreateEducationStageRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      createEducationStage(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.stages() });
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}

export function useUpdateEducationStage(): UseMutationResult<
  EducationStage,
  Error,
  MutationWithSignal<{ id: number; payload: UpdateEducationStageRequest }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, payload }) =>
      updateEducationStage(id, payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.stages() });
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}

export function useDeleteEducationStage(): UseMutationResult<
  void,
  Error,
  MutationWithSignal<{ id: number }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id }) => deleteEducationStage(id, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: educationQueryKeys.stages() });
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}

export function useCreateEducationSubject(): UseMutationResult<
  EducationSubject,
  Error,
  MutationWithSignal<CreateEducationSubjectRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      createEducationSubject(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}

export function useUpdateEducationSubject(): UseMutationResult<
  EducationSubject,
  Error,
  MutationWithSignal<{ id: number; payload: UpdateEducationSubjectRequest }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id, payload }) =>
      updateEducationSubject(id, payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}

export function useDeleteEducationSubject(): UseMutationResult<
  void,
  Error,
  MutationWithSignal<{ id: number }>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, id }) => deleteEducationSubject(id, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: educationQueryKeys.subjects(),
      });
    },
  });
}
