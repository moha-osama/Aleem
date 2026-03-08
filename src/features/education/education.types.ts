export interface EducationLevel {
  id: number;
  name: string;
  order: number;
}

export interface CreateEducationLevelRequest {
  name: string;
  order: number;
}

export interface UpdateEducationLevelRequest {
  name: string;
  order: number;
}

export interface EducationStage {
  id: number;
  name: string;
  order: number;
  education_level_id: number;
  education_level_name?: string;
  school_name?: string;
  subjects_count?: number;
}

export interface StageListParams {
  education_level?: number;
}

export interface CreateEducationStageRequest {
  name: string;
  order: number;
  education_level_id: number;
}

export interface UpdateEducationStageRequest {
  name: string;
  order: number;
  education_level_id: number;
}

export interface EducationSubject {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  stage_id: number;
}

export interface SubjectListParams {
  stage?: number;
  education_level?: number;
  is_active?: boolean;
}

export interface CreateEducationSubjectRequest {
  name: string;
  description: string;
  is_active: boolean;
  stage_id: number;
}

export interface UpdateEducationSubjectRequest {
  name: string;
  description: string;
  is_active: boolean;
  stage_id: number;
}
