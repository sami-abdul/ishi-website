---
name: pre-dev-setup
description: |
  Use when bootstrapping a new OpenClaw multi-agent project.
  Triggers: "setup project", "initialize", "new project", "bootstrap", "configure openclaw".
  Interviews the user about their agent swarm, then generates CLAUDE.md, openclaw.json, Docker Compose, agent workspaces, and deployment scripts.
---

# Pre-Development Setup — OpenClaw Multi-Agent Template

You are the project setup orchestrator. Your job is to interview the user about their multi-agent swarm and generate a complete OpenClaw infrastructure with security hardening, Docker deployment, and agent workspaces.

## Phase 1: Interview

Ask these questions ONE AT A TIME using interactive prompts. Do not batch them.

1. **Project name** — What is your multi-agent project called?
2. **Project purpose** — Describe what your agent swarm does (1-2 sentences).
3. **Agent roster** — List your agents with their roles. Which one is the orchestrator? (e.g., "Rex (orchestrator), Sam (sales), Maya (marketing)")
4. **Channel type** — Discord / Telegram / Slack / WhatsApp / Other?
5. **Orchestrator pattern** — Hub-and-spoke (one orchestrator directs all) / Peer-to-peer (agents coordinate directly) / Event-driven (pub/sub)?
6. **Deployment mode** — Docker Compose (recommended) / Bare-metal local / Cloud VPS?
7. **Shared context** — Does the swarm need shared context? Owner profile? Organization docs? Knowledge base?
8. **Memory sync** — How should agents persist memory? GitHub API (recommended) / Database / Local-only?
9. **Model provider** — Anthropic / OpenAI / Google / Moonshot / OpenRouter / Other?
10. **Agent capabilities** — Which capabilities do agents need? Browser / Code execution / Web search / Email / Cron jobs?
11. **Security tier** — Hardened (recommended, all agents sandboxed, strict tool policies) / Standard (sandboxed, moderate policies) / Minimal (dev-only, relaxed)?
12. **Sandbox mode** — All agents sandboxed (recommended) / Orchestrator unsandboxed (orchestrator trusted, workers sandboxed) / No sandbox (dev-only)?
13. **Agent trust levels** — For each agent, what trust level? Full (orchestrator) / Coding (trusted worker) / Minimal (read-only worker) / Messaging (public-facing)?
14. **Optional features** — Enable any of: Winston structured logging? Ralph Wiggum iterative loops? Evolution protocol? GitHub MCP?

Store all answers before proceeding.

## Phase 2: Generate CLAUDE.md

Read the following template files and assemble a CLAUDE.md customized to the user's answers:

1. Read `.claude/skills/pre-dev-setup/templates/philosophy.md`
2. Read `.claude/skills/pre-dev-setup/templates/core-workflow-rules.md`
3. Read `.claude/skills/pre-dev-setup/templates/development-rules.md`
4. Read `.claude/skills/pre-dev-setup/templates/multi-agent-architecture.md`
5. Read `.claude/skills/pre-dev-setup/templates/agent-workspace-standards.md`
6. Read `.claude/skills/pre-dev-setup/templates/agent-reliability.md`
7. Read `.claude/skills/pre-dev-setup/templates/security-hardening.md`
8. Read `.claude/skills/pre-dev-setup/templates/secrets-management.md`
9. Read `.claude/skills/pre-dev-setup/templates/verification-loops.md`
10. Read the matching channel profile from `.claude/skills/pre-dev-setup/profiles/{channel}.md`
11. If evolution protocol enabled: read `.claude/skills/pre-dev-setup/templates/evolution-protocol.md`
12. If Ralph Wiggum enabled: read `.claude/skills/pre-dev-setup/templates/ralph-wiggum.md`
13. If Winston logging enabled: read `.claude/skills/pre-dev-setup/templates/logging-winston.md`

Assemble CLAUDE.md with these sections:
- Project header (name, purpose, quick start commands)
- Agent roster table (name, emoji, role, trust level, channel)
- Multi-agent architecture (from template, customized with orchestrator pattern)
- Agent workspace standards (from template)
- Agent reliability standard (from template)
- Security hardening (from template, customized to selected security tier)
- Secrets management (from template)
- Development rules: NEVER/ALWAYS lists (from template, includes multi-agent rules)
- Verification loops (from template, includes agent deployment verification)
- Channel-specific conventions (from profile)
- Conditional sections based on user choices

