# LLM Task Documentation

## Overview

The `llm-task` plugin executes JSON-focused language model operations and delivers structured results, potentially validated through JSON Schema validation.

## Setup Requirements

**Step 1: Enable the Plugin**

```json
{
  "plugins": {
    "entries": {
      "llm-task": { "enabled": true }
    }
  }
}
```

**Step 2: Allowlist the Tool**

```json
{
  "agents": {
    "list": [
      {
        "id": "main",
        "tools": { "allow": ["llm-task"] }
      }
    ]
  }
}
```

## Optional Configuration

```json
{
  "plugins": {
    "entries": {
      "llm-task": {
        "enabled": true,
        "config": {
          "defaultProvider": "openai-codex",
          "defaultModel": "gpt-5.4",
          "defaultAuthProfileId": "main",
          "allowedModels": ["openai-codex/gpt-5.4"],
          "maxTokens": 800,
          "timeoutMs": 30000
        }
      }
    }
  }
}
```

The `allowedModels` parameter restricts requests to specified provider/model combinations.

## Tool Parameters

- `prompt` (string, required)
- `input` (any, optional)
- `schema` (object, optional JSON Schema)
- `provider` (string, optional)
- `model` (string, optional)
- `thinking` (string, optional)
- `authProfileId` (string, optional)
- `temperature` (number, optional)
- `maxTokens` (number, optional)
- `timeoutMs` (number, optional)

The `thinking` parameter supports standard reasoning presets including "low" or "medium."

## Output Format

Returns `details.json` with parsed JSON content, automatically validated against any provided schema.

## Workflow Integration Example

```lobster
openclaw.invoke --tool llm-task --action json --args-json '{
  "prompt": "Given the input email, return intent and draft.",
  "thinking": "low",
  "input": {
    "subject": "Hello",
    "body": "Can you help?"
  },
  "schema": {
    "type": "object",
    "properties": {
      "intent": { "type": "string" },
      "draft": { "type": "string" }
    },
    "required": ["intent", "draft"],
    "additionalProperties": false
  }
}'
```

## Safety Considerations

- Outputs are JSON-formatted exclusively, excluding code fences or extra text
- No model tools are available during execution
- Treat unvalidated outputs as potentially unreliable
- Implement approval steps before any operations with side effects
