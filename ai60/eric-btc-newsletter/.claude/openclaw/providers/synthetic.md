# Synthetic Provider Documentation

## Overview
The Synthetic provider exposes Anthropic-compatible endpoints through OpenClaw, integrating with the Anthropic Messages API under the `synthetic` provider designation.

## Initial Configuration
To get started, set the `SYNTHETIC_API_KEY` environment variable and run the onboarding command:
```bash
openclaw onboard --auth-choice synthetic-api-key
```

The default model is `synthetic/hf:MiniMaxAI/MiniMax-M2.5`.

## Configuration Details
The configuration uses a merge mode with the base URL `https://api.synthetic.new/anthropic`. Important note: "OpenClaw's Anthropic client appends `/v1` to the base URL," so the base URL should not include `/v1`.

## Available Models
The provider offers 19 models with varying capabilities:

- **MiniMax M2.5**: 192,000 context window, 65,536 max tokens
- **Kimi-K2-Thinking**: 256,000 context window with reasoning enabled
- **GLM series**: Up to 198,000 context window with 128,000 max tokens
- **DeepSeek variants**: Multiple versions with 128,000-159,000 context windows
- **Llama 3.3 & 4**: Large context windows up to 524,000
- **Qwen3 models**: Including vision capabilities (text + image input)

All models have zero cost assigned for input, output, and cache operations.

## Key Requirements
- Model references use the format `synthetic/<modelId>`
- If enabling a model allowlist, include all planned models
- Refer to model provider rules for additional configuration guidance
