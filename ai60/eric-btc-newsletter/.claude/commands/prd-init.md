---
description: Initialize a JSON-based PRD for scoped development
allowed-tools: ["Read", "Write", "Bash(mkdir:*)"]
---

# PRD Init

Initialize a JSON-based Product Requirements Document for structured, scoped development.

## Step 1: Interview

Ask the user:
1. **Project/feature name** — what are we building?
2. **User stories** — what should the user be able to do? (list them)
3. **Priorities** — rank the stories (P0 = must have, P1 = should have, P2 = nice to have)
4. **Acceptance criteria** — for each story, what defines "done"?

## Step 2: Create PRD

Create `.claude/prd/` directory and generate the PRD:

```json
{
  "name": "Feature Name",
  "created": "2026-02-05",
  "stories": [
    {
      "id": "S1",
      "title": "User story title",
      "priority": "P0",
      "acceptance_criteria": [
        "Criterion 1",
        "Criterion 2"
      ],
      "passes": false,
      "notes": ""
    }
  ]
}
```

Save to `.claude/prd/{feature-name}.json`.

## Step 3: Confirm

Print the PRD summary:
```
PRD Created: .claude/prd/{feature-name}.json

Stories:
  [P0] S1: Story title (not started)
  [P0] S2: Story title (not started)
  [P1] S3: Story title (not started)

Next: /prd-next to work on highest priority story
Status: /prd-status for progress overview
```

## Companion Commands

This command creates the PRD. Related workflows:
- To work on the next story: manually check the PRD and pick the highest priority with `passes: false`
- To check progress: read the PRD JSON and summarize status
- When a story is complete: update `passes: true` in the JSON

## Rules

- One PRD per feature/project scope
- Stories must have clear, testable acceptance criteria
- Always start with the highest priority (P0) stories
- Mark stories `passes: true` only when ALL acceptance criteria are met
