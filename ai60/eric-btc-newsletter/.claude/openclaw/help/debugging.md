# Debugging

This page provides guidance on debugging tools for OpenClaw, particularly when handling streaming output and provider-mixed reasoning.

## Key Debugging Features

**Runtime Debug Overrides**
The `/debug` command enables temporary configuration changes in memory without modifying `openclaw.json`. Users can view, modify, or reset settings: `"/debug show"`, `"/debug set"`, `"/debug unset"`, and `"/debug reset"`.

**Gateway Watch Mode**
Developers can run `pnpm gateway:watch` for rapid iteration, which monitors source files and configuration for changes.

**Development Profile Setup**
A `--dev` flag creates isolated state under `~/.openclaw-dev` with a default gateway port of `19001`. The recommended workflow combines `pnpm gateway:dev` with `OPENCLAW_PROFILE=dev openclaw tui`.

## Stream Logging Options

**OpenClaw Raw Stream Logging**
Enable with `pnpm gateway:watch --raw-stream` to capture the unfiltered assistant stream before formatting. This reveals whether reasoning arrives as text deltas or separate thinking blocks.

**Pi-Mono Raw Chunk Logging**
Set `PI_RAW_STREAM=1` to capture raw OpenAI-compatible chunks before parsing into blocks.

## Important Safety Warnings

Raw stream logs may contain full prompts, tool output, and user data. The documentation advises keeping logs local, deleting them after use, and scrubbing sensitive information before sharing.
