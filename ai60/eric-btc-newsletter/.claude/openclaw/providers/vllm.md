# vLLM Integration Guide

## Overview

vLLM provides an OpenAI-compatible HTTP API for serving open-source and custom models. OpenClaw connects via the `openai-completions` API and supports automatic model discovery.

## Getting Started

The setup involves three steps:

1. **Launch vLLM** with an OpenAI-compatible server exposing `/v1` endpoints (typically at `http://127.0.0.1:8000/v1`)

2. **Set authentication** by exporting `VLLM_API_KEY` with any value if your server doesn't require authentication

3. **Configure your model** in OpenClaw using the format `vllm/your-model-id`

## Automatic Model Discovery

When `VLLM_API_KEY` is configured without an explicit `models.providers.vllm` definition, OpenClaw automatically queries the `/v1/models` endpoint and converts returned identifiers into usable entries. Manual configuration disables this feature.

## Manual Configuration

For non-standard deployments, explicit setup is recommended when:

- vLLM operates on a different host or port
- You need to specify `contextWindow` or `maxTokens` parameters
- Your server requires actual authentication credentials

The configuration accepts parameters like `baseUrl`, `apiKey`, model identifiers, and token limits.

## Diagnosis

Verify server availability using: `curl http://127.0.0.1:8000/v1/models`

Authentication errors typically resolve by setting `VLLM_API_KEY` to match your server's requirements or configuring the provider explicitly.
