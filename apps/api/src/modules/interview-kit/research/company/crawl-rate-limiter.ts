const MIN_DELAY_MS = 500;

export class CrawlRateLimiter {
  private lastRequestAt = 0;

  async wait(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.lastRequestAt;

    const remainingDelay = MIN_DELAY_MS - elapsed;

    if (remainingDelay > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingDelay));
    }

    this.lastRequestAt = Date.now();
  }
}
