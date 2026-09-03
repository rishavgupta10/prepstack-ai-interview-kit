# Architecture

## High-Level Architecture

```text
Frontend
   ↓
Express Interview Kit API
   ↓
Application Services
   ↓
Domain Validation / Generation Logic
   ↓
Research + AI Infrastructure
   ↓
MongoDB
```

## Feature Structure

```text
modules/interview-kit/
├── api/
│   ├── controller
│   └── routes
├── application/
│   ├── create
│   ├── get
│   ├── update
│   ├── delete
│   └── generation services
├── domain/
│   ├── types
│   ├── input validation
│   ├── question validation
│   ├── flashcard validation
│   └── kit validation
├── infrastructure/
│   └── interview-kit.repository.ts
├── model/
│   └── interview-kit.model.ts
└── research/
    ├── company/
    └── interview-process/
```

## Separation of Responsibilities

### API

Controllers receive requests, read authenticated user information, invoke application services, and return responses.

### Application

Application services orchestrate use cases such as creating, retrieving, updating, deleting, generating, validating, scheduling, and checking coverage.

### Domain

Domain types and validators define the expected interview-kit structure and enforce invariants.

### Infrastructure

Repositories persist interview kits using Mongoose.

### Research

Research services handle company crawling and public interview-process research.

### AI

The shared AI layer hides provider-specific SDK details behind `AIProvider`.

## User Isolation

Repository methods use both the kit ID and authenticated user ID for single-kit operations:

```ts
findById(interviewKitId, userId)
update(interviewKitId, userId, data)
delete(interviewKitId, userId)
```

This prevents a user from accessing another user's kit through a valid kit ID.
