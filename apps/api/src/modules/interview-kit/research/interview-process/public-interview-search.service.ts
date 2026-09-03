export interface PublicInterviewSearchResult {
  url: string;
  title: string;
  snippet: string;
}

interface GoogleSearchResponse {
  items?: Array<{
    link: string;
    title: string;
    snippet: string;
  }>;
}

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RESULTS = 5;

export class PublicInterviewSearchService {
  async search(
    companyName: string,
    role: string,
  ): Promise<PublicInterviewSearchResult[]> {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (!apiKey || !searchEngineId) {
      throw new Error("Google search credentials are not configured.");
    }

    const query = `"${companyName}" "${role}" interview process interview questions`;

    const searchUrl = new URL("https://www.googleapis.com/customsearch/v1");

    searchUrl.searchParams.set("key", apiKey);
    searchUrl.searchParams.set("cx", searchEngineId);
    searchUrl.searchParams.set("q", query);
    searchUrl.searchParams.set("num", String(MAX_RESULTS));

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(searchUrl, {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Public interview search failed with status ${response.status}.`,
        );
      }

      const data = (await response.json()) as GoogleSearchResponse;

      return (data.items ?? []).map((item) => ({
        url: item.link,
        title: item.title,
        snippet: item.snippet,
      }));
    } finally {
      clearTimeout(timeout);
    }
  }
}
