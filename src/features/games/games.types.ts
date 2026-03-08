export interface Game {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  is_active?: boolean;
  [key: string]: unknown;
}

export interface CreateGameRequest {
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface UpdateGameRequest {
  name: string;
  description?: string;
  is_active?: boolean;
}

export interface GameQuestionChoice {
  id?: number;
  text: string;
  is_correct: boolean;
  [key: string]: unknown;
}

export interface GameQuestion {
  id: number;
  text?: string;
  question_text?: string;
  points?: number;
  difficulty_level_id?: number | null;
  difficulty_level?: number | string | null;
  question_type?: string;
  is_active?: boolean;
  game_id?: number | null;
  game?: number | { id?: number; name?: string; title?: string } | null;
  subject_id?: number | null;
  subject?: number | string | null;
  choices?: GameQuestionChoice[];
  [key: string]: unknown;
}

export interface GameQuestionsFilters {
  subject?: number;
  difficulty_level?: number;
  game?: number;
  question_type?: string;
  is_active?: boolean;
}

export interface CreateGameQuestionRequest {
  text: string;
  question_type: string;
  points?: number;
  game_id: number;
  subject_id?: number;
  difficulty_level_id: number;
  is_active: boolean;
  choices?: Array<{
    text: string;
    is_correct: boolean;
  }>;
}

export interface UpdateGameQuestionRequest {
  text: string;
  question_type: string;
  points?: number;
  game_id: number;
  subject_id?: number;
  difficulty_level_id: number;
  is_active: boolean;
  choices?: Array<{
    text: string;
    is_correct: boolean;
  }>;
}
