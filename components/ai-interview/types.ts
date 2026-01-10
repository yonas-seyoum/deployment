export interface Message {
  id: string;
  text: string;
  variant: "user" | "ai";
  timestamp: string;
}

export interface QuestionCategory {
  id: string;
  name: string;
  type: "technical" | "behavioral" | "ethical" | "situational";
  completed: boolean;
}

export interface InterviewResults {
  score: number;
  strengths: string[];
  weakAreas: string[];
  suggestions: string[];
}

