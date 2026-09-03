# PrepStack AI Interview Kit

PrepStack AI Interview Kit is an AI-powered interview preparation platform that transforms a job description and company information into a structured, personalized interview preparation kit.

The application helps candidates research a company, understand the role requirements, prepare likely interview questions, study through flashcards, and follow a day-by-day preparation schedule.

## ✨ Overview

PrepStack AI Interview Kit is designed around a simple workflow:

```text
Job Description + Company URL + Available Days
                    │
                    ▼
             Research & Analysis
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       Company    Role      Interview
       Research  Analysis    Research
          │         │         │
          └─────────┼─────────┘
                    ▼
            AI Question Generation
                    │
                    ▼
             Coverage Validation
                    │
                    ▼
          Missing Question Generation
                    │
                    ▼
          Personalized Interview Kit
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
       Questions Flashcards  Schedule
          │         │          │
          └─────────┼──────────┘
                    ▼
              Practice Mode
```

The generated kit can be edited and customized by the user. Individual sections can be regenerated without unnecessarily replacing changes made elsewhere.

## 🚀 Key Features

- User authentication and protected resources
- Create interview preparation kits from a job description
- Company website research and crawling
- Company and hiring-process research
- AI-powered role and requirement analysis
- Categorized interview question generation
- Requirement-to-question coverage tracking
- Second-pass question generation for uncovered requirements
- Personalized flashcards
- Day-by-day interview preparation schedule
- Editable interview kit
- Question reordering and category management
- Add and delete questions/flashcards
- Section-level regeneration
- Flashcard practice mode
- Confidence tracking during practice
- Adaptive practice ordering based on confidence
- Structured error and failure handling
- Batch evaluation support
- Responsive frontend experience

## 🧱 Tech Stack

### Frontend

- **Next.js** — React-based framework for the web application
- **TypeScript** — Static typing and improved maintainability
- **Tailwind CSS** — Utility-first styling and responsive UI development

### Backend

- **Node.js** — Backend runtime
- **Express.js** — REST API framework
- **TypeScript** — Type-safe backend development

### Database

- **MongoDB** — Document-oriented database
- **Mongoose** — MongoDB object modeling and schema validation

### AI & Research

- **LLM provider:** Configured through environment variables
- **Web research/search:** Configured through environment variables
- **Company crawler:** Custom retrieval and page-processing pipeline

> Provider-specific configuration is intentionally kept outside the source code. See `.env.example` for the environment variables required by the project.

## 📁 Project Structure

The repository is organized around feature-based modules so that related functionality remains isolated and maintainable.

```text
prepstack-ai-interview-kit/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── interview-kit/
│   │   │   ├── company/
│   │   │   └── practice/
│   │   ├── lib/
│   │   └── utils/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── interview-kit/
│   │   │   ├── company/
│   │   │   ├── crawler/
│   │   │   └── practice/
│   │   ├── common/
│   │   ├── config/
│   │   └── ...
│   └── ...
│
├── cases/
│   └── cases.json
│
├── .env.example
├── README.md
└── package.json
```

> Update the directory tree above if the final repository uses a different root-level structure.

## 🛠️ Prerequisites

Before starting the project, make sure the following are installed:

- Node.js 20+ recommended
- npm
- MongoDB
- Git

You will also need credentials for the external services configured by the application.

## 📥 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd prepstack-ai-interview-kit
```

### 2. Install dependencies

If the repository contains separate frontend and backend applications:

```bash
cd /apps/api
npm install

cd /apps/web
npm install
```

If the final repository uses a workspace/root package manager setup, use the root installation command instead.

### 3. Configure environment variables

Create the required environment files from the provided examples.

For example:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Configure the required values in the environment files.

Typical backend configuration includes:

```env
MONGODB_URI=
JWT_SECRET=
LLM_API_KEY=
SEARCH_API_KEY=
PORT=
```

Typical frontend configuration includes:

```env
NEXT_PUBLIC_API_URL=
```

The exact variables used by the application should be documented in the corresponding `.env.example` files.

### 4. Start MongoDB

Make sure your MongoDB instance is running and that the configured `MONGODB_URI` points to the correct database.

### 5. Start the backend

```bash
cd /apps/api
npm run dev
```

The backend API will start on the configured port.

### 6. Start the frontend

In another terminal:

```bash
cd /apps/web
npm run dev
```

Open the frontend using the URL printed by Next.js, normally:

```text
http://localhost:3000
```

## 🔐 Authentication

The application protects user-specific resources.

The expected flow is:

```text
Register
   ↓
Login
   ↓
Authenticated session
   ↓
Access personal interview kits
   ↓
Create / edit / practice
```

Users should only be able to access and modify their own kits.

## 🧠 Interview Kit Generation

A kit is generated from three primary inputs:

1. Job description
2. Company website
3. Number of days available before the interview

The generation pipeline is intentionally separated into multiple stages rather than relying on one large AI request.

### High-level pipeline

```text
JD
 ↓
Requirement extraction
 ↓
Company crawling
 ↓
Relevant page retrieval
 ↓
Hiring/interview research
 ↓
Company brief
 ↓
Role analysis
 ↓
Question generation
 ↓
Coverage check
 ↓
Generate questions for uncovered requirements
 ↓
Coverage check
 ↓
Flashcards
 ↓
Deterministic schedule allocation
 ↓
Structure validation
 ↓
