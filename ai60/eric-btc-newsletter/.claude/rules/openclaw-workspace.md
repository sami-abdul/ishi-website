## OpenClaw Workspace Standards

Agent workspace files: IDENTITY.md (who), SOUL.md (personality), AGENTS.md (instructions), USER.md (channel bindings), TOOLS.md (available tools), MEMORY.md (persistent state), CRON_JOBS.md (scheduled tasks).

AGENTS.md requires 6 sections: Execution Guardrails, Timeout & Retry Policy, Evidence Output Contract, Fallback Rules, Escalation Rules, Security & Authentication.

MEMORY.md under 8KB — extract static content to `knowledge/`. Required sections: Critical Rules, Hard/Soft Thresholds, Baselines, Known Failure Modes + Fallbacks, Lessons Learned.

Skills need `user-invocable: true` in YAML frontmatter and MANDATORY runbook language. Register all skills in AGENTS.md Commands section. Plain text does NOT trigger skills — only `/slash-commands` inject SKILL.md context.

Context symlinks in `context/` are read-only. Agents write only to MEMORY.md and `memory/`.
