# Memory

## Critical Rules

- **No publish without APPROVE.** Never push to Beehiiv without explicit APPROVE from Eric in Discord.
- **14-day topic dedup.** Never repeat the same topic within 14 calendar days. Check before drafting.
- **FTC compliance.** Every newsletter containing affiliate links must include the disclaimer from `knowledge/disclaimers.md`.
- **Voice consistency.** Every draft must match `knowledge/voice.md`. No corporate tone, no jargon without explanation.
- **Data attribution.** Every number in a newsletter must have a source URL logged in the research brief.
- **No financial advice.** Never make price predictions or recommend buying/selling. Present data, let readers decide.
- **Edition integrity.** Never skip an edition number. Never publish the same edition number twice.

## Hard Thresholds

| Metric | Threshold | Action if Breached |
|--------|-----------|-------------------|
| Research sources per brief | Minimum 3 | Do not draft until 3+ sources collected |
| Draft word count | 500-800 words | Revise if outside range |
| Topic dedup window | 14 days | Block topic, pick alternative |
| Stale data age | 4 hours | Re-fetch before drafting |
| Publish without APPROVE | 0 tolerance | Hard block, never override |
| Max draft revisions | 2 per edition | Escalate after 2 EDIT cycles |

## Soft Thresholds

| Metric | Target | Action if Missed |
|--------|--------|-----------------|
| Open rate | > 40% | Review subject lines, test variations |
| Click rate | > 5% | Review CTA placement and affiliate integration |
| Subscriber growth | > 2% week-over-week | Review acquisition channels, consider referral hooks |
| Unsubscribe rate | < 1% per edition | Review content quality, frequency fatigue |
| Research brief completeness | All 4 sections filled | Flag missing sections, proceed with available data |

## Baselines

```
Edition Counter: 0
Last Published: N/A
Last Research Brief: N/A
Topic Rotation Index: 0
Total Subscribers: [TO BE CONFIGURED]
Average Open Rate: [NO DATA YET]
Average Click Rate: [NO DATA YET]
```

## Known Failure Modes

| Failure | Frequency | Workaround |
|---------|-----------|------------|
| CoinGecko API rate limit (429) | Common during high volatility | Switch to CoinMarketCap, cache last known price |
| RSS feed timeout | Occasional | Retry once, then fall back to web search |
| Beehiiv API 500 errors | Rare | Do NOT retry publish silently. Escalate to Eric immediately. |
| Twitter/X rate limit | Common | Use cached KOL takes from last 24h, flag as potentially stale |
| Glassnode free tier limits | Daily | Use Blockchain.com for basic on-chain, skip advanced metrics |
| YouTube API quota exceeded | End of day | Cache channel checks, spread across hours |

## Lessons Learned

(Empty. Will be populated as editions are published and patterns emerge.)

## Topic History

| Date | Edition | Topic Category | Title/Summary | Performance |
|------|---------|---------------|---------------|-------------|
| - | - | - | - | - |

## Notification Preferences

- **Channel**: Discord (configured server/channel)
- **Draft delivery**: Discord channel message with draft content
- **Escalations**: Discord channel message with ESCALATION tag
- **Reports**: Discord channel message with formatted report
- **Never**: DM Eric directly. Always use the configured channel.
