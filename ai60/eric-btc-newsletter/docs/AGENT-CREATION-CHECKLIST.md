# Agent Creation Checklist

Step-by-step guide for creating and deploying a new agent.

---

## Deployment Modes

This project supports three deployment modes:

| Mode | Best For | Config Location |
|------|----------|-----------------|
| **Docker Compose** | Reproducible deployments, team environments | `docker-compose.yml` |
| **Local gateway** | Cost optimization, agents with light compute needs | `local-gateway/openclaw.json` |
| **Cloud VPS** | 24/7 uptime, browser automation, isolated compute | Per-agent `deploy.sh` |

For local multi-agent gateway deployment details, see [LOCAL-DEPLOYMENT.md](LOCAL-DEPLOYMENT.md).

---

## Quick Start

```bash
# 1. Copy templates to your agent directory
cp -r templates/workspace agents/{{org_name}}/{{agent_name}}/workspace
cp templates/deploy.sh.template agents/{{org_name}}/{{agent_name}}/deploy.sh
cp templates/setup.sh.template agents/{{org_name}}/{{agent_name}}/setup.sh
cp templates/.env.example agents/{{org_name}}/{{agent_name}}/.env.example

# 2. Customize the configuration in deploy.sh and setup.sh

# 3. Create context symlinks
cd agents/{{org_name}}/{{agent_name}}/workspace/context
ln -s ../../../../../owner owner
ln -s ../../../../../orgs/{{org_name}} {{org_name}}

# 4a. Deploy via Docker Compose (recommended)
docker compose up -d

# 4b. OR deploy to local gateway (see LOCAL-DEPLOYMENT.md)
#   - Add agent to local-gateway/openclaw.json
#   - Add workspace copy to local-gateway/deploy.sh
#   - Run: cd local-gateway && ./deploy.sh
#   - Restart: openclaw gateway restart

# 4c. OR deploy to cloud VPS
cd agents/{{org_name}}/{{agent_name}}
./deploy.sh --setup
```

---

## Pre-Deployment Checklist

### 1. Directory Structure

Create the agent directory:
```
agents/{{org_name}}/{{agent_name}}/
├── deploy.sh           # Deployment script
├── setup.sh            # Post-deployment setup
├── Dockerfile          # Agent container image (Docker mode)
├── .env.example        # Environment template
├── DEPLOYMENT.md       # Operations guide
└── workspace/
    ├── IDENTITY.md     # Agent identity
    ├── SOUL.md         # Persona and behavior
    ├── USER.md         # User profile and notification channel ID
    ├── AGENTS.md       # Operating instructions
    ├── MEMORY.md       # Persistent memory
    ├── CRON_JOBS.md    # Cron job documentation
    ├── TOOLS.md        # Available tools
    ├── context/        # Symlinks to shared context
    ├── scripts/        # Sync scripts (memory-sync.sh, sync-context.js)
    ├── skills/         # Custom skills
    ├── knowledge/      # Domain knowledge
    └── memory/         # Daily logs
```

**Checklist:**
- [ ] Directory created at correct path
- [ ] Follows naming convention: `{{agent_name}}-{{function}}` (e.g., `agent-search`)
- [ ] Organization placement correct

---

### 2. Bootstrap Files

Customize each file from templates:

| File | Purpose | Key Customizations |
|------|---------|-------------------|
| `IDENTITY.md` | Who the agent is | Name, emoji, role, organization, vibe |
| `SOUL.md` | Personality and approach | Voice, tone, content guidelines |
| `USER.md` | User profile | Name, email, notification channel ID |
| `AGENTS.md` | Operating instructions | Workflow, skills, security rules |
| `MEMORY.md` | Persistent storage | Initial structure (empty sections) |
| `CRON_JOBS.md` | Cron documentation | All scheduled jobs with names and schedules |
| `TOOLS.md` | Tool documentation | Available tools and policies |

**Checklist:**
- [ ] IDENTITY.md customized with agent details
- [ ] SOUL.md reflects agent's personality
- [ ] USER.md has notification channel ID and user info
- [ ] AGENTS.md has workflow instructions + Security & Authentication section
- [ ] MEMORY.md has proper section structure + `.env`-only token rule
- [ ] CRON_JOBS.md documents all cron jobs
- [ ] TOOLS.md lists available tools

