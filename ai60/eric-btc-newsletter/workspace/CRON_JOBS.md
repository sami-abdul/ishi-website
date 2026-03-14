# Cron Jobs

## Active Jobs

### 1. morning-research
- **Schedule**: Daily at 7:00 AM ET
- **Cron**: `0 7 * * *` (America/New_York)
- **Command**: `/research-bitcoin`
- **Purpose**: Collect BTC price, on-chain data, KOL opinions, and news before drafting
- **Output**: Research brief saved to `memory/research-YYYY-MM-DD.md`
- **On failure**: Log to MEMORY.md, retry once at 7:30 AM ET. If still failing, escalate to Eric.

### 2. newsletter-draft
- **Schedule**: Monday, Wednesday, Friday at 9:00 AM ET
- **Cron**: `0 9 * * 1,3,5` (America/New_York)
- **Command**: `/draft-newsletter`
- **Depends on**: morning-research (must have today's research brief)
- **Purpose**: Draft 500-800 word newsletter and deliver to Discord for review
- **Output**: Draft delivered to Discord channel
- **On failure**: Log to MEMORY.md, escalate to Eric. Do not auto-retry drafts.

### 3. subscriber-report
- **Schedule**: Monday at 8:00 AM ET
- **Cron**: `0 8 * * 1` (America/New_York)
- **Command**: `/subscriber-report`
- **Purpose**: Pull Beehiiv analytics and generate weekly subscriber report
- **Output**: Report delivered to Discord channel
- **On failure**: Log to MEMORY.md, retry once. If still failing, skip and note in next report.

### 4. memory-backup
- **Schedule**: Sunday at 12:00 AM ET (midnight)
- **Cron**: `0 0 * * 0` (America/New_York)
- **Command**: `/memory-sync`
- **Purpose**: Consolidate daily logs into MEMORY.md, prune entries older than 30 days, backup state
- **Output**: Updated MEMORY.md, pruned memory/ directory
- **On failure**: Log error. Memory backup is non-critical but should not be skipped more than 2 weeks in a row.

## Re-creation Commands

If cron jobs need to be re-created (after system restart, migration, etc.):

```bash
# Morning research - daily 7AM ET
cron add morning-research "0 7 * * *" --tz America/New_York --cmd "/research-bitcoin"

# Newsletter draft - Mon/Wed/Fri 9AM ET
cron add newsletter-draft "0 9 * * 1,3,5" --tz America/New_York --cmd "/draft-newsletter"

# Subscriber report - Monday 8AM ET
cron add subscriber-report "0 8 * * 1" --tz America/New_York --cmd "/subscriber-report"

# Memory backup - Sunday midnight ET
cron add memory-backup "0 0 * * 0" --tz America/New_York --cmd "/memory-sync"
```

## Standard Patterns

| Pattern | Cron Expression | Description |
|---------|----------------|-------------|
| Every morning | `0 7 * * *` | Daily at 7 AM |
| MWF mornings | `0 9 * * 1,3,5` | Mon/Wed/Fri at 9 AM |
| Weekly Monday | `0 8 * * 1` | Every Monday at 8 AM |
| Weekly Sunday midnight | `0 0 * * 0` | Every Sunday at midnight |
| Every 6 hours | `0 */6 * * *` | Health check cadence (if enabled) |
| First of month | `0 9 1 * *` | Monthly report (future use) |

## Dependency Chain

```
morning-research (7:00 AM)
    |
    v
subscriber-report (8:00 AM, Mondays only)
    |
    v
newsletter-draft (9:00 AM, Mon/Wed/Fri)
    |
    v
[Eric reviews in Discord]
    |
    v
/publish (manual, on APPROVE)
```

## Notes

- All times are in America/New_York (ET). Adjust if Eric's timezone changes.
- The newsletter-draft job depends on morning-research completing first. The 2-hour gap provides buffer.
- The /publish command is never scheduled. It only runs on explicit APPROVE from Eric.
- Memory backup runs weekly but is non-blocking. Missing one week is acceptable.
