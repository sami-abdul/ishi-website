# Date and Time

## Key Configuration Options

OpenClaw manages timestamps through several configurable settings. The system defaults to **host-local time for message envelopes** while preserving provider-native timestamps for tool semantics.

### Message Envelope Settings

Users can customize how timestamps appear in message headers through three main options:

- **Timezone selection**: Choose between local, UTC, user timezone, or a specific IANA timezone
- **Timestamp display**: Toggle absolute timestamps on or off
- **Elapsed time**: Show or hide relative time indicators (e.g., "+30s")

### System Prompt Configuration

When a user timezone is known, the system prompt includes a dedicated section showing only the timezone name -- "Time zone: America/Chicago" -- to maintain prompt caching stability. Current time access occurs through the `session_status` tool rather than static prompts.

### User-Level Settings

Two additional configuration options affect timezone handling:

- `userTimezone`: Specifies the user's local timezone for prompt context
- `timeFormat`: Controls 12-hour or 24-hour display, with "auto" detection based on OS preferences

## Tool Integration

Channel tools return both provider-native timestamps and normalized fields (`timestampMs` for epoch milliseconds and `timestampUtc` for ISO 8601 strings), ensuring compatibility across different platforms while preserving original provider data.