const REQUEST_TIMEOUT_MS = 5_000;

export class RobotsCheckerService {
  async isAllowed(url: string): Promise<boolean> {
    const targetUrl = new URL(url);

    const robotsUrl = new URL("/robots.txt", targetUrl.origin);

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(robotsUrl, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": "InterviewPrepKitBot/1.0",
        },
      });

      // If robots.txt doesn't exist, don't block crawling.
      if (response.status === 404) {
        return true;
      }

      if (!response.ok) {
        return false;
      }

      const robotsText = await response.text();

      return this.checkRules(robotsText, targetUrl);
    } catch {
      // If robots.txt cannot be retrieved, fail closed.
      return false;
    } finally {
      clearTimeout(timeout);
    }
  }

  private checkRules(
    robotsText: string,
    targetUrl: URL,
  ): boolean {
    const lines = robotsText.split(/\r?\n/);

    let appliesToOurBot = false;
    let appliesToAllBots = false;
    let disallowedPaths: string[] = [];

    for (const rawLine of lines) {
      const line = rawLine.split("#")[0].trim();

      if (!line) {
        continue;
      }

      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        continue;
      }

      const directive = line
        .slice(0, separatorIndex)
        .trim()
        .toLowerCase();

      const value = line
        .slice(separatorIndex + 1)
        .trim();

      if (directive === "user-agent") {
        const userAgent = value.toLowerCase();

        appliesToOurBot =
          userAgent === "interviewprepkitbot" ||
          userAgent === "interviewprepkitbot/1.0";

        appliesToAllBots = userAgent === "*";

        if (appliesToOurBot) {
          disallowedPaths = [];
        }
      }

      if (
        directive === "disallow" &&
        (appliesToOurBot || appliesToAllBots)
      ) {
        if (value) {
          disallowedPaths.push(value);
        }
      }
    }

    const pathname = targetUrl.pathname;

    return !disallowedPaths.some((path) =>
      pathname.startsWith(path),
    );
  }
}
