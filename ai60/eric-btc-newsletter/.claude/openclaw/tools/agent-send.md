# Agent Send

## Overview

The `openclaw agent` command executes a single agent turn without requiring an inbound chat message. By default, it routes through the Gateway, though the `--local` flag enables the embedded runtime on your current machine.

## Core Behavior

**Required parameter:**
- `--message <text>` – the prompt text

**Session selection (choose one):**
- `--to <dest>` – derives the session key; group/channel targets maintain isolation, direct chats use `main`
- `--session-id <id>` – reuses an existing session
- `--agent <id>` – targets a configured agent directly via its `main` session

The command uses the same embedded agent runtime as normal inbound replies. Thinking and verbose settings persist in the session store.

**Output modes:**
- Default: prints reply text and `MEDIA:<url>` lines
- `--json`: outputs structured payload with metadata

Optional delivery to a channel requires `--deliver` plus `--channel`. Override delivery targets using `--reply-channel`, `--reply-to`, or `--reply-account` without changing the session.

If the Gateway becomes unreachable, the CLI automatically falls back to local execution.

## Examples

```bash
openclaw agent --to +15555550123 --message "status update"
openclaw agent --agent ops --message "Summarize logs"
openclaw agent --session-id 1234 --message "Summarize inbox" --thinking medium
openclaw agent --to +15555550123 --message "Trace logs" --verbose on --json
openclaw agent --to +15555550123 --message "Summon reply" --deliver
openclaw agent --agent ops --message "Generate report" --deliver --reply-channel slack --reply-to "#reports"
```

## Available Flags

- `--local` – run locally (requires model provider API keys in shell environment)
- `--deliver` – send reply to chosen channel
- `--channel` – delivery channel option (`whatsapp|telegram|discord|googlechat|slack|signal|imessage`; defaults to `whatsapp`)
- `--reply-to` – delivery target override
- `--reply-channel` – delivery channel override
- `--reply-account` – delivery account id override
- `--thinking <off|minimal|low|medium|high|xhigh>` – persist thinking level (GPT-5.2 + Codex models only)
- `--verbose <on|full|off>` – persist verbose level
- `--timeout <seconds>` – override agent timeout
- `--json` – output structured JSON