---

### 3. Context Symlinks

Create symlinks to shared context:

```bash
cd agents/{{org_name}}/{{agent_name}}/workspace/context

# Always link owner
ln -s ../../../../../owner owner

# Link organization(s)
ln -s ../../../../../orgs/{{org_name}} {{org_name}}
```

**Checklist:**
- [ ] `context/owner/` symlink created
- [ ] Organization symlink(s) created
- [ ] Symlinks verified with `ls -la`

---

### 4. Scripts and Skills

Create sync scripts in `workspace/scripts/`:

**Required scripts:**
- [ ] `memory-sync.sh` — Push MEMORY.md via GitHub API (adapt from template, change TARGET_PATH)
- [ ] `sync-context.js` — Pull context via GitHub API (set correct org mappings)
- [ ] `nightly-backup.sh` — Delegation stub that calls memory-sync.sh

Create agent-specific skills in `workspace/skills/`:

**Essential skills:**
- [ ] `memory-sync/` — Calls `bash scripts/memory-sync.sh` (not MCP tools directly)
- [ ] `knowledge-sync/` — Calls `node scripts/sync-context.js` (not MCP tools directly)

**Agent-specific skills:**
- [ ] Primary workflow skill(s)
- [ ] Platform-specific skills (if applicable)

**Skill structure:**
```
skills/<skill-name>/
└── SKILL.md    # Skill definition with triggers and instructions
```

**Skill authoring rules:**
- Include `user-invocable: true` in YAML frontmatter for user-facing skills
- Start with a "MANDATORY: Follow This Runbook Exactly" section — without this, agents will improvise instead of following the runbook
- Provide exact commands for each step (not vague descriptions)
- All commands must run **locally on the instance** — do not assume cloud CLIs are available
- Use `bash` (not `sh`) for scripts that use arrays or bash-specific features
- Include per-step timeouts, pass/fail criteria, and remediation
- Follow the Operational Report Contract from `docs/AGENT-PATTERNS.md`

**Skill registration (CRITICAL):**
- [ ] Every skill MUST be listed in the agent's `AGENTS.md` Commands section
- [ ] Users invoke skills via `/skill-name` slash command (e.g., `/health-check`)
- [ ] Plain text messages do NOT trigger skill invocation — only slash commands inject the full SKILL.md into context

---

### 5. Deployment Scripts

Customize deployment scripts based on your deployment mode:

#### Docker Compose Mode

- [ ] `Dockerfile` created with correct base image and dependencies
- [ ] Agent entry added to `docker-compose.yml`
- [ ] Volume mounts configured for workspace and agent state
- [ ] Environment variables passed via `.env` file
- [ ] Health check configured in compose service
- [ ] Network isolation configured (if needed)

#### Local Gateway Mode

- [ ] Agent added to `local-gateway/openclaw.json` (agents.list, bindings, channel accounts)
- [ ] Workspace copy logic added to `local-gateway/deploy.sh`
- [ ] Context symlink resolution added to deploy script

#### Cloud VPS Mode

**deploy.sh:**
- [ ] `INSTANCE_NAME` set to cloud instance name
- [ ] `ZONE` / `REGION` set correctly
- [ ] `PROJECT` set to cloud project ID
- [ ] Bootstrap file list includes `CRON_JOBS.md` and `USER.md`
- [ ] `scripts/` directory is copied to instance
- [ ] `--skills` flag supported for standalone community skill installation
- [ ] `--setup` flag supported for full post-deployment setup

