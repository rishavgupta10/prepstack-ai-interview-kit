# Failure Handling

## Input Validation

The create endpoint validates:

- request object
- JD presence
- maximum JD length
- company URL presence
- integer day count
- day range of 1–60

Invalid input is rejected before generation begins.

## AI Provider Failure

The shared AI service tries configured providers sequentially.

Current provider abstraction:

```text
Provider A
   ↓ failure
Provider B
   ↓ failure
throw last error
```

Each provider call is wrapped in retry logic.

## Invalid AI JSON

Generated responses are parsed and validated.

Examples of invalid output that should be rejected:

- missing `questions`
- non-array `questions`
- invalid category
- invalid difficulty
- unknown requirement ID
- missing required text
- invalid flashcard structure

## Company Research Failure

Individual crawl failures are recorded instead of automatically terminating the complete crawl.

Examples:

- timeout
- HTTP failure
- invalid content type
- content too large
- robots restriction
- fetch failure

The system can still produce a company research result containing successful pages plus failures.

## No Public Interview Information

The interview-process research service treats unavailable public information as a normal condition.

Question generation can continue using the JD and company research.

## Final Kit Validation

The generated kit is validated before persistence.

This prevents malformed AI output from being saved directly to MongoDB.

## Remaining Failure-Handling Work

The following should be hardened before final submission:

- structured API error responses
- explicit second-pass coverage failure
- duplicate generation protection
- partial generation status if a long-running generation fails
- clearer handling of rate-limit/429 errors
- production-safe URL validation
