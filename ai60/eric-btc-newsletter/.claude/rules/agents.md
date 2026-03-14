## Agent Delegation

Proactively invoke agents when trigger conditions are met:

| Agent | Trigger |
|-------|---------|
| `planner` | Complex features, multi-file changes, ambiguous requirements |
| `code-architect` | New features needing design, refactors, system design decisions |
| `code-reviewer` | After implementation, during PRs, before merge |
| `security-reviewer` | Pre-commit for auth/API changes, after dependency updates, OpenClaw config changes |
| `work-verifier` | After task completion, before declaring work done |
| `tester` | After implementation, when validating features |
| `agent-architect` | Designing new OpenClaw agents, defining IDENTITY/SOUL/AGENTS workspace files |
| `workspace-reviewer` | After agent workspace creation, before deployment, compliance audits |
| `fullstack-dev` | Full-stack web apps, coordinated backend+frontend builds |
| `backend-dev` | Backend API work, database setup, after planning is complete |
| `frontend-dev` | Frontend builds after backend is ready, UI implementation with design |

For tasks needing agents not yet created, suggest creation via `/new-agent`. See the on-demand agent catalog in the evolution protocol.

When delegating: provide the agent with focused context, specific output format requirements, and clear success criteria. Do not dump the entire conversation.
