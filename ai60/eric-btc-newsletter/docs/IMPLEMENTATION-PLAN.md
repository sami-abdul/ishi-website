# Eric Bitcoin Newsletter Agent - Implementation Plan

## Context

Eric has a Bitcoin newsletter on Beehiiv with imported subscribers. He needs: (1) a content agent that researches Bitcoin daily and drafts newsletters 3x/week, (2) a welcome email sequence, (3) a re-engagement funnel, and (4) a Discord-based command interface with approval gates. Nothing publishes without explicit approval.

This build prepares everything locally with deploy scripts. Actual VPS deployment happens separately.

**Voice target**: Milk Road + The Hustle style (scrape + analyze their archives to build voice.md).

---

## Repo Structure

```
eric-btc-newsletter/
├── workspace/                        # Agent workspace (deployed to VPS)
│   ├── IDENTITY.md                   # Agent identity
│   ├── SOUL.md                       # Personality, voice, boundaries
│   ├── AGENTS.md                     # Operating instructions, approval flow
│   ├── TOOLS.md                      # Tool access and skill registry
│   ├── MEMORY.md                     # Config + state tracking
│   ├── USER.md                       # Eric's profile and preferences
│   ├── CRON_JOBS.md                  # Scheduled tasks (research, drafts, reports)
│   ├── knowledge/
│   │   ├── voice.md                  # Milk Road / Hustle style analysis
│   │   ├── topics.md                 # Content categories + rotation
│   │   ├── affiliates.md             # Kraken, Coinbase, Ledger links
│   │   ├── data-sources.md           # API endpoints config
│   │   ├── kols.md                   # X/Twitter accounts to monitor
│   │   ├── youtube-channels.md       # YouTube channels to monitor
│   │   ├── content-calendar.md       # 3x/week schedule
│   │   └── disclaimers.md            # FTC compliance
│   ├── skills/
│   │   ├── draft-newsletter/SKILL.md # Research + draft + humanize
│   │   ├── research-bitcoin/SKILL.md # Daily data aggregation
│   │   ├── publish/SKILL.md          # Approval-gated Beehiiv publish
│   │   ├── subscriber-report/SKILL.md
│   │   ├── draft-welcome-sequence/SKILL.md
│   │   ├── draft-reengagement/SKILL.md
│   │   ├── health-check/SKILL.md
│   │   └── memory-sync/SKILL.md
│   ├── scripts/
│   │   ├── beehiiv-bridge.js         # Beehiiv REST API wrapper
│   │   ├── bitcoin-research.js       # CoinGecko + RSS + Fear & Greed
│   │   ├── x-kol-monitor.js          # X/Twitter KOL scraping
│   │   ├── youtube-transcripts.js    # YouTube transcript pulling
│   │   ├── voice-analyzer.js         # Milk Road / Hustle style scraper
│   │   ├── memory-sync.sh            # GitHub API memory backup
│   │   └── package.json              # Node deps (xml2js, cheerio)
│   └── memory/                       # Runtime state (daily logs)
├── deploy/
│   ├── deploy.sh                     # VPS setup + agent deploy
│   ├── openclaw.json                 # Gateway config (single agent)
│   ├── setup-crons.sh               # Cron job setup (idempotent)
│   ├── paperclip-setup.sh           # Paperclip install + seed
│   └── .env.template                # Required env vars
├── docs/
│   ├── RUNBOOK.md                    # Operations guide for Eric
│   └── DEPLOYMENT.md                 # Technical deployment steps
└── README.md
```

---

## Phase 1: Workspace Foundation

Create the 7 core workspace files.

### Files

