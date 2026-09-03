import assert from "node:assert/strict";
import test from "node:test";

import { CreateInterviewScheduleService } from "./create-interview-schedule.service";
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

const questions: InterviewQuestion[] = [
  {
    id: "q-001",
    requirement_ids: ["req-001"],
    category: "technical",
    prompt: "Node question",
    answer_outline: "Answer",
    difficulty: 2,
  },
  {
    id: "q-002",
    requirement_ids: ["req-002"],
    category: "technical",
    prompt: "MongoDB question",
    answer_outline: "Answer",
    difficulty: 3,
  },
  {
    id: "q-003",
    requirement_ids: ["req-003"],
    category: "technical",
    prompt: "AWS question",
    answer_outline: "Answer",
    difficulty: 1,
  },
];

test("creates exactly the requested number of schedule days", () => {
  const service = new CreateInterviewScheduleService();

  const schedule = service.execute(role, questions, 3);

  assert.equal(schedule.days_available, 3);
  assert.equal(schedule.days.length, 3);
  assert.deepEqual(
    schedule.days.map((day) => day.day),
    [1, 2, 3],
  );
});

test("places higher-priority and harder questions earlier", () => {
  const service = new CreateInterviewScheduleService();

  const schedule = service.execute(role, questions, 3);

  assert.deepEqual(schedule.days[0].question_ids, ["q-002"]);
  assert.deepEqual(schedule.days[1].question_ids, ["q-001"]);
  assert.deepEqual(schedule.days[2].question_ids, ["q-003"]);
});

test("rejects invalid number of days", () => {
  const service = new CreateInterviewScheduleService();

  assert.throws(
    () => service.execute(role, questions, 0),
    /Days available must be a positive integer/,
  );
});
