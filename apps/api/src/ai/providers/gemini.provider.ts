import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { env } from "../../config/env";

const genAI =
  new GoogleGenerativeAI(
    env.GEMINI_API_KEY!
  );

export class GeminiProvider {
  private model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

  async generate(
    prompt: string
  ) {
    const result =
      await this.model.generateContent(
        prompt
      );

    return result.response.text();
  }
}
