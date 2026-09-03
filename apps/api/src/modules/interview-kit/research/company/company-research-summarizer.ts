import type {
  ClassifiedCompanyResearchPage,
  CompanyResearchResult,
} from "./company-research.types";

const MAX_PAGES_PER_CATEGORY = 2;
const MAX_TOTAL_TEXT_LENGTH = 30_000;

const IMPORTANT_CATEGORIES = [
  "about",
  "careers",
  "hiring",
  "engineering",
  "culture",
] as const;

export interface CompanyResearchSummary {
  company_name: string;
  what_they_do: string;
  summary: string;
  pages: ClassifiedCompanyResearchPage[];
  pages_used: string[];
  unavailable_categories: string[];
}

export function summarizeCompanyResearch(
  result: CompanyResearchResult,
): CompanyResearchSummary {
  const selectedPages: ClassifiedCompanyResearchPage[] = [];

  for (const category of IMPORTANT_CATEGORIES) {
    const categoryPages = result.pages
      .filter((page) => page.category === category)
      .slice(0, MAX_PAGES_PER_CATEGORY);

    selectedPages.push(...categoryPages);
  }

  const pages: ClassifiedCompanyResearchPage[] = [];
  let totalTextLength = 0;

  for (const page of selectedPages) {
    if (totalTextLength + page.text.length > MAX_TOTAL_TEXT_LENGTH) {
      break;
    }

    pages.push(page);
    totalTextLength += page.text.length;
  }

  const availableCategories = new Set(
    pages.map((page) => page.category),
  );

  const unavailableCategories = IMPORTANT_CATEGORIES.filter(
    (category) => !availableCategories.has(category),
  );

  const aboutPages = pages.filter(
    (page) => page.category === "about",
  );

  const companyName =
    extractCompanyName(aboutPages) ||
    extractCompanyName(pages) ||
    new URL(result.companyUrl).hostname;

  const whatTheyDo =
    aboutPages[0]?.text ||
    pages[0]?.text ||
    "Company information was not available.";

  const summary =
    pages.length > 0
      ? pages
          .slice(0, 3)
          .map((page) => page.text)
          .join(" ")
          .slice(0, 5_000)
      : "No company research content was available.";

  return {
    company_name: companyName,
    what_they_do: whatTheyDo.slice(0, 3_000),
    summary,
    pages,
    pages_used: pages.map((page) => page.url),
    unavailable_categories: unavailableCategories,
  };
}

function extractCompanyName(
  pages: ClassifiedCompanyResearchPage[],
): string | null {
  for (const page of pages) {
    if (page.title.trim()) {
      const title = page.title
        .replace(/\s+/g, " ")
        .trim();

      if (title.length >= 2 && title.length <= 150) {
        return title
          .split("|")[0]
          .split("-")[0]
          .trim();
      }
    }
  }

  return null;
}