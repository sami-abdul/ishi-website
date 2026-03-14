# OpenClaw Devices Documentation

The `openclaw devices` command manages device pairing and authentication tokens within the OpenClaw system.

## Key Commands

**Listing & Management:**
- `openclaw devices list` shows pending pairing requests and paired devices
- `openclaw devices remove <deviceId>` deletes a single device entry
- `openclaw devices clear --yes` bulk removes paired devices

**Approval & Rejection:**
- `openclaw devices approve [requestId]` accepts pairing requests, automatically approving the most recent if no ID is specified
- `openclaw devices reject <requestId>` denies a pairing request

**Token Operations:**
- Token rotation via `openclaw devices rotate --device <id> --role <role>` returns a new credential that should be kept secure
- Token revocation via `openclaw devices revoke --device <id> --role <role>` removes access

## Authentication Requirements

These operations require `operator.pairing` or `operator.admin` scope. Common options include `--url`, `--token`, `--password`, `--timeout`, and `--json` for output formatting.

## Token Drift Recovery

When clients encounter authentication mismatches, the documentation outlines a five-step recovery process: confirming the current gateway token, listing devices, rotating operator tokens, removing stale pairings if needed, and retrying client connections with current credentials.
