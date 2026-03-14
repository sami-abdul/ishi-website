---
description: Create an architecture-first implementation plan before writing any code
allowed-tools: ["Task", "Read", "Grep", "Glob"]
---

# Plan

Create a detailed implementation plan. NO code until the plan is approved.

## Process

1. **Understand the request**: Read the user's description carefully
2. **Delegate to planner agent**: Use the Task tool to dispatch the `planner` agent with:
   - The user's full request
   - Current project context (tech stack, directory structure)
   - Any constraints mentioned

3. **Present the plan**: Show the user the plan returned by the planner agent
4. **Wait for approval**: Do NOT proceed to implementation until the user explicitly approves

## Plan Structure

The planner agent will produce:
- Requirements list (explicit and inferred)
- Step-by-step breakdown (2-5 min steps each)
- Risk ratings per step
- Execution order (parallel groups and sequential dependencies)
- Questions if requirements are ambiguous

## After Approval

- Enter implementation mode
- Follow the plan step by step
- Mark each step as complete
- If a step reveals something unexpected, pause and re-plan that section

## Rules

- NEVER write code during planning
- NEVER skip the approval gate
- If the user says "just do it" without seeing the plan, show the plan first anyway
- Plans are living documents — update as implementation reveals new information
