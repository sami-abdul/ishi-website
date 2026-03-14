# Ollama Integration with OpenClaw

## Overview

OpenClaw integrates with Ollama, a local LLM runtime for open-source models. The system supports native API integration via `/api/chat` with streaming and tool calling capabilities.

## Key Setup Steps

**Installation and Configuration:**
1. Install Ollama from ollama.ai
2. Pull a model (e.g., `ollama pull llama3.3`)
3. Set `OLLAMA_API_KEY` environment variable
4. Reference models as `ollama/model-name` in config

## Model Discovery

When you enable the API key without explicitly defining `models.providers.ollama`, OpenClaw automatically discovers locally available models by:

- Querying Ollama's `/api/tags` and `/api/show` endpoints
- Filtering for models with tool capabilities
- Reading context window information from model metadata
- Setting all costs to zero (local, free operation)

## Critical Configuration Warning

"Do not use the `/v1` OpenAI-compatible URL" when connecting remote Ollama instances. The documentation explicitly states this breaks tool calling functionality. Instead, use the native API URL format: `baseUrl: "http://host:11434"` without path suffixes.

## Advanced Features

The system recognizes reasoning-capable models when Ollama reports thinking capabilities and supports both native Ollama API mode (recommended) and legacy OpenAI-compatible mode (with caveats regarding tool reliability).
