export type RequirementKind = "technical" | "behavioural" | "domain";

export type RequirementPriority = "must" | "nice";

export interface InterviewRequirement {
  id: string;
  text: string;
  kind: RequirementKind;
  priority: RequirementPriority;
}

// ==========questions Types ==========
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

// ===========flash card Types ==========
export interface InterviewFlashcard {
  id: string;
  front: string;
  back: string;
  requirement_ids: string[];
}

//===============Schedule Types ==============
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

// ===============company breif Types ==============
export interface CompanyBrief {
  summary: string;
  what_they_do: string;
  sources: string[];
}


// =============source types==========
 export interface InterviewKitSource {
  company_name: string;
  company_url: string;
  role: string;
  location: string;
  jd_chars: number;
  researched_at: string;
  pages_used: string[];
}

// =====================interview kit role types ==============
export interface InterviewRole {
  title: string;
  seniority: string;
  responsibilities: string[];
  requirements: InterviewRequirement[];
}

// =====================interview kit coverage types ==============
export interface InterviewCoverage {
  uncovered_requirement_ids: string[];
  passes: number;
}


// =================interviewkit types==============

export interface InterviewKit {
  source: InterviewKitSource;
  company_brief: CompanyBrief;
  role: InterviewRole;
  questions: InterviewQuestion[];
  flashcards: InterviewFlashcard[];
  schedule: InterviewSchedule;
  coverage: InterviewCoverage;
}