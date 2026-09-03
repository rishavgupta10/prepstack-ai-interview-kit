import { CompanyLink } from "./company-link-extractor";

const PRIORITY_KEYWORDS = [
  "career",
  "careers",
  "job",
  "jobs",
  "hiring",
  "work-with-us",
  "join-us",
  "join-our-team",
  "about",
  "company",
  "culture",
  "engineering",
  "technology",
  "team",
];

export function rankCompanyLinks(
  links: CompanyLink[],
  startUrl: string,
): string[] {
  const scoredLinks = links.map((link) => ({
    link,
    score: scoreLink(link, startUrl),
  }));

  return scoredLinks
    .sort((a, b) => b.score - a.score)
    .map((item) => item.link.url);
}

function scoreLink(link: CompanyLink, startUrl: string): number {
  let score = 0;

  try {
    const url = new URL(link.url);
    const start = new URL(startUrl);

    if (url.hostname === start.hostname) {
      score += 10;
    }

    const value = `${url.pathname} ${url.search} ${link.anchorText}`
      .toLowerCase()
      .replace(/[-_/]/g, " ");

    for (const keyword of PRIORITY_KEYWORDS) {
      if (value.includes(keyword)) {
        score += 10;
      }
    }

    if (url.pathname.split("/").length <= 3) {
      score += 2;
    }

    if (
      url.pathname.includes("login") ||
      url.pathname.includes("signup") ||
      url.pathname.includes("privacy") ||
      url.pathname.includes("terms")
    ) {
      score -= 10;
    }
  } catch {
    return -1;
  }

  return score;
}
