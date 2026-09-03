import { validateCompanyUrl } from "./url-security";

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_SIZE = 1_000_000;

export interface FetchedCompanyPage {
  url: string;
  status: number;
  contentType: string;
  html: string;
}

export class CompanyPageFetcherService {
  async fetch(url: string): Promise<FetchedCompanyPage> {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent": "InterviewPrepKitBot/1.0",
          Accept: "text/html,application/xhtml+xml",
        },
      });

      if (
        response.status >= 300 &&
        response.status < 400 &&
        response.headers.get("location")
      ) {
        const redirectUrl = new URL(
          response.headers.get("location")!,
          url,
        ).toString();

        await validateCompanyUrl(redirectUrl);

        throw new Error(
          `Company page redirected to another URL: ${redirectUrl}.`,
        );
      }

      if (!response.ok) {
        throw new Error(
          `Company page request failed with status ${response.status}.`,
        );
      }

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("text/html")) {
        throw new Error(
          `Unsupported company page content type: ${contentType || "unknown"}.`,
        );
      }

      const contentLength = response.headers.get("content-length");

      if (contentLength && Number(contentLength) > MAX_RESPONSE_SIZE) {
        throw new Error("Company page response is too large.");
      }

      const html = await response.text();

      const responseSize = new TextEncoder().encode(html).length;

      if (responseSize > MAX_RESPONSE_SIZE) {
        throw new Error("Company page response is too large.");
      }

      return {
        url: response.url,
        status: response.status,
        contentType,
        html,
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
