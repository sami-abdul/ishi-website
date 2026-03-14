# Troubleshooting

This page provides an in-depth troubleshooting guide for OpenClaw gateway issues, structured as a series of diagnostic runbooks.

## Core Diagnostic Sequence

The recommended initial approach involves running commands in this order: `openclaw status`, `openclaw gateway status`, `openclaw logs --follow`, `openclaw doctor`, and `openclaw channels status --probe`. Healthy systems should show the gateway runtime as "running" with successful RPC probe results.

## Key Troubleshooting Scenarios

**Long Context Rate Limiting**: When encountering Anthropic 429 errors related to long context, check whether the selected model has `context1m` enabled and verify that the API credential supports extended usage. Solutions include disabling the parameter, upgrading credentials, or configuring fallback models.

**Message Delivery Issues**: If channels show as connected but messages don't flow, the documentation suggests investigating routing policies, mention requirements, channel allowlists, and sender pairing status. Common blocking patterns include pending pairing requests and group mention gating.

**Dashboard Connectivity**: Connection problems typically stem from URL mismatches, authentication mode conflicts, or missing device identity validation. The guide includes a detailed error code mapping table for authentication failures.

**Service Startup Failures**: When the gateway process won't stay running, check for port conflicts, service configuration mismatches, and ensure `gateway.mode=local` is properly configured.

**Post-Upgrade Issues**: Recent changes affected authentication behavior, bind/auth requirements, and device pairing workflows. The guide recommends verifying gateway mode, auth token configuration, and device approval states.

## Specialized Runbooks

Additional sections address node tool failures, browser automation issues, cron/heartbeat delivery, and channel-specific problems across WhatsApp, Telegram, and Discord integrations.
