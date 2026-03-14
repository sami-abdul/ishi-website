# Diagnostics Flags

Diagnostics flags enable targeted debugging without verbose logging across the system. These opt-in flags only function when a subsystem explicitly checks them.

## Configuration

**Via config file:**
Flags are strings (case-insensitive) and support wildcards like `telegram.*` matching `telegram.http` or `*` for all flags.

```json
{
  "diagnostics": {
    "flags": ["telegram.http", "gateway.*"]
  }
}
```

**Via environment variable:**
Set `OPENCLAW_DIAGNOSTICS=telegram.http,telegram.payload` for one-off enablement, or `OPENCLAW_DIAGNOSTICS=0` to disable all flags.

## Log Location

Logs are written to `/tmp/openclaw/openclaw-YYYY-MM-DD.log` by default (or your configured `logging.file` path) in JSONL format with redaction applied per settings.

## Extraction Examples

- Find the latest log: `ls -t /tmp/openclaw/openclaw-*.log | head -n 1`
- Filter by pattern: `rg "telegram http error" /tmp/openclaw/openclaw-*.log`
- Live tail: `tail -f /tmp/openclaw/openclaw-$(date +%F).log | rg "telegram http error"`

## Important Notes

- Gateway restart required after config changes
- Default `logging.level` of `info` is sufficient; higher levels may suppress these logs
- Enabling flags is safe and only increases volume for the target subsystem
- Remote gateway logs accessible via `openclaw logs --follow`