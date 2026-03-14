# Streaming and Chunking

## Overview

OpenClaw provides two distinct streaming mechanisms: block streaming for channels (emitting completed blocks as messages) and preview streaming for platforms like Telegram, Discord, and Slack (updating temporary messages during generation).

Notably, the system does not offer "true token-delta streaming" to channel messages. Instead, it uses message-based approaches for preview updates.

## Block Streaming (Channel Messages)

Block streaming delivers assistant output in coarse segments as they become available, following this flow:

```
Model output
  └─ text_delta/events
       ├─ (blockStreamingBreak=text_end)
       │    └─ chunker emits blocks as buffer grows
       └─ (blockStreamingBreak=message_end)
            └─ chunker flushes at message_end
                   └─ channel send (block replies)
```

**Key Controls:**

- `agents.defaults.blockStreamingDefault`: Toggle streaming on/off (default: off)
- `agents.defaults.blockStreamingBreak`: Choose `"text_end"` or `"message_end"`
- `agents.defaults.blockStreamingChunk`: Set `minChars`, `maxChars`, and `breakPreference`
- `agents.defaults.blockStreamingCoalesce`: Merge streamed blocks with `minChars`, `maxChars`, `idleMs`
- Channel limits: `*.textChunkLimit` and `*.chunkMode` (`length` or `newline`)
- Discord: `*.maxLinesPerMessage` (default 17) prevents UI clipping

**Boundary Semantics:**

- `text_end` emits blocks immediately upon chunker output; flushes per `text_end` event
- `message_end` waits for completion, then flushes all buffered output (still chunking if exceeding `maxChars`)

## Chunking Algorithm

The `EmbeddedBlockChunker` implements intelligent text division:

- **Lower bound:** Buffer must reach `minChars` before emission (unless forced)
- **Upper bound:** Attempts splits before `maxChars`; forces splits at limit
- **Break preference hierarchy:** paragraph > newline > sentence > whitespace > hard break
- **Code fence handling:** Never splits inside fences; closes and reopens when necessary to maintain Markdown validity

The `maxChars` setting respects channel `textChunkLimit` caps.

## Coalescing

Block streaming can merge consecutive chunks before dispatch:

- Waits for idle gaps (`idleMs`) to flush accumulated text
- Respects `maxChars` cap; exceeding it triggers immediate flush
- `minChars` prevents tiny fragments; final flush always sends remaining content
- Joiner selection follows `breakPreference` (paragraph uses `\n\n`, newline uses `\n`, sentence uses space)

Default `minChars` increases to 1500 for Signal, Slack, and Discord unless customized.

## Human-Like Pacing

Optional randomized delays between block replies improve naturalness:

- **Configuration:** `agents.defaults.humanDelay`
- **Modes:** `off` (default), `natural` (800-2500ms), `custom` (`minMs`/`maxMs`)
- Applies exclusively to block replies, not final or tool summary replies

## Streaming Modes Summary

| **Mode** | **Configuration** |
|----------|-------------------|
| Stream chunks progressively | `blockStreamingDefault: "on"` + `blockStreamingBreak: "text_end"` |
| Stream everything at completion | `blockStreamingBreak: "message_end"` |
| Disable block streaming | `blockStreamingDefault: "off"` |

Block streaming remains inactive unless `*.blockStreaming` is explicitly enabled per channel.

## Preview Streaming Modes

Configuration key: `channels.<channel>.streaming`

**Available Modes:**

- `off`: Disable preview updates
- `partial`: Single preview message with replacement updates
- `block`: Chunked/appended preview updates
- `progress`: Status preview during generation; final answer upon completion

**Channel Support:**

| Channel  | off | partial | block | progress |
|----------|-----|---------|-------|----------|
| Telegram | Yes | Yes     | Yes   | maps to partial |
| Discord  | Yes | Yes     | Yes   | maps to partial |
| Slack    | Yes | Yes     | Yes   | Yes      |

**Platform-Specific Behaviors:**

- **Telegram:** Uses `sendMessage`/`editMessageText`; skips preview when block streaming is active; `/reasoning stream` can output reasoning to preview
- **Discord:** Uses send/edit pattern; `block` mode employs draft chunking; skips preview when block streaming is enabled
- **Slack:** `partial` mode optionally uses native streaming API; `block` uses append-style drafts; `progress` displays status then final answer

Slack supports `channels.slack.nativeStreaming` to toggle native API calls during `partial` mode (default: enabled).
