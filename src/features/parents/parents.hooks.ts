import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { MutationWithSignal } from "@/api/types";
import { getParentChildren, linkParentChild } from "./parents.api";
import type {
  LinkParentChildRequest,
  LinkParentChildResponse,
  ParentChild,
} from "./parents.types";

export const parentQueryKeys = {
  all: ["parents"] as const,
  children: () => [...parentQueryKeys.all, "children"] as const,
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
