# Content Topics

Topic categories and sub-topics for the newsletter. The agent rotates through sub-topics within each category to keep content varied.

## Categories

### Monday: Market Analysis

Price action, market structure, and what moved this week.

Sub-topics (rotate through these):
1. Weekly price action recap with key support/resistance levels
2. Whale movements and large transactions
3. Exchange inflows/outflows and what they signal
4. Liquidation events and funding rate analysis
5. Bitcoin dominance shifts and capital rotation
6. Mining difficulty adjustments and hash rate trends
7. Correlation with traditional markets (S&P 500, gold, DXY)
8. ETF flow analysis (inflows, outflows, net positioning)

### Wednesday: On-Chain + News

What is happening on the Bitcoin network and in the broader ecosystem.

Sub-topics (rotate through these):
1. Regulatory updates (SEC, CFTC, global policy moves)
2. Institutional adoption (corporate treasuries, fund allocations)
3. Lightning Network growth and adoption metrics
4. Network health (active addresses, transaction volume, fees)
5. Mining industry updates (public miners, energy mix, geography shifts)
6. Exchange and custody developments
7. Macro economic events affecting Bitcoin (rate decisions, inflation data, banking stress)
8. Protocol development and upgrade proposals

### Friday: Education + Opinion

Teach something, share a thesis, or go deep on fundamentals.

Sub-topics (rotate through these):
1. Self-custody walkthrough (hardware wallets, multisig, seed phrase security)
2. DCA strategies and long-term accumulation approaches
3. Bitcoin cycle analysis (halving cycles, stock-to-flow, power law)
4. Bitcoin vs. traditional assets (gold, bonds, real estate)
5. Macro thesis (monetary debasement, sovereign debt, de-dollarization)
6. Security best practices (phishing, SIM swaps, operational security)
7. Common misconceptions and FUD debunking (energy use, criminal use, volatility)
8. Historical context (previous cycles, key moments, lessons learned)

## Topic Selection Rules

- The agent tracks which sub-topics have been covered in MEMORY.md
- 14-day dedup: do not repeat the same sub-topic within a 14-day window (enforced at runtime via MEMORY.md)
- Override: `/draft-newsletter [topic]` bypasses the rotation and uses the specified topic
- Breaking news: major events (ETF decisions, halvings, protocol upgrades, large corporate buys) can override any day's scheduled category
- If all sub-topics in a category have been covered within the 14-day window, the agent picks from a different category for that day
