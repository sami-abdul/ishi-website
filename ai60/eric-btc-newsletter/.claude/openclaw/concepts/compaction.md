# Compaction in OpenClaw

## Overview

OpenClaw implements a **compaction system** to manage context window constraints. As conversations grow with accumulated messages and tool outputs, the system "summarizes older conversation into a compact summary entry and keeps recent messages intact."

## Key Features

**Auto-Compaction (Enabled by Default)**
The system automatically triggers when sessions approach or exceed the model's context limit. Users see notifications like `Auto-compaction complete` in verbose mode.

**Manual Compaction**
Users can force compaction using `/compact` with optional instructions (e.g., `/compact Focus on decisions and open questions`).

**Persistent Storage**
Compaction summaries are stored in the session's JSONL history, allowing future requests to leverage both the summary and recent messages.

## Configuration Options

The `agents.defaults.compaction` setting in `openclaw.json` controls behavior. Notable parameters include:

- **Identifier Policy**: Controls how opaque identifiers are handled ("strict" by default, with "off" or "custom" options available)
- **Custom Model**: You can specify a different model for summarization tasks via `agents.defaults.compaction.model`, useful when your primary model is less capable

Example configurations support both cloud providers (OpenRouter) and local models (Ollama).

## Compaction vs. Pruning

The documentation distinguishes between two approaches: "Compaction: summarises and **persists** in JSONL" while session pruning "trims old **tool results** only, **in-memory**, per request."
