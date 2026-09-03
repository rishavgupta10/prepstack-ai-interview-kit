# Coverage Algorithm

## Purpose

Coverage checking determines whether generated questions actually test the requirements extracted from the JD.

Coverage is deterministic application code, not an LLM decision.

## Algorithm

1. Create a set of requirement IDs referenced by questions.
2. Iterate over every generated question.
3. Add every `requirement_id` from that question to the covered set.
4. Iterate over all role requirements.
5. A requirement is uncovered when its ID is not in the covered set.
6. Return the uncovered requirement IDs and pass count.

Conceptually:

```text
covered = Set(question.requirement_ids)

for requirement in role.requirements:
    if requirement.id not in covered:
        uncovered.push(requirement.id)
```

## First Pass

```text
Generate questions
       ↓
Check coverage
```

If every requirement is covered, generation continues.

## Second Pass

If uncovered requirements exist:

```text
uncovered IDs
      ↓
Generate missing questions
      ↓
append to existing questions
      ↓
check coverage again
```

The missing-question generator receives the uncovered IDs and existing questions so that it can target gaps without unnecessarily duplicating existing questions.

## Important Invariant

Question generation may only reference IDs that already exist in the extracted role.

A question cannot create a new requirement as a side effect.

## Current Limitation

The final coverage object currently records the remaining uncovered IDs and the number of passes.

The final implementation should explicitly fail generation when a `must` requirement remains uncovered after the second pass, rather than silently persisting an incomplete kit.

This is an important remaining assessment-compliance task.
