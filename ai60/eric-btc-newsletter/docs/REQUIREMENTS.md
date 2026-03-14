# Bitcoin Newsletter Content Agent - Implementation Plan

## Understanding

From our call: you have a Bitcoin newsletter on Beehiiv with subscribers imported from other newsletters. Many of those subscribers haven't opened an email in a while. You want consistent content (3x/week, potentially more), a welcome sequence for new subscribers, and a re-engagement funnel to warm up the inactive ones or clean them out.

What you need:

1. **A content agent** that researches Bitcoin market data, on-chain metrics, and news daily, then drafts newsletter editions ready for Beehiiv. Not generic AI output. Content with substance, real data, and your voice.
2. **A welcome email sequence** that onboards new subscribers: what to expect, best content to start with, and a reason to stay engaged from day one.
3. **A re-engagement funnel** that identifies inactive subscribers and runs a targeted win-back sequence. Those who re-engage stay. Those who don't get cleaned from your list (protects your deliverability score).
4. **A system you message via Discord (or Telegram/Slack)**: tell it to draft a newsletter, give it a topic, or let it pick from daily research. Review the draft, approve it, and the agent publishes directly to Beehiiv via API. **Nothing publishes without your explicit approval.**

One platform, one topic, one agent. Human-in-the-loop from day one with a clear path to full autonomy when you trust the output.

---

## Why I Can Deliver This in 1 Week

I operate a multi-agent fleet in production daily. The deployment scripts, security patterns, content pipelines, and API integration patterns already exist. Your build uses proven infrastructure I'm customizing, not building from scratch.

Pre-built infrastructure I'm porting to your project (~20 hours head start):

- **Content pipeline** - 7-phase lifecycle with copywriting frameworks, research stages, drafting, and review. Production-tested daily across two content channels
- **3-pass humanizer** - AI pattern detection, rewrite, and final verification. Every piece of content passes through this before delivery. This is how we guarantee it doesn't read as AI
- **Deployment scripts** - systemd service install, permission management, gateway configuration, auto-restart on crash
- **Discord bot integration** - production-tested with 8 agents on the same server. Slash commands, approval flows, rich formatting
- **Security stack** - tool allowlists, approval gates, API key isolation, workspace permissions, audit logging
- **Operational skills** - health-check, memory-sync, knowledge-sync, self-reflect (agent reviews its own output quality over time)

The new pieces are the Beehiiv API integration (custom skill), Bitcoin data source connections (CoinGecko, RSS, sentiment APIs), and your crypto knowledge base. Everything else is proven infrastructure.

---

## Architecture: Single Agent, Multiple Skills

### Why One Agent, Not Multiple

Your entire workflow flows through one platform (Beehiiv), covers one topic domain (Bitcoin), and uses one knowledge base. A multi-agent system is the right call when you have multiple output channels with separate APIs and separate content domains (e.g., social media + SEO pages + blog + email, each needing different credentials and expertise). That's not your case.

One focused agent is:
- **Simpler to manage.** You're new to AI agents. One agent, one Discord channel, one set of commands. No routing complexity.
- **Cheaper to run.** One agent context window, one set of model calls per task.
- **Easier to tune.** When you give feedback on content quality, it improves one system, not three.
- **Still expandable.** When you're ready for X/Twitter or Instagram (you mentioned both), each becomes a new agent on the same server. Same model providers, same gateway, just a new workspace and a config entry. Adding agents later is a configuration change, not a rebuild.

### System Design

**You (Discord)** >> **Bitcoin Newsletter Agent** >> **Beehiiv (publish)**

**You (Dashboard)** >> **Paperclip Control Plane** >> **Agent orchestration, cost tracking, audit trail**

The agent has three layers:

| Layer | Components |
|---|---|
| **Skills** | /draft-newsletter [angle], /research-bitcoin, /publish (approval-gated), /subscriber-report, /health-check, /memory-sync |
| **Knowledge Base** | voice.md (your writing style), topics.md (content categories), affiliates.md (Kraken, Coinbase, Ledger links), data-sources.md (API endpoints), content-calendar.md (3x/week) |
| **Cron Jobs** | Morning research (daily, 7 AM), Newsletter draft (Mon/Wed/Fri) |

The agent connects to three external services:

| Service | What It Provides |
|---|---|
| **Beehiiv API** | Publish newsletters, manage drafts, subscriber data |
| **CoinGecko API** | Bitcoin price, volume, market cap, dominance |
| **RSS Feeds** (CoinDesk, CoinTelegraph) | Breaking news, regulatory updates, institutional moves |

