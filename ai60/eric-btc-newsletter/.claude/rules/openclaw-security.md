## OpenClaw Security

Gateway binding: loopback only (`bind: "loopback"`). Never expose on 0.0.0.0. Use Tailscale Serve for remote access.

Sandbox: all agents sandboxed by default (`sandbox.mode: "all"`, `scope: "agent"`). Orchestrator may override with documented justification. Docker network: "none" default; "host" is schema-blocked.

Tool policies: start with `profile: "messaging"`, deny `group:automation`, `group:runtime`, `group:fs`. Widen per-agent only as needed. Exec: allowlist mode with safe binaries. Elevated mode: disabled by default.

Credentials: `.env` file only (600 permissions). Never in workspace, MEMORY.md, or openclaw.json values. Short-lived scoped tokens preferred. GitHub API for memory sync (never git).

Skills: never auto-install from ClawHub without source review. File permissions: 600 for openclaw.json, 700 for ~/.openclaw. Require OpenClaw v2026.1.29+ (CVE-2026-25253). Run `openclaw security audit --deep` before deployments.
