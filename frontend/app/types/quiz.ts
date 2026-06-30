export type QuizDifficulty = "Easy" | "Medium" | "Hard";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GeneratedQuiz {
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizConfig {
  title: string;
  documentName: string;
  difficulty: QuizDifficulty;
  questionCount: number;
  estimatedTime: number;
}

export interface QuizResult {
  score: number;
  correct: number;
  total: number;
  answers: number[];
  quiz: GeneratedQuiz;
}