# Together AI Documentation

## Overview
Together AI provides unified API access to prominent open-source language models, including Llama, DeepSeek, and Kimi variants through an "OpenAI-compatible" interface.

## Setup Instructions

**Authentication:**
- Provider identifier: `together`
- Required credential: `TOGETHER_API_KEY`
- Setup command: `openclaw onboard --auth-choice together-api-key`

**Configuration:**
Default model should be set via JSON configuration to `together/moonshotai/Kimi-K2.5`.

**Daemon Environment:**
When running as a background service, ensure the API key is accessible through environment files like `~/.openclaw/.env`.

## Supported Models

The platform offers several open-source alternatives:

- GLM 4.7 Fp8 (200K context window)
- Llama 3.3 70B Instruct Turbo
- Llama 4 Scout (vision-capable)
- Llama 4 Maverick (advanced vision/reasoning)
- DeepSeek V3.1 (coding-focused)
- DeepSeek R1 (reasoning-specialized)
- Kimi K2 Instruct (262K context window)

All models maintain compatibility with standard chat completion APIs.

---

**Additional Resource:** Complete documentation index available at https://docs.openclaw.ai/llms.txt
