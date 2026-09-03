import type {
  CompanyPageCategory,
  CompanyResearchPage,
} from "./company-research.types";

const CATEGORY_KEYWORDS: Record<
  Exclude<CompanyPageCategory, "other">,
  string[]
> = {
  careers: [
    "career",
    "careers",
    "join our team",
    "join us",
    "work with us",
    "work for us",
  ],
  hiring: [
    "job",
    "jobs",
    "hiring",
    "open position",
    "open positions",
    "vacancy",
    "vacancies",
  ],
  about: [
    "about",
    "about us",
    "our company",
    "who we are",
  ],
  engineering: [
    "engineering",
    "engineer",
    "technology",
    "tech stack",
    "developers",
    "development",
  ],
  culture: [
    "culture",
    "values",
    "life at",
    "our values",
    "workplace",
  ],
};

export function classifyCompanyPage(
  page: Omit<CompanyResearchPage, "category">,
): CompanyPageCategory {
  const searchableText =
    `${page.url} ${page.title} ${page.text}`
      .toLowerCase();

  const scores: Record<
    Exclude<CompanyPageCategory, "other">,
    number
  > = {
    careers: 0,
    hiring: 0,
    about: 0,
    engineering: 0,
    culture: 0,
  };

  for (const [category, keywords] of Object.entries(
    CATEGORY_KEYWORDS,
  ) as [
    Exclude<CompanyPageCategory, "other">,
    string[],
  ][]) {
    for (const keyword of keywords) {
      if (searchableText.includes(keyword)) {
        scores[category] += 1;
      }
    }
  }

  const [bestCategory, bestScore] = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)[0];

  if (!bestScore) {
    return "other";
  }

  return bestCategory as CompanyPageCategory;
}
