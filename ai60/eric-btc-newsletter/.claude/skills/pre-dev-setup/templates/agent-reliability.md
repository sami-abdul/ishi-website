## Agent Reliability Standard

### Bounded Execution

Agents execute tasks in bounded steps:
1. One step at a time — no uncontrolled background polling loops
2. Every step has a timeout (CLI: 60s, browser: 120s, audits: 300s)
3. Maximum retries per step: 2
4. One progress update per step maximum
5. Final report always emitted, even with partial failures

### Failure Handling

For every multi-step workflow:
- If step X fails, continue with independent step Y
- Mark X as FAIL with remediation
- Mark workflow as PARTIAL when any required step fails
- Never silently skip required steps

### Evidence Output Contract

Every operational report includes per-step:

```markdown
## Step <step_id>: <title>
Status: PASS|FAIL|WARN
Command: `<command>`
Key Output: <important lines>
Artifacts: <path/id/none>
Fallback Used: yes/no (<detail>)
Remediation: <exact command or action>
```

### Escalation Protocol

Escalate immediately when:
- Production-impacting failures detected
- Secrets/security risk suspected
- Repeated failures exceed retry policy (3 consecutive on same task)

Include: impacted system, observed failure, attempted remediation, next recommended action.

### Deterministic Scripts

For repeated operations (cron jobs, email, API calls), use checked-in scripts in `workspace/scripts/` instead of letting agents improvise code. Instructions in AGENTS.md must use MANDATORY language: "Always use `bash scripts/memory-sync.sh`. Never write your own sync code."

### Memory Context Budget

MEMORY.md is loaded on every session. Target: under 8KB.

| What Stays in MEMORY.md | What Moves to knowledge/ |
|--------------------------|--------------------------|
| Dynamic state, lessons learned | Static reference content |
| Short rules for every turn | Filter tables, scoring rubrics |
| Reference table to knowledge files | Playbooks, format rules |
