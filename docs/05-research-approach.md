# Research Approach

## 1. Company URL

The supplied company URL becomes the starting point for dynamic research.

The crawler does not assume paths such as `/careers` or `/about`.

## 2. Fetch

Each candidate URL is fetched with:

- request timeout
- response status validation
- HTML/XHTML content-type validation
- maximum response size
- redirect support
- explicit user agent

## 3. Robots and Rate Limiting

Before crawling a page, the crawler checks robots.txt.

A simple request rate limiter currently enforces approximately 500 ms between requests.

## 4. Link Discovery

Links are extracted from the retrieved HTML.

Relative links are resolved against the current page URL:

```text
/about
/careers
jobs
../company
```

are converted to usable absolute HTTP(S) URLs.

## 5. Ranking

Discovered pages are ranked using URL/path/title signals.

Useful terms include:

- careers
- jobs
- hiring
- about
- company
- culture
- engineering

Low-value areas such as login, signup, privacy, and terms are deprioritized.

## 6. Bounded Crawl

The crawler currently limits the number of pages and the amount of text supplied downstream.

The current maximum crawl size is six pages.

## 7. Cleaning

HTML is cleaned before AI processing.

Scripts, styles, iframes, SVGs, and similar non-content elements are removed.

Cleaned page text is bounded to avoid unnecessarily large AI prompts.

## 8. Classification

Company pages are classified into:

```text
careers
hiring
about
engineering
culture
other
```

## 9. Company Summary

Important pages are selected and summarized into:

```text
company_name
what_they_do
summary
pages
pages_used
unavailable_categories
```

The orchestrator reuses the existing crawl result for summarization instead of crawling the company again.

## 10. Public Interview Research

The system searches public information using company name + role + interview-process terms.

Current implementation gracefully reports unavailable research when no usable results are returned.

A future improvement is to fetch and clean the discovered public pages rather than relying primarily on search-result snippets.
