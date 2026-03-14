# Model Providers Documentation

## Overview
OpenClaw supports numerous LLM/model providers through a unified interface using `provider/model` reference format (e.g., `anthropic/claude-opus-4-6`).

## Built-in Providers (No Configuration Required)

**OpenAI** (`openai`)
- Authentication via `OPENAI_API_KEY`
- Supports API key rotation through multiple environment variable formats
- Default transport: WebSocket with SSE fallback
- Example: `openai/gpt-5.1-codex`

**Anthropic** (`anthropic`)
- Authentication via `ANTHROPIC_API_KEY` or setup-token
- API key authentication recommended over subscription tokens
- Example: `anthropic/claude-opus-4-6`

**OpenAI Code/Codex** (`openai-codex`)
- OAuth authentication via ChatGPT
- Example: `openai-codex/gpt-5.3-codex`

**OpenCode Zen** (`opencode`)
- Requires `OPENCODE_API_KEY`
- Example: `opencode/claude-opus-4-6`

**Google Gemini** (`google`)
- Authentication via `GEMINI_API_KEY`
- Example: `google/gemini-3-pro-preview`

**Additional built-in providers** include OpenRouter, xAI, Mistral, Groq, Cerebras, GitHub Copilot, and Hugging Face Inference.

## Custom/Proxy Providers

Configured via `models.providers` in `openclaw.json`:

- **Moonshot AI (Kimi)**: OpenAI-compatible endpoint
- **Qwen OAuth**: Free tier access via device-code flow
- **Volcano Engine/BytePlus**: Access to Doubao, Kimi, GLM, DeepSeek
- **Ollama**: Local runtime at `http://127.0.0.1:11434/v1`
- **vLLM**: Local/self-hosted OpenAI-compatible server
- **Local proxies**: LM Studio, LiteLLM support

## API Key Rotation

The system supports multiple API keys with priority ordering:
- `OPENCLAW_LIVE_<PROVIDER>_KEY` (highest priority)
- `<PROVIDER>_API_KEYS` (comma/semicolon list)
- `<PROVIDER>_API_KEY` (primary)
- `<PROVIDER>_API_KEY_*` (numbered variants)

Key rotation occurs only on rate-limit responses (429, quota exceeded); other failures fail immediately.

## CLI Commands

```bash
openclaw onboard --auth-choice <provider>
openclaw models list
openclaw models set <provider/model>
```
