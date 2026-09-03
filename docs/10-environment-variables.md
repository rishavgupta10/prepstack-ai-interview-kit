# Environment Variables

The exact environment variable names currently used by the Interview Kit / AI infrastructure are:

## AI

```env
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

## Public Interview Search

```env
GOOGLE_SEARCH_API_KEY=your_google_api_key
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
```

## Usage

Do not commit real credentials to source control.

Use environment variables in local development and evaluator execution.

## Provider Configuration

Gemini currently uses:

```text
gemini-2.5-flash
```

Groq is configured through the Groq SDK.

The currently available Groq models for the configured key were checked through the models API. The old configured model:

```text
llama-3.3-70b-versatile
```

returned `model_not_found` for the current key.

Available models included:

```text
openai/gpt-oss-120b
openai/gpt-oss-20b
qwen/qwen3.8-27b
qwen/qwen3.6-27b
allam-2-7b
groq/compound
groq/compound-mini
```

The actual production choice should be verified against the current API key and free-tier limits.

## Secrets

Never place:

- API keys
- client secrets
- database credentials
- private tokens

inside source files.