**setup.sh:**
- [ ] `INSTANCE_NAME` matches deploy.sh
- [ ] `MEMORY_PATH` set to `agents/{{org_name}}/{{agent_name}}/workspace/MEMORY.md`
- [ ] `NOTIFICATION_CHANNEL_ID` set to agent's notification channel
- [ ] `TIMEZONE` set correctly
- [ ] Uses `openclaw cron rm` (NOT `openclaw cron delete --id`)
- [ ] Has `get_job_ids_by_name` / `delete_jobs_by_name` helpers
- [ ] Has legacy cron cleanup step before creating new jobs
- [ ] Cron prompts reference scripts (`bash scripts/memory-sync.sh`, `node scripts/sync-context.js`)
- [ ] Cron prompts include `.env`-only and no-`.github_token` rules
- [ ] Notification cron prompts specify notification channel ID
- [ ] `CLAWDHUB_SKILLS` list includes all required ready-made skills
- [ ] Per-skill install timeout is enforced (for example `180s`)
- [ ] Failed skill installs are collected and reported individually
- [ ] Setup marks skill-install step as **FAIL** (not warn) when any required skill is missing
- [ ] Remediation command is printed for each failed skill (`clawdhub install <skill>`)

---

### 6. Environment Template

Update `.env.example` with required variables:

- [ ] Model provider API key
- [ ] Platform credentials (if applicable)
- [ ] GitHub token and username
- [ ] Channel bot token (e.g., `BOT_TOKEN_{{AGENT_NAME}}`)
- [ ] Any custom environment variables

---

### 7. Documentation

Create `DEPLOYMENT.md` with:

- [ ] Instance/container details table
- [ ] Quick deploy commands
- [ ] Post-deployment setup instructions
- [ ] Troubleshooting section
- [ ] Related files list

---

## Docker Compose Setup

For agents running via Docker Compose (recommended for reproducible deployments).

### docker-compose.yml Entry

```yaml
services:
  {{agent_name}}:
    build:
      context: ./agents/{{org_name}}/{{agent_name}}
      dockerfile: Dockerfile
    container_name: openclaw-{{agent_name}}
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - ./agents/{{org_name}}/{{agent_name}}/workspace:/home/openclaw/.openclaw/workspace
      - {{agent_name}}-state:/home/openclaw/.openclaw/agent
      - {{agent_name}}-sessions:/home/openclaw/.openclaw/sessions
    healthcheck:
      test: ["CMD", "openclaw", "gateway", "health"]
      interval: 60s
      timeout: 10s
      retries: 3

volumes:
  {{agent_name}}-state:
  {{agent_name}}-sessions:
```

### Dockerfile Template

```dockerfile
FROM node:20-slim

RUN npm install -g @openclaw/cli clawdhub@latest

WORKDIR /home/openclaw
COPY workspace/ .openclaw/workspace/
COPY openclaw.json .openclaw/openclaw.json

# Install agent-specific dependencies
COPY workspace/scripts/package.json .openclaw/workspace/scripts/package.json
RUN cd .openclaw/workspace/scripts && npm install --production

EXPOSE 18789
CMD ["openclaw", "gateway", "run"]
```

**Checklist:**
- [ ] Dockerfile builds successfully
- [ ] Container starts and gateway runs
- [ ] Agent responds via channel
- [ ] Skills auto-discovered from workspace
- [ ] Cron jobs configured
- [ ] Health check passes

---

## Local Gateway Setup

For agents running on the local multi-agent gateway (instead of Docker or cloud VPS).

### Add Agent to Gateway Config

Edit `local-gateway/openclaw.json`:

- [ ] Add entry to `agents.list` with unique `id`, `workspace`, and `agentDir` paths
- [ ] Add binding in `bindings` to route channel messages to agent
- [ ] Add bot account in `channels.{{channel_type}}.accounts`
- [ ] Add guild/channel entry with `requireMention` setting
- [ ] `agentDir` path is unique (never reused across agents)

### Add Agent to deploy.sh

Edit `local-gateway/deploy.sh`:

- [ ] Add `mkdir -p` for agent's workspace and agent directories
- [ ] Add `rsync` command to copy workspace from repo source
- [ ] Add context symlink resolution (copy `owner/`, `orgs/` into `context/`)
- [ ] Add any credential migration if applicable
- [ ] Add npm dependency installation if `package.json` exists

### Add Secrets

