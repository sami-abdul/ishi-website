# Venice AI Documentation Summary

## Overview
Venice AI provides privacy-focused inference with support for uncensored models and anonymized access to major proprietary options. The platform offers "two privacy levels" through **Private** mode (fully ephemeral, no logging) and **Anonymized** mode (metadata-stripped proxy access).

## Key Features
The platform emphasizes privacy-first architecture with OpenAI-compatible endpoints. It supports streaming, function calling on select models, and vision capabilities across compatible offerings. Users benefit from "no hard rate limits" with fair-use throttling for extreme usage scenarios.

## Setup Process
Configuration involves three paths: environment variable setup, interactive onboarding (recommended via `openclaw onboard --auth-choice venice-api-key`), or non-interactive command-line configuration. Initial verification uses the test command with the default Kimi K2.5 model.

## Model Selection
The documentation recommends Kimi K2.5 for general use, Claude Opus 4.6 for highest capability, and specialized models for coding, vision, or uncensored needs. The platform offers 41 total models: 26 private models and 15 anonymized proxy models accessing Claude, GPT, Gemini, and Grok.

## Pricing & Comparison
Venice uses credit-based pricing (details at venice.ai/pricing). Compared to direct APIs, Venice adds 10-50ms latency through its proxy but provides "metadata stripped, anonymized" access versus "your account linked" direct connections.
