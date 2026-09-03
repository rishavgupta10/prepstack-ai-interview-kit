export type CompanyPageCategory =
  | "careers"
  | "hiring"
  | "about"
  | "engineering"
  | "culture"
  | "other";

export interface CompanyResearchPage {
  url: string;
  title: string;
  text: string;
}

export interface ClassifiedCompanyResearchPage extends CompanyResearchPage {
  category: CompanyPageCategory;
}

export interface CompanyResearchFailure {
  url: string;
  reason: string;
}

/**
 * Result produced by the crawler.
 * Pages are NOT classified yet.
 */
export interface CompanyCrawlResult {
  companyUrl: string;
  pages: CompanyResearchPage[];
  failures: CompanyResearchFailure[];
}

/**
 * Result produced after crawling + classification.
 */
export interface CompanyResearchResult {
  companyUrl: string;
  pages: ClassifiedCompanyResearchPage[];
  failures: CompanyResearchFailure[];
}
