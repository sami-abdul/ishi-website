# Agent Reliability Standard v1

Shared reliability, security, and operations standard for all agents.

---

## Status

- Version: `v1`
- Scope: Templates + active agent workspaces
- Last updated: `{{date}}`

---

## 1) Non-Negotiable Security and Sync Model

### GitHub API Only for Memory/Context Sync

Agents MUST use dedicated scripts for workspace memory and shared context synchronization:

- `scripts/memory-sync.sh` — push `MEMORY.md` via GitHub API (auth preflight, content comparison, single commit max)
- `scripts/sync-context.js` — pull shared context files via GitHub API (recursive sync, content diffing)

These scripts are invoked by the `memory-sync` and `knowledge-sync` skills respectively.

### Authentication Rules

- Token source: `GITHUB_TOKEN` from `~/.openclaw/.env` only
- **Never** read or write `.github_token` files
- Auth preflight: validate token before any sync operation
- On auth failure: report once and stop (no retry loop)

### Not Allowed for Sync

- `git pull`, `git add`, `git commit`, `git push`
- Initializing `.git` in the workspace for memory/context sync
- Direct MCP tool calls (`mcp__github__*`) without going through scripts

### Why Scripts Instead of Direct MCP Calls

- Auth preflight catches bad tokens before sync attempts
- Content comparison prevents unnecessary commits
- Single commit max per run enforced at script level
- Consistent behavior between cron-triggered and user-triggered syncs

Reference: `docs/SECRETS-MANAGEMENT.md`

---

## 2) Bounded Execution Policy

Agents MUST execute operational tasks in bounded steps.

### Required Rules

1. One step at a time; do not run uncontrolled background polling loops.
2. Every step has a timeout.
3. Maximum retries per step: `2`.
4. Maximum progress updates per step: `1`.
5. A final report is always emitted, even with partial failures.

### Default Timeouts

| Step Type | Timeout |
|-----------|---------|
| Fast CLI checks (`curl`, `gh`, `heroku apps:info`) | 60s |
| Skill/tool listings | 60s |
| Browser screenshot/DOM checks | 120s |
| Performance audits | 300s |

---

## 3) Failure Handling Pattern

Use this pattern for every multi-step workflow:

- If step `X` fails, continue with independent step `Y`.
- Mark `X` as `FAIL` and include remediation.
- Mark workflow as `PARTIAL` when at least one required step fails.

Never silently skip required steps.

---

## 4) Operational Report Contract v1

Every operational report MUST include one entry per step with:

- `step_id`
- `status` (`PASS|FAIL|WARN`)
- `command`
- `key_output`
- `artifacts`
- `fallback_used`
- `remediation`

### Markdown Schema

```markdown
## Step <step_id>: <title>
Status: PASS|FAIL|WARN
Command: `<command>`
Key Output: <important lines or parsed result>
Artifacts: <paths/ids/none>
Fallback Used: yes/no (<detail>)
Remediation: <exact command or action>
```

---

## 5) CWV Reporting Contract v1

Core Web Vitals must be reported as:
- `INP`
- `LCP`
- `CLS`

Optional fallback:
- `FID` only when INP is unavailable from the measurement source

Every CWV report MUST state the source/tool (for example `web-perf`, Lighthouse, DevTools trace).

---

## 6) Required Instruction Schema (AGENTS.md)

Every agent `AGENTS.md` must contain these headings:

1. `Execution Guardrails`
2. `Timeout & Retry Policy`
3. `Evidence Output Contract`
4. `Fallback Rules`
5. `Escalation Rules`
6. `Security & Authentication` (token source, `.github_token` prohibition, notification channel target)

These are required regardless of agent domain.

---

## 7) Required Memory Schema (MEMORY.md)

Every agent `MEMORY.md` must contain:

1. `Critical Rules`
2. `Hard/Soft Thresholds`
3. `Baselines`
4. `Known Failure Modes + Fallbacks`
5. `Lessons Learned`

Do not leave these sections as empty placeholders in production agents.

---

## 8) Skill Installation Reliability Pattern

When `setup.sh` installs required skills, it MUST be deterministic and non-silent.

Required behavior:

