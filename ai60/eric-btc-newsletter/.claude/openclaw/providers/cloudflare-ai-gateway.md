# Cloudflare AI Gateway Documentation

## Overview

"Cloudflare AI Gateway sits in front of provider APIs and lets you add analytics, caching, and controls."

The integration allows organizations to route Anthropic API requests through Cloudflare's gateway infrastructure. Key connection details include:

- **Provider identifier:** `cloudflare-ai-gateway`
- **Gateway endpoint:** `https://gateway.ai.cloudflare.com/v1/<account_id>/<gateway_id>/anthropic`
- **Default model:** `cloudflare-ai-gateway/claude-sonnet-4-5`
- **Authentication:** Requires Anthropic API credentials

## Setup Instructions

### Interactive Setup
Run the onboarding command to configure gateway credentials interactively.

### Non-Interactive Configuration
Automated setup requires account ID, gateway ID, and API key parameters passed as command-line arguments.

### Secured Gateways
When Cloudflare gateway authentication is enabled, add the `cf-aig-authorization` header to requests alongside your provider API key credentials.

## Operational Considerations

For daemon processes (launchd/systemd), ensure the `CLOUDFLARE_AI_GATEWAY_API_KEY` environment variable is accessible through configuration files or shell environment settings.

---

*Documentation built with Mintlify*
