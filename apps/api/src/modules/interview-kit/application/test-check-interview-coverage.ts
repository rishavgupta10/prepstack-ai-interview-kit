import assert from "node:assert/strict";
import test from "node:test";

import { CheckInterviewCoverageService } from "./check-interview-coverage.service";
import type { InterviewQuestion, InterviewRole } from "../domain/types";

const role: InterviewRole = {
  title: "Backend Engineer",
  seniority: "mid-level",
  responsibilities: ["Build APIs"],
  requirements: [
    {
      id: "req-001",
      text: "Node.js experience",
      kind: "technical",
      priority: "must",
    },
    {
      id: "req-002",
      text: "MongoDB experience",
      kind: "technical",
      priority: "must",
    },
    {
      id: "req-003",
      text: "AWS experience",
      kind: "technical",
      priority: "nice",
    },
  ],
};

test("detects uncovered requirements", () => {
  const service = new CheckInterviewCoverageService();

  const questions: InterviewQuestion[] = [
    {
      id: "q-001",
      requirement_ids: ["req-001"],
      category: "technical",
      prompt: "Node question",
      answer_outline: "Answer",
      difficulty: 2,
    },
  ];

  const coverage = service.execute(role, questions);

  assert.deepEqual(coverage.uncovered_requirement_ids, ["req-002", "req-003"]);
  assert.equal(coverage.passes, 1);
});

test("returns complete coverage when every requirement is referenced", () => {
  const service = new CheckInterviewCoverageService();

  const questions: InterviewQuestion[] = [
    {
      id: "q-001",
      requirement_ids: ["req-001", "req-002"],
      category: "system design",
      prompt: "Design question",
      answer_outline: "Answer",
      difficulty: 3,
    },
    {
      id: "q-002",
      requirement_ids: ["req-003"],
      category: "technical",
      prompt: "AWS question",
      answer_outline: "Answer",
      difficulty: 1,
    },
  ];

  const coverage = service.execute(role, questions);

  assert.deepEqual(coverage.uncovered_requirement_ids, []);
  assert.equal(coverage.passes, 1);
});
