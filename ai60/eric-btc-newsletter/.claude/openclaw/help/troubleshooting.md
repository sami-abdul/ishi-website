# Troubleshooting Guide for OpenClaw

## Quick Triage (60 Seconds)

The documentation recommends running these commands in sequence:

```bash
openclaw status
openclaw status --all
openclaw gateway probe
openclaw gateway status
openclaw doctor
openclaw channels status --probe
openclaw logs --follow
```

Each command should produce specific positive indicators, such as "Runtime: running" and no fatal errors in the logs.

## Common Issues

**Anthropic Rate Limiting**: If you encounter a 429 error about long context requests, the docs direct you to a dedicated troubleshooting section for that specific issue.

**Plugin Installation**: Plugins fail when missing the `openclaw.extensions` field in `package.json`. The fix requires adding this configuration and pointing to built runtime files.

## Problem Categories

The guide uses a decision tree to categorize eight failure scenarios:

1. No replies from the system
2. Dashboard/Control UI connection issues
3. Gateway startup problems
4. Channel connectivity without message flow
5. Cron or heartbeat failures
6. Node tool execution problems
7. Browser tool failures

Each category includes diagnostic commands and expected output signatures, plus links to deeper documentation sections for investigation.