The agent sits on a VPS, receives commands via Discord, researches Bitcoin data from multiple sources, drafts content through the humanizer pipeline, delivers for your approval, and publishes to Beehiiv on your go-ahead. Paperclip wraps the whole thing in a management layer: task tracking, cost monitoring, governance gates, and a web dashboard you can check from your phone.

### Model Configuration

We'll run GPT-5.4 via your existing OpenAI subscription through OpenClaw. You're already paying $20/month for this. No additional model costs.

| Role | Model | Source |
|---|---|---|
| Primary (all tasks) | GPT-5.4 | Your OpenAI subscription |
| Failover | Gemini Flash | Free tier (backup only, kicks in if OpenAI is down) |

OpenClaw connects directly to your OpenAI subscription. The agent uses your existing plan, so there's no per-token billing or surprise API charges. The $20/month you already pay covers everything.

---

## Beehiiv Integration: Custom API Skill

The core integration. A custom skill that talks to Beehiiv's REST API:

| Operation | What It Does |
|---|---|
| **Create draft** | Push a new post to Beehiiv with title, subtitle, content (HTML-formatted), tags, and scheduled send time |
| **Publish post** | Publish a draft to subscribers. Approval-gated: agent can only trigger this after you say `APPROVE` in Discord |
| **List recent posts** | Pull your last 20 posts for deduplication. The agent checks what you've already covered before suggesting a new angle |
| **Get subscriber stats** | Pull subscriber count, growth rate, and segment data for the `/subscriber-report` skill |
| **Tag subscribers** | Apply tags for segmentation (used by the re-engagement funnel to track who's been contacted) |

Beehiiv's API is available on your current plan. Rate limits are generous for newsletter volume (you're sending 3x/week, not 3x/minute).

---

## Bitcoin Research Engine

The agent's daily research pipeline. Runs as a morning cron job, aggregates data, and stores a structured brief in memory. When you request a newsletter draft (or the content calendar triggers one), the agent draws from this fresh research.

| Source | What It Provides | Cost |
|---|---|---|
| **CoinGecko API** | Bitcoin price, 24h change, 7d trend, market cap, trading volume, BTC dominance | Free tier |
| **CoinDesk + CoinTelegraph RSS** | Breaking news, regulatory updates, institutional moves, technology developments | Free |
| **Fear & Greed Index** (Alternative.me) | Market sentiment score (0-100) with historical comparison | Free |
| **Brave Search** | Trending Bitcoin narratives, emerging stories, community discussions | Pre-built skill |
| **Bitcoin KOLs on X** | Curated feed from top Bitcoin voices: Michael Saylor, Willy Woo, PlanB, Lyn Alden, Saifedean Ammous, Parker Lewis, Preston Pysh, Jack Mallers, Max Keiser, Michael Goldstein, Adam Back. The agent monitors their posts daily for takes, predictions, and debates worth covering. You pick which accounts to follow in the knowledge base | Free (X API or scraping) |
| **Bitcoin YouTube channels** | Monitors channels you select: Andreas Antonopoulos, Natalie Brunell, Matthew Kratter, Jack Mallers, Anthony Pompliano, Saifedean Ammous, Preston Pysh. Pulls transcripts from new videos, extracts key insights, talking points, and contrarian takes. Turns a 60-minute podcast into 3 bullet points the agent can reference in your newsletter | Free (YouTube transcript API) |

The agent doesn't just dump data. It synthesizes: "Bitcoin is at $X, up Y% this week, Fear & Greed is at Z (shifted from last week's reading), Saylor just announced another buy, PlanB's stock-to-flow model says X, and the three stories worth covering are..." This structured brief becomes the raw material for newsletter drafts.

### Why These Sources

All free-tier APIs with reliable uptime. No paid data subscriptions needed to start. If you want deeper on-chain analytics later (Glassnode, Santiment), those are configuration additions, not architecture changes. The research skill accepts new data sources via the knowledge base.

---

## Content Generation Pipeline

For each newsletter edition, the agent follows this pipeline:

**Step 1: Research Pull**
Agent pulls from the daily research brief (price data, news, sentiment, trending topics).

**Step 2: Angle Selection**
The content calendar rotates across categories to keep the newsletter varied:

