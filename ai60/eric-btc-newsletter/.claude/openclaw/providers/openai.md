# OpenAI Integration Documentation

## Authentication Methods

OpenClaw supports two approaches for connecting to OpenAI services:

**Option A: Direct API Key**
Users obtain credentials from the OpenAI platform for "usage-based billing." Setup involves running `openclaw onboard --openai-api-key "$OPENAI_API_KEY"` and configuring the model reference as `openai/gpt-5.4`.

**Option B: ChatGPT/Codex Subscription**
This method leverages OAuth authentication through ChatGPT or Codex subscriptions. The onboarding command `openclaw onboard --auth-choice openai-codex` initiates the OAuth flow, with model references formatted as `openai-codex/gpt-5.4`.

## Transport Configuration

The platform defaults to `"auto"` mode, attempting WebSocket connections before falling back to Server-Sent Events (SSE). Users can override this behavior through configuration parameters:

- `"websocket"`: enforces WebSocket protocol
- `"sse"`: enforces SSE streaming
- `"auto"`: tests WebSocket availability first

## Performance Optimization Features

**WebSocket Warm-up**: "OpenClaw enables it by default for `openai/*` to reduce first-turn latency when using WebSocket transport," though this can be disabled via `openaiWsWarmup: false`.

**Priority Processing**: The `serviceTier` parameter accepts values including `auto`, `default`, `flex`, and `priority` to influence request handling.

**Server-Side Compaction**: For Responses models, the system auto-enables context management with a default `compact_threshold` set to 70% of the model's context window.
