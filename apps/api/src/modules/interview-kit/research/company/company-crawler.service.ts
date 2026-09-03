import type {
  CompanyResearchPage,
  CompanyResearchFailure,
  CompanyResearchResult,
  CompanyCrawlResult,
} from "./company-research.types";
import { CompanyPageFetcherService } from "./company-page-fetcher.service";
import { extractCompanyLinks } from "./company-link-extractor";
import { RobotsCheckerService } from "./robots-checker.service";
import { CompanyPageCleanerService } from "./company-page-cleaner.service";
import { rankCompanyLinks } from "./company-link-ranker";
import { CrawlRateLimiter } from "./crawl-rate-limiter";
import { validateCompanyUrl } from "./url-security";

const MAX_PAGES = 6;

function isSameDomain(candidateUrl: string, startUrl: string): boolean {
  try {
    const candidate = new URL(candidateUrl);
    const start = new URL(startUrl);

    return candidate.hostname === start.hostname;
  } catch {
    return false;
  }
}

export class CompanyCrawlerService {
  private readonly pageFetcher: CompanyPageFetcherService;
  private readonly robotsChecker: RobotsCheckerService;
  private readonly pageCleaner: CompanyPageCleanerService;
  private readonly rateLimiter: CrawlRateLimiter;

  constructor() {
    this.pageFetcher = new CompanyPageFetcherService();
    this.robotsChecker = new RobotsCheckerService();
    this.pageCleaner = new CompanyPageCleanerService();
    this.rateLimiter = new CrawlRateLimiter();
  }

  async crawl(startUrl: string): Promise<CompanyCrawlResult> {
    await validateCompanyUrl(startUrl);
    const visited = new Set<string>();
    const pages: CompanyResearchPage[] = [];
    const failures: CompanyResearchFailure[] = [];

    const queue = [startUrl];

    while (queue.length > 0 && pages.length < MAX_PAGES) {
      const currentUrl = queue.shift();

      if (!currentUrl || visited.has(currentUrl)) {
        continue;
      }

      visited.add(currentUrl);

      try {
        const allowed = await this.robotsChecker.isAllowed(currentUrl);

        if (!allowed) {
          failures.push({
            url: currentUrl,
            reason: "Crawling disallowed by robots.txt.",
          });

          continue;
        }

        await this.rateLimiter.wait();

        const page = await this.pageFetcher.fetch(currentUrl);

        const cleanedPage = this.pageCleaner.clean(page.url, page.html);

        pages.push(cleanedPage);
        const discoveredLinks = extractCompanyLinks(page.html, page.url);

        const sameDomainLinks = discoveredLinks.filter((link) =>
          isSameDomain(link.url, startUrl),
        );

        const rankedLinks = rankCompanyLinks(sameDomainLinks, startUrl);

        for (const link of rankedLinks) {
          if (visited.has(link) || queue.includes(link)) {
            continue;
          }

          try {
            await validateCompanyUrl(link);
            queue.push(link);
          } catch (error) {
            failures.push({
              url: link,
              reason:
                error instanceof Error
                  ? error.message
                  : "Company URL validation failed.",
            });
          }
        }
      } catch (error) {
        const reason =
          error instanceof Error ? error.message : "Unknown crawling error.";

        failures.push({
          url: currentUrl,
          reason,
        });

        console.error(`Failed to crawl company page: ${currentUrl}`, error);
      }
    }

    return {
      companyUrl: startUrl,
      pages,
      failures,
    };
  }
}
