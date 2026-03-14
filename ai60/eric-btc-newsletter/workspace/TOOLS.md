# Tools Configuration

Trust level: **coding**

## Standard Tools

### exec
Execute shell commands from an allowlist.

**Allowlist:**
- `node` - Run Node.js scripts
- `npm` - Package management
- `curl` - HTTP requests to APIs
- `jq` - JSON processing
- `bash` - Shell scripts from `scripts/` directory

**Blocked:**
- `git` - No git commands (use file operations for memory/context)
- `rm -rf` - No recursive deletes outside workspace
- `sudo` - No elevated system permissions

### read
Read files within workspace boundaries.

**Allowed paths:**
- `workspace/` - All workspace files
- `workspace/knowledge/` - Voice guide, topics, affiliates, data sources
- `workspace/skills/` - Skill definitions
- `workspace/scripts/` - Script files (read for reference)
- `workspace/context/` - Shared context (symlinks)
- `workspace/memory/` - Daily logs and state

### write
Write files within workspace boundaries.

**Allowed paths:**
- `workspace/MEMORY.md` - Persistent learnings
- `workspace/memory/` - Daily logs, research briefs, draft history

**Blocked paths:**
- `workspace/IDENTITY.md` - Read-only
- `workspace/SOUL.md` - Read-only
- `workspace/AGENTS.md` - Read-only
- `workspace/TOOLS.md` - Read-only
- `workspace/knowledge/` - Read-only
- `workspace/skills/` - Read-only
- `workspace/scripts/` - Read-only

### browser
Web research and data collection.

**Allowed uses:**
- Fetch BTC price data from CoinGecko, CoinMarketCap
- Read crypto news from RSS feeds
- Monitor KOL posts on Twitter/X
- Scrape on-chain data dashboards
- Check YouTube channels for new content

**Blocked uses:**
- No authentication flows (OAuth, login pages)
- No form submissions
- No file downloads outside workspace

### web_search
Search the web via Brave Search.

**Allowed uses:**
- "Bitcoin news today"
- "BTC on-chain analysis"
- "[KOL name] Bitcoin opinion"
- "crypto market update [date]"
- Fallback research when primary sources are down

## Custom Skills

| Skill | Description | Elevated |
|-------|-------------|----------|
| `/research-bitcoin` | Morning research routine: price, on-chain, KOLs, news | No |
| `/draft-newsletter` | Draft 500-800 word newsletter from research brief | No |
| `/publish` | Push approved draft to Beehiiv | **Yes** |
| `/subscriber-report` | Pull Beehiiv analytics and generate weekly report | No |
| `/draft-welcome-sequence` | Draft onboarding email sequence | No |
| `/draft-reengagement` | Draft win-back email series | No |
| `/health-check` | Validate all connections and cron status | No |
| `/memory-sync` | Consolidate logs, prune stale entries, backup state | No |

## Elevated Tools

### /publish
- **Requires**: Explicit `APPROVE` from Eric via Discord
- **Gate**: Agent must confirm APPROVE was received before executing
- **Fallback**: If Beehiiv API fails, escalate to Eric (never retry silently)
- **Logging**: Every publish attempt (success or failure) is logged in memory/

## Anti-Loop Rules

1. **Max 3 retries per API call.** After 3 failures, log and move on. Do not retry indefinitely.
2. **Max 2 draft revisions per edition.** If Eric sends EDIT twice and the third attempt still gets REJECT, escalate.
3. **No recursive skill calls.** A skill cannot invoke itself. `/draft-newsletter` cannot call `/draft-newsletter`.
4. **Research staleness check once.** If data is stale, re-fetch once. If still stale, proceed with what's available and flag it.
5. **Memory write dedup.** Don't write the same insight to MEMORY.md twice. Check before writing.
6. **Infinite loop detection.** If the same operation runs more than 5 times in 10 minutes, halt and escalate.
