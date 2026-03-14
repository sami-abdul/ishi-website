---
name: frontend-code
description: |
  Use when building frontend that consumes backend APIs or connects to real data sources.
  Triggers: "wire up the frontend", "connect to API", "fetch data from backend", "form submission", building UI that needs real data flow.
  NEVER use mock/hardcoded data. Every component connects to a real endpoint.
---

# Frontend Code

Write functional frontend code that connects to real backends. This skill is about DATA FLOW, not design — use `/frontend-design` for aesthetics.

## WHEN TO USE

- Building frontend components that consume backend APIs
- Wiring up forms, lists, or dashboards to real endpoints
- Connecting frontend to a backend that already has an API summary
- After a backend-dev agent has produced an `API_SUMMARY.md`

## THE TECHNIQUE

### Step 1: Read API Contract

Parse the backend API summary. For every endpoint, note:
- Method + path (e.g., `POST /api/users`)
- Request body schema (exact field names and types)
- Response schema (what comes back)
- Status codes (success, validation error, not found, auth failure)
- Auth requirements (token header, cookie, none)

Map each UI feature to its API endpoint:
```
Feature → Endpoint
User signup form → POST /api/users
User list page → GET /api/users
User detail → GET /api/users/:id
Delete user → DELETE /api/users/:id
```

### Step 2: Wire Data Flow

Create an API client/service layer:
1. Base URL configuration (environment variable, not hardcoded)
2. Auth header injection (token from storage/context)
3. One function per endpoint (typed request + response)
4. Error handling (parse error responses, surface to UI)

Connect each component to real endpoints:
- Lists fetch on mount/navigation
- Forms submit to the correct endpoint with the correct payload shape
- Mutations invalidate/refetch affected queries
- Loading, error, and empty states are handled

**NEVER use mock/hardcoded data unless explicitly temporary.** If the backend isn't ready, say so — don't fake it.

### Step 3: Validate Integration

For each connected endpoint:
1. Trigger the action in the UI (fill form, click button, navigate)
2. Verify the request hits the correct endpoint with correct payload
3. Verify the response is rendered correctly in the UI
4. For mutations: verify the database state changed (create → read back → confirm)

### Step 4: Dynamic Testing

After implementing each feature, test it immediately:
- Don't batch all testing to the end
- Generate test cases based on the current state of development
- Test both happy path and error cases inline
- If a feature breaks a previously working feature, fix before continuing

## QUALITY CRITERIA

- Every form submits to a real API endpoint
- Every list/table fetches from a real endpoint
- Database state reflects every frontend action (no phantom submissions)
- No mock data in production code
- Error states show meaningful messages from the API
- Loading states cover every async operation
- Auth flows work end-to-end (login → token → authenticated requests)

## ANTI-PATTERNS

These are the most common frontend failures, ordered by frequency:

| Anti-Pattern | Frequency | What Goes Wrong |
|---|---|---|
| Functionality Not Implemented | 29.7% | Skeleton component with no logic, just renders markup |
| Unresponsive Components | 23.7% | Button/form exists but click/submit does nothing |
| Data Fetching Failure | 9.7% | Wrong URL, missing auth header, CORS blocked |
| Form Submission Errors | 9.7% | Payload shape doesn't match API schema |
| Missing File Reference | 4.7% | Importing a component/module that doesn't exist |
| Missing Module | 2.7% | Using a library that isn't installed |

**Over 50% of frontend failures are components that exist visually but DO NOTHING functionally.** Wire logic before styling.