| File | Reference | New vs Adapted |
|------|-----------|----------------|
| `workspace/IDENTITY.md` | `agentic-org/agents/lfg-labs/maya-linkedin/workspace/IDENTITY.md` | 80% adapted. Remove org hierarchy, single agent identity |
| `workspace/SOUL.md` | `mobile-market-intelligence/agents/market-intel/workspace/SOUL.md` | 60% adapted. Bitcoin-specific purpose, voice references voice.md |
| `workspace/AGENTS.md` | `agentic-org/agents/lfg-labs/maya-linkedin/workspace/AGENTS.md` | 40% adapted. Remove multi-agent coordination, add approval flow (APPROVE/EDIT/REJECT) |
| `workspace/TOOLS.md` | `agentic-org/agents/lfg-labs/maya-linkedin/workspace/TOOLS.md` | 50% adapted. Replace LinkedIn skills with newsletter skills table |
| `workspace/MEMORY.md` | Any existing agent MEMORY.md | 90% new content, same format. Initial state: edition counter=0, rotation index |
| `workspace/USER.md` | None | 100% new. Eric's profile, Beehiiv pub ID, timezone, Discord ID, affiliate prefs |
| `workspace/CRON_JOBS.md` | `agentic-org/agents/common/nyx-pm/workspace/CRON_JOBS.md` | Structure adapted. 4 jobs: morning-research (daily 7AM), newsletter-draft (Mon/Wed/Fri 9AM), subscriber-report (Mon 8AM), memory-backup (Sun midnight) |

### Key content for AGENTS.md approval flow
```
APPROVE  -> agent publishes to Beehiiv, confirms with link
EDIT [notes] -> agent revises based on feedback, resubmits
REJECT   -> draft discarded, logged, agent moves on
```

**Dependencies**: None
**Verification**: All 7 files exist, SOUL.md has 10 boundary prohibitions, CRON_JOBS.md has re-creation commands

---

## Phase 2: Knowledge Base

Create 8 knowledge files in `workspace/knowledge/`.

### Files

| File | Content |
|------|---------|
| `voice.md` | Populated by voice-analyzer.js (Phase 3). Built entirely from Milk Road (milkroad.com) + The Hustle (thehustle.co) archives since Eric's newsletter has no published content yet. Patterns: short sentences, conversational, data-heavy, humor, bold formatting, punchy hooks. Evolves as Eric provides feedback on drafts |
| `topics.md` | Categories: Market Analysis (Mon), On-Chain + News (Wed), Education + Opinion (Fri). Sub-topics per category. 14-day dedup rule |
| `affiliates.md` | 7 affiliate partners with context rules for natural placement: River (hourly DCA), Kraken (exchange signup), Coinbase (BTC collateral loans, access bitcoin without selling, no credit pull), Ledger (self-custody, security), Bybit (P2P transfers, BTC card, 15-min DCA, non-US users only), NordVPN (privacy, georestrictions), Amazon book (Bitcoin education deep dive). FTC disclosure template |
| `data-sources.md` | CoinGecko endpoints (price, global, trending), Fear & Greed API, RSS feeds (CoinDesk, CoinTelegraph), Brave Search config |
| `kols.md` | 11 accounts confirmed by Eric: Michael Saylor (@saylor), Willy Woo (@woonomic), PlanB (@100trillionUSD), Lyn Alden (@LynAldenContact), Saifedean Ammous (@saaborjiny), Parker Lewis (@paraborjiny), Preston Pysh (@PrestonPysh), Jack Mallers (@jackmallers), Max Keiser (@maxkeiser), Michael Goldstein (@bitstein), Adam Back (@adam3us). Handle, priority, content type. Eric edits |
| `youtube-channels.md` | 7 channels confirmed by Eric: Andreas Antonopoulos, Natalie Brunell, Matthew Kratter, Jack Mallers, Anthony Pompliano, Saifedean Ammous, Preston Pysh. Channel ID, frequency, content type. Eric edits |
| `content-calendar.md` | Mon/Wed/Fri schedule. Override rules. Rotation tracking. Holiday handling |
| `disclaimers.md` | "Not financial advice" footer. Affiliate disclosure (FTC). Sponsored content disclosure template |

