# Interview Kit Generation Flow

## End-to-End Flow

```text
User
 │
 │ JD + Company URL + Days
 ▼
POST /interview-kit
 │
 ▼
Authentication Middleware
 │
 ▼
CreateInterviewKitService
 │
 ├── Validate Input
 │
 ▼
GenerateInterviewKitService
 │
 ├──────────────────────────────────────┐
 │                                      │
 ▼                                      ▼
Extract JD Requirements            Company Research
 │                                      │
 ▼                                      ├── Crawl company URL
Role                                    ├── robots.txt
 │                                      ├── fetch pages
 │                                      ├── clean HTML
 │                                      ├── discover links
 │                                      ├── rank links
 │                                      └── classify pages
 │                                      │
 │                                      ▼
 │                               Company Brief
 │
 └──────────────────┬───────────────────┘
                    ▼
          Public Interview Research
                    │
                    ▼
          Initial Question Generation
                    │
                    ▼
             Coverage Check
                    │
             ┌──────┴──────┐
             │             │
          complete       gaps
             │             │
             │             ▼
             │      Missing Questions
             │             │
             │             ▼
             │      Coverage Re-check
             │
             └──────┬──────┘
                    ▼
             Final Question Set
                    │
                    ▼
             Flashcard Generation
                    │
                    ▼
          Deterministic Scheduling
                    │
                    ▼
             Final Kit Validation
                    │
                    ▼
              MongoDB Persist
                    │
                    ▼
                 Response
```

## Step 1 — Validate Input

The API accepts:

```json
{
  "jd": "...",
  "company_url": "https://example.com",
  "days": 14
}
```

Validation ensures:

- JD exists
- JD is within size limits
- company URL exists
- days is an integer
- days is between 1 and 60

## Step 2 — Extract JD Requirements

The JD is sent to the AI extraction service.

The result becomes the canonical role structure:

```text
title
seniority
responsibilities
requirements[]
```

Each requirement receives a stable ID.

Example:

```json
{
  "id": "req-001",
  "text": "Build REST APIs using Node.js",
  "kind": "technical",
  "priority": "must"
}
```

These IDs become the foundation for question generation and coverage.

## Step 3 — Research the Company

The crawler starts from the supplied company URL.

It discovers useful pages dynamically, cleans their content, classifies them, and creates a bounded company brief.

The crawler result is reused for summarization so that the company is not crawled twice.

## Step 4 — Research Public Interview Process

The system searches public information using the company and role.

This research is optional evidence.

If no usable information exists, generation continues without it.

## Step 5 — Generate Initial Questions

The AI receives:

- canonical role requirements
- company brief
- public interview-process research

The prompt instructs the model to:

- reference existing requirement IDs
- avoid inventing requirements
- prioritize `must` requirements
- generate compact coverage
- avoid duplicate questions
- return only the existing JSON schema

The expected response remains:

```json
{
  "questions": [
    {
      "requirement_ids": ["req-001"],
      "category": "technical",
      "prompt": "Question text",
      "answer_outline": "Key answer points",
      "difficulty": 2
    }
  ]
}
```

The application assigns deterministic question IDs:

```text
q-001
q-002
q-003
```

## Step 6 — Validate Questions

Questions are validated before they enter the final pipeline.

Validation checks include:

- valid requirement IDs
- requirement references exist
- valid categories
- difficulty is 1, 2, or 3
- required fields are present

## Step 7 — Coverage Check

The application calculates which requirements are represented by questions.

No LLM is used for this calculation.

## Step 8 — Missing Questions

If coverage is incomplete, the missing-question generator receives:

- role
- company brief
- interview research
- uncovered requirement IDs
- existing questions

It generates targeted questions for the gaps.

The new questions are appended to the existing set.

## Step 9 — Final Coverage Check

Coverage is calculated again.

The final kit records:

```json
{
  "uncovered_requirement_ids": [],
  "passes": 2
}
```

If the first pass covered everything:

```json
{
  "uncovered_requirement_ids": [],
  "passes": 1
}
```

The final implementation should reject the kit if a `must` requirement remains uncovered after the second pass.

## Step 10 — Generate Flashcards

Flashcards are generated from the final question/requirement context.

The existing response schema is preserved:

```json
{
  "flashcards": [
    {
      "front": "Question/concept",
      "back": "Answer/key points",
      "requirement_ids": ["req-001"]
    }
  ]
}
```

The application assigns deterministic flashcard IDs.

## Step 11 — Create Schedule

The scheduler is deterministic.

It does not ask the LLM to decide the number of days or arithmetic.

It receives:

```text
role
questions
days
```

and creates exactly `days` schedule entries.

Each day contains:

```json
{
  "day": 1,
  "focus": "Core requirements and fundamentals",
  "question_ids": ["q-001", "q-004"],
  "minutes": 18
}
```

Question duration is currently derived from difficulty:

```text
5 + difficulty × 2 minutes
```

The scheduling algorithm prioritizes `must` requirements and higher difficulty, but distribution still needs improvement.

## Step 12 — Final Validation

Before persistence, the complete kit is validated against the expected Interview Kit structure.

## Step 13 — Persist

The validated kit is saved through:

```text
InterviewKitRepository.create(userId, kit)
```

The authenticated user's ID is stored with the document.

## Result

The final Interview Kit contains:

```text
source
company_brief
role
questions
flashcards
schedule
coverage
```

This gives the frontend a complete, structured object that can be displayed, edited, practiced, and scheduled.
