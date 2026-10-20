export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  questions: Question[];
}

/** What the card asks you to do; plain questions are the default */
export type CardType = "spoergsmaal" | "opgave" | "peg" | "jeg-har-aldrig";

export interface Question {
  id: string;
  categoryId: string;
  text: string;
  depth: "let" | "medium" | "dyb";
  type?: CardType;
}

export interface GameState {
  selectedCategory: Category | null;
  currentQuestionIndex: number;
  askedQuestions: string[];
}
