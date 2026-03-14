# CLI Backends

## Overview

OpenClaw supports local AI CLIs as a text-only fallback mechanism when primary API providers experience issues. According to the documentation, this feature is "intentionally conservative" with tools disabled and text-in/text-out functionality, while maintaining session support for coherent conversations.

## Quick Start

The system includes built-in defaults for Claude Code CLI and Codex CLI, allowing usage without configuration:

```bash
openclaw agent --message "hi" --model claude-cli/opus-4.6
```

For custom setups, users can specify command paths directly in configuration when running under launchd/systemd with minimal PATH environments.

## Fallback Configuration

CLI backends integrate into primary/fallback model hierarchies. The documentation notes that "if you use `agents.defaults.models` (allowlist), you must include `claude-cli/...`" to enable fallback routing.

## Key Configuration Options

Configuration lives under `agents.defaults.cliBackends` with provider IDs forming model references like `<provider>/<model>`. Important settings include:

- **Session handling**: `sessionArg`, `sessionMode` (always/existing/none), and `resumeArgs` for CLI-specific resume mechanics
- **Image support**: `imageArg` and `imageMode` for passing image paths to CLIs
- **Output parsing**: JSON, JSONL, or text modes
- **Input methods**: Arguments or stdin, with optional character limits

## Built-in Defaults

OpenClaw ships preconfigured backends for `claude-cli` and `codex-cli` with sensible defaults covering command paths, arguments, and output formats. Users override only necessary parameters like absolute command paths.

## Limitations

The system explicitly disables OpenClaw tools, lacks streaming support, and depends on CLI-native JSON formatting for structured outputs.
