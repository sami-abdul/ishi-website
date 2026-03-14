# OpenClaw Skills Documentation

## Core Concept
OpenClaw uses AgentSkills-compatible skill folders to equip agents with tool usage capabilities. Each skill consists of a directory containing a `SKILL.md` file with YAML frontmatter and instructions.

## Skill Locations & Priority
Skills load from three sources with this precedence order:
1. Workspace skills (`<workspace>/skills`) — highest priority
2. Managed/local skills (`~/.openclaw/skills`)
3. Bundled skills — lowest priority

Additional folders can be configured via `skills.load.extraDirs` in the openclaw.json configuration file.

## Multi-Agent Setup
- **Per-agent skills** exist only within that agent's workspace
- **Shared skills** in `~/.openclaw/skills` are accessible to all agents on the machine
- Name conflicts follow the standard precedence rules

## SKILL.md Format Requirements
Minimum required structure includes:
```
---
name: skill-name
description: What the skill does
---
```

Optional frontmatter fields control behavior:
- `user-invocable`: Expose as slash command (default: true)
- `disable-model-invocation`: Hide from model prompt
- `command-dispatch`: Set to "tool" for direct tool invocation
- `homepage`: URL for skill website

## Gating & Access Control
Skills filter at load time using `metadata.openclaw` fields:
- `requires.bins`: Required command-line tools
- `requires.env`: Required environment variables
- `requires.config`: Required configuration settings
- `os`: Platform restrictions (darwin, linux, win32)

## Security Considerations
Third-party skills should be treated as untrusted code. The documentation recommends: "Read them before enabling" and consider sandboxed execution for risky operations.

## ClawHub Registry
Browse available skills at https://clawhub.com. Install with `clawhub install <skill-slug>` and manage updates via command line.

## Performance Notes
Skills snapshots capture eligible skills when sessions start and reuse that list for subsequent turns. Changes take effect on the next new session. A watcher feature enables mid-session refreshes when `skills.load.watch` is enabled.
