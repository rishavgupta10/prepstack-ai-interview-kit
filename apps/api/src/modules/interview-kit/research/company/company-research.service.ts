import { CompanyCrawlerService } from "./company-crawler.service";
import { classifyCompanyPage } from "./company-page-classifier";
import type { CompanyResearchResult } from "./company-research.types";
import { summarizeCompanyResearch } from "./company-research-summarizer";
import { InterviewProcessResearchService } from "../interview-process/interview-process-research.service";

export class CompanyResearchService {
  private readonly crawler: CompanyCrawlerService;
  private readonly interviewProcessResearchService: InterviewProcessResearchService;

  constructor() {
    this.crawler = new CompanyCrawlerService();
    this.interviewProcessResearchService =
      new InterviewProcessResearchService();
  }

  async research(companyUrl: string): Promise<CompanyResearchResult> {
    const result = await this.crawler.crawl(companyUrl);

    const pages = result.pages.map((page) => ({
      ...page,
      category: classifyCompanyPage(page),
    }));

    return {
      ...result,
      pages,
    };
  }

  async getSummary(companyUrl: string) {
    const result = await this.research(companyUrl);

    return summarizeCompanyResearch(result);
  }

  async getSummaryFromResult(result: CompanyResearchResult) {
    return summarizeCompanyResearch(result);
  }

  async getInterviewProcessResearch(companyName: string, role: string) {
    return this.interviewProcessResearchService.research(companyName, role);
  }
}
