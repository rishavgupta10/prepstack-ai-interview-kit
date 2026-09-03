import { ExtractJdRequirementsService } from "./extract-jd-requirements.service";

const service = new ExtractJdRequirementsService();

const jd = `
Backend Engineer

We are looking for a mid-level Backend Engineer.

Responsibilities:
- Build and maintain REST APIs.
- Work with MongoDB databases.
- Collaborate with frontend engineers.
- Write clean and maintainable TypeScript code.

Requirements:
- 3+ years of Node.js experience.
- Strong TypeScript experience.
- Experience with Express.js.
- Experience with MongoDB.
- Good communication and teamwork skills.
- Experience with AWS is a plus.
`;

async function main() {
  const result = await service.execute(jd);

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