1. Verify `clawdhub` is available before install attempts. If missing, install globally with `npm install -g clawdhub@latest`.
2. **Fix undici dependency**: After installing clawdhub, run `cd ~/.npm-global/lib/node_modules/clawdhub && npm install undici`. Clawdhub on Node.js 22+ is missing the `undici` module, causing `ERR_MODULE_NOT_FOUND` on install commands.
3. Install each required skill with a timeout (recommended: 180s).
4. Check idempotently — skip skills that already exist in the target directory.
5. Track installed and failed skills separately.
6. Print remediation command for each failed skill (`clawdhub install <skill>`).
7. Mark skill-install step as `FAIL` if any required skill fails.
8. Exit non-zero when critical setup steps fail.

This prevents false "healthy setup" reports when required runtime skills are missing.

### Recovery Path

`deploy.sh --skills` provides a standalone skill installation command without running full setup. Use this when skills are missing but cron jobs are already configured.

---

## 9) Cron Pattern

Cron prompts for memory/context sync must reference the dedicated scripts:

- `memory-backup`: "Run: `bash scripts/memory-sync.sh`. Use only GITHUB_TOKEN from `~/.openclaw/.env`. Never read or write `.github_token`."
- `context-pull`: "Run: `node scripts/sync-context.js`. Use only GITHUB_TOKEN from `~/.openclaw/.env`. Never read or write `.github_token`."
- All notification cron jobs must specify the correct notification channel (never DM by default)

Do not use cron messages instructing git pull/push or direct MCP tool calls for memory/context.

---

## 10) Platform Formatting Rules

Use platform-native formatting constraints.

Example ({{platform_name}}): plain text only, no markdown emphasis, raw URLs.

Each agent's AGENTS.md should specify the formatting rules for its target platform.

---

## 11) Drift Prevention

Use automated checks to detect:

- stale git-sync language in templates/docs
- missing required headings in AGENTS/MEMORY
- old skill names in active agent docs
- CWV policy drift (`INP` missing in targeted files)

Recommended implementation:
- `scripts/audit-agent-standards.sh`
- CI workflow in warn mode first, then strict fail mode

---

## 12) Skill Invocation Pattern

Skills with `user-invocable: true` in their SKILL.md frontmatter are exposed as **slash commands** (e.g., `/health-check`). This is the only reliable way to invoke a skill.

### Key Rules

1. **Slash command required**: Users must type `/skill-name` to trigger the skill. Plain text like "run a health check" does NOT inject the SKILL.md content into the agent's context — the agent only sees a compact XML summary of skill names/descriptions.
2. **Register in AGENTS.md**: Every skill must be listed in the agent's AGENTS.md Commands section so the agent knows the skill exists and can reference it.
3. **Strong mandatory language**: SKILL.md files need explicit "MANDATORY: follow this runbook exactly" sections. Without this, agents will improvise their own checks instead of following the step runbook.
4. **Auto-discovery**: Skills in `<workspace>/skills/` are auto-discovered by OpenClaw on gateway restart. No manual registration beyond AGENTS.md is needed.
5. **Session snapshot**: OpenClaw snapshots eligible skills when a session starts. Skill changes take effect on the next new session (or on gateway restart).

### SKILL.md Authoring Rules

- Include `user-invocable: true` in YAML frontmatter for user-facing skills.
- Start with a "MANDATORY: Follow This Runbook Exactly" section.
- Provide exact commands for each step — do not leave commands ambiguous.
- Include per-step timeouts, pass/fail criteria, and remediation.
- Follow the Operational Report Contract (section 4) for output format.

---

## 13) Environment Constraints

Agent deployment environments are minimal compute instances. Commands in SKILL.md and scripts must account for what is available on the instance.

### Available on Instance

- `openclaw` CLI (via `~/.npm-global/bin/`)
- `node`, `npm`, `npx`
- `curl`, `wget`, `jq`, `git`
- `python3`
- `chromium-browser` (headless-capable — see section 17)
- `bash` (NOT `sh` for scripts using bash features like arrays)
- Workspace at `~/.openclaw/workspace/`

### NOT Available on Instance (unless explicitly installed)

- Cloud provider CLIs (e.g., `gcloud`, `aws`, `az`)
- `docker`, `kubectl` (unless running Docker deployment mode)
- GUI tools, desktop environments
- OpenClaw managed browser (CDP port binding may fail with snap Chromium due to AppArmor)

### Implication for Skills

All skill commands must run **locally on the instance**. Use `openclaw gateway status --deep` instead of remote SSH-based checks. Use `openclaw cron list` instead of remote SSH-based checks.

Scripts that use bash features (arrays, `[[ ]]` tests) must use `bash` explicitly, not `sh`.

---

