---
description: Run parallel code review and security review on current changes or a PR
argument-hint: "[PR_NUMBER]"
allowed-tools: ["Task", "Bash(git:*)", "Bash(gh:*)"]
---

# Code Review

Run code-reviewer and security-reviewer agents in parallel for comprehensive review.

## Step 1: Determine Target

- If a PR number is provided: review that PR (`gh pr diff {PR_NUMBER}`)
- If no argument: review local changes (`git diff HEAD` or `git diff --staged`)

## Step 2: Dispatch Parallel Reviews

Use the Task tool to launch BOTH agents simultaneously:

**Agent 1: code-reviewer**
- Provide: the diff, file list, project context
- Expected output: quality report with severity tiers and verdict

**Agent 2: security-reviewer**
- Provide: the diff, file list, project context
- Expected output: vulnerability report with CWE references

## Step 3: Integrate Results

After both agents return:
1. Merge findings, removing duplicates
2. Sort by severity: Critical → Improvements → Nitpicks
3. Filter by confidence: only show findings >= 80 confidence

## Step 4: Present Report

```
=== Code Review Report ===

## Critical
[findings that must be fixed]

## Security
[vulnerability findings with CWE refs]

## Improvements
[should fix, not blocking]

## Nitpicks
[optional style preferences]

## Verdict: APPROVED | REQUEST CHANGES
```

## Rules

- Always run BOTH agents — security review is not optional
- Confidence threshold: 80. Do not show lower-confidence findings.
- If either agent returns REQUEST CHANGES, the overall verdict is REQUEST CHANGES
