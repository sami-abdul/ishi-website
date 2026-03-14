# Timezones in OpenClaw

OpenClaw implements a standardized timestamp system to ensure the AI model operates from a single reference time.

## Message Envelope Format

Inbound messages appear with envelope headers displaying timestamps, by default in the host's local timezone with minute-level precision. An example envelope reads: `[Provider ... 2026-01-05 16:26 PST] message text`

## Configuration Options

You can customize timezone behavior through these settings:

- **envelopeTimezone**: Choose between `"local"` (default), `"utc"`, `"user"`, or a specific IANA timezone
- **envelopeTimestamp**: Toggle absolute timestamps on/off
- **envelopeElapsed**: Control whether elapsed time indicators appear

The documentation notes that "envelopeTimezone: 'user' uses agents.defaults.userTimezone (falls back to host timezone)" if the user timezone isn't specified.

## Tool Call Data

Functions retrieving messages from external platforms return both raw provider timestamps and normalized fields (`timestampMs` in UTC epoch milliseconds and `timestampUtc` in ISO 8601 format).

## System Prompt Integration

Setting `agents.defaults.userTimezone` informs the model of the user's local timezone, which appears in the system prompt's date/time section. The time format (12-hour or 24-hour) can be controlled via `agents.defaults.timeFormat`.
