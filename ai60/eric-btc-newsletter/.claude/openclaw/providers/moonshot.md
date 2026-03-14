# Moonshot AI Documentation

## Overview
Moonshot provides the Kimi API with OpenAI-compatible endpoints. Users can configure the provider using the default model `moonshot/kimi-k2.5` or Kimi Coding with `kimi-coding/k2p5`.

## Available Kimi K2 Models
The documentation lists five current model IDs:
- `kimi-k2.5`
- `kimi-k2-0905-preview`
- `kimi-k2-turbo-preview`
- `kimi-k2-thinking`
- `kimi-k2-thinking-turbo`

## Setup Commands

**Moonshot API:**
```bash
openclaw onboard --auth-choice moonshot-api-key
```

**Kimi Coding:**
```bash
openclaw onboard --auth-choice kimi-code-api-key
```

## Key Distinction
"Moonshot and Kimi Coding are separate providers. Keys are not interchangeable, endpoints differ, and model refs differ."

## Configuration Details
- Moonshot uses the baseUrl `https://api.moonshot.ai/v1`
- All Kimi K2 models feature a 256,000 token context window and 8,192 max tokens
- The thinking variants support reasoning capabilities
- Model references follow patterns: `moonshot/...` for Moonshot, `kimi-coding/...` for Kimi Coding

## Regional Endpoints
Users can access the international endpoint at `https://api.moonshot.ai/v1` or the China endpoint at `https://api.moonshot.cn/v1`.
