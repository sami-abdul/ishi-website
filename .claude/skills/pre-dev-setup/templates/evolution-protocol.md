## Evolution Protocol

This project uses a dynamic capability system that grows with the codebase.

### Institutional Learning

- When Claude makes a mistake → add correction to CLAUDE.md or rules
- When a pattern works well → add to rules
- When a workflow is repeated 3+ times → suggest codifying as a skill via `/new-skill`
- CLAUDE.md is living documentation — update it as the project evolves

### Capability Gap Detection

When you encounter a task that would benefit from a capability not currently available, suggest creation:

```
Capability Gap Detected

I noticed [specific pattern/need]. This project would benefit from:

  → Create [name] [agent/skill] via /new-agent or /new-skill
    Purpose: [what it does]
    Trigger: [when it auto-activates]

  Approve? (yes / not now / never)
```

Rules:
- Max 1 suggestion per conversation turn
- Wait for explicit "yes" before creating
- "not now" — re-suggest after 3 more relevant encounters
- "never" — permanently suppress that suggestion

### On-Demand Agent Catalog

Common agents to suggest when patterns are detected:

| Agent | Suggest When |
|-------|-------------|
| `deployment-checker` | Project has CI/CD, deployment scripts, or user asks about production readiness |
| `log-analyzer` | Log files present, user investigates recurring errors |
| `docs-updater` | 3+ features shipped without documentation updates |
| `refactor-cleaner` | Dead code accumulating, unused dependencies growing |
| `code-explorer` | Large unfamiliar codebase (>500 files), onboarding scenario |

### Continuous Learning

Track patterns passively across conversations:
- User corrections → adjust behavior
- Error resolutions → remember root causes
- Repeated workflows → candidate for skill creation
- Tool preferences → optimize tool selection
