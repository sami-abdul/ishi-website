# Z.AI Documentation Summary

## Overview
Z.AI serves as the API platform for GLM models, offering REST APIs with authentication via API keys created through the Z.AI console.

## Setup Instructions

**CLI Configuration:**
```bash
openclaw onboard --auth-choice zai-api-key
# or non-interactive
openclaw onboard --zai-api-key "$ZAI_API_KEY"
```

**Configuration File:**
```json5
{
  env: { ZAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "zai/glm-5" } } },
}
```

## Key Features

- GLM models are accessible as `zai/<model>` (e.g., `zai/glm-5`)
- Tool streaming (`tool_stream`) is enabled by default but can be disabled via configuration
- Bearer authentication uses your API key
- The platform integrates with OpenClaw using the `zai` provider

## Additional Resources

- Complete documentation index available at: https://docs.openclaw.ai/llms.txt
- GLM model family overview at: /providers/glm
