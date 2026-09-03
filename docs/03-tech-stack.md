# Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- Feature-based frontend structure
- Existing reusable UI components, API utilities, hooks, and providers

## Backend

- Node.js
- Express
- TypeScript
- `tsx` for running the TypeScript backend
- Mongoose

## Database

- MongoDB
- Mongoose models and repositories

## AI

The project contains a provider abstraction:

```text
AIService
    ↓
AIProviderFactory
    ↓
AIProvider[]
    ├── GeminiProvider
    └── GroqProvider
```

The current implementation can fall back between providers.

Gemini is configured with `gemini-2.5-flash`.

Groq is configured through the existing Groq SDK. The previously configured `llama-3.3-70b-versatile` model is not accessible to the current Groq API key; the available-model check showed models including `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, and Qwen models.

## Research / HTTP

The company crawler uses native HTTP fetching with bounded timeouts, content-size checks, content-type checks, redirects, robots.txt checks, and rate limiting.

Public interview-process research currently uses a search API integration.

## Architecture Style

The new Interview Kit backend follows a feature/module-oriented structure:

```text
interview-kit/
├── api/
├── application/
├── domain/
├── infrastructure/
├── model/
└── research/
    ├── company/
    └── interview-process/
```
