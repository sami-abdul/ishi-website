# OpenProse

## Overview
OpenProse is a markdown-based workflow system for coordinating multi-agent AI sessions. It is described as "a portable, markdown-first workflow format for orchestrating AI sessions."

## Key Capabilities
The tool enables:
- Parallel multi-agent research and synthesis tasks
- Repeatable, approval-safe workflows suitable for code review and content pipelines
- Portable `.prose` programs compatible across different agent runtimes

## Installation
Enable the bundled plugin via command line: `openclaw plugins enable open-prose`, then restart the Gateway.

## Core Features

**Slash Command Interface**: Users invoke `/prose` commands like `run`, `compile`, and `examples` to execute or manage programs.

**State Storage**: Programs maintain state in `.prose/` directories with support for multiple backends including filesystem (default), in-context, SQLite, and PostgreSQL options.

**Runtime Integration**: OpenProse maps to OpenClaw tools including `sessions_spawn`, `read`/`write`, and `web_fetch` for functionality.

**Remote Program Support**: The system resolves shorthand references (like `handle/slug`) to URLs on `p.prose.md`, enabling distributed workflow sharing.

## Security Considerations
The documentation recommends treating `.prose` files like source code, requiring review before execution. Tool allowlists and approval gates provide additional control over program side effects.