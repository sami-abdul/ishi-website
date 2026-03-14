# Content Calendar

3x/week publishing schedule. The agent generates drafts on schedule and delivers them to Discord for Eric's approval before publishing.

## Weekly Schedule

| Day | Category | Cron (ET) | Reference |
|-----|----------|-----------|-----------|
| Monday | Market Analysis | Draft at 9:00 AM | See `topics.md` for sub-topics |
| Wednesday | On-Chain + News | Draft at 9:00 AM | See `topics.md` for sub-topics |
| Friday | Education + Opinion | Draft at 9:00 AM | See `topics.md` for sub-topics |

Research cron runs daily at 7:00 AM ET (see CRON_JOBS.md). Drafts pull from the morning research brief.

## Edition Numbering

- Sequential from #001
- Format: "Edition #XXX"
- Tracked in MEMORY.md (edition counter)

## Rotation Tracking

The agent rotates through sub-topics within each category to keep content varied:

1. Each category in `topics.md` has 6-8 sub-topics
2. The agent tracks the current rotation index per category in MEMORY.md
3. After drafting, the rotation index advances to the next sub-topic
4. 14-day dedup rule: if a sub-topic was covered in the last 14 days, skip to the next one

## Override Rules

Eric can override the scheduled category at any time:

| Override | How |
|----------|-----|
| Specific topic | `/draft-newsletter [topic]` in Discord |
| Breaking news | Agent detects major event in research and flags it. Eric decides whether to override. |

Events that warrant an override:
- Bitcoin ETF approvals or rejections
- Halving events
- Major protocol upgrades (soft forks, Taproot-level changes)
- Large corporate Bitcoin purchases (Saylor/MicroStrategy-scale)
- Significant regulatory actions (bans, approvals, SEC rulings)
- Black swan market events (exchange collapses, major hacks)

When an override happens:
- The scheduled category shifts to the next available slot, or gets skipped
- The override edition still counts toward the edition number
- Override is logged in MEMORY.md

## Holiday Handling

US market holidays where the newsletter skips or reschedules:

| Holiday | Typical Date | Action |
|---------|-------------|--------|
| New Year's Day | Jan 1 | Skip if falls on Mon/Wed/Fri |
| Independence Day | Jul 4 | Skip if falls on Mon/Wed/Fri |
| Thanksgiving | 4th Thu in Nov | Skip Friday after |
| Christmas | Dec 25 | Skip if falls on Mon/Wed/Fri |

For other holidays: publish as normal unless Eric instructs otherwise.

If a scheduled day is skipped:
- The edition does not get published (no backfill)
- Rotation index does not advance
- Next scheduled day picks up where the calendar left off

## Draft Delivery Flow

1. Research cron fires at 7:00 AM ET (daily)
2. Draft cron fires at 9:00 AM ET (Mon/Wed/Fri)
3. Agent generates a 500-800 word draft using the morning research brief
4. Draft is delivered to Eric's Discord channel with subject line suggestion
5. Eric replies: APPROVE, EDIT [notes], or REJECT
6. On APPROVE: agent publishes to Beehiiv via `/publish` skill
7. On EDIT: agent revises and resubmits
8. On REJECT: draft is discarded, logged in MEMORY.md, agent moves on
9. If Eric does not respond, the draft sits in Discord. No auto-publish. No timeout.

## Subscriber Report

Weekly subscriber report delivered Monday at 8:00 AM ET (before the draft).
Includes: subscriber count, growth, open rates, click rates, top-performing editions.
See CRON_JOBS.md for schedule and `/subscriber-report` skill for details.
