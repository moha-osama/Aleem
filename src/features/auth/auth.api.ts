import { apiClient } from "@/api/client";
import { parseWithSchema } from "@/api/parseWithSchema";
import type { RequestOptions } from "@/api/types";
import {
  apiDetailResponseSchema,
  authUserSchema,
  loginResponseSchema,
  paginatedSchoolUsersSchema,
  refreshTokenResponseSchema,
  registerAccountResponseSchema,
  schoolUsersArraySchema,
} from "./auth.schemas";
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
  RegisterStudentRequest,
  RegisterTeacherRequest,
  SchoolUserRoleFilter,
  SchoolUsersResult,
  UpdateMeRequest,
} from "./auth.types";

export async function login(
  payload: LoginRequest,
  options?: RequestOptions,
): Promise<LoginResponse> {
  const response = await apiClient.post("/api/auth/login/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(loginResponseSchema, response.data);
}

export async function refreshToken(
  payload: RefreshTokenRequest,
  options?: RequestOptions,
): Promise<RefreshTokenResponse> {
  const response = await apiClient.post("/api/auth/token/refresh/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(refreshTokenResponseSchema, response.data);
}

export async function logout(
  payload: LogoutRequest,
  options?: RequestOptions,
): Promise<ApiDetailResponse> {
  const response = await apiClient.post("/api/auth/logout/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(apiDetailResponseSchema, response.data);
}

export async function getMe(options?: RequestOptions): Promise<AuthUser> {
  const response = await apiClient.get("/api/auth/me/", {
    signal: options?.signal,
  });

  return parseWithSchema(authUserSchema, response.data);
}

export async function updateMe(
  payload: UpdateMeRequest,
  options?: RequestOptions,
): Promise<AuthUser> {
  const response = await apiClient.patch("/api/auth/me/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(authUserSchema, response.data);
}

export async function changePassword(
  payload: ChangePasswordRequest,
  options?: RequestOptions,
): Promise<ApiDetailResponse> {
  const response = await apiClient.post("/api/auth/change-password/", payload, {
    signal: options?.signal,
  });

  return parseWithSchema(apiDetailResponseSchema, response.data);
}

export async function registerStudent(
  payload: RegisterStudentRequest,
  options?: RequestOptions,
): Promise<RegisterAccountResponse> {
  const response = await apiClient.post(
    "/api/auth/register/student/",
    payload,
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(registerAccountResponseSchema, response.data);
}

export async function registerTeacher(
  payload: RegisterTeacherRequest,
  options?: RequestOptions,
): Promise<RegisterAccountResponse> {
  const response = await apiClient.post(
    "/api/auth/register/teacher/",
    payload,
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(registerAccountResponseSchema, response.data);
}

export async function getSchoolUsers(
  role?: SchoolUserRoleFilter,
  options?: RequestOptions,
): Promise<SchoolUsersResult> {
  const response = await apiClient.get("/api/auth/school/users/", {
    signal: options?.signal,
    params: role ? { role } : undefined,
  });

  const rawData = response.data as unknown;

  if (Array.isArray(rawData)) {
    const items = parseWithSchema(schoolUsersArraySchema, rawData);
    return { items, pagination: null };
  }

  const paginated = parseWithSchema(paginatedSchoolUsersSchema, rawData);
  return {
    items: paginated.results,
    pagination: {
      count: paginated.count,
      next: paginated.next,
      previous: paginated.previous,
    },
  };
}

export async function deactivateSchoolUser(
  params: DeactivateSchoolUserParams,
  options?: RequestOptions,
): Promise<ApiDetailResponse> {
  const response = await apiClient.post(
    `/api/auth/school/users/${params.userId}/deactivate/`,
    undefined,
    {
      signal: options?.signal,
    },
  );

  return parseWithSchema(apiDetailResponseSchema, response.data);
}
