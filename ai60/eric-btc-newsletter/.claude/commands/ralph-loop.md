---
description: Start a Ralph Wiggum iterative development loop
argument-hint: "PROMPT [--max-iterations N] [--completion-promise TEXT]"
allowed-tools: ["Bash(.claude/scripts/ralph-loop-headless.sh:*)"]
---

# Ralph Wiggum Loop

Start an iterative development loop using the Ralph Wiggum technique. Each iteration is a fresh Claude session that sees accumulated file changes.

## How It Works

1. Parse the user's prompt, max iterations (default 10), and completion promise (default "DONE")
2. Invoke the headless script: `.claude/scripts/ralph-loop-headless.sh`
3. The script loops: `claude --print` → check for promise → repeat
4. Each iteration sees the actual files (not a stale context window)

## Usage

```
/ralph-loop "Fix all failing tests and ensure 100% pass rate" --max-iterations 5 --completion-promise "ALL TESTS PASS"
```

## Invoke the Script

Parse the arguments from the user's input and run:

```bash
.claude/scripts/ralph-loop-headless.sh "<prompt>" <max_iterations> "<completion_promise>" <timeout_seconds>
```

Defaults:
- max_iterations: 10
- completion_promise: "DONE"
- timeout_seconds: 300

## Completion Promise Rules

CRITICAL — explain these to the user:
- Claude may ONLY output `<promise>DONE</promise>` when the promise is completely TRUE
- Claude MUST NOT lie to escape the loop
- If Claude is stuck, it should explain what's blocking rather than falsely completing
- The promise text must be wrapped in `<promise>` tags

## When to Use

- Multi-step tasks: "implement these 5 user stories"
- CI-green loops: "keep iterating until all tests pass"
- Refactoring: "refactor module X, verify tests pass each iteration"
- Polish: "iterate on the design until it's 10/10"

## Cancellation

User can press Ctrl+C to stop the loop at any time.