## 14) MEMORY.md Context Budget

MEMORY.md is loaded into the agent's bootstrap context on every session. Oversized MEMORY.md causes context overflow, leading to truncated tool outputs (e.g., empty email bodies, incomplete proposals).

### Size Target

- **MEMORY.md**: Keep under 8KB. This leaves room for IDENTITY.md, SOUL.md, USER.md, AGENTS.md, and tool context.
- If MEMORY.md exceeds 8KB, extract static reference content to `knowledge/` files.

### What Stays in MEMORY.md

- Dynamic state: saved leads, client notes, market insights, lessons learned
- Short rules that the agent needs on every turn (critical rules, search preferences)
- Reference table pointing to knowledge files

### What Moves to `knowledge/`

- Static reference content: filter tables, scoring rubrics, proof asset catalogs, format rules, playbooks
- Token management protocols, failure mode tables, API schema docs
- Anything that doesn't change between sessions

### Pattern

1. Create a focused `knowledge/<topic>.md` file with the extracted content.
2. Replace the MEMORY.md section with a one-line reference: "See `knowledge/<topic>.md`."
3. Update AGENTS.md instructions to read the knowledge file when performing that task.
4. Add a reference table in MEMORY.md mapping tasks to knowledge files.

### Why This Matters

Agents read MEMORY.md on every session start. Static content (filter tables, playbooks, proof catalogs) wastes context budget on information that never changes. Knowledge files are read on-demand only when the agent performs the relevant task.

---

## 15) Deterministic Scripts for Repeated Operations

When an agent performs the same operation repeatedly (cron jobs, email sending, API calls), use a checked-in script instead of letting the agent improvise code each run.

### Problem

Agents generate slightly different code each session. Over time this causes:
- Inconsistent behavior (different error handling, different argument parsing)
- Silent failures (agent forgets a step, uses wrong config)
- Context waste (agent spends tokens writing boilerplate instead of doing work)

### Pattern

1. Write a deterministic script in `workspace/scripts/` (e.g., `send-email.js`, `{{platform_name}}-search.js`).
2. The script reads config from environment variables (via `~/.openclaw/.env`) and accepts input via stdin JSON or CLI args.
3. Instruct the agent in AGENTS.md to call the script — never write its own version.
4. Use "MANDATORY" language: "Always use `node scripts/send-email.js`. Never write your own nodemailer code."

### Script Authoring Rules

- Load secrets from `~/.openclaw/.env` only (never hardcode, never read other token files).
- When parsing `.env` files manually, **strip surrounding quotes** from values:
  ```js
  const raw = trimmed.slice(eqIdx + 1).trim();
  const value = raw.replace(/^["']|["']$/g, "");
  ```
  Without this, values like `SMTP_APP_PASSWORD="abc123"` will include literal quote characters.
- Exit with non-zero status on failure so the agent can detect and report errors.
- Log prefixed output (e.g., `[email]`, `[search]`) for easy filtering in logs.
- Support both stdin JSON and CLI args for flexibility.

### Candidates for Deterministic Scripts

| Operation | Why |
|-----------|-----|
| Email sending (SMTP) | Complex auth setup, consistent formatting |
| API searches ({{platform_name}}, etc.) | Token refresh, dedup, pagination logic |
| Memory/context sync | Auth preflight, content comparison |
| Report generation | Consistent structure, artifact collection |

---

## 16) Model Failover Configuration

OpenClaw has two separate model configuration sections in `openclaw.json`:

- `model.fallbacks` — defines which models to try when the primary model fails (429, 500, etc.)
- `models` — defines which models are **allowed** for the agent (both automatic failover and manual `/model` switching)

**Critical**: Every model in `fallbacks` MUST also appear in the `models` allowed list. If a fallback model is missing from `models`, the gateway rejects it with "Model not allowed" — silently breaking automatic failover.

### Correct Configuration

```json
"model": {
  "primary": "{{provider}}/{{primary_model}}",
  "fallbacks": ["{{provider}}/{{fallback_model}}"]
},
"models": {
  "{{provider}}/{{primary_model}}": {},
  "{{provider}}/{{fallback_model}}": {}
}
```

### Symptoms of Missing `models` Entry

- Agent hits 429 quota limit on primary model
- Automatic fallback fails: "Model not allowed"
- Manual `/model {{fallback_model}}` also fails
- Agent appears stuck or unresponsive after quota exhaustion

### Lesson Learned