| Day | Category | Example |
|---|---|---|
| Monday | Market Analysis | Price action, technical levels, what moved and why |
| Wednesday | On-Chain + News | Whale movements, exchange flows, regulatory updates, institutional moves |
| Friday | Education + Opinion | Bitcoin fundamentals, self-custody guides, macro outlook, cycle analysis |

These aren't rigid. You can override any day with `/draft-newsletter [your topic]`. The categories exist to prevent the agent from writing the same market recap three times a week.

**Step 3: Draft**
Agent writes a 500-800 word newsletter edition. Includes:
- A hook that makes you want to keep reading (not clickbait, just sharp)
- Data points with specific numbers from the research brief
- Affiliate link placement where it fits naturally (River/Kraken when discussing DCA, Coinbase when discussing BTC-collateralized loans, Ledger when discussing self-custody or security, Bybit for non-US readers discussing P2P or BTC cards, NordVPN when discussing privacy or georestrictions, Amazon book link when discussing Bitcoin education)
- A closing CTA that drives action (not a generic "let me know what you think")

**Step 4: Humanize**
3-pass humanizer:
1. **Detect** - scan for AI patterns (em dashes, filler words, hedging, uniform sentence length, synonym cycling)
2. **Rewrite** - fix every detected pattern while preserving the substance
3. **Verify** - final check that the output reads like a real person wrote it

This is what separates the agent from "just use ChatGPT." ChatGPT output reads like ChatGPT. The humanizer is specifically trained to catch and eliminate those patterns.

**Voice built from Milk Road + The Hustle:** Eric's newsletter is new with no published content yet. Instead of pulling existing posts, the agent's voice is built by scraping and analyzing the Milk Road (milkroad.com) and The Hustle (thehustle.co) archives. The voice-analyzer.js script extracts their sentence structure, formatting patterns, hook style, humor markers, and CTA patterns. This becomes the `voice.md` file in the knowledge base. As Eric publishes editions and provides feedback, the voice file evolves to reflect his personal style on top of the Milk Road/Hustle foundation.

**Step 5: Deliver for Approval**
Draft appears in your Discord channel. Three options:

| You Reply | What Happens |
|---|---|
| `APPROVE` | Agent publishes to Beehiiv via API, confirms with a link to the live post |
| `EDIT [notes]` | Agent revises based on your feedback, resubmits |
| `REJECT` | Draft discarded, logged, agent moves on |

**Step 6: Publish**
On approval, the agent pushes the newsletter to Beehiiv and confirms delivery.

---

## Monetization Integration

| Revenue Stream | How the Agent Handles It |
|---|---|
| **Affiliate links** (7 partners) | Stored in the knowledge base with context rules. Agent weaves them naturally: River when discussing hourly DCA, Kraken for exchange signups, Coinbase when discussing BTC collateral loans (access bitcoin without selling, no credit pull), Ledger when discussing security or self-custody, Bybit for non-US readers (P2P transfers, BTC card, 15-minute DCA), NordVPN when discussing privacy or georestrictions, Amazon book link for Bitcoin education deep dives. Not bolted on at the end. Integrated into the content where they make sense |
| **Sponsored posts** | When you land a sponsor, give the agent the brief: sponsor name, key talking points, CTA. The agent drafts sponsored content through the same pipeline (research, draft, humanize, approve). Separate skill: `/sponsored-post [sponsor] [topic]` |
| **Beehiiv Ads** | Native Beehiiv feature. You enable ad placements in your Beehiiv dashboard. The agent doesn't manage this, Beehiiv does. But as your subscriber count and open rates grow, this becomes a passive revenue stream |

---

## Paperclip Control Plane: Your Agent's Management Layer

Discord is where you talk to the agent. Paperclip is where you manage it.

Paperclip is an open-source control plane I run alongside the agent. Think of it as the operating system for your AI employee. The agent does the work. Paperclip tracks the work, enforces budgets, logs every action, and gives you a dashboard to see it all.

### What You Get

| Capability | What It Does |
|---|---|
| **Web dashboard** | See agent status, active tasks, completed work, and costs from any browser. Works on mobile. No terminal needed |
| **Task tracking** | Every piece of work (draft newsletter, run research, publish post) is a tracked task with status, timestamps, and outcome. You see what the agent is working on right now, what it finished today, and what's queued |
| **Cost monitoring** | Every model call is logged with token counts and cost. You see exactly how much the agent spends per day, per week, per task. No surprise bills |
| **Budget limits** | Set a monthly spend cap. If the agent hits it, Paperclip pauses it automatically and alerts you. Hard stop, not a suggestion |
| **Activity audit trail** | Every action the agent takes is logged: drafts created, posts published, research runs, errors. Immutable history. You can review what happened on any day |
| **Governance gates** | Paperclip enforces approval requirements at the platform level, not just Discord. Even if something goes wrong with the Discord bot, the control plane blocks unauthorized actions |