**Dependencies**: Phase 1
**Verification**: data-sources.md has valid endpoints, affiliates.md has all 7 partners with context rules and FTC template, voice.md has 15+ style rules (after Phase 3 populates it), kols.md has all 11 accounts, youtube-channels.md has all 7 channels

---

## Phase 3: Scripts

Build 6 scripts + package.json in `workspace/scripts/`.

### 3.1 `beehiiv-bridge.js` (~150 lines)
**Reference**: `agentic-org/agents/lfg-labs/leo-linkedin-dm/workspace/scripts/linkedin-bridge.js`
**Pattern**: CLI with `--action` routing, JSON stdout, exit 0/1, timeout constants.

Actions:
- `create-draft` -> POST `/v2/publications/{pub_id}/posts` (title, subtitle, HTML content, tags, status=draft)
- `publish` -> PATCH `/v2/publications/{pub_id}/posts/{id}` (status=confirmed, send_date)
- `list-posts` -> GET `/v2/publications/{pub_id}/posts?limit=20`
- `get-subscribers` -> GET `/v2/publications/{pub_id}/subscriptions`
- `get-stats` -> GET subscriber count, open rates
- `tag-subscriber` -> PUT tag on subscriber

Auth: Bearer token from `BEEHIIV_API_KEY` env. Pub ID from `BEEHIIV_PUB_ID` env.
No external deps (uses `node:https`).

### 3.2 `bitcoin-research.js` (~200 lines)
Aggregates Bitcoin data into structured JSON research brief.

Fetches:
- CoinGecko `/simple/price` (price, 24h change, market cap, volume)
- CoinGecko `/global` (BTC dominance)
- Alternative.me Fear & Greed Index
- RSS feeds via `xml2js` (CoinDesk, CoinTelegraph, last 24h articles)

Output: `{ price, change_24h, market_cap, volume, dominance, fear_greed: { value, label }, news: [...], timestamp }`
Fallback: CoinGecko down -> partial data with warnings. RSS down -> Brave Search fallback.

### 3.3 `x-kol-monitor.js` (~120 lines)
Monitors X/Twitter KOL accounts. Reads kols.md for account list.

Primary: X API v2 `/users/:id/tweets` (free tier, 500K tweets/month).
Fallback: Brave Search `from:@handle site:x.com`.
Output: JSON array of recent tweets (author, text, timestamp, engagement, link).

### 3.4 `youtube-transcripts.js` (~100 lines)
Lists recent videos from channels in youtube-channels.md via YouTube Data API v3.
For transcript extraction, leverages `youtube-summarizer` community skill (agent invokes per video).
Output: JSON with video title, channel, date, URL.

### 3.5 `voice-analyzer.js` (~250 lines)
One-time/periodic script. Scrapes Milk Road and The Hustle archives.
Uses `cheerio` for HTML parsing.

Extracts per newsletter:
- Average sentence length, contraction frequency
- Formatting patterns (bold, bullets, emoji usage)
- Hook structure (first line), CTA structure (last line)
- Vocabulary frequency, humor markers
- Section length distribution

Eric's newsletter is new with no published content, so voice.md is built entirely from Milk Road + Hustle analysis. As Eric publishes editions, future runs can blend in his evolving style.
Outputs voice.md content as markdown.

### 3.6 `memory-sync.sh`
**Reference**: `agentic-org/shared/scripts/memory-sync.sh`
~90% adapted. Change repo/path variables. Same GitHub API push, preflight validation, content equality check.

### 3.7 `package.json`
```json
{ "dependencies": { "xml2js": "^0.6", "cheerio": "^1.0" } }
```

**Dependencies**: Phase 2 (data-sources.md, kols.md, youtube-channels.md)
**Verification**: Each script runs standalone and outputs valid JSON (or exits with error message)

---

## Phase 4: Skills

Build 8 skill runbooks in `workspace/skills/*/SKILL.md`.

