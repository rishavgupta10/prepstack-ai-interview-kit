import { GeminiProvider } from "../providers/gemini.provider";
import { GroqProvider } from "../providers/groq.provider";

const providers = [
  new GroqProvider(),
  new GeminiProvider(),
];

export class AIProviderFactory {

  static getProviders() {
    return providers;
  }

}