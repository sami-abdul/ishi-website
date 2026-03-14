# Context in OpenClaw

## Overview

According to the documentation, **context is everything OpenClaw sends to a model during a run**, constrained by the model's token limit. It encompasses the system prompt, conversation history, tool calls, results, and attachments but differs from persistent memory, which is stored separately.

## Key Components

The system prompt (built by OpenClaw) includes:
- Rules and available tools/skills
- Runtime metadata (time, workspace info)
- Injected workspace files under "Project Context"

Conversation history and tool outputs also occupy context space.

## Inspection Tools

Users can examine context consumption using:
- `/status` - displays window fullness and session settings
- `/context list` - shows injected files with size estimates
- `/context detail` - provides granular breakdowns by file and tool
- `/usage tokens` - appends token counts to replies

## File Injection

OpenClaw automatically injects up to seven workspace files (AGENTS.md, SOUL.md, TOOLS.md, IDENTITY.md, USER.md, HEARTBEAT.md, BOOTSTRAP.md), with per-file caps at 20,000 characters and total caps at 150,000 characters. Large files receive truncation warnings.

## Cost Implications

Tools create dual overhead: descriptive text in the system prompt plus JSON schemas sent to the model. Skills are listed but instructions load only when needed via the `read` command.
