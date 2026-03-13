import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { tokenStorage } from "@/api/client";
import type { MutationWithSignal } from "@/api/types";
import {
  changePassword,
  deactivateSchoolUser,
  getMe,
  getSchoolUser,
  getSchoolUsers,
  login,
  logout,
  refreshToken,
  registerParent,
  registerSchool,
  registerStudent,
  registerTeacher,
  updateSchoolUser,
  updateMe,
} from "./auth.api";
import type {
  ApiDetailResponse,
  AuthUser,
  ChangePasswordRequest,
  DeactivateSchoolUserParams,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterAccountResponse,
  RegisterParentRequest,
  RegisterSchoolRequest,
  RegisterSchoolResponse,
  RegisterStudentRequest,
  RegisterTeacherRequest,
  SchoolUserDetails,
  SchoolUserRoleFilter,
  SchoolUsersResult,
  UpdateSchoolUserParams,
  UpdateMeRequest,
} from "./auth.types";

export type SignupInput =
  | {
      accountType: "organization";
      payload: RegisterTeacherRequest;
    }
  | {
      accountType: "family";
      payload: RegisterStudentRequest;
    };

export const authQueryKeys = {
  all: ["auth"] as const,
  me: () => [...authQueryKeys.all, "me"] as const,
  schoolUsers: (role?: SchoolUserRoleFilter) =>
    [...authQueryKeys.all, "school-users", role ?? "all"] as const,
  schoolUser: (userId: number) =>
    [...authQueryKeys.all, "school-user", userId] as const,
};

export function useMe(enabled = true): UseQueryResult<AuthUser> {
  return useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: ({ signal }) => getMe({ signal }),
    enabled,
  });
}

export function useSchoolUsers(
  role?: SchoolUserRoleFilter,
  enabled = true,
): UseQueryResult<SchoolUsersResult> {
  return useQuery({
    queryKey: authQueryKeys.schoolUsers(role),
    queryFn: ({ signal }) => getSchoolUsers(role, { signal }),
    enabled,
  });
}

export function useSchoolUser(
  userId: number,
  enabled = true,
): UseQueryResult<SchoolUserDetails> {
  return useQuery({
    queryKey: authQueryKeys.schoolUser(userId),
    queryFn: ({ signal }) => getSchoolUser(userId, { signal }),
    enabled,
  });
}

export function useLogin(): UseMutationResult<
  LoginResponse,
  Error,
  MutationWithSignal<LoginRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }: MutationWithSignal<LoginRequest>) =>
      login(payload, { signal }),
    onSuccess: (data) => {
      tokenStorage.setTokens({ access: data.access, refresh: data.refresh });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.me() });
    },
  });
}

export function useRefreshToken(): UseMutationResult<
  RefreshTokenResponse,
  Error,
  MutationWithSignal<RefreshTokenRequest>
> {
  return useMutation({
    mutationFn: async ({ signal, ...payload }) => {
      const response = await refreshToken(payload, { signal });
      tokenStorage.setAccessToken(response.access);
      return response;
    },
  });
}

export function useLogout(): UseMutationResult<
  ApiDetailResponse,
  Error,
  MutationWithSignal<LogoutRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) => logout(payload, { signal }),
    onSuccess: () => {
      tokenStorage.clearTokens();
      queryClient.removeQueries({ queryKey: authQueryKeys.all });
    },
  });
}

export function useUpdateMe(): UseMutationResult<
  AuthUser,
  Error,
  MutationWithSignal<UpdateMeRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) => updateMe(payload, { signal }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(authQueryKeys.me(), updatedUser);
    },
  });
}

export function useChangePassword(): UseMutationResult<
  ApiDetailResponse,
  Error,
  MutationWithSignal<ChangePasswordRequest>
> {
  return useMutation({
    mutationFn: ({ signal, ...payload }) => changePassword(payload, { signal }),
  });
}

export function useRegisterSchool(): UseMutationResult<
  RegisterSchoolResponse,
  Error,
  MutationWithSignal<RegisterSchoolRequest>
> {
  return useMutation({
    mutationFn: ({ signal, ...payload }) => registerSchool(payload, { signal }),
  });
}

export function useRegisterParent(): UseMutationResult<
  RegisterAccountResponse,
  Error,
  MutationWithSignal<RegisterParentRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) => registerParent(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.schoolUsers(),
      });
    },
  });
}

export function useRegisterStudent(): UseMutationResult<
  RegisterAccountResponse,
  Error,
  MutationWithSignal<RegisterStudentRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      registerStudent(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.schoolUsers(),
      });
    },
  });
}

export function useRegisterTeacher(): UseMutationResult<
  RegisterAccountResponse,
  Error,
  MutationWithSignal<RegisterTeacherRequest>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      registerTeacher(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.schoolUsers(),
      });
    },
  });
}

export function useDeactivateSchoolUser(): UseMutationResult<
  ApiDetailResponse,
  Error,
  MutationWithSignal<DeactivateSchoolUserParams>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      deactivateSchoolUser(payload, { signal }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.schoolUsers(),
      });
    },
  });
}

export function useUpdateSchoolUser(): UseMutationResult<
  SchoolUserDetails,
  Error,
  MutationWithSignal<UpdateSchoolUserParams>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...payload }) =>
      updateSchoolUser(payload, { signal }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        authQueryKeys.schoolUser(updatedUser.id),
        updatedUser,
      );
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.schoolUsers(),
      });
    },
  });
}

export function useSignup(): UseMutationResult<
  RegisterAccountResponse,
  Error,
  MutationWithSignal<SignupInput>
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ signal, ...input }) => {
      if (input.accountType === "organization") {
        return registerTeacher(input.payload, { signal });
      }

      return registerStudent(input.payload, { signal });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.schoolUsers() });
    },
  });
}
