# OpenClaw Security Guide

Comprehensive security hardening guide for OpenClaw multi-agent deployments. Covers gateway security, tool policies, sandbox configuration, credential management, security auditing, and known CVEs.

---

## Table of Contents

1. [Gateway Security](#gateway-security)
2. [Tool Policies](#tool-policies)
3. [Sandbox Configuration](#sandbox-configuration)
4. [Credential Management](#credential-management)
5. [Security Audit](#security-audit)
6. [CVE Awareness](#cve-awareness)

---

## Gateway Security

The OpenClaw gateway is the central process that manages all agent sessions, routes messages, and executes tools. Securing the gateway is the first line of defense.

### Loopback Binding (Never 0.0.0.0)

**CRITICAL:** The gateway MUST bind to loopback (`127.0.0.1`) only. Never bind to `0.0.0.0` or a public interface.

```json
{
  "gateway": {
    "host": "127.0.0.1",
    "port": 18789
  }
}
```

**Why:** The gateway exposes a WebSocket endpoint that accepts unauthenticated connections by default. Binding to `0.0.0.0` exposes this to the entire network, allowing anyone to send commands to your agents.

**Verify:**
```bash
# Check what the gateway is listening on
ss -tlnp | grep 18789
# Should show 127.0.0.1:18789, NOT 0.0.0.0:18789 or :::18789
```

### Token-Based Authentication

Enable token-based auth for the gateway WebSocket endpoint:

```json
{
  "gateway": {
    "host": "127.0.0.1",
    "port": 18789,
    "auth": {
      "mode": "token",
      "token": "${GATEWAY_AUTH_TOKEN}"
    }
  }
}
```

- Store the token in `~/.openclaw/.env` as `GATEWAY_AUTH_TOKEN`
- Use a cryptographically random token (minimum 32 characters)
- Rotate the token periodically

Generate a secure token:
```bash
openssl rand -hex 32
```

### Tailscale for Remote Access

If you need to access the gateway from another machine (e.g., monitoring, administration), use [Tailscale](https://tailscale.com/) instead of exposing the port.

```json
{
  "gateway": {
    "bind": "tailnet",
    "host": "{{tailscale_ip}}",
    "port": 18789
  }
}
```

**Benefits:**
- End-to-end encrypted (WireGuard)
- No open ports on public internet
- Identity-based access control
- Works across NATs without port forwarding

**Never do:**
- Port forward 18789 through your router
- Use SSH tunnels as a permanent solution (fragile)
- Expose the gateway on a public IP, even with auth

---

## Tool Policies

Tool policies control which tools each agent can use. This is the primary mechanism for enforcing least-privilege access.

### Tool Policy Profiles

OpenClaw ships with four built-in profiles, from most restrictive to least:

| Profile | Description | Use Case |
|---------|-------------|----------|
| `minimal` | Read-only workspace access, no exec, no browser | Monitoring agents, read-only bots |
| `coding` | Workspace read/write, exec (allowlist), no browser | Code generation, file management |
| `messaging` | Minimal + channel sending, no exec | Notification agents, chatbots |
| `full` | All tools enabled | Development, trusted agents |

Set the profile in `openclaw.json`:

```json
{
  "agents": {
    "list": [
      {
        "id": "{{agent_id}}",
        "tools": {
          "profile": "coding"
        }
      }
    ]
  }
}
```

### Tool Groups

Tools are organized into groups for granular control:

| Group | Tools | Risk Level |
|-------|-------|------------|
| `group:fs` | File read, write, list, search | Low (within workspace) |
| `group:runtime` | Exec, shell, process management | **High** |
| `group:automation` | Cron, webhooks, scheduled tasks | Medium |
| `group:sessions` | Session management, context control | Low |
| `group:web` | HTTP requests, web fetch, browser | Medium |
| `group:ui` | Browser automation, screenshots, DOM | Medium-High |

### Allow/Deny Lists

Override the profile with explicit allow/deny lists:

```json
{
  "agents": {
    "list": [
      {
        "id": "{{agent_id}}",
        "tools": {
          "profile": "minimal",
          "allow": ["group:fs", "exec"],
          "deny": ["browser", "web-fetch"]
        }
      }
    ]
  }
}
```

**Resolution order:**
1. `deny` takes precedence over `allow`
2. `allow` takes precedence over profile defaults
3. Profile defaults apply for unspecified tools

### Per-Agent Tool Overrides

Different agents can have different tool policies:

```json
{
  "agents": {
    "list": [
      {
        "id": "orchestrator",
        "tools": { "profile": "full" }
      },
      {
        "id": "search-agent",
        "tools": {
          "profile": "minimal",
          "allow": ["web-fetch", "group:fs"]
        }
      },
      {
        "id": "code-agent",
        "tools": {
          "profile": "coding",
          "deny": ["browser"]
        }
      }
    ]
  }
}
```

### Exec Security Modes

The `exec` tool (command execution) has three security modes:

| Mode | Behavior | Use Case |
|------|----------|----------|
| `deny` | All exec calls blocked | Read-only agents, chatbots |
| `allowlist` | Only whitelisted binaries allowed | Production agents |
| `full` | Any command allowed | Development only |

```json
{
  "tools": {
    "exec": {
      "mode": "allowlist",
      "allowlist": [
        "node", "npm", "npx",
        "curl", "wget", "jq",
        "python3", "pip3",
        "git", "gh",
        "openclaw", "clawdhub",
        "chromium-browser",
        "bash"
      ]
    }
  }
}
```

### Safe Binaries Allowlist

Recommended safe binaries for production `allowlist` mode:

```
# Runtime
node, npm, npx, python3, pip3, bash

# Network (read-only)
curl, wget

# Data processing
jq, python3, awk, sed, grep, sort, uniq, wc

# OpenClaw ecosystem
openclaw, clawdhub

# Version control (API-based — no push)
gh

# Browser (headless only)
chromium-browser, chromium, google-chrome

# System info (read-only)
date, hostname, whoami, uname, df, free, uptime
```

**Never allow in production:**
- `rm -rf`, `dd`, `mkfs` — destructive
- `ssh`, `scp`, `rsync` — lateral movement
- `sudo`, `su`, `doas` — privilege escalation
- `docker`, `kubectl` — container escape
- `nc`, `ncat`, `socat` — arbitrary network access
- `eval`, `exec` — code injection vectors

---

## Sandbox Configuration

Sandboxing isolates agent execution environments to prevent cross-agent interference and limit blast radius of compromised agents.

### Sandbox Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| `off` | No sandboxing (default) | Development, trusted single-agent |
| `non-main` | Sandbox all agents except the default | Mixed trust environments |
| `all` | Sandbox every agent | Production multi-agent |

```json
{
  "sandbox": {
    "mode": "all"
  }
}
```

### Sandbox Scopes

| Scope | Isolation Level | Shared State |
|-------|----------------|--------------|
| `session` | Per-session sandbox | Nothing shared between sessions |
| `agent` | Per-agent sandbox | Sessions within same agent share state |
| `shared` | Single sandbox for all agents | All agents share sandbox state |

```json
{
  "sandbox": {
    "mode": "all",
    "scope": "agent"
  }
}
```

**Recommended:** `scope: "agent"` for multi-agent deployments. This gives each agent its own isolated environment while allowing session continuity within an agent.

### Workspace Access

Control how agents access the workspace filesystem:

| Access | Behavior |
|--------|----------|
| `none` | Agent cannot access workspace files |
| `ro` | Read-only workspace access |
| `rw` | Read-write workspace access (default) |

```json
{
  "sandbox": {
    "mode": "all",
    "scope": "agent",
    "workspace": "rw"
  }
}
```

### Docker Container Settings

When using Docker-based sandboxing, harden the container:

```json
{
  "sandbox": {
    "mode": "all",
    "docker": {
      "readOnlyRoot": true,
      "network": "none",
      "resources": {
        "memory": "512m",
        "cpus": "1.0",
        "pids": 100
      },
      "tmpfs": ["/tmp:size=64m"],
      "securityOpt": ["no-new-privileges"]
    }
  }
}
```

**Docker sandbox hardening checklist:**

| Setting | Purpose |
|---------|---------|
| `readOnlyRoot: true` | Prevents writing outside designated volumes |
| `network: "none"` | Blocks all network access from sandbox |
| `memory: "512m"` | Prevents OOM from runaway processes |
| `cpus: "1.0"` | Limits CPU usage to 1 core |
| `pids: 100` | Prevents fork bombs |
| `no-new-privileges` | Blocks setuid/setgid escalation |

### Per-Agent Sandbox Overrides

Override sandbox settings for specific agents:

```json
{
  "agents": {
    "list": [
      {
        "id": "orchestrator",
        "sandbox": {
          "mode": "off"
        }
      },
      {
        "id": "untrusted-agent",
        "sandbox": {
          "mode": "all",
          "scope": "session",
          "workspace": "ro",
          "docker": {
            "network": "none",
            "readOnlyRoot": true,
            "resources": { "memory": "256m", "cpus": "0.5" }
          }
        }
      }
    ]
  }
}
```

---

## Credential Management

See [SECRETS-MANAGEMENT.md](SECRETS-MANAGEMENT.md) for the full credential management guide. This section provides a security-focused summary.

### Core Rules

1. **`.env` only, `600` permissions** — All static secrets live in `~/.openclaw/.env` with `chmod 600`. No exceptions.
2. **Short-lived scoped tokens** — Use fine-grained GitHub tokens with repository-specific permissions and 90-day expiry.
3. **No secrets in workspace files** — Never store API keys, tokens, or passwords in MEMORY.md, AGENTS.md, or any workspace file.
4. **GitHub API for sync (never git)** — Agents sync memory via GitHub API only. Git access is explicitly prohibited to prevent accidental secret commits.

### Credential Hygiene Checklist

- [ ] `.env` file exists with `chmod 600`
- [ ] `~/.openclaw/` directory has `chmod 700`
- [ ] No `.github_token` file exists anywhere
- [ ] No hardcoded tokens in workspace files
- [ ] GitHub token is fine-grained with minimal scopes
- [ ] All OAuth tokens stored in `chmod 600` JSON files
- [ ] `.gitignore` blocks `.env`, `*.pem`, `*.key`, `*_config.json`
- [ ] Secret scanning enabled in CI (gitleaks or equivalent)

### What MUST NOT Be in Workspace Files

```
# These should NEVER appear in MEMORY.md, AGENTS.md, or knowledge/ files:
- API keys (sk-xxx, ghp_xxx, xoxb-xxx)
- OAuth tokens (access_token, refresh_token)
- Passwords or passphrases
- Private keys or certificates
- Database connection strings with credentials
- Webhook URLs with embedded secrets
```

---

## Security Audit

### Running a Security Audit

OpenClaw provides a built-in security audit command:

```bash
openclaw security audit --deep
```

This checks:
- Gateway binding (loopback vs public)
- Authentication configuration
- Tool policy coverage (agents without explicit policies)
- Sandbox configuration
- File permissions on `.env` and config files
- Known CVE exposure based on installed version
- Skill provenance and signatures

### Pre-Deployment Security Checklist

Run this checklist before every production deployment:

#### Gateway

- [ ] Gateway binds to `127.0.0.1` (not `0.0.0.0`)
- [ ] Token-based auth enabled
- [ ] Auth token is cryptographically random (32+ chars)
- [ ] No port forwarding to public internet
- [ ] Tailscale configured for remote access (if needed)

#### Tool Policies

- [ ] Every agent has an explicit tool profile
- [ ] `exec` mode is `allowlist` (not `full`) for production agents
- [ ] Allowlist contains only necessary binaries
- [ ] No agent has `full` profile unless explicitly justified
- [ ] `deny` list applied to sensitive tools per agent

#### Sandbox

- [ ] Sandbox mode is `non-main` or `all` for multi-agent
- [ ] Docker sandboxes use `readOnlyRoot`, `network: none`, resource limits
- [ ] Per-agent overrides are justified and documented
- [ ] Untrusted agents have `workspace: "ro"` or `"none"`

#### Credentials

- [ ] `.env` permissions are `600`
- [ ] `~/.openclaw/` permissions are `700`
- [ ] No `.github_token` files exist
- [ ] GitHub token is fine-grained with minimal scopes
- [ ] Secret scanning enabled in CI
- [ ] All bot tokens are unique per agent

#### Skills

- [ ] Community skills audited before installation
- [ ] No skills with `exec` access unless justified
- [ ] Skill SKILL.md files reviewed for command injection
- [ ] Skills from ClawHub verified against known-malicious list

### Incident Response Workflow

When a security incident is detected:

```
1. CONTAIN
   - Stop the affected agent: openclaw gateway stop
   - If multi-agent: isolate by removing from openclaw.json and restarting
   - Revoke compromised tokens immediately

2. ASSESS
   - Check gateway logs: openclaw gateway logs
   - Review session transcripts: ~/.openclaw/agents/<id>/sessions/
   - Check for unauthorized file access or data exfiltration
   - Run: openclaw security audit --deep

3. REMEDIATE
   - Rotate all secrets that may have been exposed
   - Update tool policies to prevent recurrence
   - Patch vulnerable components
   - Review and update sandbox configuration

4. DOCUMENT
   - Log incident timeline
   - Update MEMORY.md with lessons learned
   - Update security policies as needed
   - Notify affected parties

5. VERIFY
   - Re-run security audit: openclaw security audit --deep
   - Test agent behavior in isolated environment
   - Confirm all tokens rotated and old tokens revoked
   - Monitor for 48 hours post-remediation
```

---

## CVE Awareness

### CVE-2026-25253: RCE via Browser Tool

| Field | Value |
|-------|-------|
| **CVE** | CVE-2026-25253 |
| **CVSS** | 8.8 (High) |
| **Type** | Remote Code Execution via browser tool |
| **Affected** | OpenClaw versions prior to v2026.1.29 |
| **Patched** | v2026.1.29 |

**Description:** A crafted webpage could exploit the browser automation tool to execute arbitrary commands on the host system. When an agent visited a malicious URL using the browser tool, JavaScript on the page could escape the browser sandbox and execute shell commands with the gateway process's privileges.

**Impact:** Full RCE on the host running the OpenClaw gateway. An attacker who controlled a URL that an agent visited could execute arbitrary commands.

**Mitigation:**
1. **Upgrade immediately** to v2026.1.29 or later:
   ```bash
   npm install -g @openclaw/cli@latest
   openclaw --version  # Verify >= v2026.1.29
   ```
2. If upgrade is not immediately possible:
   - Disable browser tool for all agents:
     ```json
     { "tools": { "deny": ["browser", "group:ui"] } }
     ```
   - Block agents from visiting untrusted URLs
3. Run `openclaw security audit --deep` to check exposure

**Check your version:**
```bash
openclaw --version
# If < v2026.1.29, you are vulnerable
```

### ClawHub Skill Marketplace Risks

The ClawHub skill marketplace is community-driven and has limited vetting. Security research has found that approximately **20% of community-submitted skills contain potentially malicious or unsafe behavior**, including:

- Skills that exfiltrate workspace files to external endpoints
- Skills that install additional binaries without disclosure
- Skills that read `.env` files and send contents to third-party servers
- Skills that modify other skills' SKILL.md to inject instructions
- Skills that create hidden cron jobs for persistence

### Skill Vetting Procedures

Before installing ANY community skill from ClawHub:

1. **Review SKILL.md** — Read every command the skill will execute
   ```bash
   clawdhub inspect <skill-slug>
   ```

2. **Check the author** — Verify the skill author's reputation
   ```bash
   clawdhub author <skill-slug>
   ```

3. **Scan for red flags:**
   - Commands that `curl` or `wget` to external URLs
   - `eval`, `exec`, or `Function()` calls
   - References to `.env`, `GITHUB_TOKEN`, or other secret paths
   - Base64-encoded strings (obfuscation)
   - Network calls to non-standard ports
   - `chmod +x` on downloaded files

4. **Test in sandbox first:**
   ```bash
   # Install to a test agent with strict sandbox
   clawdhub install <skill-slug> --workspace /tmp/test-workspace
   # Review installed files
   find /tmp/test-workspace/skills/<skill-slug> -type f -exec cat {} \;
   ```

5. **Pin versions** — Never use `@latest` for production skills:
   ```bash
   clawdhub install <skill-slug>@1.2.3
   ```

6. **Monitor post-install:**
   - Check for new cron jobs: `openclaw cron list`
   - Check for new files in workspace: `find ~/.openclaw/workspace -newer /tmp/install-marker`
   - Check for network connections: `ss -tlnp`

### Maintaining a Skill Allowlist

For production deployments, maintain an explicit allowlist of vetted skills:

```json
{
  "skills": {
    "marketplace": {
      "mode": "allowlist",
      "allowed": [
        "memory-sync@1.0.0",
        "knowledge-sync@1.0.0",
        "web-search@2.1.0"
      ]
    }
  }
}
```

**Review cycle:** Re-vet all installed skills monthly. Check for:
- New versions with changed behavior
- Author account compromise
- New CVEs affecting skill dependencies

---

## Security Configuration Quick Reference

### Minimal Production Config

```json
{
  "gateway": {
    "host": "127.0.0.1",
    "port": 18789,
    "auth": {
      "mode": "token",
      "token": "${GATEWAY_AUTH_TOKEN}"
    }
  },
  "sandbox": {
    "mode": "all",
    "scope": "agent",
    "workspace": "rw"
  },
  "tools": {
    "exec": {
      "mode": "allowlist",
      "allowlist": ["node", "npm", "npx", "curl", "jq", "python3", "bash", "openclaw", "clawdhub", "gh"]
    }
  },
  "agents": {
    "list": [
      {
        "id": "{{agent_id}}",
        "tools": {
          "profile": "coding",
          "deny": ["browser"]
        }
      }
    ]
  }
}
```

### Security Headers Checklist

| Check | Command | Expected |
|-------|---------|----------|
| Gateway binding | `ss -tlnp \| grep 18789` | `127.0.0.1:18789` |
| Auth enabled | `grep auth ~/.openclaw/openclaw.json` | `"mode": "token"` |
| .env permissions | `stat -c %a ~/.openclaw/.env` | `600` |
| Dir permissions | `stat -c %a ~/.openclaw/` | `700` |
| OpenClaw version | `openclaw --version` | `>= v2026.1.29` |
| No .github_token | `find ~ -name .github_token` | No results |
| Secret scan CI | Check `.github/workflows/` | `secret-scan.yml` present |
