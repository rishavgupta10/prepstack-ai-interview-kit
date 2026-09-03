export type RequirementKind = "technical" | "behavioural" | "domain";

export type RequirementPriority = "must" | "nice";

export interface InterviewRequirement {
  id: string;
  text: string;
  kind: RequirementKind;
  priority: RequirementPriority;
}

export type QuestionCategory =
  | "technical"
  | "behavioural"
  | "system design"
  | "company fit";

export type QuestionDifficulty = 1 | 2 | 3;

export interface InterviewQuestion {
  id: string;
  requirement_ids: string[];
  category: QuestionCategory;
  prompt: string;
  answer_outline: string;
  difficulty: QuestionDifficulty;
}

export interface InterviewFlashcard {
  id: string;
  front: string;
  back: string;
  requirement_ids: string[];
}

export interface ScheduleDay {
  day: number;
  focus: string;
  question_ids: string[];
  minutes: number;
}

export interface InterviewSchedule {
  days_available: number;
  days: ScheduleDay[];
}

export interface CompanyBrief {
  summary: string;
  what_they_do: string;
  sources: string[];
}

export interface InterviewKitSource {
  company_name: string;
  company_url: string;
  role: string;
  location: string;
  jd_chars: number;
  researched_at: string;
  pages_used: string[];
}

export interface InterviewRole {
  title: string;
  seniority: string;
  responsibilities: string[];
  requirements: InterviewRequirement[];
}

export interface InterviewCoverage {
  uncovered_requirement_ids: string[];
  passes: number;
}

export interface InterviewKit {
  _id: string;
  userId: string;
  source: InterviewKitSource;
  company_brief: CompanyBrief;
  role: InterviewRole;
  questions: InterviewQuestion[];
  flashcards: InterviewFlashcard[];
  schedule: InterviewSchedule;
  coverage: InterviewCoverage;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInterviewKitInput {
  jd: string;
  company_url: string;
  days: number;
}

export interface UpdateInterviewKitInput {
  questions?: InterviewQuestion[];
  flashcards?: InterviewFlashcard[];
}
