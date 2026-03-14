# Brave Search API Integration

OpenClaw supports Brave Search as a web search provider.

## Setup Requirements

To use this service, you need to create a Brave Search API account and generate an API key through their dashboard after selecting the Search plan.

## Configuration

The setup requires specifying Brave as your provider with parameters like `apiKey`, `maxResults`, and `timeoutSeconds`.

## Available Search Parameters

The tool accepts query customization through several options:
- **Basic**: Search query and result count (1-10)
- **Geographic/Language**: Country codes and language preferences for both results and UI
- **Temporal Filtering**: Freshness options (day, week, month, year) or specific date ranges

## Practical Applications

The documentation provides examples showing country and language-specific search, filtering for recent results, and searching within defined date ranges.

## Pricing & Usage

The Search plan includes $5/month in free credit that covers approximately 1,000 monthly queries at $5 per 1,000 requests. Users should set dashboard limits to prevent unexpected costs.

## Additional Features

Results cache for 15 minutes by default, and the plan includes LLM Context endpoint access, though model training with results requires additional storage rights per their Terms of Service.