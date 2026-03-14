# Bitcoin YouTube Channels

YouTube channels the agent monitors for transcripts and insights. Eric can add or remove channels from this list anytime.

## Channels

### Andreas Antonopoulos
- Channel: aantonop
- URL: https://youtube.com/@aantonop
- Focus: Technical Bitcoin education, protocol deep dives, Q&A sessions
- Content type: Long-form educational talks, conference presentations
- Relevant categories: Education, On-Chain

### Natalie Brunell
- Channel: Coin Stories
- URL: https://youtube.com/@NatalieBrunell
- Focus: Bitcoin interviews, adoption stories, mainstream audience education
- Content type: Interview podcast, news commentary
- Relevant categories: Education, On-Chain + News

### Matthew Kratter
- Channel: Bitcoin University
- URL: https://youtube.com/@Bitcoin_University
- Focus: Bitcoin education, market analysis, beginner-friendly explainers
- Content type: Short educational videos, market updates
- Relevant categories: Education, Market Analysis

### Jack Mallers
- Channel: The Jack Mallers Show
- URL: https://youtube.com/@TheJackMallersShow
- Focus: Lightning Network, Bitcoin payments, Strike updates, industry commentary
- Content type: Live show (Mondays 6PM ET), interviews
- Relevant categories: On-Chain + News, Education

### Anthony Pompliano
- Channel: Anthony Pompliano
- URL: https://youtube.com/@AnthonyPompliano
- Focus: Macro economics, Bitcoin market commentary, entrepreneur interviews
- Content type: Daily market updates, long-form interviews
- Relevant categories: Market Analysis, Education

### Saifedean Ammous
- Channel: Saifedean Ammous
- URL: https://youtube.com/@saifedean
- Focus: Austrian economics, Bitcoin theory, sound money advocacy
- Content type: Lectures, podcast episodes, book discussions
- Relevant categories: Education, Opinion

### Preston Pysh
- Channel: Preston Pysh
- URL: https://youtube.com/@PrestonPysh
- Focus: Value investing, macro analysis, Bitcoin Fundamentals podcast
- Content type: Podcast episodes, market analysis
- Relevant categories: Market Analysis, Education

## Monitoring Rules

- Check for new videos daily during the morning research cron (7AM ET)
- Pull videos published in the last 48 hours (wider window since YouTube uploads are less frequent than tweets)
- For each new video: extract title, publish date, duration, and URL
- Transcript extraction is handled by the `youtube-summarizer` community skill (invoked per video by the agent)
- The agent distills transcripts into 3-5 key insights for the research brief
- Prioritize videos under 30 minutes for transcript extraction (longer videos get title + description only unless the topic is highly relevant)
- Channel IDs will be populated at runtime by `youtube-transcripts.js` using the YouTube Data API v3

## Attribution

When referencing YouTube content in the newsletter, include the creator name and a link to the original video. Example: "Andreas Antonopoulos broke down how [topic] works in his latest video ([link])."
