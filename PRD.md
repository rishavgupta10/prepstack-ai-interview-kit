# Project Requirement Document (PRD)

## Problem statement

#### Developers struggle with:
 -Technical interviews
 - HR interviews
 - Client meetings
 - Communication skills

#### Observation 
> I noticed technical knowledge wasn't enough. Companies also evaluate communication and client interaction skills. So I built an AI platform that simulates technical interviews, HR rounds, client meetings, and project-closing discussions while providing communication feedback

--- 
### Project MVP scope
Included

✅ Resume Upload

✅ Technical Interview

✅ HR Interview

✅ AI Evaluation

✅ Feedback Report

✅ Interview History

Not Included

❌ Voice

❌ Video Avatar

❌ Multi-agent architecture

❌ Real-time speech analysis

❌ Team accounts

These come later.


---
## Architecture

## Tech Stack
     ### Frontend
      - Next.js 15
      - TypeScript
      - Tailwind
      - Shadcn UI
      - TanStack Query
### Backend
      - Node.js
      - Express
      - TypeScript
      - Database
      - MongoDB Atlas
      - AI
      - Gemini API
      - File Storage

Initially:

Local storage

Later:

Cloudinary

--- 
### Authentication

JWT

Simple

---

### High Level Architecture

```
                Next.js Frontend
                        |
                        |
                   Express API
                        |
      ---------------------------------
      |               |               |
      |               |               |
 MongoDB        Gemini Service     File Service
      |
      |
 Interview Data
 ```

 ---

 ### Folder Structure

 #### Monorepo

```
interview-pilot/

apps/
│
├── web
│
└── api

packages/
│
├── shared
│
├── prompts
│
└── types

docs/
```

### Frontend Structure 
```

web/

src/

app/

(auth)

(dashboard)

(interview)

(report)

components/

features/

|_  auth/
|
  resume/

  interview/

  report/

lib/

hooks/

services/

types/

```

### Backend folder Structure 
```
api/

src/

├── modules/
│
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.schema.ts
│   │   ├── auth.types.ts
│   │   └── auth.validation.ts
│   │
│   ├── resume/
│   │   ├── resume.controller.ts
│   │   ├── resume.service.ts
│   │   ├── resume.routes.ts
│   │   ├── resume.model.ts
│   │   └── resume.prompts.ts
│   │
│   ├── interview/
│   │   ├── interview.controller.ts
│   │   ├── interview.service.ts
│   │   ├── interview.routes.ts
│   │   ├── interview.model.ts
│   │   ├── interview.prompts.ts
│   │   └── interview.types.ts
│   │
│   ├── report/
│   │
│   └── user/
│
├── shared/
│
│   ├── middleware/
│   ├── database/
│   ├── errors/
│   ├── constants/
│   └── utils/
│
├── ai/
│
│   ├── gemini.service.ts
│   ├── prompt-builder.ts
│   └── json-parser.ts
│
└── app.ts
└── server.ts
```
