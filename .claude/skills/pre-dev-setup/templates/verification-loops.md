## Verification Loops

Every task must have a verification mechanism. "Give Claude a way to verify its work = 2-3x quality."

### After Implementation

1. Run the test suite — all tests must pass
2. Run the build — no compilation errors
3. Run the linter — no new violations
4. Check for debug statements (console.log, print, debugger)
5. Verify against the original requirements — not what was implemented, but what was requested

### Before Declaring Done

Ask yourself:
- Did I address every requirement in the original request?
- Are there edge cases I haven't considered?
- Would the work-verifier agent pass this? Run `/code-review` if unsure.

### Before Committing

1. `git diff` — review every changed line
2. No secrets, no debug statements, no unintended changes
3. Tests pass, build succeeds
4. Commit message follows conventional commits format

### The Verification Agent

The `work-verifier` agent can be invoked manually or automatically:
- After completing a complex task
- Before session exit (via Stop hook)
- When you're unsure if requirements are fully met

Run it: delegate to the `work-verifier` agent with a description of what was done and the original requirements.
