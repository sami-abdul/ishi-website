# NVIDIA API Documentation

## Overview
NVIDIA offers an OpenAI-compatible API endpoint at `https://integrate.api.nvidia.com/v1` for accessing Nemotron and NeMo models. Authentication requires an API key from NVIDIA NGC.

## Setup Instructions

### CLI Configuration
Users should export their API key as an environment variable and configure the model:

```bash
export NVIDIA_API_KEY="nvapi-..."
openclaw onboard --auth-choice skip
openclaw models set nvidia/nvidia/llama-3.1-nemotron-70b-instruct
```

The documentation notes that using environment variables is preferable to passing tokens directly via command line.

### Configuration File
The config snippet shows the provider setup structure:

```json5
{
  env: { NVIDIA_API_KEY: "nvapi-..." },
  models: {
    providers: {
      nvidia: {
        baseUrl: "https://integrate.api.nvidia.com/v1",
        api: "openai-completions",
      },
    },
  },
  agents: {
    defaults: {
      model: { primary: "nvidia/nvidia/llama-3.1-nemotron-70b-instruct" },
    },
  },
}
```

## Available Models

Three model options are provided:
- `nvidia/llama-3.1-nemotron-70b-instruct` (default)
- `meta/llama-3.3-70b-instruct`
- `nvidia/mistral-nemo-minitron-8b-8k-instruct`

## Key Features

The provider "auto-enables when `NVIDIA_API_KEY` is set" and uses standard defaults including a 131,072-token context window with 4,096 maximum output tokens.
