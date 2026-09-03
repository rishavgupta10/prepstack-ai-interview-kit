# Known Limitations

## AI Quota and Latency

The current pipeline makes multiple AI calls.

A recent successful Gemini run measured approximately:

```text
JD extraction       ~7.2s
Company research    ~7.1s incremental
Interview research  ~0.2s incremental
Question generation ~23.8s
Flashcards          ~13.7s
Total               ~52.1s
```

Question generation and flashcard generation are the largest latency contributors.

The free Gemini tier can also become exhausted during repeated development/testing.

## Groq Model Access

The previously configured Groq model:

```text
llama-3.3-70b-versatile
```

is not accessible to the current Groq API key and returned:

```text
404 model_not_found
```

The available-model list contains alternative models, but a final model selection still needs validation for quality, latency, and free-tier limits.

## Interview Research

Public interview-process research currently relies on search results/snippets.

A stronger version should fetch, clean, and validate the underlying public pages before supplying their content to the generation pipeline.

## Coverage

The second-pass mechanism exists, but final generation should explicitly fail when a required `must` requirement remains uncovered after the allowed second pass.

## Schedule

The current scheduler creates the requested number of days and orders questions by priority/difficulty, but its distribution algorithm is still simplistic and requires improvement.

## Builder State

The current update API supports question and flashcard replacement, but explicit generated/edited/pinned state has not yet been fully implemented.

## Batch Evaluator

The mandatory evaluator CLI still needs to be completed and tested against the exact required command and output contract.

## Testing

Required automated tests for:

- schedule allocation
- coverage
- structure validation

still need to be added.

## Multi-role Input

The core create API currently accepts one JD/company pair at a time. Multi-role application UX and batch orchestration still need final implementation.

## Security

Production SSRF protection and redirect validation remain to be hardened.

## Long-running Requests

Generation can take tens of seconds. Robust duplicate-trigger prevention, partial-failure behavior, and structured long-running generation handling still need final implementation.
