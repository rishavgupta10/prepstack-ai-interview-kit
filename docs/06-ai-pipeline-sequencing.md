# AI Pipeline Sequencing

The generation flow intentionally separates LLM-dependent work from deterministic work.

## Current Sequence

```text
JD
 │
 ▼
1. Extract JD Requirements
 │
 ▼
Role
 │
 ├───────────────┐
 ▼               ▼
Company Crawl    Public Interview Research
 │
 ▼
Company Research Summary
 │
 └───────────────┐
                 ▼
2. Generate Initial Questions
                 │
                 ▼
3. Coverage Check
                 │
        uncovered requirements?
          │              │
         no             yes
          │              ▼
          │       4. Generate Missing Questions
          │              │
          │              ▼
          │       Coverage Re-check
          │
          └───────┬──────┘
                  ▼
5. Generate Flashcards
                  │
                  ▼
6. Create Deterministic Schedule
                  │
                  ▼
7. Validate Final Interview Kit
                  │
                  ▼
8. Persist
```

## Requirement ID Contract

Requirements are created during JD extraction and receive stable IDs such as:

```text
req-001
req-002
req-003
```

Questions reference these IDs:

```json
{
  "requirement_ids": ["req-001", "req-003"]
}
```

The question generator is explicitly instructed not to create, rename, or modify requirement IDs.

## Question Generation

The current prompt asks for approximately:

- 1–2 questions per `must` requirement
- 0–1 questions per `nice` requirement

Questions can cover multiple related requirements where appropriate.

## Flashcard Generation

Flashcards are generated after the final question set is known.

They retain the existing structured response:

```json
{
  "flashcards": [
    {
      "front": "Concept/question",
      "back": "Key answer points",
      "requirement_ids": ["req-001"]
    }
  ]
}
```

## JSON Contract

AI responses are parsed as JSON.

Markdown code fences are stripped before parsing.

The parsed result is validated against the application's expected structure before being accepted.

The structured JSON contracts are intentionally kept stable so existing functionality is not broken.