- [ ] Create bot via channel provider's developer portal
- [ ] Add `BOT_TOKEN_{{AGENT_NAME}}` to `~/.openclaw/.env`
- [ ] Add any agent-specific API keys to `~/.openclaw/.env`
- [ ] Update `local-gateway/.env.example` with new placeholder variables

### Deploy and Verify

```bash
cd local-gateway && ./deploy.sh
openclaw gateway restart

# Verify agent appears in gateway logs
# @mention agent in channel
```

**Checklist:**
- [ ] Agent appears in gateway startup logs
- [ ] Bot connects (no 409 conflict)
- [ ] Agent responds to @mentions in channel
- [ ] Skills auto-discovered from workspace
- [ ] No cross-talk with other agents

For full details, see [LOCAL-DEPLOYMENT.md](LOCAL-DEPLOYMENT.md).

---

## Cloud Instance Setup

### Create Instance

```bash
# Example: GCP
gcloud compute instances create {{instance_name}} \
    --zone={{zone}} \
    --machine-type=e2-small \
    --image-family=debian-12 \
    --image-project=debian-cloud \
    --boot-disk-size=20GB

# Example: AWS
aws ec2 run-instances \
    --image-id ami-xxxxxxxxx \
    --instance-type t3.small \
    --key-name {{key_name}}
```

### Install Dependencies

SSH into instance and run:

```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Configure npm for global installs without sudo
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# OpenClaw
npm install -g @openclaw/cli

# Common packages
sudo apt-get install -y git jq curl wget
```

**Checklist:**
- [ ] Cloud instance created
- [ ] Node.js installed
- [ ] OpenClaw CLI installed
- [ ] Git and utilities installed

---

## Deployment Checklist

### First-Time Deployment

```bash
cd agents/{{org_name}}/{{agent_name}}
./deploy.sh --setup
```

**Checklist:**
- [ ] `.env` configured on instance with all required variables
- [ ] `openclaw.json` configured (or template applied)
- [ ] Workspace files deployed
- [ ] Gateway restarted successfully
- [ ] GITHUB_TOKEN configured for API access
- [ ] Cron jobs created

**Note:** Agents do NOT use git. Memory sync uses GitHub API directly.

### Verify Deployment

```bash
# Check gateway
openclaw gateway status

# Check skills (bounded)
timeout 60s openclaw skills list

# Check cron jobs
openclaw cron list

# Test agent (via channel)
```

### Skill Installation Failure Pattern (Required)

In `setup.sh`, skill installation must be deterministic and non-silent:

1. Verify `clawdhub` exists before attempting installs.
2. Install each required skill with a timeout.
3. Track `installed` and `failed` skills separately.
4. If any required skill fails, mark the skill step as **FAIL**.
5. Print explicit remediation for each failed skill.
6. Exit non-zero when critical setup steps fail.

This prevents "partial success" where setup appears healthy but required skills are missing.

**Checklist:**
- [ ] Gateway running
- [ ] Skills loaded
- [ ] Cron jobs configured
- [ ] Agent responds via channel

---

## Post-Deployment Checklist

### Channel Configuration

- [ ] Channel plugin enabled (`openclaw plugins enable {{channel_type}}`)
- [ ] Bot token configured
- [ ] DM policy set (`pairing`, `allowlist`, or `open`)
- [ ] Users paired/approved

### Memory Sync (GitHub API via Scripts)

- [ ] `GITHUB_TOKEN` configured in `.env`
- [ ] No `.github_token` file exists on instance
- [ ] `scripts/memory-sync.sh` deployed and executable
- [ ] `scripts/sync-context.js` deployed and executable
- [ ] Agent knows repo path: `agents/{{org_name}}/{{agent_name}}/workspace/`
- [ ] `memory-backup` cron job created (runs `bash scripts/memory-sync.sh`)
- [ ] `context-pull` cron job created (runs `node scripts/sync-context.js`)
- [ ] Test manual sync: "sync your memory"
- [ ] Test manual pull: "sync knowledge"

**Important:** Agents use GitHub API via dedicated scripts, not git or direct MCP calls. See [SECRETS-MANAGEMENT.md](SECRETS-MANAGEMENT.md) for security rationale.

### Browser (if needed)

