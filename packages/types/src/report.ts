export interface Report {
  id: string;

  interviewId: string;

  overallScore: number;

  strengths: string[];

  weaknesses: string[];

  recommendations: string[];
}