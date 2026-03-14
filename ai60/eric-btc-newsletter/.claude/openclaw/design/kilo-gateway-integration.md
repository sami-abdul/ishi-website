# Kilo Gateway Integration

This documentation outlines the design for integrating Kilo Gateway as a first-class provider in OpenClaw, following the existing OpenRouter implementation pattern.

## Key Design Decisions

**Provider Naming:** The integration uses `kilocode` as the provider identifier, matching user configuration examples and maintaining consistency with existing provider naming conventions like `openrouter` and `moonshot`.

**Default Model:** The recommended default is `kilocode/anthropic/claude-opus-4.6`, based on user configuration examples, providing a capable model without relying on auto-routing.

**Base URL Configuration:** The default base URL `https://api.kilo.ai/api/gateway/` is hardcoded but configurable through `models.providers.kilocode.baseUrl`, matching patterns used by other providers.

**Model Scanning:** No dedicated scanning endpoint is initially recommended since Kilo Gateway proxies to OpenRouter, allowing dynamic model availability. Manual configuration remains an option for users.

**Special Handling:** The integration inherits OpenRouter behavior for Anthropic models, including cache TTL eligibility and transcript policy handling.

## Implementation Scope

The integration requires modifications across 12 file categories, including:

- Credential management and environment variable mapping
- Configuration application functions
- Authentication choice system registration
- CLI option registration
- Non-interactive onboarding support
- Optional special handling for cache TTL and transcript policies

The changes maintain backward compatibility, requiring no migration for existing users while enabling immediate access to the new authentication method for newcomers.