For interactive browser automation (clicking, typing), use the agent's native `browser` tool.

For **fetching JS-rendered pages** (article scanning, content scraping), use headless Chromium directly in scripts — the OpenClaw managed browser service may not work with snap Chromium (AppArmor blocks CDP). See `docs/AGENT-PATTERNS.md` section 17.

- [ ] `chromium-browser` installed on instance
- [ ] Scripts use `chromium-browser --headless --no-sandbox --disable-gpu --dump-dom`
- [ ] Test: `chromium-browser --headless --no-sandbox --dump-dom https://example.com`

---

## Testing Checklist

### Basic Tests

| Test | Command/Action | Expected Result |
|------|---------------|-----------------|
| Agent responds | Send message via channel | Gets response |
| Context access | Ask about org/owner | Uses correct context |
| Memory write | Tell agent to remember something | Writes to MEMORY.md |
| Memory sync | "sync your memory" | Commits and pushes |
| Knowledge sync | "sync knowledge" | Pulls latest context |

### Workflow Tests

- [ ] Primary workflow executes correctly
- [ ] Error handling works as expected
- [ ] Agent stays within boundaries
- [ ] Platform formatting is correct

---

## Maintenance Checklist

### Regular Tasks

- [ ] Review agent memory commits
- [ ] Check cron job execution logs
- [ ] Monitor gateway health
- [ ] Rotate API keys if needed

### Updating Agent

```bash
# Docker mode
docker compose build {{agent_name}} && docker compose up -d {{agent_name}}

# Local gateway mode
cd local-gateway && ./deploy.sh && openclaw gateway restart

# Cloud VPS mode — workspace files only
./deploy.sh

# Cloud VPS mode — workspace + cron jobs
./deploy.sh --setup
```

### Troubleshooting

```bash
# Check logs
tail -f /tmp/openclaw/openclaw-*.log

# Docker logs
docker compose logs -f {{agent_name}}

# Restart gateway
openclaw gateway restart

# Check pairing
openclaw pairing list --channel {{channel_type}}
```

---

## Quick Reference

### Commands

| Action | Command |
|--------|---------|
| Deploy (Docker) | `docker compose up -d` |
| Deploy (local) | `cd local-gateway && ./deploy.sh` |
| Deploy (VPS) | `./deploy.sh` |
| Deploy + setup (VPS) | `./deploy.sh --setup` |
| Install skills only | `./deploy.sh --skills` |
| Check health | `openclaw gateway health` |

### File Locations (Docker)

| Item | Path |
|------|------|
| Workspace | `/home/openclaw/.openclaw/workspace/` (in container) |
| Config | `/home/openclaw/.openclaw/openclaw.json` (in container) |
| Logs | `docker compose logs {{agent_name}}` |

### File Locations (Local Gateway — multi-agent)

| Item | Path |
|------|------|
| Workspace | `~/.openclaw/agents/<agentId>/workspace/` |
| Agent state | `~/.openclaw/agents/<agentId>/agent/` |
| Sessions | `~/.openclaw/agents/<agentId>/sessions/` |
| Config | `~/.openclaw/openclaw.json` |
| Environment | `~/.openclaw/.env` |
| Logs | `/tmp/openclaw/openclaw-*.log` |
| Cron data | `~/.openclaw/cron/` |

### File Locations (Cloud VPS — single-agent)

| Item | Path |
|------|------|
| Workspace | `~/.openclaw/workspace/` |
| Config | `~/.openclaw/openclaw.json` |
| Environment | `~/.openclaw/.env` |
| Logs | `/tmp/openclaw/openclaw-*.log` |
| Cron data | `~/.openclaw/cron/` |

---

## Template Reference

All templates are in `templates/`:

| Template | Purpose |
|----------|---------|
| `workspace/` | Starter workspace files |
| `deploy.sh.template` | Deployment script template |
| `setup.sh.template` | Post-deployment setup template |
| `openclaw.json.template` | OpenClaw config template |
| `Dockerfile.template` | Docker container template |
| `docker-compose.yml.template` | Multi-agent Docker Compose template |
| `.env.example` | Environment variables template |
