# OpenClaw Tools Documentation

## Overview

OpenClaw provides first-class agent tools for browser automation, canvas rendering, node management, and scheduled tasks. These typed tools replace older shell-based skills, allowing agents to interact directly with APIs.

## Tool Management

### Enabling and Disabling Tools

Tools can be controlled globally through `openclaw.json` using `tools.allow` and `tools.deny` configurations. The deny list takes precedence, and matching is case-insensitive with wildcard support.

### Tool Profiles

Predefined profiles establish baseline tool availability:
- **minimal**: Only `session_status`
- **coding**: File system, runtime, session, and memory tools plus image analysis
- **messaging**: Communication tools and session management
- **full**: No restrictions (default)

Profiles apply at global and per-agent levels, with provider-specific restrictions possible through `tools.byProvider`.

### Tool Groups

Shortcuts organize related tools for easier policy configuration:
- `group:runtime` – Shell execution tools
- `group:fs` – File operations
- `group:sessions` – Session management
- `group:web` – Web access tools
- `group:ui` – Browser and canvas controls
- `group:automation` – Scheduled and gateway operations
- `group:messaging` – Message sending
- `group:nodes` – Node device operations

## Core Tools

**Execution Tools:**
- `exec` – Run shell commands with timeout, background, and elevation options
- `process` – Manage background sessions (list, poll, kill, clear)

**File System:**
- `read`, `write`, `edit`, `apply_patch` – File operations

**Web Access:**
- `web_search` – Query via Perplexity, Brave, Gemini, Grok, or Kimi
- `web_fetch` – Extract readable content from URLs
- `browser` – Full browser control (navigation, snapshots, actions, profile management)

**Media and Analysis:**
- `image` – Analyze images with configured model
- `pdf` – Process PDF documents
- `canvas` – Drive node Canvas presentation and evaluation
- `nodes` – Device control, camera, screen recording, location, notifications

**Communication:**
- `message` – Send/receive across Discord, Slack, Teams, WhatsApp, Telegram, Signal, iMessage, Google Chat

**Session and Workflow:**
- `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`, `session_status` – Multi-session management
- `cron` – Schedule and manage jobs
- `gateway` – Restart or reconfigure the Gateway process

## Safety Features

Loop detection prevents repetitive no-progress tool patterns through configurable thresholds for warnings and critical blocks. The system tracks call history and detects generic repeats, poll-without-progress patterns, and alternating cycles.

## Presentation to Agents

Tools are exposed through both human-readable system prompt guidance and structured function schemas sent to the model API, ensuring the agent understands both availability and invocation requirements.
