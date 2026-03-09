export type UserRole = "school_admin" | "teacher" | "parent" | "student";
export type SchoolUserRoleFilter = Exclude<UserRole, "school_admin">;

export interface ApiDetailResponse {
  detail: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  role: UserRole;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface LogoutRequest {
  refresh: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
}

export interface UpdateMeRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface RegisterStudentRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  stage_id: number;
  education_year: string;
  date_of_birth?: string;
}

export interface RegisterTeacherRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  subject_ids: number[];
}

export interface RegisterAccountResponse {
  detail: string;
  user_id: number;
  username: string;
}

export interface RegisterSchoolRequest {
  school_name: string;
  school_address: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface RegisterSchoolResponse {
  detail: string;
  school: {
    id: number;
    name: string;
    code: string;
    is_active: boolean;
  };
  admin_user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

export interface RegisterParentRequest {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface SchoolUserSummary {
  id: number;
  username: string;
  role: SchoolUserRoleFilter;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type SchoolUsersApiResponse =
  | SchoolUserSummary[]
  | PaginatedResponse<SchoolUserSummary>;

export interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface SchoolUsersResult {
  items: SchoolUserSummary[];
  pagination: PaginationMeta | null;
}

export interface DeactivateSchoolUserParams {
  userId: number;
}

export function displayName(user: SchoolUserSummary): string {
  const fullName = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  return fullName || user.username;
}
