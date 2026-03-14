# GLM Models Documentation

## Overview
GLM represents a model family accessible through the Z.AI platform. Within OpenClaw, these models are reached via the `zai` provider using model identifiers such as `zai/glm-5`.

## Setup Instructions

**CLI Configuration:**
```bash
openclaw onboard --auth-choice zai-api-key
```

**Configuration File:**
```json5
{
  env: { ZAI_API_KEY: "sk-..." },
  agents: { defaults: { model: { primary: "zai/glm-5" } } },
}
```

## Key Considerations

- Model versions and availability may shift; consult Z.AI documentation for current options
- Common model identifiers include `glm-5`, `glm-4.7`, and `glm-4.6`
- Additional provider information is available at [/providers/zai](/providers/zai)

## Additional Resources

The complete documentation index can be retrieved at: https://docs.openclaw.ai/llms.txt

---

*Documentation built with Mintlify*
