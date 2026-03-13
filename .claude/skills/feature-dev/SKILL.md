---
name: feature-dev
description: |
  Use when implementing a new feature that requires multiple files and careful planning.
  Triggers: "implement feature", "build this feature", "add this functionality", multi-file changes.
  7-phase structured development with exploration and design before any code.
---

# Feature Development

MANDATORY: Follow all 7 phases. No code before Phase 5.

## Phase 1: Discovery

- Read the feature request carefully
- Identify what is being asked vs what is implied
- List acceptance criteria (if not provided, derive them)
- Estimate scope: how many files? Which modules?

## Phase 2: Exploration

Dispatch the `code-architect` agent (or do manually) to:
- Map relevant existing code
- Trace execution paths that the feature will touch
- Identify patterns already used for similar features
- List files that will need modification

## Phase 3: Questions

Before proceeding, resolve all ambiguities:
- Ask the user about unclear requirements
- Propose approaches for technical decisions
- Confirm scope and acceptance criteria

Do NOT proceed until all questions are answered.

## Phase 4: Design

Produce an implementation blueprint:
- New files to create (with file paths and purposes)
- Existing files to modify (with what changes)
- Interface design (types, function signatures)
- Data flow diagram (how data moves through the system)
- Test strategy (what to test and how)

Present the design to the user for approval. Do NOT proceed without approval.

## Phase 5: Implementation

Execute the approved design:
- Create/modify files in the order specified by the blueprint
- Follow TDD: write failing test → implement → verify
- One logical change per commit candidate
- Use the output format: filepath, purpose, dependencies, consumers

## Phase 6: Review

Self-review the implementation:
- Dispatch `code-reviewer` agent for quality review
- Dispatch `security-reviewer` agent for security check
- Run full test suite
- Verify all acceptance criteria are met

## Phase 7: Completion

- Summarize what was built
- List all files created/modified
- Note any follow-up work or known limitations
- Suggest tests to add if coverage is incomplete

## Rules

- NEVER skip Phase 2 (Exploration) — understanding the codebase prevents bad architecture
- NEVER skip Phase 3 (Questions) — assumptions cause rework
- NEVER write code before Phase 5 — design first
- NEVER skip Phase 6 (Review) — self-review catches 80% of issues
- If scope grows beyond the original request, stop and re-scope with the user
