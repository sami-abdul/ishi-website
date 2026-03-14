# Plugin Agent Tools

OpenClaw plugins can register **agent tools** as JSON schema functions available to LLMs during agent runs. These tools can be **required** (always available) or **optional** (opt-in).

## Configuration

Tools are configured under `tools` in the main config, or per-agent under `agents.list[].tools`. An allowlist/denylist policy governs which tools an agent can call.

## Basic Tool Implementation

A simple tool registration example:

```ts
import { Type } from "@sinclair/typebox";

export default function (api) {
  api.registerTool({
    name: "my_tool",
    description: "Do a thing",
    parameters: Type.Object({
      input: Type.String(),
    }),
    async execute(_id, params) {
      return { content: [{ type: "text", text: params.input }] };
    },
  });
}
```

## Optional Tool Registration

Optional tools require explicit user enablement and are never automatically activated. Example:

```ts
export default function (api) {
  api.registerTool(
    {
      name: "workflow_tool",
      description: "Run a local workflow",
      parameters: {
        type: "object",
        properties: {
          pipeline: { type: "string" },
        },
        required: ["pipeline"],
      },
      async execute(_id, params) {
        return { content: [{ type: "text", text: params.pipeline }] };
      },
    },
    { optional: true },
  );
}
```

Enable optional tools via `agents.list[].tools.allow` or global `tools.allow`:

```json5
{
  agents: {
    list: [
      {
        id: "main",
        tools: {
          allow: [
            "workflow_tool",
            "workflow",
            "group:plugins",
          ],
        },
      },
    ],
  },
}
```

## Configuration Options Affecting Tool Availability

- Allowlists naming only plugin tools enable those plugins; core tools remain available unless explicitly included
- `tools.profile` / `agents.list[].tools.profile` (base allowlist)
- `tools.byProvider` / `agents.list[].tools.byProvider` (provider-specific allow/deny)
- `tools.sandbox.tools.*` (sandbox tool policy)

## Best Practices

- Tool names must not conflict with core tool names; clashing tools are skipped
- Plugin IDs in allowlists should not clash with core tool names
- Use `optional: true` for tools triggering side effects or requiring additional binaries/credentials