### Why This Matters

Most AI agent setups are a black box. You send a message, something happens, you hope it worked. If something breaks at 2 AM, you don't know until the morning. If the agent runs up a bill, you find out at the end of the month.

Paperclip eliminates that. You have a dashboard. You have cost tracking with hard limits. You have an audit trail. When you eventually add more agents (X/Twitter, Instagram), Paperclip becomes the single pane of glass for your entire fleet. One dashboard, all agents, all costs, all tasks.

### How It Fits

The agent doesn't change. It still lives on Discord. You still approve drafts the same way. Paperclip runs alongside it on the same server, adding the management layer. It's the difference between hiring someone and hoping they do their job, versus hiring someone and having a project management system that tracks everything they do.

---

## What Gets Done: 7 Days, Single Milestone

**Total: $4,000 USD. Paid on acceptance of all deliverables.**

Everything ships in 7 days. Two internal phases, one payment.

### Phase 1: Content Agent + Publishing (Days 1-4)

**Goal:** Agent running on VPS, connected to Discord, generating Bitcoin newsletter drafts from real market data, publishing to Beehiiv on your approval.

#### 1.1 VPS Setup & Gateway Installation

| Task | Detail |
|---|---|
| VPS prep | Server provisioned, SSH key-only auth, firewall configured |
| Install OpenClaw | Latest version, gateway configured for single-agent operation |
| GPT-5.4 config | Connect to your OpenAI subscription. Failover to Gemini Flash |
| systemd service | Auto-restart on crash, auto-start on boot |
| Reboot test | Full server reboot, verify agent comes back without intervention |

#### 1.2 Paperclip Control Plane Setup

| Task | Detail |
|---|---|
| Install Paperclip | Deploy alongside OpenClaw on the same VPS. Single process, minimal resource overhead |
| Company + agent config | Create your company entity, register the Bitcoin newsletter agent, configure org structure |
| Dashboard access | Web dashboard accessible from any browser. I'll set up your login credentials |
| Budget configuration | Set monthly spend limit based on your comfort level. Hard pause if exceeded |
| Cost tracking | Every GPT-5.4 call logged with token count and cost attribution |
| Task pipeline | All agent work (research, drafts, publishing) tracked as tasks with status and timestamps |
| Activity logging | Immutable audit trail of every agent action from day one |

#### 1.3 Bitcoin Knowledge Base

Built from information you provide and research I do:

| File | What It Contains |
|---|---|
| `voice.md` | Writing style modeled on Milk Road and The Hustle newsletters. Built by the voice-analyzer.js script scraping their archives and extracting tone, sentence structure, formatting patterns, hook style, humor markers, and CTA patterns. Evolves over time as Eric provides feedback on drafts |
| `topics.md` | Content categories and rotation rules (market analysis, on-chain, education, opinion) |
| `affiliates.md` | All 7 affiliate partners (River, Kraken, Coinbase, Ledger, Bybit, NordVPN, Amazon book) with referral links and context rules for when to include each |
| `data-sources.md` | API endpoints, what to pull from each, how to synthesize into a research brief |
| `kols.md` | X/Twitter accounts to monitor daily: Michael Saylor, Willy Woo, PlanB, Lyn Alden, Saifedean Ammous, Parker Lewis, Preston Pysh, Jack Mallers, Max Keiser, Michael Goldstein, Adam Back. You add or remove accounts anytime |
| `youtube-channels.md` | YouTube channels to monitor: Andreas Antonopoulos, Natalie Brunell, Matthew Kratter, Jack Mallers, Anthony Pompliano, Saifedean Ammous, Preston Pysh. You add or remove channels anytime |
| `content-calendar.md` | 3x/week schedule with category assignments per day |
| `disclaimers.md` | "Not financial advice" language, affiliate disclosures (FTC compliance) |

You edit these plain text files to change what the agent knows. Want to add a new affiliate? Update `affiliates.md`. Want to change the posting schedule? Update `content-calendar.md`. No code changes needed.

#### 1.4 Custom Beehiiv API Skill

