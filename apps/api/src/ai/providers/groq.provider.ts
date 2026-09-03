import Groq from "groq-sdk";

import { AIProvider } from "../core/ai-provider.interface";
import { env } from "../../config/env";

export class GroqProvider implements AIProvider {
  private groq = new Groq({
    apiKey: env.GROQ_API_KEY,
  });

  async generate(prompt: string): Promise<string> {
    const completion = await this.groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0]?.message?.content || "";
  }
}