### 4.1 `/research-bitcoin`
**Reference**: `mobile-market-intelligence/.../price-tracker/SKILL.md`

Runbook:
1. Load data-sources.md
2. Run `exec: node scripts/bitcoin-research.js` -> parse JSON
3. Run `exec: node scripts/x-kol-monitor.js` -> parse KOL highlights
4. Invoke `youtube-summarizer` for recent videos from youtube-channels.md
5. Run Brave Search "bitcoin news today" for anything RSS missed
6. Synthesize into structured brief
7. Write to `memory/{today}-research.md`
8. Post summary to Discord

Fallback chain: script failure -> Brave Search -> partial data with warnings.
Output contract: `status: PASS|WARN|FAIL`, key metrics.

### 4.2 `/draft-newsletter`
**Reference**: Content pipeline humanizer from `.claude/skills/humanizer/`

Runbook:
1. Load today's research brief. If missing, run `/research-bitcoin` first
2. Load content-calendar.md for today's category
3. Load voice.md for Milk Road / Hustle style rules
4. Check dedup: run beehiiv-bridge.js --action list-posts, ensure angle not covered recently
5. Load affiliates.md for natural placement
6. Load disclaimers.md for required footer
7. Draft 500-800 word edition
8. **3-pass humanizer** (inline):
   - Pass 1: Detect AI patterns (em dashes, AI vocab, uniform structure, missing contractions)
   - Pass 2: Rewrite flagged issues, maintain substance
   - Pass 3: Final check (Coffee Test, Template Test, Scroll Test)
9. Format HTML for Beehiiv
10. Deliver to Discord with subject line suggestion
11. Wait for APPROVE / EDIT / REJECT

### 4.3 `/publish` (elevated - requires APPROVE)
1. Verify APPROVE received (hard gate)
2. Run beehiiv-bridge.js --action create-draft
3. Run beehiiv-bridge.js --action publish
4. Confirm with Beehiiv URL in Discord
5. Log edition to memory, update rotation state

### 4.4 `/subscriber-report`
1. Pull subscriber data and stats via beehiiv-bridge.js
2. Compile: total, new this week, unsubscribes, open rate trend, top editions
3. Content performance feedback: which topics/categories get highest engagement
4. Post formatted report to Discord

### 4.5 `/draft-welcome-sequence`
Draft 5 emails per proposal spec, each through 3-pass humanizer:
1. Welcome (immediate) - what to expect, Eric's story
2. Best of Bitcoin (day 2) - curated top editions
3. Why Self-Custody (day 4) - Ledger affiliate
4. Getting Started (day 7) - Kraken/Coinbase affiliates
5. What's Next (day 10) - encourage sharing

### 4.6 `/draft-reengagement`
Draft 3 re-engagement emails through humanizer:
1. We miss you (day 1) - best content from last month
2. Exclusive insight (day 4) - market thesis not in regular newsletter
3. Last call (day 8) - "keep me subscribed" button

### 4.7 `/health-check`
~70% adapted from existing agents. Checks: Beehiiv API, CoinGecko, RSS feeds, Fear & Greed, Discord, memory integrity, last research/draft timestamps.

### 4.8 `/memory-sync`
~95% adapted. Runs `bash scripts/memory-sync.sh`, reports result.

**Dependencies**: Phase 1-3
**Verification**: Each SKILL.md has YAML frontmatter, runbook, output contract, failure handling table

---

## Phase 5: Email Sequences

Handled by skills from Phase 4 (`/draft-welcome-sequence`, `/draft-reengagement`). Email copy is generated at runtime by the agent.

**Implementation during deployment**:
1. Run `/draft-welcome-sequence` -> Eric reviews all 5
2. Configure Beehiiv automation: "Signed Up" trigger -> time-delay email chain (UI-only in Beehiiv)
3. Run `/draft-reengagement` -> Eric reviews all 3
4. Configure Beehiiv automation: "Unengaged" trigger (60/90 day threshold)

