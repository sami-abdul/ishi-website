# Automation Troubleshooting

## Overview
This documentation page provides guidance for resolving scheduler and delivery issues related to `cron` and `heartbeat` functionality in OpenClaw.

## Command Ladder
The page recommends a diagnostic sequence beginning with status checks:
- `openclaw status`
- `openclaw gateway status`
- `openclaw logs --follow`
- `openclaw doctor`
- `openclaw channels status --probe`

Followed by automation-specific checks for cron and heartbeat operations.

## Troubleshooting Sections

**Cron Not Firing**
Diagnostic commands identify whether the scheduler is enabled and jobs have valid schedules. The page lists common error signatures, such as "cron: scheduler disabled; jobs will not run automatically" indicating configuration issues.

**Cron Fired But No Delivery**
This section addresses situations where scheduled jobs execute successfully but fail to send external messages. It highlights that delivery mode set to `none` means no outbound message should be expected.

**Heartbeat Suppressed or Skipped**
The guide explains how to verify heartbeat configuration and identify suppression reasons, including quiet-hours restrictions and busy request lanes.

**Timezone and ActiveHours Gotchas**
This section emphasizes that unset user timezone values cause fallback behavior, and cron jobs use host timezone unless explicitly specified with `--tz` flag.

## Related Resources
The page links to four supplementary topics covering cron jobs, gateway heartbeat, cron versus heartbeat comparison, and timezone concepts.
