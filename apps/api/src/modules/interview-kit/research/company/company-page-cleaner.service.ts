import * as cheerio from "cheerio";

const MAX_CLEANED_TEXT_LENGTH = 20_000;

export interface CleanedCompanyPage {
  url: string;
  title: string;
  text: string;
}

export class CompanyPageCleanerService {
  clean(url: string, html: string): CleanedCompanyPage {
    const $ = cheerio.load(html);

    $("script, style, noscript, iframe, svg").remove();

    const title = $("title").text().trim();

    const bodyText = $("body").text();

    const text = bodyText
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_CLEANED_TEXT_LENGTH);

    return {
      url,
      title,
      text,
    };
  }
}
