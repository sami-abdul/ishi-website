## Parallel Agent Dispatch

When facing 2+ independent tasks, dispatch parallel agents via the Task tool:

- Each agent prompt must be self-contained with all necessary context.
- Specify the expected output format in the prompt.
- Do not share state between parallel agents — each works independently.
- After all agents return, integrate results and verify consistency.
- Post-integration verification is required: check for conflicts, duplicates, or contradictions.
