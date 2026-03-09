import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { MutationWithSignal } from "@/api/types";
import {
  assignSchoolToChild,
  getParentChildren,
  getSchools,
  linkParentChild,
  updateChildProfile,
} from "./parents.api";
import type {
  AssignSchoolMutationVars,
  AssignSchoolResponse,
  LinkParentChildRequest,
  LinkParentChildResponse,
  ParentChild,
  School,
  UpdateChildProfileMutationVars,
  UpdateChildProfileResponse,
} from "./parents.types";

export const parentQueryKeys = {
  all: ["parents"] as const,
  children: () => [...parentQueryKeys.all, "children"] as const,
  schools: () => [...parentQueryKeys.all, "schools"] as const,
};

export function useParentChildren(
  enabled = true,
): UseQueryResult<ParentChild[]> {
  return useQuery({
    queryKey: parentQueryKeys.children(),
    queryFn: ({ signal }) => getParentChildren({ signal }),
    enabled,
  });
}

export function useSchools(enabled = true): UseQueryResult<School[]> {
  return useQuery({
    queryKey: parentQueryKeys.schools(),
    queryFn: ({ signal }) => getSchools({ signal }),
    enabled,
  });
}

export function useLinkParentChild(): UseMutationResult<
  LinkParentChildResponse,
  Error,
  MutationWithSignal<LinkParentChildRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      linkParentChild(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: parentQueryKeys.children() });
    },
  });
}

export function useAssignSchoolToChild(): UseMutationResult<
  AssignSchoolResponse,
  Error,
  AssignSchoolMutationVars
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vars) => assignSchoolToChild(vars),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: parentQueryKeys.children() });
    },
  });
}

export function useUpdateChildProfile(): UseMutationResult<
  UpdateChildProfileResponse,
  Error,
  UpdateChildProfileMutationVars
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ childId, ...payload }) =>
      updateChildProfile(childId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: parentQueryKeys.children() });
    },
  });
}
