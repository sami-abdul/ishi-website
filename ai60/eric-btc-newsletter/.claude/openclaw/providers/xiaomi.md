# Xiaomi MiMo Documentation

## Overview

Xiaomi MiMo is an API platform providing REST APIs compatible with OpenAI and Anthropic formats. It requires API key authentication, which can be created through the Xiaomi MiMo console.

## Available Model

The platform offers **mimo-v2-flash**, featuring a 262,144-token context window and compatibility with Anthropic Messages API format.

## Setup Instructions

**CLI Configuration:**
Users can initialize authentication either interactively or by providing credentials directly to the onboarding command.

**Configuration Details:**
- Base URL: `https://api.xiaomimimo.com/anthropic`
- Authorization method: Bearer token authentication
- Model identifier: `xiaomi/mimo-v2-flash`
- Max output tokens: 8,192
- Input costs: Free (all categories)

## Key Implementation Points

- The provider automatically activates when the `XIAOMI_API_KEY` environment variable is configured
- Supports text input only
- Does not include reasoning capabilities
- Provider configuration follows standard merge mode rules as documented in model provider concepts

For additional configuration options and provider integration rules, refer to the model providers documentation.
