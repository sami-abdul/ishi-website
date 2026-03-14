# Data Sources

API endpoints and data feeds the agent uses for Bitcoin research. No API keys stored here (all credentials in .env).

## CoinGecko (Free Tier)

Base URL: `https://api.coingecko.com/api/v3`

| Endpoint | What It Returns | Used For |
|----------|----------------|----------|
| `/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true` | Current price, 24h change %, market cap, 24h volume | Lead data point in every edition |
| `/global` | BTC dominance %, total crypto market cap, active cryptocurrencies | Market context, dominance narrative |
| `/coins/bitcoin/market_chart?vs_currency=usd&days=7` | 7-day price history (hourly data points) | Weekly trend analysis, chart references |
| `/coins/bitcoin/market_chart?vs_currency=usd&days=30` | 30-day price history | Monthly trend for education editions |

Rate limits (free tier):
- 10-30 calls per minute
- No API key required for basic endpoints
- If rate limited (HTTP 429), back off 60 seconds and retry

## Fear & Greed Index

Endpoint: `https://api.alternative.me/fng/`

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `limit=7` | Last 7 days of readings | Weekly sentiment trend |
| `limit=1` | Today's reading only | Current sentiment snapshot |

Response fields: `value` (0-100), `value_classification` (Extreme Fear / Fear / Neutral / Greed / Extreme Greed), `timestamp`.

Use in research brief: compare today's reading to last week's. Flag shifts of 10+ points as notable.

## RSS Feeds

| Source | Feed URL | Content Type |
|--------|----------|-------------|
| CoinDesk | `https://www.coindesk.com/arc/outboundfeeds/rss/` | Breaking news, regulatory, institutional |
| CoinTelegraph | `https://cointelegraph.com/rss` | News, analysis, market updates |

Parsing rules:
- Pull articles from last 24 hours only (filter by `pubDate`)
- Extract: title, link, publication date, description
- Deduplicate by title similarity (same story covered by both sources)
- Prioritize: regulatory news, institutional moves, protocol changes

## Brave Search (Fallback)

Used when primary sources are down or for supplementary research.

Query templates:
- `"bitcoin news today"` (general fallback for RSS)
- `"bitcoin price analysis"` (fallback for CoinGecko)
- `"bitcoin [specific topic]"` (on-demand research for draft overrides)
- `"bitcoin regulation [country]"` (regulatory deep dives)

## Fallback Chain

Matches the fallback rules in AGENTS.md:

| Primary Source | Fallback 1 | Fallback 2 |
|----------------|------------|------------|
| CoinGecko | CoinMarketCap (`https://api.coinmarketcap.com/v1/ticker/bitcoin/`) | Brave Search "bitcoin price" |
| RSS feeds (CoinDesk, CoinTelegraph) | Brave Search "bitcoin news today" | Skip (mark as WARN in research brief) |
| Fear & Greed Index | Brave Search "bitcoin fear greed index" | Skip (mark as WARN) |

## Research Brief Output Format

The research skill (`/research-bitcoin`) combines all sources into a structured brief stored in `memory/YYYY-MM-DD-research.md`:

```
## Research Brief - [DATE]

### Price Data
- Price: $XX,XXX
- 24h Change: +/-X.X%
- 7d Trend: [direction]
- Market Cap: $X.XXB
- 24h Volume: $X.XB
- BTC Dominance: XX.X%

### Sentiment
- Fear & Greed: XX ([classification])
- Weekly shift: [direction] from XX

### Top News (last 24h)
1. [Headline] - [Source] - [Link]
2. [Headline] - [Source] - [Link]
3. [Headline] - [Source] - [Link]

### KOL Highlights
(populated by x-kol-monitor.js)

### YouTube Insights
(populated by youtube-transcripts.js)

### Data Freshness
- CoinGecko: [timestamp]
- RSS: [timestamp]
- Fear & Greed: [timestamp]
- Sources used: X/Y available
```
