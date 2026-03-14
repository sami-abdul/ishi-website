## OpenClaw Gateway & Docker

Local gateway: single OpenClaw process in Docker, multiple isolated agents. Never reuse `agentDir` across agents (causes session collisions). One agent set as `default: true`. Bindings route by channel + accountId (most-specific wins).

Docker-first deployment: gateway runs in container via Docker Compose. Per-agent sandbox containers for tool execution (scope: "agent"). Workspace access: none/ro/rw per agent. Network isolation: "none" by default.

Config at `local-gateway/openclaw.json`. Secrets in `.env` (never in workspace or config). Deploy: edit workspace in repo -> `docker compose up -d` -> verify.

Agent-to-agent: `tools.agentToAgent` with explicit allow list. Orchestrator uses `sessions_send` (gateway-level, bypasses channel). Session reset: daily + idle timeout.

Multiple swarms: run as separate Docker Compose stacks with different ports.
