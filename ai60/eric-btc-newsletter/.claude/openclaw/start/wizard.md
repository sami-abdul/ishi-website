# Onboarding Wizard (CLI)

The Onboarding Wizard is the recommended setup method for OpenClaw on macOS, Linux, or Windows via WSL2. It configures a local or remote Gateway, channels, skills, and workspace settings through a guided process.

## Key Command
```bash
openclaw onboard
```

## QuickStart vs Advanced Modes

**QuickStart** provides sensible defaults:
- Local gateway on port 18789
- Auto-generated token authentication
- Coding tool profile for new setups
- Per-channel-peer DM isolation
- Telegram/WhatsApp allowlist mode

**Advanced** gives full control over each configuration step.

## Configuration Steps (Local Mode)
The wizard guides through:
1. Model/Auth provider selection with API key or OAuth options
2. Workspace location setup (default: `~/.openclaw/workspace`)
3. Gateway configuration (port, bind address, auth)
4. Channel selection (WhatsApp, Telegram, Discord, etc.)
5. Daemon installation (LaunchAgent or systemd)
6. Health verification
7. Skill installation

## Managing Multiple Agents
Use `openclaw agents add <name>` to create separate agents with independent workspaces and authentication profiles.

## Important Notes
- Re-running doesn't erase existing config unless `--reset` is specified
- Non-interactive scripting uses `--non-interactive` flag
- For scripts with secrets, use `--secret-input-mode ref` for environment-backed references
