export interface Report {
  overallScore: number;

  technicalScore: number;

  communicationScore: number;

  strengths: string[];

  improvements: string[];

  missedConcepts: string[];

  finalFeedback: string;
}
