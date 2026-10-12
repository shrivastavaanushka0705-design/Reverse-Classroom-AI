export type Role = "STUDENT" | "TEACHER";
export interface User { name: string; role: Role }
export interface AuthInput { name?: string; email: string; password: string; role: Role }
export interface Question { concept: string; q: string; options: string[]; answer: number }

export type Page = "overview" | "quiz" | "lecture" | "insights";
export type LessonId = "recursion" | "stack" | "dbms";
export type IconName = "home" | "book" | "wave" | "chart" | "bell" | "arrow" | "spark" | "clock" | "play" | "check" | "lock" | "flame" | "target" | "chevron";

export interface QuizQuestion {
  topic: string;
  prompt: string;
  options: string[];
  answer: number;
  chapter: string;
}

export interface Lesson {
  id: LessonId;
  title: string;
  course: string;
  description: string;
  duration: string;
  symbol: string;
  concepts: string[];
  transcript: string[];
  questions: QuizQuestion[];
}
