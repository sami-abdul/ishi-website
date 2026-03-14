# Prompt Caching

## Core Concept

Prompt caching allows model providers to reuse unchanged prompt prefixes across conversation turns, reducing token costs and improving response speed. The system distinguishes between initial cache writes (`cacheWrite`) and subsequent cache reads (`cacheRead`).

## Key Configuration Settings

**Primary Control:** The `cacheRetention` parameter accepts three values--`"none"`, `"short"`, or `"long"`--and can be set at both the model and per-agent levels. Configuration follows a hierarchy where agent-specific settings override model defaults.

**Legacy Support:** Previous TTL-based values (`5m` maps to `"short"`, `1h` maps to `"long"`) remain functional but `cacheRetention` is preferred for new configurations.

**Context Management:** The `contextPruning.mode: "cache-ttl"` setting removes older tool-result context after cache windows expire, preventing oversized history re-caching after idle periods.

**Session Warmth:** Heartbeat intervals (suggested at `"55m"`) maintain active cache windows and reduce redundant writes following inactivity gaps.

## Provider-Specific Behavior

- **Anthropic Direct API:** Full `cacheRetention` support with automatic `"short"` seeding when unspecified
- **Amazon Bedrock:** Claude models support explicit cache retention; non-Anthropic models force `"none"`
- **OpenRouter:** Automatically injects Anthropic cache controls on system prompts for Anthropic model references
- **Other providers:** Settings have no effect if unsupported

## Diagnostic Tools

Cache tracing can be enabled via configuration file or environment variables to monitor `cacheRead`/`cacheWrite` impact per turn. Trace output captures staged snapshots throughout request processing.