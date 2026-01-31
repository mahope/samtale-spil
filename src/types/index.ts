export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  questions: Question[];
}

export interface Question {
  id: string;
  categoryId: string;
  text: string;
  depth: "let" | "medium" | "dyb";
}

export interface GameState {
  selectedCategory: Category | null;
  currentQuestionIndex: number;
  askedQuestions: string[];
}
