import fs from "node:fs/promises";
import path from "node:path";

import { GenerateInterviewKitService } from "./modules/interview-kit/application/generate-interview-kit.service";

import type {
  BatchInterviewKitInput,
  BatchInterviewKitOutput,
  BatchKitResult,
} from "./modules/interview-kit/domain/input.types";

async function main() {
  const args = process.argv.slice(2);

  const inputIndex = args.indexOf("--input");
  const outputIndex = args.indexOf("--output");

  if (inputIndex === -1 || outputIndex === -1) {
    throw new Error(
      "Usage: npm run evaluate -- --input <cases.json> --output <kits.json>",
    );
  }

  const inputPath = args[inputIndex + 1];
  const outputPath = args[outputIndex + 1];

  if (!inputPath || !outputPath) {
    throw new Error("Both --input and --output paths are required.");
  }

  const inputContent = await fs.readFile(path.resolve(inputPath), "utf-8");

  const cases = JSON.parse(inputContent) as BatchInterviewKitInput[];

  if (!Array.isArray(cases)) {
    throw new Error("Input file must contain an array of cases.");
  }

  const service = new GenerateInterviewKitService();

  const results: BatchKitResult[] = [];

  for (const testCase of cases) {
    console.log(`[Evaluator] Processing case: ${testCase.id}`);

    try {
      const kit = await service.execute(
        testCase.jd,
        testCase.company_url,
        testCase.days,
      );

      results.push({
        id: testCase.id,
        status: "ok",
        kit,
        error: null,
      });

      console.log(`[Evaluator] Case succeeded: ${testCase.id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error.";

      results.push({
        id: testCase.id,
        status: "failed",
        kit: null,
        error: {
          code: "GENERATION_FAILED",
          message,
        },
      });

      console.error(`[Evaluator] Case failed: ${testCase.id} - ${message}`);
    }
  }

  const output: BatchInterviewKitOutput = {
    version: "1.0",
    generated_at: new Date().toISOString(),
    kits: results,
  };

  await fs.writeFile(
    path.resolve(outputPath),
    JSON.stringify(output, null, 2),
    "utf-8",
  );

  console.log(`[Evaluator] Results written to: ${outputPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Evaluator failed.");

  process.exitCode = 1;
});
