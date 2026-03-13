---
name: backend-code
description: |
  Use when building backend APIs, REST/GraphQL endpoints, or setting up database schemas.
  Triggers: "build the backend", "create API", "set up database", "write endpoints", backend work for a full-stack app.
  Every endpoint MUST interact with the database. Produce an API summary for frontend handoff.
---

# Backend Code

Build backend APIs that interact with real databases and produce a structured API summary for frontend consumption.

## WHEN TO USE

- Building REST or GraphQL API endpoints
- Setting up database schemas and seed data
- Creating the backend half of a full-stack application
- When the frontend team/agent needs an API contract to build against

## THE TECHNIQUE

### Step 1: Implement APIs

For every endpoint in the backend plan:
1. Define the route (method + path)
2. Add request validation (check required fields, types, constraints)
3. Implement database interaction (query, insert, update, delete)
4. Return proper responses with correct status codes
5. Handle errors (400 for validation, 401/403 for auth, 404 for not found, 500 for server errors)

**Every endpoint MUST interact with the database.** No fake/hardcoded responses. If an endpoint returns data, it reads from the DB. If it accepts data, it writes to the DB.

### Step 2: Initialize Database

1. Create schema (tables, columns, relationships, indexes)
2. Run migrations
3. Seed demo data — **NEVER leave the database empty**
4. Verify seed data is accessible through the APIs

### Step 3: Test All Endpoints

For each endpoint, run it:
1. Start the server
2. Hit with valid input → verify correct response + correct DB state
3. Hit with invalid input → verify proper error response (not a crash)
4. Hit without auth (if protected) → verify 401/403
5. Hit with nonexistent resource → verify 404

### Step 4: Produce API Summary

Generate `API_SUMMARY.md` with this format:

```markdown
# API Summary

Base URL: http://localhost:{PORT}

## Authentication
Strategy: [jwt|session|api-key|none]
Header: [e.g., Authorization: Bearer <token>]

## Endpoints

### [Feature Group] (e.g., Users, Products, Orders)

| Method | Path | Request Body | Response (200) | Auth | Notes |
|--------|------|-------------|----------------|------|-------|
| POST | /api/users | `{email: string, password: string}` | `{id: number, email: string, token: string}` | No | Creates user + returns JWT |
| GET | /api/users | — | `[{id, email, createdAt}]` | Yes | List all users |

### Database Schema

| Table | Key Columns | Relationships |
|-------|-------------|--------------|
| users | id, email, password_hash, created_at | has_many: orders |

### Seed Data
- 3 test users (test@example.com / password123)
- 10 sample products with prices
```

This summary is the contract the frontend builds against. It must be accurate and complete.

## QUALITY CRITERIA

- Every API endpoint interacts with the database (no fake responses)
- All endpoints return proper status codes for all scenarios
- Database has seed data (never empty)
- API summary is complete and matches actual implementation
- Server starts without errors
- Auth flow works end-to-end

## ANTI-PATTERNS

These are the most common backend failures, ordered by frequency:

| Anti-Pattern | Frequency | What Goes Wrong |
|---|---|---|
| No Database Interaction | 34.3% | Endpoint returns hardcoded/fake data, never touches DB |
| API Not Implemented | 33.3% | Route defined but returns 501 or placeholder |
| Database Setup Error | 19.7% | Wrong connection string, missing migrations, schema mismatch |
| Service Won't Start | 12.7% | Port conflict, missing env var, dependency error |

**Over 67% of backend failures are endpoints that look real but don't actually work.** Test every endpoint with real requests.
