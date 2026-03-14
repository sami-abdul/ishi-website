# Secrets Management in OpenClaw

## Overview

OpenClaw implements optional SecretRef storage for credentials, allowing sensitive data to be retrieved from external sources rather than stored as plaintext in configuration files.

## Core Architecture

The system resolves secrets into an in-memory snapshot during activation. Key operational characteristics include:

- **Eager resolution**: Secrets load during startup or configuration reload, not on individual requests
- **Fail-fast startup**: Missing SecretRefs on active surfaces prevent the gateway from starting
- **Atomic swaps**: Configuration reloads either fully succeed or preserve the last-known-good snapshot
- **Hot-path isolation**: Runtime requests and outbound delivery systems read only from the active snapshot, keeping secret-provider outages off critical paths

## Active-Surface Filtering

The system validates SecretRefs only on effectively active surfaces. Enabled surfaces must have resolvable references, while inactive surfaces emit non-fatal diagnostics with code `SECRETS_REF_IGNORED_INACTIVE_SURFACE`. Examples of inactive surfaces include disabled channels, top-level credentials not inherited by enabled accounts, and deselected web search provider keys.

## SecretRef Contract

All SecretRefs follow a unified object structure:

```json
{ "source": "env" | "file" | "exec", "provider": "name", "id": "identifier" }
```

**Env source**: Retrieves values from environment variables. Provider names match `^[a-z][a-z0-9_-]{0,63}$` and environment variable IDs match `^[A-Z][A-Z0-9_]{0,127}$`.

**File source**: Reads from local JSON files using RFC6901 JSON pointer paths. Supports `json` mode for object payloads and `singleValue` mode for entire file contents.

**Exec source**: Runs configured binaries with request/response payloads in JSON format, supporting timeouts, output limits, and environment allowlists.

## Provider Configuration

Providers are defined under `secrets.providers` with source-specific configurations. The exec provider accepts `allowSymlinkCommand`, `trustedDirs`, and security settings. File and exec providers include Windows-specific security notes regarding ACL verification with options to bypass checks via `allowInsecurePath: true`.

## Credential Coverage

Supported credential surfaces are detailed in the SecretRef Credential Surface reference. Runtime-minted credentials and OAuth refresh material are intentionally excluded from read-only resolution.

## Operational Commands

Three primary commands support secrets management:

- `openclaw secrets audit --check`: Discovers plaintext values, unresolved references, and precedence issues
- `openclaw secrets configure`: Interactive helper for setting up providers and mapping credentials
- `openclaw secrets apply`: Applies saved configuration plans

## Degradation and Recovery

When reload-time activation fails after successful operation, the system enters degraded state while maintaining the last-known-good snapshot. System events track transitions: `SECRETS_RELOADER_DEGRADED` and `SECRETS_RELOADER_RECOVERED`.

Command-path resolution distinguishes between strict paths (failing fast on missing SecretRefs) and read-only paths (degrading gracefully with explicit diagnostics).
