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
