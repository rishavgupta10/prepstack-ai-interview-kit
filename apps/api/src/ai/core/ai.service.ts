import { AIProviderFactory } from "./ai-provider.factory";
import { retry } from "./retry";

export class AIService {
  async generate(prompt: string) {
    const providers = AIProviderFactory.getProviders();

    let lastError;

    for (const provider of providers) {
      const providerStartedAt = Date.now();
      try {
        console.log(`[AI] Trying provider: ${provider.constructor.name}`);

        let res = await retry(() => provider.generate(prompt), 3);
        console.log(
          `[AI] ${provider.constructor.name} completed in ${
            Date.now() - providerStartedAt
          }ms`,
        );
        // console.log(`Success: ${provider.constructor.name}`);
        // console.log(res);
        return res;
      } catch (error) {
        console.error(provider.constructor.name, "failed");
        console.error(
          `[AI] ${provider.constructor.name} failed after ${
            Date.now() - providerStartedAt
          }ms`,
        );

        lastError = error;
      }
    }

    throw lastError;
  }
}
