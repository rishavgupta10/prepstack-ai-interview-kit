export interface InterviewProcessSource {
  url: string;
  title: string;
  text: string;
}

export interface InterviewProcessResearchResult {
  companyName: string;
  sources: InterviewProcessSource[];
  unavailable: boolean;
  failureReason: string | null;
}
