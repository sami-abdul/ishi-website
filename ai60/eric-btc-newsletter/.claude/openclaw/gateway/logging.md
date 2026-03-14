# Logging

## Overview
OpenClaw provides two primary logging surfaces: console output visible in the terminal/Debug UI, and JSON-formatted file logs managed by the gateway logger.

## File-Based Logging
The system stores rolling log files in `/tmp/openclaw/` with daily rotation (format: `openclaw-YYYY-MM-DD.log`). Configuration options in `~/.openclaw/openclaw.json` control:
- `logging.file` (file path)
- `logging.level` (verbosity depth)

Users can tail these logs via CLI: `openclaw logs --follow`

## Key Distinction: Verbosity vs. Log Levels
An important distinction exists between the two systems: "File logs are controlled exclusively by `logging.level`." Meanwhile, the `--verbose` flag only affects console output, not file logging depth. To capture verbose details in persistent logs, set `logging.level` to `debug` or `trace`.

## Console Configuration
Console output can be tuned independently through:
- `logging.consoleLevel` (default: `info`)
- `logging.consoleStyle` (options: `pretty`, `compact`, or `json`)

## Security Features
The system redacts sensitive tokens from console-only tool summaries (controlled by `logging.redactSensitive`), preserving file log integrity while protecting displayed content.

## WebSocket Logging
The gateway implements context-aware WebSocket logging that shows only errors and slow calls (>=50ms threshold) in normal mode, with full traffic visibility when `--verbose` is enabled.