If a CLAUDE.md already exists, back it up to `CLAUDE.md.backup` before overwriting.

## Phase 3: Generate openclaw.json

Read `templates/openclaw.json.template` and generate `local-gateway/openclaw.json` with:

1. **Gateway config**: Set `bind: "loopback"`, `auth.mode: "token"`
2. **Model provider**: Set from Q9 answer
3. **Channel accounts**: Generate account entries for the selected channel type (Q4)
4. **Agent entries**: For each agent from Q3:
   - Set `agentId`, `agentDir`, `default` (true for orchestrator)
   - Set `tools.profile` based on trust level from Q13:
     - Full → `"full"` with `sessions_send`, `sessions_spawn` allowed
     - Coding → `"coding"` with exec allowlist
     - Minimal → `"minimal"` with read + message only
     - Messaging → `"messaging"` with message only
   - Set sandbox config based on Q12:
     - All sandboxed → `sandbox.mode: "all"`, `scope: "agent"`
     - Orchestrator unsandboxed → orchestrator gets `"off"`, workers get `"all"`
     - No sandbox → `sandbox.mode: "off"` (add warning comment)
5. **Bindings**: Route channel accountIds to agents
6. **Security baseline**: Apply hardened defaults from Q11:
   - Hardened: deny `group:automation`, `group:runtime`, `group:fs`, `sessions_spawn`; exec allowlist; elevated disabled
   - Standard: deny `group:automation`; exec allowlist; elevated disabled
   - Minimal: no denies; elevated disabled (add warning)
7. **Agent-to-agent**: Enable `agentToAgent` with explicit allow list for orchestrator
8. **Session config**: `dmScope: "per-channel-peer"`, daily reset

## Phase 4: Generate Docker Compose

Read `templates/docker/docker-compose.yml.template` and generate `docker-compose.yml` with:

1. Gateway service with project name as container name
2. Port binding to `127.0.0.1:18789` (loopback only)
3. Volume mounts for config, agent workspaces, and Docker socket
4. Health check configuration
5. Environment from `.env`

Also copy `templates/docker/Dockerfile.gateway` to project root.
If dev overrides needed, copy `templates/docker/docker-compose.override.yml.template`.

## Phase 5: Generate Agent Workspaces

For each agent from Q3, create the workspace directory structure:

```
{agent-name}/
└── workspace/
    ├── IDENTITY.md      # Agent name, emoji, role, org, vibe
    ├── SOUL.md          # Persona, voice, boundaries
    ├── AGENTS.md        # 6 required sections (guardrails, timeouts, evidence, fallback, escalation, security)
    ├── USER.md          # User profile, channel bindings
    ├── TOOLS.md         # Available tools for this trust level
    ├── MEMORY.md        # 5 required sections (rules, thresholds, baselines, failures, lessons)
    ├── CRON_JOBS.md     # Scheduled tasks (if any from Q10)
    ├── context/         # Symlinks to shared context (from Q7)
    ├── skills/          # Agent-specific skills
    ├── knowledge/       # Static reference files
    └── memory/          # Daily memory logs
```

Read workspace templates from `templates/workspace/` and customize:
- IDENTITY.md: Set name, emoji (ask or auto-assign), role from Q3
- SOUL.md: Generate persona matching role
- AGENTS.md: Include all 6 required sections, set trust-appropriate tool references
- TOOLS.md: List tools matching the agent's trust level and capabilities from Q10/Q13
- MEMORY.md: Initialize with 5 required sections (empty but structured)

For the orchestrator specifically:
- Add co-located agent roster table to IDENTITY.md
- Add `sessions_send` and `sessions_spawn` to TOOLS.md
- Add agent monitoring instructions to AGENTS.md

## Phase 6: Generate Scripts and Config

1. **Deploy script**: Read `templates/deploy.sh.template` → generate `scripts/deploy.sh`
   - Docker Compose build + up
   - Workspace deployment to container volumes
   - Post-deploy security audit
2. **Setup script**: Read `templates/setup.sh.template` → generate `scripts/setup.sh`
   - Prerequisites check (Docker, openclaw CLI)
   - .env creation from template
   - Initial workspace setup
3. **Memory sync**: Copy `templates/scripts/memory-sync.sh.template` → `scripts/memory-sync.sh`
4. **Context sync**: Copy `templates/scripts/sync-context.js.template` → `scripts/sync-context.js`
5. **.env.example**: Read `templates/.env.example` → generate `.env.example` with channel-appropriate tokens
6. **.gitignore**: Read `templates/.gitignore.template` → generate `.gitignore`

