export interface School {
  id: number;
  name: string;
  gouvernement?: string;
}

export interface AssignSchoolResponse {
  detail: string;
}

export interface AssignSchoolMutationVars {
  childId: number;
  school_id: number;
}

export interface UpdateChildProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  stage_id?: number;
  education_year?: string;
  date_of_birth?: string;
}

export interface UpdateChildProfileMutationVars extends UpdateChildProfileRequest {
  childId: number;
}

export interface UpdateChildProfileResponse {
  detail: string;
}

export interface ParentChild {
  user_id: number;
  username: string;
  full_name: string;
  stage: string;
  education_level: string;
  education_year: string;
}

export interface LinkParentChildRequest {
  username: string;
}

export interface LinkParentChildResponse {
  detail: string;
  student_id: number;
}