| Task | Detail |
|---|---|
| API connection | Authenticate with your Beehiiv API key, test all endpoints |
| Create draft | Push newsletter content to Beehiiv as a draft with title, HTML body, tags |
| Publish on approval | Approval-gated publishing. Agent can't publish without your `APPROVE` |
| Post deduplication | Agent checks recent posts before drafting to avoid covering the same topic |
| Subscriber data | Pull subscriber counts and segments for reporting |
| Error handling | Retry on transient failures, alert you on permission errors |

#### 1.5 Bitcoin Research Skill + Cron

| Task | Detail |
|---|---|
| Data aggregation | CoinGecko (price, volume, dominance), RSS feeds (news), Fear & Greed Index (sentiment) |
| Morning cron | Daily at your preferred time. Agent pulls all sources, synthesizes into a structured brief, stores in memory |
| Research command | `/research-bitcoin` to trigger on-demand if you want the latest data outside the cron schedule |
| Source tracking | Every data point includes its source. The agent doesn't fabricate numbers |

#### 1.6 Newsletter Draft Skill

| Task | Detail |
|---|---|
| Draft command | `/draft-newsletter` (agent picks angle from rotation) or `/draft-newsletter [topic]` (you choose) |
| Content length | 500-800 words per edition |
| Humanizer | 3-pass: detect AI patterns, rewrite, verify |
| Affiliate integration | Natural placement based on content context |
| Disclaimer | "Not financial advice" footer on every edition |

#### 1.7 Discord Bot Setup

| Task | Detail |
|---|---|
| Bot creation | Discord bot created, paired to your server |
| DM policy | Bot responds to your messages only. Allowlist configured |
| Slash commands | `/draft-newsletter`, `/research-bitcoin`, `/subscriber-report`, `/health-check` |
| Approval flow | Reply `APPROVE`, `EDIT [notes]`, or `REJECT` to any draft |
| Retry policy | 3 attempts, exponential backoff with jitter |

#### 1.8 Pilot Batch

Before the content calendar starts, I run a 5-newsletter pilot:

