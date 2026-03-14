# Firecrawl Documentation

## Overview
OpenClaw integrates Firecrawl as a fallback extractor for web content retrieval, particularly useful for JavaScript-heavy websites and pages that block standard HTTP requests.

## Setup Requirements
Users need to create a Firecrawl account and obtain an API key, then configure it either directly in settings or via the `FIRECRAWL_API_KEY` environment variable.

## Key Configuration Options
The main settings include:
- API endpoint URL
- `onlyMainContent`: filters to primary page content
- `maxAgeMs`: controls cache duration (default 2 days)
- `timeoutSeconds`: request timeout limit

## Bot Circumvention
Firecrawl offers proxy modes for bypassing bot detection. OpenClaw automatically uses `"auto"` mode with caching enabled, which may consume additional credits if stealth proxies are needed for retries.

## Processing Hierarchy
When fetching web content, OpenClaw attempts extraction in this order: local Readability tool first, then Firecrawl if configured, with basic HTML cleanup as final fallback.
