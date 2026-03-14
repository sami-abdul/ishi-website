# Sandbox vs Tool Policy vs Elevated

OpenClaw provides three distinct security controls for managing tool execution and access:

## The Three Controls

**Sandbox** determines the execution environment, whether tools run in Docker containers or directly on the host machine. Configuration uses `agents.defaults.sandbox.*` settings.

**Tool policy** controls which tools are available and callable through allow/deny lists and profiles. This includes global settings, per-agent configurations, and provider-specific policies.

**Elevated** functions as "an **exec-only escape hatch** to run on the host when you're sandboxed," providing controlled host access without granting additional tools.

## Sandbox Modes

The `agents.defaults.sandbox.mode` setting offers three options:

- `"off"`: all tools execute on the host
- `"non-main"`: only non-main sessions are containerized
- `"all"`: complete sandboxing across all sessions

## Tool Policy Layers

Tool access is determined through multiple configuration levels:

- Tool profiles (base allowlists)
- Provider-specific profiles
- Global and per-agent allow/deny rules
- Sandbox-specific policies (when sandboxed)

Key principle: **deny always wins**, and if allow lists are non-empty, unlisted tools are blocked.

## Elevated Mode

When enabled, elevated mode allows sandboxed sessions to run `exec` commands on the host with optional approval skipping via `/elevated full`.

## Debugging

Use `openclaw sandbox explain` to inspect effective configurations, including sandbox mode, session status, tool policies, and elevated gates.
