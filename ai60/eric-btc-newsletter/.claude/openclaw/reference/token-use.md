# Token Use and Costs

## Overview

OpenClaw measures usage in **tokens** rather than characters. Most OpenAI-compatible models average approximately 4 characters per token for English text.

## System Prompt Construction

OpenClaw dynamically builds its system prompt on each run, incorporating:

- Tool and skills metadata
- Self-update instructions
- Workspace bootstrap files (AGENTS.md, SOUL.md, TOOLS.md, IDENTITY.md, USER.md, HEARTBEAT.md, BOOTSTRAP.md, MEMORY.md)
- Time information (UTC + user timezone)
- Reply tags and heartbeat behavior
- Runtime metadata

Large files are truncated at `agents.defaults.bootstrapMaxChars` (default: 20,000), with total bootstrap capped at `agents.defaults.bootstrapTotalMaxChars` (default: 150,000).

## Context Window Consumption

Everything received by the model counts toward the context limit:

- System prompt sections
- Conversation history
- Tool calls and results
- Attachments/transcripts (images, audio, files)
- Compaction summaries
- Provider wrappers

**Image optimization:** Configure `agents.defaults.imageMaxDimensionPx` (default: 1200px) to balance visual detail against token usage.

## Monitoring Token Usage

**Chat commands:**
- `/status` -- Displays session model, context usage, and estimated cost
- `/usage off|tokens|full` -- Appends per-response usage footer
- `/usage cost` -- Shows local cost summary from session logs

**Other interfaces:** TUI/Web TUI and CLI support these commands with context-appropriate detail levels.

## Cost Estimation

Costs derive from your model pricing configuration (USD per 1M tokens for input, output, cacheRead, cacheWrite). OAuth authentication hides dollar amounts.

## Prompt Caching Strategies

**Cache TTL pruning** resets the cache window after expiration, allowing re-use of freshly cached context without re-caching full history.

**Heartbeat warming:** Setting the heartbeat interval just below your cache TTL prevents costly re-caching during idle periods.

**Example configurations:**
- Keep 1-hour cache warm with 55-minute heartbeat intervals
- Mixed traffic with per-agent cache strategies (e.g., "research" agents with caching vs. "alerts" without)
- Enable Anthropic's 1M context beta with `context1m: true` on supported models

## Cost Reduction Tips

- Use `/compact` for session summarization
- Trim verbose tool outputs
- Reduce image dimensions for screenshot-heavy sessions
- Keep skill descriptions concise
- Select smaller models for exploratory work