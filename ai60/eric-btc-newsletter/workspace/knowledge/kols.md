# Bitcoin KOLs (Key Opinion Leaders)

X/Twitter accounts the agent monitors daily for takes, predictions, and debates worth covering in the newsletter. Eric can add or remove accounts from this list anytime.

## Accounts

### Michael Saylor
- Handle: @saylor
- URL: https://x.com/saylor
- Focus: Corporate Bitcoin strategy, MicroStrategy accumulation, institutional adoption advocacy
- Watch for: BTC purchase announcements, treasury strategy updates, macro commentary on Bitcoin as reserve asset
- Relevant categories: Market Analysis, On-Chain + News

### Willy Woo
- Handle: @woonomic
- URL: https://x.com/woonomic
- Focus: On-chain analytics, market structure analysis, network value models
- Watch for: On-chain metric breakdowns, accumulation/distribution signals, market cycle positioning
- Relevant categories: Market Analysis, On-Chain

### PlanB
- Handle: @100trillionUSD
- URL: https://x.com/100trillionUSD
- Focus: Stock-to-flow model, quantitative Bitcoin analysis, cycle theory
- Watch for: Model updates, cycle phase commentary, price target discussions
- Relevant categories: Education, Market Analysis

### Lyn Alden
- Handle: @LynAldenContact
- URL: https://x.com/LynAldenContact
- Focus: Macro economics, monetary policy analysis, Bitcoin as monetary technology
- Watch for: Fed policy analysis, liquidity cycle commentary, Bitcoin vs. traditional asset comparisons
- Relevant categories: Education, Market Analysis

### Saifedean Ammous
- Handle: @saifedean
- URL: https://x.com/saifedean
- Focus: Austrian economics, Bitcoin as sound money, author of The Bitcoin Standard
- Watch for: Economic commentary, critiques of fiat monetary policy, Bitcoin adoption takes
- Relevant categories: Education, Opinion

### Parker Lewis
- Handle: @parkeralewis
- URL: https://x.com/parkeralewis
- Focus: "Gradually, Then Suddenly" thesis, Bitcoin adoption dynamics, monetary theory
- Watch for: Long-form threads on Bitcoin adoption, rebuttals to common critiques
- Relevant categories: Education, Opinion

### Preston Pysh
- Handle: @PrestonPysh
- URL: https://x.com/PrestonPysh
- Focus: Value investing framework applied to Bitcoin, macro analysis, Lightning Network
- Watch for: Macro economic threads, valuation analysis, podcast episode highlights
- Relevant categories: Market Analysis, Education

### Jack Mallers
- Handle: @jackmallers
- URL: https://x.com/jackmallers
- Focus: Lightning Network, Bitcoin payments, Strike product updates
- Watch for: Strike announcements, Lightning adoption milestones, payments industry commentary
- Relevant categories: On-Chain + News, Education

### Max Keiser
- Handle: @maxkeiser
- URL: https://x.com/maxkeiser
- Focus: Bitcoin price commentary, adoption narratives, nation-state Bitcoin strategies
- Watch for: Price calls, El Salvador updates, provocative takes that generate community debate
- Relevant categories: Market Analysis, Opinion

### Michael Goldstein
- Handle: @bitstein
- URL: https://x.com/bitstein
- Focus: Bitcoin philosophy, Austrian economics, Nakamoto Institute
- Watch for: Philosophical threads, historical Bitcoin context, critiques of altcoin narratives
- Relevant categories: Education, Opinion

### Adam Back
- Handle: @adam3us
- URL: https://x.com/adam3us
- Focus: Cryptography, Blockstream, Bitcoin protocol development, Liquid Network
- Watch for: Protocol development updates, technical commentary, Blockstream product announcements
- Relevant categories: On-Chain, Education

## Monitoring Rules

- Check each account daily during the morning research cron (7AM ET)
- Pull posts from the last 24 hours
- Prioritize: original takes over retweets, threads over single posts, posts with high engagement
- If X API is unavailable, fall back to Brave Search: `from:@handle site:x.com`
- If both fail, skip KOL data and mark as WARN in the research brief
- Include attribution in the newsletter when referencing a KOL's take (e.g., "Willy Woo pointed out that...")
