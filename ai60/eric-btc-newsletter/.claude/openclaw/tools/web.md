# Web Tools Documentation

## Overview

OpenClaw provides two lightweight web tools for information retrieval:

**`web_search`** — Searches the web via Brave Search API, Gemini with Google Search grounding, Grok, Kimi, or Perplexity Search API.

**`web_fetch`** — Performs HTTP requests and extracts readable content from HTML pages (converting to markdown or text).

These are not browser automation tools. For JavaScript-heavy sites or login-required pages, use the Browser tool instead.

## How They Work

- `web_search` calls your configured provider and returns cached results (15-minute default cache)
- `web_fetch` performs plain HTTP GET requests and extracts readable content without executing JavaScript
- `web_fetch` is enabled by default unless explicitly disabled

## Search Provider Comparison

| Provider | Result Format | Key Features | API Key |
|----------|---------------|--------------|---------|
| **Brave Search API** | Structured snippets | Supports `llm-context` mode; country/language filters | `BRAVE_API_KEY` |
| **Gemini** | AI-synthesized answers | Google Search grounding with citations | `GEMINI_API_KEY` |
| **Grok** | AI-synthesized answers | xAI web-grounded responses | `XAI_API_KEY` |
| **Kimi** | AI-synthesized answers | Moonshot web search | `KIMI_API_KEY`/`MOONSHOT_API_KEY` |
| **Perplexity Search API** | Structured snippets | Content extraction controls; OpenRouter compatible | `PERPLEXITY_API_KEY`/`OPENROUTER_API_KEY` |

## Auto-Detection Order

If no provider is explicitly set, OpenClaw checks for API keys in this sequence:

1. Brave
2. Gemini
3. Grok
4. Kimi
5. Perplexity

## Setup Instructions

### Brave Search
- Create account at [brave.com/search/api](https://brave.com/search/api/)
- Select the Search plan and generate an API key
- Free tier: $5/month credit covers approximately 1,000 queries monthly
- Run `openclaw configure --section web` or set `BRAVE_API_KEY` environment variable

### Perplexity Search
- Create account at [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
- Generate API key in dashboard
- For OpenRouter/Sonar compatibility, use `OPENROUTER_API_KEY` instead
- Run `openclaw configure --section web` or set `PERPLEXITY_API_KEY` environment variable

### Gemini (Google Search Grounding)
- Visit [Google AI Studio](https://aistudio.google.com/apikey)
- Create API key and set `GEMINI_API_KEY` or configure via `tools.web.search.gemini.apiKey`
- Citation URLs are automatically resolved from Google redirects with SSRF protection
- Default model: `gemini-2.5-flash`

## web_search Parameters

| Parameter | Description |
|-----------|-------------|
| `query` | Search query (required) |
| `count` | Results returned (1-10, default: 5) |
| `country` | 2-letter ISO code (e.g., "US", "DE") |
| `language` | ISO 639-1 code (e.g., "en", "de") |
| `freshness` | Time filter: `day`, `week`, `month`, or `year` |
| `date_after` | Results after date (YYYY-MM-DD format) |
| `date_before` | Results before date (YYYY-MM-DD format) |
| `ui_lang` | UI language (Brave only) |
| `domain_filter` | Allowlist/denylist array (Perplexity only) |
| `max_tokens` | Total content budget (Perplexity only, default: 25000) |
| `max_tokens_per_page` | Per-page limit (Perplexity only, default: 2048) |

## web_fetch Parameters

- `url` (required; http/https only)
- `extractMode` (`markdown` or `text`)
- `maxChars` (truncates lengthy pages)

### Features

- Uses Readability for main-content extraction first, then falls back to Firecrawl if configured
- Blocks private/internal hostnames and validates redirects
- Sends Chrome-like User-Agent by default
- Response bodies capped at `maxResponseBytes` before parsing
- Results cached for 15 minutes by default

## Configuration Storage

API keys can be stored via:

**Configuration:** Run `openclaw configure --section web` to store under provider-specific paths like `tools.web.search.apiKey` or `tools.web.search.gemini.apiKey`

**Environment Variables:** Set in Gateway process environment or `~/.openclaw/.env`

All configuration fields support SecretRef objects for secure credential management.

## Usage Examples

```javascript
// German-specific search
await web_search({
  query: "TV online schauen",
  country: "DE",
  language: "de",
});

// Recent results filtering
await web_search({
  query: "TMBG interview",
  freshness: "week",
});

// Domain filtering (Perplexity)
await web_search({
  query: "climate research",
  domain_filter: ["nature.com", "science.org", ".edu"],
});
```
