# openclaw logs Documentation

## Overview

The `openclaw logs` command enables tailing of Gateway file logs through RPC, with functionality in remote mode.

## Command Details

**Purpose:** "Tail Gateway file logs over RPC (works in remote mode)."

## Usage Examples

```bash
openclaw logs
openclaw logs --follow
openclaw logs --json
openclaw logs --limit 500
openclaw logs --local-time
openclaw logs --follow --local-time
```

## Key Options

- `--follow`: Continuously stream log updates
- `--json`: Output logs in JSON format
- `--limit`: Specify maximum number of log entries (example shows 500)
- `--local-time`: Display timestamps adjusted to your system's timezone

## Related Resources

For broader context, consult the logging overview at the [Logging](/logging) documentation page.
