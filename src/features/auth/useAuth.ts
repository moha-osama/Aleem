import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { tokenStorage, type ApiClientError } from "@/api/client";
import { authQueryKeys, useLogout, useMe } from "./auth.hooks";
import type { UserRole } from "./auth.types";

interface UseAuthResult {
  user: ReturnType<typeof useMe>["data"];
  role: UserRole | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  isLogoutPending: boolean;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthResult {
  const queryClient = useQueryClient();
  const accessToken = tokenStorage.getAccessToken();
  const meQuery = useMe(Boolean(accessToken));
  const logoutMutation = useLogout();

  const isAuthenticated = Boolean(accessToken && meQuery.data);
  const role = meQuery.data?.role ?? null;

  const logout = useCallback(async () => {
    const refreshToken = tokenStorage.getRefreshToken();

    if (refreshToken) {
      try {
        await logoutMutation.mutateAsync({ refresh: refreshToken });
      } catch {
        tokenStorage.clearTokens();
        queryClient.removeQueries({ queryKey: authQueryKeys.all });
      }
    } else {
      tokenStorage.clearTokens();
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    }
  }, [logoutMutation, queryClient]);

  return useMemo(
    () => ({
      user: meQuery.data,
      role,
      isAuthenticated,
      isCheckingAuth: meQuery.isLoading,
      isLogoutPending: logoutMutation.isPending,
      logout,
    }),
    [
      isAuthenticated,
      logout,
      logoutMutation.isPending,
      meQuery.data,
      meQuery.isLoading,
      role,
    ],
  );
}

export function toApiErrorMessage(error: unknown): string {
  const fallbackMessage = "حدث خطأ غير متوقع. حاول مرة أخرى.";

  if (!error) {
    return fallbackMessage;
  }

  if (typeof error === "string") {
    return error;
  }

  const apiError = error as ApiClientError;

  if (apiError.payload) {
    const { detail, ...rest } = apiError.payload;

    if (typeof detail === "string" && detail.length > 0) {
      return detail;
    }

    // Handle field errors like { non_field_errors: ["msg"], username: ["msg"] }
    for (const value of Object.values(rest)) {
      if (typeof value === "string" && value.length > 0) {
        return value;
      }
      if (
        Array.isArray(value) &&
        typeof value[0] === "string" &&
        value[0].length > 0
      ) {
        return value[0];
      }
    }
  }

  if (typeof apiError.message === "string" && apiError.message.length > 0) {
    return apiError.message;
  }

  return fallbackMessage;
}
