# Hugging Face (Inference) Documentation

## Overview
Hugging Face Inference Providers enable access to multiple language models through an OpenAI-compatible API. The system supports models like DeepSeek, Llama, and Qwen with a single authentication token.

## Key Details

**Provider Information:**
- Provider identifier: `huggingface`
- Authentication: `HUGGINGFACE_HUB_TOKEN` or `HF_TOKEN` (requires "Make calls to Inference Providers" permission)
- API endpoint: `https://router.huggingface.co/v1`
- Billing model: Single HF token with provider-based pricing and free tier availability

## Setup Process

1. Generate a fine-grained token at Hugging Face settings with appropriate inference permissions
2. Run onboarding: `openclaw onboard --auth-choice huggingface-api-key`
3. Select your preferred model from the dropdown list
4. Configuration saves automatically as the default model

## Model Configuration

Models follow the naming pattern `huggingface/<org>/<model>`. You can append policy suffixes:
- **`:fastest`** — Router selects for maximum throughput
- **`:cheapest`** — Router optimizes for lowest cost per token
- **`:provider`** — Force specific backend (e.g., `:together`, `:sambanova`)

## Available Models

The documentation lists example models including DeepSeek R1/V3.2, Qwen variants, Llama 3.3/3.1, GPT-OSS 120B, and others discoverable via the `/v1/models` endpoint.

## Configuration Examples

Custom display names and fallback chains can be set in the configuration file, allowing flexible model selection strategies.