## Phase 7: Customize Rules

Read each file in `.claude/rules/`. For OpenClaw-specific rules:
- `openclaw-workspace.md` — No changes needed (generic)
- `openclaw-gateway.md` — Add project-specific agent count and channel type
- `openclaw-security.md` — Adjust to selected security tier (Q11)
- `security.md` — No changes needed (already includes agent security)
- `agents.md` — No changes needed (already includes agent-architect + workspace-reviewer)

## Phase 8: Customize Agents

Read each agent in `.claude/agents/`. Replace these placeholders with project-specific values:
- `{TECH_STACK}` → "OpenClaw + Node.js + Docker"
- `{BUILD_COMMAND}` → `docker compose build`
- `{TEST_COMMAND}` → `openclaw security audit --deep`
- `{DEPLOY_TARGET}` → Docker Compose (local) or Cloud VPS
- `{LINT_COMMAND}` → `docker compose config --quiet`

## Phase 9: Configure settings.local.json

Generate `.claude/settings.local.json` with permissions:

```json
{
  "permissions": {
    "allow": [
      "Bash(docker compose:*)",
      "Bash(docker build:*)",
      "Bash(docker ps:*)",
      "Bash(docker logs:*)",
      "Bash(openclaw:*)",
      "Bash(git status)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)",
      "Bash(chmod 600:*)",
      "Bash(chmod 700:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)",
      "Bash(docker run --privileged:*)"
    ]
  }
}
```

## Phase 10: Configure MCP (.mcp.json)

If the user selected GitHub MCP (Q14), copy `.mcp.json.example` to `.mcp.json` and guide through token setup.

## Phase 11: Optional Setup

- **If Winston logging**: Create logger utility, add `logs/` to `.gitignore`
- **If Ralph Wiggum**: Verify `.claude/scripts/ralph-loop-headless.sh` exists
- **If Evolution protocol**: Add capability gap detection section to CLAUDE.md

## Phase 12: Summary

Print a summary of everything that was created:

```
=== OpenClaw Multi-Agent Setup Complete ===

Project: {project_name}
Agents: {count} ({agent list with emojis})
Channel: {channel_type}
Security: {security_tier}
Deployment: {deployment_mode}

Generated Files:
  CLAUDE.md                — Project config with {agent_count}-agent architecture
  local-gateway/
    openclaw.json          — Gateway config (hardened, {security_tier})
  docker-compose.yml       — Docker deployment ({agent_count} containers)
  Dockerfile.gateway       — Gateway container image
  {agent_dirs}             — Agent workspaces (7 files each)
  scripts/
    deploy.sh              — Docker Compose deployment
    setup.sh               — First-time setup
    memory-sync.sh         — GitHub API memory sync
  .env.example             — Environment template
  .gitignore               — Excludes .env, credentials

Rules (11)    — coding-style, git-workflow, testing, security, output-format, agents,
                performance, parallel-dispatch, openclaw-workspace, openclaw-gateway, openclaw-security
Agents (8)    — planner, code-architect, code-reviewer, security-reviewer,
                work-verifier, tester, agent-architect, workspace-reviewer
Skills (12)   — pre-dev-setup, new-agent, deploy-gateway, health-check, security-audit,
                workspace-audit, add-agent-to-gateway, systematic-debugging, feature-dev,
                tdd, new-skill, e2e-loop
Commands (6)  — /commit, /pr, /plan, /code-review, /prd-init, /ralph-loop

Next Steps:
  1. cp .env.example .env && $EDITOR .env    # Add your tokens
  2. chmod 600 .env                           # Secure permissions
  3. ./scripts/setup.sh                       # Verify prerequisites
  4. ./scripts/deploy.sh                      # Build + deploy gateway
  5. /health-check                            # Verify deployment
  6. /security-audit                          # Run security audit

Documentation:
  docs/LOCAL-DEPLOYMENT.md        — Docker deployment guide
  docs/AGENT-CREATION-CHECKLIST.md — Add more agents
  docs/SECURITY-GUIDE.md          — Security hardening reference
  docs/SECRETS-MANAGEMENT.md      — Credential management
  docs/AGENT-PATTERNS.md          — Reliability patterns
```
