import type { InterviewKit } from "./types";

export interface CreateInterviewKitInput {
  jd: string;
  company_url: string;
  days: number;
}


// =========batch evaluator input types=========
export interface BatchInterviewKitInput extends CreateInterviewKitInput {
  id: string;
}

// ======== evaluator output types=========
export type BatchKitStatus = 'ok' | 'failed';

// ============Batch kit error types ==========
export interface BatchKitError {
  code: string;
  message: string;
}

// ================ batch kit result types ==========
export interface BatchKitResult {
  id: string;
  status: BatchKitStatus;
  kit: InterviewKit | null;
  error: BatchKitError | null;
}


// ==============complete batch output types==============
export interface BatchInterviewKitOutput {
  version: '1.0';
  generated_at: string;
  kits: BatchKitResult[];
}