This bug can affect all deployed agents simultaneously. The `models` object may be either empty (`{}`) or missing entirely in `openclaw.json` files, while `model.fallbacks` is correctly configured. Always verify both sections when deploying a new agent or updating model configuration.

---

## 17) Headless Chromium for JS-Rendered Pages

Deployment instances may have Chromium installed, but the OpenClaw managed browser service may not work with it (e.g., snap AppArmor blocks CDP port binding). For scripts that need to fetch JS-rendered page content, use headless Chromium directly:

```bash
chromium-browser --headless --no-sandbox --disable-gpu --dump-dom "$URL" > output.html
```

This renders JavaScript fully before dumping the DOM — equivalent to viewing the page in a real browser. The output is standard HTML that can be parsed with Python regex or any HTML parser.

### When to Use

- Fetching JS-rendered pages (Next.js, React, etc.) where `curl` only gets an empty shell
- Article scanning, content scraping, or link extraction from dynamic sites
- Any automation that needs rendered DOM but doesn't need interactive browser control

### When NOT to Use

- Interactive browser automation (clicking, typing, form filling) — use OpenClaw browser tools directly from the agent
- Pages requiring authentication cookies — use the agent's native `browser` tool instead

### Pattern (article-scanner.sh)

1. Detect Chromium binary: check `chromium-browser`, `chromium`, `google-chrome`
2. Fetch with timeout: `timeout 45s chromium-browser --headless --no-sandbox --disable-gpu --dump-dom "$URL"`
3. Write to temp file (avoid env var size limits)
4. Parse HTML with Python for structured extraction
5. Clean up temp file via `trap cleanup EXIT`

---

## 18) Local Multi-Agent Gateway

Multiple agents can run on a single local machine through one shared OpenClaw gateway process. This is the preferred deployment mode for cost optimization.

### Architecture

- **Single gateway process** hosts all agents (OpenClaw global lock prevents multiple gateways)
- Each agent gets **isolated workspace, state directory, and session store**
- Messages routed to agents via **bindings** (matching {{channel_type}} accountId to agent ID)
- Each agent has its own **bot token** (registered as named accounts)
- **Shared:** model providers, secrets (.env), cron engine, managed skills

### Key Config Sections

```json
{
  "agents": {
    "list": [
      { "id": "{{agent_id_1}}", "workspace": "~/.openclaw/agents/{{agent_id_1}}/workspace", "agentDir": "~/.openclaw/agents/{{agent_id_1}}/agent" },
      { "id": "{{agent_id_2}}", "workspace": "~/.openclaw/agents/{{agent_id_2}}/workspace", "agentDir": "~/.openclaw/agents/{{agent_id_2}}/agent" }
    ]
  },
  "bindings": [
    { "agentId": "{{agent_id_1}}", "match": { "channel": "{{channel_type}}", "accountId": "{{agent_id_1}}-bot" } },
    { "agentId": "{{agent_id_2}}", "match": { "channel": "{{channel_type}}", "accountId": "{{agent_id_2}}-bot" } }
  ],
  "channels": {
    "{{channel_type}}": {
      "accounts": {
        "{{agent_id_1}}-bot": { "botToken": "${BOT_TOKEN_{{AGENT_ID_1}}}" },
        "{{agent_id_2}}-bot": { "botToken": "${BOT_TOKEN_{{AGENT_ID_2}}}" }
      }
    }
  }
}
```

### Critical Rules

1. **Never reuse `agentDir`** across agents — causes auth and session collisions
2. **Stop remote instances** before starting locally — two bots with the same token causes `409: Conflict`
3. **One default agent** — set `"default": true` on exactly one agent (fallback for unmatched messages)
4. **Context symlinks must be resolved** — `deploy.sh` copies real files (not symlinks) to deployed workspaces

### Deployment Flow

```
Edit workspace in repo -> Run deploy.sh -> Restart gateway -> Test in channel
```

Source: `local-gateway/deploy.sh` copies workspaces, resolves context symlinks, deploys config.

Full documentation: [LOCAL-DEPLOYMENT.md](LOCAL-DEPLOYMENT.md)

---

## 19) Legacy Note

Older docs/examples may reference pre-v1 patterns (git-based sync, older skill names, legacy script names). Treat those as historical only unless explicitly marked current.

All new or updated agents must follow this v1 standard.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | {{date}} | Initial reliability standard |
| v1.1 | {{date}} | Added section 18 (local multi-agent gateway pattern) |
