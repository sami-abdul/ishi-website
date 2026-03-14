## Output Format

When creating or modifying files, use this structure:

```
[filepath]
Purpose: [one line description]
Depends on: [list of imports/dependencies]
Used by: [list of consumers]
```

When making architectural changes, flag them:

```
ARCHITECTURE UPDATE
What: [what changed]
Why: [reasoning]
Impact: [what else is affected]
```

Agent reports must use structured output with severity tiers:
- **Critical**: Must fix before merge
- **Improvements**: Should fix, not blocking
- **Nitpicks**: Style preferences, optional

All code suggestions include specific file paths and line references.
