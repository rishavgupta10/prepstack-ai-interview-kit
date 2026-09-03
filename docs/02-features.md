# Features

## Interview Kit Generation

- Accepts a job description and company URL.
- Supports a preparation period from 1 to 60 days.
- Extracts role title, seniority, responsibilities, and requirements.
- Classifies requirements as technical, behavioural, or domain.
- Assigns every requirement a stable ID.
- Marks requirements as `must` or `nice`.

## Company Research

- Dynamically crawls the supplied company website.
- Discovers links from crawled pages instead of relying on fixed paths.
- Resolves relative links.
- Ranks useful pages such as careers, hiring, about, engineering, and culture.
- Cleans page content before it is supplied to AI.
- Applies robots.txt checks.
- Applies request rate limiting.
- Limits crawl depth/size through bounded page and content limits.
- Records failed/unavailable pages.

## Public Interview-Process Research

- Searches public web information for the company and role.
- Treats public interview information as evidence about interview style/process.
- Does not allow public interview research to create new job requirements.
- Gracefully handles the absence of public interview information.

## AI Generation

- JD requirement extraction.
- Interview question generation.
- Missing-question generation for uncovered requirements.
- Flashcard generation.
- JSON responses are parsed and validated before use.

## Coverage

- Maps questions to requirement IDs.
- Detects uncovered requirements.
- Performs a second generation pass when coverage is incomplete.

## Schedule

- Uses deterministic application code rather than an LLM.
- Creates exactly the requested number of days.
- Assigns integer question durations.
- Prioritizes questions using requirement priority and difficulty.

## CRUD

The Interview Kit API supports:

- create
- list
- get by ID
- update
- delete

All CRUD access is scoped to the authenticated user.

## Builder / Practice Foundation

The persisted kit structure supports editing questions and flashcards. The frontend can update these collections through the update API.

The explicit generated/edited/pinned state required for the final builder implementation is still a remaining enhancement.
