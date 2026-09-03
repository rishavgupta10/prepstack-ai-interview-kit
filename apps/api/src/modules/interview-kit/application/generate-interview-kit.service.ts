import { ExtractJdRequirementsService } from "./extract-jd-requirements.service";
import { GenerateInterviewQuestionsService } from "./generate-interview-questions.service";
import { GenerateMissingInterviewQuestionsService } from "./generate-missing-interview-questions.service";
import { GenerateInterviewFlashcardsService } from "./generate-interview-flashcards.service";
import { CheckInterviewCoverageService } from "./check-interview-coverage.service";
import { CreateInterviewScheduleService } from "./create-interview-schedule.service";
import { CompanyResearchService } from "../research/company/company-research.service";
import type { InterviewKit } from "../domain/types";

export class GenerateInterviewKitService {
  private readonly extractJdRequirementsService: ExtractJdRequirementsService;
  private readonly generateQuestionsService: GenerateInterviewQuestionsService;
  private readonly generateMissingQuestionsService: GenerateMissingInterviewQuestionsService;
  private readonly generateFlashcardsService: GenerateInterviewFlashcardsService;
  private readonly coverageService: CheckInterviewCoverageService;
  private readonly scheduleService: CreateInterviewScheduleService;
  private readonly companyResearchService: CompanyResearchService;

  constructor() {
    this.extractJdRequirementsService = new ExtractJdRequirementsService();

    this.generateQuestionsService = new GenerateInterviewQuestionsService();

    this.generateMissingQuestionsService =
      new GenerateMissingInterviewQuestionsService();

    this.generateFlashcardsService = new GenerateInterviewFlashcardsService();

    this.coverageService = new CheckInterviewCoverageService();

    this.scheduleService = new CreateInterviewScheduleService();

    this.companyResearchService = new CompanyResearchService();
  }

  async execute(
    jd: string,
    companyUrl: string,
    days: number,
  ): Promise<InterviewKit> {
    const startedAt = Date.now();

    console.log("\n=== Interview Kit Generation ===");

    // 1. Extract requirements from JD
    const role = await this.extractJdRequirementsService.execute(jd);
    // console.log(`[Timing] JD extraction: ${Date.now() - startedAt}ms`);

    // 2. Crawl and classify company website
    const companyResearch =
      await this.companyResearchService.research(companyUrl);
    // console.log(`[Timing] Company research: ${Date.now() - startedAt}ms`);

    // 3. Create deterministic company brief
    const companyBrief =
      await this.companyResearchService.getSummaryFromResult(companyResearch);
    // console.log(`[Timing] Company brief: ${Date.now() - startedAt}ms`);

    // 4. Research public interview process
    const interviewProcess =
      await this.companyResearchService.getInterviewProcessResearch(
        companyBrief.company_name,
        role.title,
      );
    // console.log(`[Timing] Interview Process: ${Date.now() - startedAt}ms`);

    // 5. Generate initial questions
    let questions = await this.generateQuestionsService.execute(
      role,
      {
        summary: companyBrief.summary,
        what_they_do: companyBrief.what_they_do,
        sources: companyBrief.pages_used,
      },
      interviewProcess.sources,
    );
    // console.log(
    //   `[Timing] generate Intitial questions: ${Date.now() - startedAt}ms`,
    // );

    // 6. First coverage check
    const firstCoverage = this.coverageService.execute(role, questions);

    // 7. Second pass for uncovered requirements
    if (firstCoverage.uncovered_requirement_ids.length > 0) {
      const missingQuestions =
        await this.generateMissingQuestionsService.execute(
          role,
          {
            summary: companyBrief.summary,
            what_they_do: companyBrief.what_they_do,
            sources: companyBrief.pages_used,
          },
          interviewProcess.sources,
          firstCoverage.uncovered_requirement_ids,
          questions,
        );

      questions = [...questions, ...missingQuestions];
    }

    // 8. Final coverage check
    const finalCoverage = this.coverageService.execute(role, questions);

    if (finalCoverage.uncovered_requirement_ids.length > 0) {
      throw new Error(
        `Interview kit coverage incomplete after second pass. Uncovered requirements: ${finalCoverage.uncovered_requirement_ids.join(", ")}`,
      );
    }

    const coverage = {
      uncovered_requirement_ids: finalCoverage.uncovered_requirement_ids,
      passes: firstCoverage.uncovered_requirement_ids.length > 0 ? 2 : 1,
    };
    // console.log(`[Timing] Missing questions: ${Date.now() - startedAt}ms`);

    // 9. Generate flashcards
    const flashcards = await this.generateFlashcardsService.execute(
      role,
      questions,
    );
    // console.log(`[Timing] Flashcards: ${Date.now() - startedAt}ms`);

    // 10. Create deterministic schedule
    const schedule = this.scheduleService.execute(role, questions, days);

    console.log(`[Timing] TOTAL: ${Date.now() - startedAt}ms`);

    console.log("=== Interview Kit Generation Complete ===\n");

    // 11. Build final kit
    return {
      source: {
        company_name: companyBrief.company_name,
        company_url: companyUrl,
        role: role.title,
        location: "Not specified",
        jd_chars: jd.length,
        researched_at: new Date().toISOString(),
        pages_used: companyBrief.pages_used,
      },

      company_brief: {
        summary: companyBrief.summary,
        what_they_do: companyBrief.what_they_do,
        sources: companyBrief.pages_used,
      },

      role,

      questions,

      flashcards,

      schedule,

      coverage,
    };
  }
}
