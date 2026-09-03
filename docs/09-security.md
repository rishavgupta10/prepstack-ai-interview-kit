# Security

## Authentication

Interview Kit routes are protected with the existing authentication middleware.

The authenticated user ID is passed into application services.

## User Data Isolation

Every single-kit repository operation filters by both:

```text
kit ID
+
authenticated user ID
```

This prevents direct access to another user's interview kit.

## Generated Content Validation

AI output is untrusted data.

The system validates generated structures before saving them.

## Web Content Is Untrusted

Company pages and public interview-process pages are external content.

Their text must be treated as data, not as instructions to the AI system.

The generation prompts explicitly restrict the model to supplied job requirements and research.

## Fetch Restrictions

The company fetcher currently includes:

- timeout
- content-type validation
- content-size limit
- bounded crawl
- robots.txt check
- rate limiting
- same-domain crawl restriction

## SSRF

Production URL validation is still a required hardening task.

The production system should reject destinations such as:

```text
localhost
127.0.0.1
private IPv4 ranges
private IPv6 ranges
link-local addresses
non-http/https schemes
```

However, the assessment requires local company URLs to work for the batch evaluator, so local evaluator behavior and production SSRF restrictions need to be separated explicitly.

## Redirect Security

Redirect destinations should also be validated rather than assuming that the original URL being public makes every redirect safe.

## Remaining Security Work

Before final submission:

1. Add URL parsing and scheme validation.
2. Add production SSRF/private-network rejection.
3. Validate redirect destinations.
4. Keep local evaluator support.
5. Add request/content limits at API level where appropriate.
