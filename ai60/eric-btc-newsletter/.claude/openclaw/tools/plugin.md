# OpenClaw Plugins Documentation

## Overview

OpenClaw's plugin system enables extension through small code modules that add features like commands, tools, and Gateway RPC methods without modifying the core installation.

## Quick Start

Check installed plugins:
```bash
openclaw plugins list
```

Install an official plugin (example):
```bash
openclaw plugins install @openclaw/voice-call
```

After installation, restart the Gateway and configure under `plugins.entries.<id>.config`.

## Plugin Types & Registration

Plugins can register multiple components:

- Gateway RPC methods and HTTP routes
- Agent tools for AI workflows
- CLI commands
- Background services
- Context engines
- Auto-reply commands (execute without AI invocation)
- Skills (learning modules)

Plugins export either a function or an object with `id`, `name`, `configSchema`, and `register()` method.

## Discovery & Loading Order

OpenClaw scans plugins in this sequence:

1. Config paths (`plugins.load.paths`)
2. Workspace extensions (`.openclaw/extensions/`)
3. Global extensions (`~/.openclaw/extensions/`)
4. Bundled extensions (shipped with OpenClaw, mostly disabled by default)

Most bundled plugins require explicit enablement via `plugins.entries.<id>.enabled`.

## Plugin Slots (Exclusive Categories)

Some features use exclusive slots—only one plugin active simultaneously:

- **memory**: Choose between `memory-core` or `memory-lancedb`
- **contextEngine**: Active context orchestration plugin

Configure via:
```json5
{
  plugins: {
    slots: {
      memory: "memory-core",
      contextEngine: "legacy"
    }
  }
}
```

## Official Plugins Available

Notable bundled and published plugins include:

- Voice Call (`@openclaw/voice-call`)
- Microsoft Teams (`@openclaw/msteams`)
- Matrix, Nostr, Zalo channels
- Memory plugins (core and LanceDB variants)
- OAuth providers (Google, Qwen, Copilot Proxy)

## Configuration

Plugin configuration uses JSON Schema validation without executing plugin code:

```json5
{
  plugins: {
    enabled: true,
    allow: ["voice-call"],
    deny: ["untrusted-plugin"],
    load: { paths: ["~/Projects/oss/voice-call-extension"] },
    entries: {
      "voice-call": { enabled: true, config: { provider: "twilio" } }
    }
  }
}
```

Configuration changes require a gateway restart.

## Common Plugin Patterns

### Auto-Reply Commands

Execute without AI agent invocation:

```typescript
api.registerCommand({
  name: "mystatus",
  description: "Show plugin status",
  handler: (ctx) => ({
    text: `Plugin running in ${ctx.channel}`
  })
});
```

Command options support arguments, authorization requirements, and native provider aliases.

### Gateway HTTP Routes

```typescript
api.registerHttpRoute({
  path: "/acme/webhook",
  auth: "plugin",
  match: "exact",
  handler: async (_req, res) => {
    res.statusCode = 200;
    res.end("ok");
    return true;
  }
});
```

Routes must declare authentication explicitly (`"gateway"` or `"plugin"`).

### Messaging Channels

Register new chat surfaces by implementing required adapters:

```typescript
const myChannel = {
  id: "acmechat",
  meta: { id: "acmechat", label: "AcmeChat" },
  capabilities: { chatTypes: ["direct"] },
  config: {
    listAccountIds: (cfg) => Object.keys(cfg.channels?.acmechat?.accounts ?? {}),
    resolveAccount: (cfg, accountId) => cfg.channels?.acmechat?.accounts?.[accountId ?? "default"]
  },
  outbound: {
    deliveryMode: "direct",
    sendText: async () => ({ ok: true })
  }
};
```

### Lifecycle Hooks

Modify prompt construction before agent execution:

```typescript
api.on(
  "before_prompt_build",
  (event, ctx) => ({
    prependSystemContext: "Follow company style guide."
  }),
  { priority: 10 }
);
```

Available hooks: `before_model_resolve`, `before_prompt_build`, `before_agent_start`

## CLI Commands

Essential plugin management:

```bash
openclaw plugins list
openclaw plugins install @openclaw/voice-call
openclaw plugins install -l ./extensions/voice-call  # link for dev
openclaw plugins enable <id>
openclaw plugins disable <id>
openclaw plugins doctor
openclaw plugins update --all
```

The `--pin` flag stores exact resolved versions for future updates.

## Security Considerations

- Plugins run in-process; treat as trusted code
- Use `plugins.allow` for allowlisting trusted plugins
- Non-bundled plugins without install/load-path provenance emit warnings
- Path ownership and symlink checks prevent directory traversal
- Dependencies install without lifecycle scripts (`npm install --ignore-scripts`)

## Provider Authentication

Plugins register model provider auth flows:

```typescript
api.registerProvider({
  id: "acme",
  label: "AcmeAI",
  auth: [{
    id: "oauth",
    label: "OAuth",
    kind: "oauth",
    run: async (ctx) => ({
      profiles: [{ profileId: "acme:default", credential: {...} }],
      defaultModel: "acme/opus-1"
    })
  }]
});
```

## Testing & Distribution

- In-repo plugins use Vitest under `src/**`
- Published plugins validate `openclaw.extensions` points to built output
- Recommend packaging under `@openclaw/*` npm scope
- `package.json` must include `openclaw.extensions` array

## SDK Import Paths

Use specialized subpaths rather than monolithic imports:

- `openclaw/plugin-sdk/core` — generic APIs
- `openclaw/plugin-sdk/discord` — Discord channels
- `openclaw/plugin-sdk/slack` — Slack channels
- Additional extension-specific subpaths for bundled features

Existing plugins can continue using `openclaw/plugin-sdk` for backward compatibility.
