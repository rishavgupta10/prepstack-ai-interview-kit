export enum InterviewMode {
  TECHNICAL = "technical",
  HR = "hr",
  CLIENT_CALL = "client-call",
  PROJECT_CLOSING = "project-closing",
  COMMUNICATION = "communication",
}

export interface Interview {
  id: string;

  userId: string;

  mode: InterviewMode;

  role: string;

  status: "active" | "completed";

  startedAt: Date;

  endedAt?: Date;
}