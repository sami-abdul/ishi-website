## Ralph Wiggum — Iterative Development Loop

Ralph Wiggum is a technique for iterative, self-referential development loops. Each iteration is a fresh Claude session that sees the accumulated file changes from previous iterations.

### When to Use

- Multi-step tasks that benefit from iterative refinement
- CI-green loops: "keep iterating until all tests pass"
- Refactoring: "refactor module X, verify tests pass each iteration"
- Complex features: break into iterations, each building on the last

### How It Works

```
/ralph-loop "task description" --max-iterations 10 --completion-promise "DONE"
```

This invokes an external bash loop that:
1. Calls `claude --print` with the task prompt
2. Checks the output for `<promise>DONE</promise>` tags
3. If promise found and TRUE → loop ends
4. If not → increments iteration, feeds prompt again with updated file context
5. Stops after max iterations or timeout

### Completion Promise Rules

**CRITICAL**: The completion promise is a contract of truthfulness.

- You may ONLY output `<promise>DONE</promise>` when the statement is completely TRUE
- You MUST NOT lie to escape the loop
- If the task is not complete, do NOT output the promise — continue working
- If you are stuck, explain what's blocking you instead of falsely promising completion

### Defaults

- Max iterations: 10
- Timeout per iteration: 300 seconds (5 minutes)
- Completion promise: "DONE"

### Cancellation

Press Ctrl+C to stop the loop gracefully at any time.
