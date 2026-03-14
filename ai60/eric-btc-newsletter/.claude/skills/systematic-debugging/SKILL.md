---
name: systematic-debugging
description: |
  Use when debugging a failing test, unexpected behavior, or production error.
  Triggers: "why is this failing", "debug", "investigate", "root cause", stack traces, error messages.
  NEVER skip to a fix without completing the investigation phases.
---

# Systematic Debugging

MANDATORY: Follow this 6-phase runbook exactly. Do NOT skip phases. Do NOT jump to a fix.

## Phase 1: Understand the Bug

- Reproduce the bug. Get the exact error message, stack trace, or incorrect output.
- State in plain English what SHOULD happen vs what DOES happen.
- If you cannot reproduce it, say so and gather more context before proceeding.

## Phase 2: Gather Evidence

- Read the failing code path end-to-end. Do not guess.
- Check logs, error output, test results, and recent git history (`git log --oneline -20`, `git diff`).
- Identify the exact line or region where behavior diverges from expectation.
- Use **binary search**: if the failure path is long, insert assertions or logs at the midpoint to halve the search space. Repeat.
- Use **git bisect** when a previously-working feature broke: `git bisect start`, `git bisect bad`, `git bisect good <known-good-sha>`, then test each step.

## Web Application Error Checklist

When debugging a web app, check the most common errors first (ordered by frequency from research):

### Frontend Errors
- [ ] Functionality Not Implemented (29.7%) — component exists but has no logic
- [ ] Unresponsive Components (23.7%) — click/submit does nothing
- [ ] Website Start Failed (14.3%) — dev server won't start
- [ ] Data Fetching Failure (9.7%) — wrong URL, CORS, missing auth header
- [ ] Form Submission Errors (9.7%) — payload shape doesn't match API schema
- [ ] Missing File Reference (4.7%) — importing nonexistent file
- [ ] Incorrect Color Theme (3.0%) — wrong CSS variables applied
- [ ] Missing Module (2.7%) — npm package not installed
- [ ] Syntax Error (2.7%) — parse failure in source

### Backend Errors
- [ ] No Database Interaction (34.3%) — returning fake/hardcoded data instead of querying DB
- [ ] API Not Implemented (33.3%) — endpoint is a stub or returns 501
- [ ] Database Setup Error (19.7%) — connection string wrong, migrations not run
- [ ] Service Won't Start (12.7%) — port conflict, missing env var, dependency error

### Database Errors
- [ ] Database Empty (46.7%) — no seed data, tables exist but no rows
- [ ] Data Fields Missing (26.0%) — schema incomplete, columns missing
- [ ] Tables Missing (19.7%) — migration not run or schema not created
- [ ] Data Structure Insufficient (7.7%) — schema doesn't match requirements

## Phase 3: Hypothesize

- Write down 2-3 concrete hypotheses for the root cause.
- For each hypothesis, state what evidence would confirm or refute it.
- Use **rubber duck debugging**: explain the code flow aloud, step by step, as if teaching someone. The explanation often reveals the flaw.

## Phase 4: Test Hypotheses

- For each hypothesis, design a minimal test or assertion that would prove or disprove it.
- Run the test. Record the result. Eliminate disproven hypotheses.
- Do NOT change production code during this phase. Only add temporary diagnostics.

## Phase 5: Identify Root Cause

- State the confirmed root cause in one sentence.
- Explain WHY the bug exists (not just what is wrong).
- Check if the same pattern exists elsewhere in the codebase.

## Phase 6: Fix & Verify

- Write a failing test that captures the bug BEFORE fixing it.
- Apply the minimal fix. Change as little as possible.
- Run the failing test — it must now pass.
- Run the full test suite — no regressions.
- Remove all temporary diagnostics added in Phase 4.

## RATIONALIZATION TABLE

| Excuse | Why It Fails |
|--------|-------------|
| "I already know what's wrong" | Then Phase 2-4 will take 30 seconds. Skip nothing. |
| "It's obviously a typo" | Typos don't need 6 phases, but verify with a test anyway. |
| "Let me just try something" | Trial-and-error creates new bugs. Hypothesize first. |
| "The fix is simple" | Simple fixes with no test regress within a week. |
| "I'll add tests later" | You won't. Write the failing test NOW. |
| "Git bisect is overkill" | It finds regressions in O(log n) commits. Use it. |

## ABSOLUTE PROHIBITION

- NEVER apply a fix without first reproducing the bug.
- NEVER skip the failing test before the fix.
- NEVER say "I think the issue might be..." without evidence from Phase 2.
- NEVER make multiple changes at once. One hypothesis, one change, one verification.
- NEVER leave temporary debug code in the final commit.