**Dependencies**: Phase 2 (voice.md, affiliates.md), Phase 4 (skills)

---

## Phase 6: Deploy Scripts

### 6.1 `deploy/deploy.sh`
**Reference**: `agentic-org/local-gateway/deploy.sh`
Simplified from 9 agents to 1. Steps:
1. Pre-flight checks (OpenClaw CLI, workspace source)
2. Backup existing config
3. Create `~/.openclaw/agents/eric/workspace/` and `agent/`
4. rsync workspace files
5. npm install --production
6. Deploy openclaw.json
7. Deploy .env (never overwrite)
8. Install community skills (grok-search, youtube-summarizer, hn, gemini-deep-research)

### 6.2 `deploy/openclaw.json`
Single agent config. GPT-5.4 primary, Gemini Flash fallback. Single Discord bot. DM allowlist with Eric's user ID. `tools.elevated: ["publish"]`. Session reset: daily at 4AM, idle 120min.

### 6.3 `deploy/setup-crons.sh`
**Reference**: `agentic-org/local-gateway/setup-crons.sh`
4 cron jobs (purge + recreate, idempotent): morning-research, newsletter-draft, subscriber-report, memory-backup.

### 6.4 `deploy/paperclip-setup.sh`
**Reference**: `agentic-org/paperclip/scripts/seed-lfg-labs.sh`
Create company, register agent, configure budget, set governance gates.

### 6.5 `deploy/.env.template`
```
OPENAI_API_KEY=
GEMINI_API_KEY=
BEEHIIV_API_KEY=
BEEHIIV_PUB_ID=
DISCORD_BOT_TOKEN_ERIC=
GATEWAY_AUTH_TOKEN=
GITHUB_TOKEN=
X_API_BEARER_TOKEN=       # optional
YOUTUBE_API_KEY=           # optional
```

**Dependencies**: Phase 1-4
**Verification**: deploy.sh runs dry-run clean, openclaw.json valid, .env.template complete

---

## Phase 7: Documentation

### Files
| File | Content |
|------|---------|
| `docs/RUNBOOK.md` | Operations guide: restart agent, check logs, update affiliates/schedule/KOLs, override topics, common errors, health-check, subscriber-report, Paperclip dashboard |
| `docs/DEPLOYMENT.md` | Technical: provision VPS (Ubuntu 24.04, 2vCPU, 2GB RAM), SSH/firewall, install Node/OpenClaw/Paperclip, clone repo, deploy.sh, .env, setup-crons.sh, test Discord |
| `README.md` | Project overview, architecture, file map, quick start |

**Dependencies**: All previous phases

---

## Build Order

```
Phase 1 (Foundation)  ──┐
                        ├──> Phase 3 (Scripts)  ──> Phase 4 (Skills)  ──> Phase 5 (Emails)
Phase 2 (Knowledge)  ──┘                                │
                                                         v
                                                   Phase 6 (Deploy)  ──> Phase 7 (Docs)
```

Phases 1 & 2 can be built in parallel. Phase 3 needs data-sources.md from Phase 2. Phase 4 needs scripts from Phase 3. Phase 6 deploy scripts are independent of Phase 4 skills content-wise but logically come after.

---

## Verification Plan

1. **Scripts**: Run each .js script locally with test API keys, verify valid JSON output
2. **Skills**: Each SKILL.md has frontmatter, runbook, output contract, failure table
3. **Deploy**: deploy.sh dry-run on a fresh Ubuntu VM (or Docker container)
4. **Integration**: On VPS, run `/health-check` to verify all APIs connected
5. **End-to-end**: Run `/research-bitcoin` -> `/draft-newsletter` -> review in Discord -> `/publish` -> verify on Beehiiv
6. **Email sequences**: Run both email skills, review all 8 emails for voice/quality
7. **Cron jobs**: Verify morning research fires, newsletter drafts appear on schedule
8. **Paperclip**: Dashboard shows agent, budget tracked, tasks logged