Persistence
```

This separation makes the pipeline easier to test, reason about, retry, and extend.

## 📦 Interview Kit Structure

Generated kits follow a structured contract containing:

- `source`
- `company_brief`
- `role`
- `questions`
- `flashcards`
- `schedule`
- `coverage`

Requirements have stable IDs and questions reference the requirement IDs they cover.

This relationship allows the application to determine coverage programmatically instead of asking the model to decide whether a requirement is covered.

## 🔄 Coverage Validation

The coverage process is deterministic.

Conceptually:

```text
Requirements
     │
     ▼
Generated Questions
     │
     ▼
Compare requirement IDs
     │
     ├── Covered
     │
     └── Uncovered
            │
            ▼
      Generate missing questions
            │
            ▼
       Validate again
```

The system can therefore identify requirements that were not adequately represented in the first generation pass and request additional questions for those requirements.

## 📅 Schedule Generation

The preparation schedule is generated from the number of days provided by the user.

Schedule allocation is handled by application logic rather than delegating the arithmetic to the LLM.

The schedule is expected to:

- Contain exactly the requested number of days
- Assign question IDs to each day
- Use integer durations in minutes
- Include all must-have requirements
- Prioritize higher-priority and harder material earlier

## ✏️ Editing & Regeneration

The generated kit is treated as a draft rather than a fixed document.

Users can:

- Edit questions
- Edit answer outlines
- Edit flashcards
- Edit company information
- Reorder questions
- Move questions between categories
- Add questions
- Delete questions
- Add flashcards
- Delete flashcards
- Regenerate individual sections

Regeneration is designed to avoid clobbering user changes made to other parts of the kit.

## 🧪 Testing

Run the automated test suite from the appropriate project directory:

```bash
npm test
```

The most important areas to protect with tests include:

- Requirement coverage
- Schedule allocation
- Generated kit structure validation
- Valid question-to-requirement references
- Valid schedule question references
- Failure handling

Add or update the test command here if the final repository uses a different command.

## ⚙️ Batch Evaluation

The application supports running the generation pipeline against multiple cases without using the web interface.

The required command is:

```bash
npm run evaluate -- --input <cases.json> --output <kits.json>
```

Example:

```bash
npm run evaluate -- --input ./cases/cases.json --output ./kits.json
```

The evaluator should:

- Read an array of cases
- Run the same retrieval and generation pipeline used by the application
- Use the `days` value from each case
- Produce one result per input case
- Continue processing when an individual case fails
- Record successful kits and structured failures
- Write the final results to the specified output file

Example input:

```json
[
  {
    "id": "case-01",
    "jd": "Senior Backend Engineer\n\nWe are looking for ...",
    "company_url": "https://example.com",
    "days": 5
  }
]
```

## 🌐 Deployment

The application consists of a frontend and backend that can be deployed independently.

### Frontend

Recommended deployment target:

- Vercel or another Next.js-compatible platform

### Backend

The backend can be deployed to a Node.js-compatible hosting platform.

### Production checklist

Before deployment:

- Configure production environment variables
- Use a production MongoDB connection
- Configure the frontend API URL
- Configure CORS correctly
- Use secure authentication/session configuration
- Disable development-only settings
- Validate externally supplied URLs
- Protect against requests to private/loopback addresses
- Apply request and response size limits
- Verify crawler timeout and retry behaviour

## 🔒 Security Considerations

The application processes content from external websites, so retrieved content is treated as untrusted input.

Important protections include:

- Validate external URLs before fetching
- Reject private and loopback addresses in production
- Restrict accepted content types
- Limit fetched content size
- Apply request timeouts
- Respect `robots.txt` and applicable site terms
- Treat retrieved page text as data, not instructions
- Validate AI-generated JSON before persistence
- Protect authenticated resources by user ownership

## 🧩 Error Handling

The application is designed to handle partial failures without unnecessarily failing the complete generation process.

Examples include:

| Scenario | Expected behaviour |
|---|---|
| Invalid company URL | Return a useful validation error |
| Company returns 404 | Record the retrieval failure |
| Company site times out | Retry with backoff, then report failure |
| No hiring page found | Continue with an honest research result |
| No public interview information | Continue without inventing information |
| Very short JD | Produce a limited kit based only on available information |
| Invalid AI JSON | Validate and retry/handle failure |
| LLM rate limit | Back off and retry |
| Duplicate submission | Handle according to application rules |
| 1-day preparation | Generate a 1-day schedule |
| Long preparation window | Generate the requested number of days |

A lack of research information should not be represented as fabricated information.

## 🏗️ Design Principles

### Feature-based organization

Related functionality is grouped by feature rather than placing all controllers, services, and utilities into large global folders.

### Separation of concerns

The major responsibilities are separated into:

```text
Retrieval
Extraction
Generation
Coverage
Scheduling
Validation
Persistence
Presentation
```

### Deterministic business logic

Important decisions such as coverage validation and schedule allocation are handled by application code instead of relying entirely on the LLM.

### Validate before persistence

Generated content is validated against the expected structure before it is saved.

## 📌 Current Scope

PrepStack AI Interview Kit focuses on interview preparation.

The project does not aim to provide:

- Job aggregation
- Job application submission
- CV parsing or rewriting
- Payments
- Team collaboration/sharing
- Audio/video interview simulation

## 🗺️ Future Improvements

Potential future improvements include:

- More advanced spaced-repetition scheduling
- Mock interview mode
- Weak-spot analytics
- Printable interview preparation summaries
- Additional research sources
- More granular generation controls

## 🤝 Development

When contributing or extending the application:

1. Keep features isolated within their feature modules.
2. Reuse existing utilities and shared UI components where appropriate.
3. Keep controllers and route handlers thin.
4. Validate external input.
5. Keep AI prompts and generation logic separated from deterministic business logic.
6. Add tests for important business rules.
7. Avoid storing secrets in source control.
8. Use meaningful commit messages.

