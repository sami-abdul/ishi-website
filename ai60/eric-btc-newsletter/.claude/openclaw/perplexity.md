# Perplexity Sonar Integration

The documentation describes how to configure OpenClaw to use Perplexity Sonar for web search functionality through two API pathways.

## Connection Methods

Users can connect via Perplexity's direct API at `https://api.perplexity.ai` using the `PERPLEXITY_API_KEY` environment variable, or alternatively through OpenRouter at `https://openrouter.ai/api/v1` with the `OPENROUTER_API_KEY`.

## Configuration

The setup requires specifying the provider as "perplexity" and including the API key and base URL in the configuration object. When migrating from Brave, users simply need to update the provider setting and supply their Perplexity credentials.

## Model Options

Three models are available: `perplexity/sonar` for quick question-answering, `perplexity/sonar-pro` as the default offering multi-step reasoning, and `perplexity/sonar-reasoning-pro` for comprehensive research tasks.

## Automatic Detection

When both API keys exist, users should explicitly set the base URL to disambiguate. The system defaults to Perplexity's direct API for keys starting with "pplx-" and OpenRouter for "sk-or-" prefixed keys.