export interface ExamQuestionRef {
  id?: number;
  eq_id?: number;
  exam_question_id?: number;
  question_id?: number;
  question_text?: string;
  text?: string;
  order?: number;
  [key: string]: unknown;
}

export interface Exam {
  id: number;
  title?: string;
  name?: string;
  duration_minutes?: number;
  subject_id?: number | null;
  subject?: number | string | null;
  stage_id?: number | null;
  stage?: number | string | null;
  difficulty_level_id?: number | null;
  difficulty_level?: number | string | null;
  education_year?: string | null;
  is_active?: boolean;
  questions?: ExamQuestionRef[];
  [key: string]: unknown;
}

export interface ExamFilters {
  subject?: number;
  stage?: number;
  difficulty_level?: number;
  education_year?: string;
  is_active?: boolean;
}

export interface CreateExamRequest {
  title: string;
  subject_id?: number;
  stage_id?: number;
  difficulty_level_id?: number;
  education_year?: string;
  duration_minutes?: number;
  is_active?: boolean;
  questions?: Array<{
    question_id: number;
    order: number;
  }>;
}

export interface UpdateExamRequest {
  title: string;
  subject_id?: number;
  stage_id?: number;
  difficulty_level_id?: number;
  education_year?: string;
  duration_minutes?: number;
  is_active?: boolean;
  questions?: Array<{
    question_id: number;
    order: number;
  }>;
}

export interface AddExamQuestionsRequest {
  questions: Array<{
    question_id: number;
    order: number;
  }>;
}

export interface AddExamQuestionsResponse {
  created_ids?: number[];
  [key: string]: unknown;
}

export interface DifficultyLevel {
  id: number;
  level?: string;
  description?: string;
  subject_id?: number | null;
  name?: string;
  label?: string;
  subject?: number | string | null;
  [key: string]: unknown;
}

export interface DifficultyLevelFilters {
  subject?: number;
}

export interface CreateDifficultyLevelRequest {
  level: string;
  description?: string;
  subject_id?: number;
}

export interface UpdateDifficultyLevelRequest {
  level: string;
  description?: string;
  subject_id?: number;
}
