import { PublicInterviewSearchService } from "./public-interview-search.service";
import type { InterviewProcessResearchResult } from "./interview-process-research.types";

export class InterviewProcessResearchService {
  private readonly publicInterviewSearchService =
    new PublicInterviewSearchService();

  async research(
    companyName: string,
    role: string,
  ): Promise<InterviewProcessResearchResult> {
    try {
      const searchResults = await this.publicInterviewSearchService.search(
        companyName,
        role,
      );

      if (searchResults.length === 0) {
        return {
          companyName,
          sources: [],
          unavailable: true,
          failureReason: `No public interview-process sources were found for ${companyName} (${role}).`,
        };
      }

      return {
        companyName,
        sources: searchResults.map((result) => ({
          url: result.url,
          title: result.title,
          text: result.snippet,
        })),
        unavailable: false,
        failureReason: null,
      };
    } catch (error) {
      return {
        companyName,
        sources: [],
        unavailable: true,
        failureReason:
          error instanceof Error
            ? error.message
            : "Public interview-process research failed.",
      };
    }
  }
}
