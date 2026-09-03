import * as cheerio from "cheerio";

export interface CompanyLink {
  url: string;
  anchorText: string;
}

export function extractCompanyLinks(
  html: string,
  pageUrl: string,
): CompanyLink[] {
  const $ = cheerio.load(html);

  const links = new Map<string, CompanyLink>();

  $("a[href]").each((_, element) => {
    const href = $(element).attr("href");

    if (!href) {
      return;
    }

    try {
      const url = new URL(href, pageUrl);

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return;
      }

      url.hash = "";

      const normalizedUrl = url.toString();

      const anchorText = $(element)
        .text()
        .replace(/\s+/g, " ")
        .trim();

      if (!links.has(normalizedUrl)) {
        links.set(normalizedUrl, {
          url: normalizedUrl,
          anchorText,
        });
      }
    } catch {
      // Ignore malformed URLs.
    }
  });

  return [...links.values()];
}