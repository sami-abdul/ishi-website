# Secrets Apply Plan Contract

## Overview
The `openclaw secrets apply` command enforces a strict validation contract for secret management. According to the documentation, "If a target does not match these rules, apply fails before mutating configuration."

## Key Requirements

**Plan Structure**: The command expects a JSON file with a `targets` array containing plan targets with specific fields including `type`, `path`, `pathSegments`, and a `ref` object.

**Supported Paths**: Target paths must align with those defined in the SecretRef Credential Surface reference. The system recognizes compatibility aliases like `models.providers.apiKey` and `skills.entries.apiKey`.

**Validation Constraints**: Each target undergoes multiple checks:
- Type recognition and path shape matching
- Non-empty dot path requirement
- Rejection of forbidden segments (`__proto__`, `prototype`, `constructor`)
- Provider or account ID verification against encoded path values
- Agent ID requirements for auth-profiles targets

## Execution Options

Users can perform validation without making changes using the `--dry-run` flag. The documentation notes that "If apply fails with an invalid target path message, regenerate the plan with `openclaw secrets configure`."

## Scope Notes

The process handles both `openclaw.json` and `auth-profiles.json` targets, with special handling for reference-only entries included in runtime resolution and audit coverage.
