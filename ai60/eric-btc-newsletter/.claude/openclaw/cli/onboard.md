# openclaw onboard

## Overview

The `openclaw onboard` command launches an interactive setup wizard for configuring local or remote Gateway connections.

## Key Features

**Interactive modes:**
- `openclaw onboard` -- standard interactive wizard
- `openclaw onboard --flow quickstart` -- minimal prompts with auto-generated gateway token
- `openclaw onboard --flow manual` -- comprehensive configuration options

**Non-interactive configuration:**
Supports scripted setup with flags like `--non-interactive`, `--auth-choice`, and `--secret-input-mode` for automation.

**Gateway connection options:**
- Local setup (default)
- Remote Gateway via `--mode remote --remote-url wss://gateway-host:18789`
- Plaintext `ws://` for trusted networks (requires `OPENCLAW_ALLOW_INSECURE_PRIVATE_WS=1`)

## Secret Management

The tool offers three storage approaches:
- Plaintext key values
- Environment variable references
- Configured secret providers (file or exec)

Validation occurs before saving references in interactive mode.

## Provider Support

Includes built-in support for OpenAI, Mistral, Z.AI, and custom OpenAI/Anthropic-compatible endpoints. The system can auto-detect endpoint compatibility.

## Related Resources

Documentation covers onboarding wizards (CLI and macOS), automation, and reference materials at the provided documentation index.