- 1 market analysis edition (price action, what's moving)
- 1 on-chain + news edition (whale activity, regulatory updates)
- 1 education edition (self-custody guide or DCA strategy)
- 1 opinion/thesis edition (macro outlook or cycle position)
- 1 sponsor-style edition (showing how affiliate content integrates)

You review all 5 for quality, tone, accuracy, and voice fit. I adjust the knowledge base and generation prompts based on your feedback. Then we turn on the content calendar.

#### 1.9 Content Calendar Activation

| Task | Detail |
|---|---|
| Cron schedule | Monday/Wednesday/Friday (or your preferred days) |
| Draft delivery | Agent generates draft and delivers to Discord for review |
| No auto-publish | Drafts queue up. Nothing posts without your approval. If you're busy Monday and don't review until Wednesday, the draft sits in your channel |
| Category rotation | Rotates across market analysis, on-chain/news, education, opinion per the knowledge base schedule |

### Phase 2: Email Sequences + Handover (Days 5-7)

**Goal:** Welcome sequence and re-engagement funnel live in Beehiiv, system secured and documented, you're self-sufficient.

#### 2.1 Welcome Email Sequence (5 Emails)

The agent writes the email copy. I configure the automation in Beehiiv's native automation builder (Scale plan feature, which you already have).

| Email | Timing | Content | CTA |
|---|---|---|---|
| **Welcome** | Immediate on signup | What the newsletter covers, what to expect, your story | Read the latest issue |
| **Best of Bitcoin** | Day 2 | Curated selection of your strongest past editions | Deep link to 3 top posts |
| **Why Self-Custody** | Day 4 | Educational piece on securing Bitcoin | Ledger affiliate link |
| **Getting Started** | Day 7 | How to buy Bitcoin safely, exchange comparison | Kraken/Coinbase affiliate links |
| **What's Next** | Day 10 | What you'll get each week, encourage sharing/forwarding | Refer a friend or reply with questions |

**Implementation:** Beehiiv automation with "Signed Up" trigger > Send Email > Time Delay > Send Email chain. Each email goes through the humanizer and your approval before going live. Once approved, the sequence runs automatically for every new subscriber.

#### 2.2 Re-engagement Funnel (3 Emails)

For subscribers who haven't opened in 60-90 days (you pick the threshold):

| Email | Timing | Content | Purpose |
|---|---|---|---|
| **We miss you** | Day 1 of funnel | Best content from the last month, "here's what you missed" | Win back with value |
| **Exclusive insight** | Day 4 | A market thesis or analysis not in the regular newsletter | Reward re-engagement |
| **Last call** | Day 8 | Honest ask: "Want to keep getting these?" with a prominent "Yes, keep me subscribed" button | Final filter |

**Implementation:** Beehiiv automation with "Unengaged" trigger (configurable threshold). Subscribers who click "keep me subscribed" get re-tagged as active. Those who don't respond after the full sequence can be cleaned from your list.

**Why this matters for deliverability:** Gmail and Outlook track engagement. A list full of inactive subscribers tanks your open rates and sender reputation for everyone, including your engaged readers. Cleaning the list actually improves performance.

#### 2.3 Security Hardening

| Control | Detail |
|---|---|
| Tool allowlists | Agent gets access to content generation, Beehiiv API, research tools. Nothing else |
| Approval gates | Beehiiv publish is classified as `tools.elevated`. Can't execute without your confirmation |
| Workspace permissions | Knowledge base is read-only for the agent. Memory is read-write. Config files are protected |
| API key isolation | Beehiiv API key and OpenAI credentials in environment variables, not in agent-readable workspace files |
| DM-only Discord | Bot responds to your user ID only. No group access, no public channels |
| Config protection | Agent cannot modify its own instructions or gateway configuration |

#### 2.4 Subscriber Analytics Skill

| Task | Detail |
|---|---|
| `/subscriber-report` | Pulls subscriber count, growth rate, open rate trends from Beehiiv API |
| Weekly cron | Optional: delivers a subscriber health summary to Discord every Monday morning |
| Segment breakdown | Active vs inactive subscribers, new signups this week, unsubscribe rate |
| **Content performance feedback** | Agent pulls open rates and click rates per edition from Beehiiv. Tracks which topics, angles, and subject lines perform best. Over time, the agent learns what your audience responds to and adjusts: doubles down on high-performing categories, scraps angles that consistently underperform, and surfaces patterns like "on-chain posts get 2x the open rate of market recaps." This feedback loop lives in memory and directly influences the content calendar rotation |

#### 2.5 Runbook + Handover

| Deliverable | Detail |
|---|---|
| Runbook | Plain-language guide: restart the agent, check logs, update affiliate links, change posting schedule, add new content categories, common errors and fixes |
| Video walkthrough | Recorded walkthrough: how to use every skill, how to approve/reject drafts, how to update the knowledge base, how to read the subscriber report |
| Knowledge base guide | How to edit each file in the knowledge base and what changes take effect |

### Deliverables Checklist

**Content Agent:**
- [ ] OpenClaw gateway running on VPS, survives reboot
- [ ] GPT-5.4 configured via your OpenAI subscription with Gemini Flash failover
- [ ] Bitcoin knowledge base built (voice, topics, affiliates, data sources, calendar, disclaimers)
- [ ] Beehiiv API skill operational (create draft, publish, list posts, subscriber data, tagging)
- [ ] Bitcoin research skill aggregating daily data from CoinGecko + RSS + Fear & Greed Index
- [ ] Newsletter draft skill generating 500-800 word editions through 3-pass humanizer
- [ ] Discord bot responding to all commands
- [ ] 5-newsletter pilot batch reviewed and approved
- [ ] Content calendar cron delivering 3x/week drafts for approval
- [ ] Affiliate links naturally integrated per content context

**Paperclip Control Plane:**
- [ ] Dashboard accessible from browser (mobile-friendly)
- [ ] Agent registered with task tracking operational
- [ ] Cost monitoring live: every model call logged with token count and cost
- [ ] Monthly budget limit configured with automatic pause on overspend
- [ ] Activity audit trail recording all agent actions
- [ ] Governance gates enforcing approval requirements at platform level

**Email Sequences:**
- [ ] 5-email welcome sequence written, approved, and live in Beehiiv automation
- [ ] 3-email re-engagement funnel written, approved, and live in Beehiiv automation
- [ ] Inactive subscriber threshold configured (60 or 90 days, your choice)

**Security + Handover:**
- [ ] Security hardened: tool allowlists, approval gates, workspace permissions, API key isolation
- [ ] Subscriber analytics skill operational with optional weekly cron
- [ ] Content performance feedback loop: agent tracks open/click rates per edition and adjusts content calendar
- [ ] Runbook delivered
- [ ] Video walkthrough recorded

**Payment: $4,000 on acceptance of all deliverables.**

You verify every item on this checklist before payment is released.

---

## Success Criteria

From Eric's call, success looks like:

1. **Content quality**: Newsletters don't read as AI-generated. Real substance, real data, conversational tone matching Milk Road/Hustle style.
2. **Revenue milestone 1**: $1,000/month from affiliate revenue and sponsored posts.
3. **Revenue milestone 2**: $10,000/month and beyond as the list grows.
4. **Adaptive content**: Agent tracks open rates and click rates per edition. Doubles down on what works, scraps what doesn't. Small adjustments to CTAs over time.
5. **Expansion readiness**: Once Beehiiv newsletter has traction, the system can expand to X/Twitter, Instagram, and YouTube without a rebuild.

---

## Risk Analysis

| Risk | Likelihood | Mitigation |
|---|---|---|
| **Content reads as AI-generated** | Medium | 3-pass humanizer on every edition. Pilot batch tuning before calendar starts. Voice knowledge base built from your writing samples. This is the #1 quality gate |
| **Beehiiv API rate limits** | Low | Newsletter volume (3x/week) is far below any reasonable limit. Request queue with backoff built in regardless |
| **Bitcoin data source downtime** | Medium | Multiple sources. If CoinGecko is down, agent falls back to RSS + Brave Search + cached data. Research is never single-sourced |
| **Affiliate link compliance** | Low | FTC-compliant affiliate disclosure included in every edition. Links stored in knowledge base with context rules |
| **Content accuracy** | Medium | Agent never fabricates numbers. Every data point traced to source API. You review every draft before it publishes. Approval gate is the final check |
| **Scope creep** | Medium | Fixed deliverables with acceptance checklist. X/Twitter, Instagram, YouTube are future work, not this engagement |
| **Unfamiliarity with agents** | Medium | Discord is simple: type a command, get a result, approve or reject. Runbook + video walkthrough + 2 weeks of support after delivery |

---

## What You'll Need to Provide

**Before Day 1:**
- [x] Beehiiv API key: provided
- [x] Beehiiv Publication ID (V2): pub_2f0ac2e7-2a91-4028-9bd7-8eda42c75219
- [x] OpenAI account credentials: connected via OpenClaw device pairing
- [x] Affiliate links: all 7 provided (Ledger, Kraken, River, Coinbase, Bybit, NordVPN, Amazon book)
- [x] Content frequency preference: 3x/week Mon/Wed/Fri confirmed
- [x] Discord account: ericpiccione (ericp#9979)
- [x] Voice target: Milk Road + The Hustle (no existing posts to analyze, newsletter is new)
- [x] KOL watchlist: 11 accounts confirmed
- [x] YouTube channels: 7 channels confirmed

**Before Day 5:**
- [ ] Inactive subscriber threshold preference (60 or 90 days of no opens)
- [ ] Welcome sequence preferences (what to highlight, any existing content to link)
- [ ] Review and approve all 5 pilot batch newsletters

---

## Running Costs (After Delivery)

| Cost | Amount | Notes |
|---|---|---|
| **OpenAI subscription** | $20/month | Your existing ChatGPT Pro plan. Covers all model usage. No per-token fees |
| **VPS hosting** | A few dollars/month | Small server (2 vCPU, 2GB RAM). The agent doesn't need much |
| **Beehiiv** | $49/month | Your existing Scale plan. Required for automations |
| **Data APIs** | $0 | CoinGecko free tier, RSS feeds, Fear & Greed Index. All free |
| **Total** | **~$70-75/month** | Most of this you're already paying (OpenAI + Beehiiv) |

No surprise charges. No per-email costs. No usage-based billing from the agent itself.

---

## Beyond This Engagement

Not included in this build, but the architecture is designed so these are configuration changes, not rebuilds:

### New Skills for the Existing Agent

| Capability | What It Does |
|---|---|
| **Sponsored post skill** | `/sponsored-post [sponsor]` generates sponsor content from a brief you provide. Same pipeline: draft, humanize, approve, publish |
| **A/B subject lines** | Agent generates 2-3 subject line variants per edition. Beehiiv's built-in A/B testing handles the split. Agent learns from open rate data over time |
| **Content performance tracking** | Already included in this build (see subscriber analytics skill). Future expansion: deeper analysis with segment-level performance, optimal send-time detection, and automated A/B testing across content categories |
| **Referral program content** | Beehiiv has a built-in referral program. Agent drafts referral milestone emails and promotional content to drive subscriber growth |

### New Agents on the Same Server

| Agent | What It Does |
|---|---|
| **X/Twitter agent** | Posts Bitcoin insights, thread summaries of newsletter editions, engages with crypto community. Same voice, same knowledge base, new output channel |
| **Instagram agent** | Visual content: carousel posts with Bitcoin data visualizations, infographics, short-form educational content |
| **YouTube agent** | AI avatar content generation (you mentioned this). Research scripts, generate talking points for video editions of the newsletter |

Each new agent shares the existing server and model providers. Same $20/month OpenAI subscription, same VPS. Just a new workspace directory and a config entry. Adding an agent later takes 1-2 days, not a full rebuild. Paperclip scales with you: every new agent shows up in the same dashboard, shares the same budget controls, and feeds into the same audit trail. One control plane for your entire operation.

---

## Timeline

| Day | What Gets Done |
|---|---|
| **Day 1** | VPS setup, gateway install, GPT-5.4 connection, Discord bot, knowledge base started |
| **Day 2** | Beehiiv API skill built and tested, Bitcoin research skill + morning cron |
| **Day 3** | Newsletter draft skill, 3-pass humanizer, affiliate integration |
| **Day 4** | Pilot batch (5 newsletters), content calendar cron, your review + tuning |
| **Day 5** | Welcome email sequence (5 emails drafted, approved, configured in Beehiiv automation) |
| **Day 6** | Re-engagement funnel (3 emails), subscriber analytics skill, security hardening |
| **Day 7** | Runbook, video walkthrough, final testing, handover |

---

## Approval Workflow: The Agent Drafts, You Decide

This is a core design principle. **Nothing publishes without your explicit approval.** The agent is a powerful drafting machine. You are the final gate.

| Action | What Happens | You See | You Reply |
|---|---|---|---|
| Newsletter draft | Agent researches, writes, and humanizes a 500-800 word edition | Full draft with title, body, affiliate placements, disclaimer | `APPROVE` to publish, `EDIT [notes]` to revise, `REJECT` to discard |
| Welcome email copy | Agent drafts one email in the sequence | Full email text with subject line and CTA | `APPROVE` to go live, `EDIT [notes]` to revise |
| Re-engagement email | Agent drafts a win-back email | Full email text with subject line | `APPROVE` to go live, `EDIT [notes]` to revise |

### The Path to Autonomy

You mentioned wanting to eventually let the agent run on autopilot. Here's how that works:

1. **Weeks 1-2:** Full approval mode. You review every draft. We tune the voice and quality.
2. **Weeks 3-4:** You're approving most drafts without edits. The agent has learned your preferences.
3. **When you're ready:** I move Beehiiv publish from `tools.elevated` (requires approval) to `tools.allow` (auto-approved). One config change. The agent starts publishing on schedule without waiting for your go-ahead.
4. **Reversible anytime.** If you want to go back to approval mode, it's the same config toggle.

You control the speed of this transition. There's no pressure to go autonomous. Some clients stay in approval mode permanently and are happy with it.

---

## Post-Deployment Support (2 Weeks)

After Day 7 handover, I stay available to make sure everything runs smoothly:

| Week | What's Covered |
|---|---|
| **Week 1** | Daily check-ins. Monitor content quality, research accuracy, Beehiiv publishing, cron job execution. Tune prompts based on your feedback. Fix any issues same day |
| **Week 2** | Async support via Discord. Answer questions, troubleshoot issues, adjust knowledge base if needed |

**What's included:**
- Bug fixes and config adjustments at no extra cost
- Guidance on updating affiliate links, changing schedule, adding content categories
- One knowledge base revision if your preferences change after launch

**What's not included:**
- New feature development (new skills, new platform integrations, additional agents)
- X/Twitter, Instagram, or YouTube agent builds (covered in "Beyond This Engagement")

**Response time:** Same business day for anything blocking. Within 24 hours for non-urgent questions.

---

## Next Steps

1. **Accept the proposal**
2. **Share access:** Beehiiv API key, OpenAI credentials, writing samples, affiliate links, Discord account
3. **Days 1-4:** Content agent live. Pilot batch in your Discord for review. Content calendar delivering 3x/week drafts
4. **Day 7:** Email sequences live, system documented, you're self-sufficient. 2 weeks of support begins

---

Best regards,
Sami

---

**Attachments:**

Freelancer video intro: https://www.loom.com/share/204027a160ee4fac978ca1c70f490569

Video demo of agent mission control dashboard: https://drive.google.com/file/d/1X8UedWrZSeNYuKu1DUA4L0D-6a8lVlcP/view?usp=sharing
