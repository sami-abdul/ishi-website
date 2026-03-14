# OpenClaw Security Documentation

The documentation covers the `openclaw security` command, which provides audit and remediation tools for OpenClaw Gateway installations.

## Key Capabilities

The security audit command offers multiple modes:
- **Standard audit**: `openclaw security audit`
- **Deep scanning**: `openclaw security audit --deep`
- **Auto-remediation**: `openclaw security audit --fix`
- **Machine-readable output**: `openclaw security audit --json`

## Primary Security Checks

The audit identifies misconfigurations across several domains:

**Multi-user scenarios**: The tool warns when "multiple DM senders share the main session" and recommends enabling per-channel or per-account scoping for shared inboxes.

**Model safety**: Small language models (<=300B parameters) receive additional scrutiny when used without sandboxing alongside web tools.

**Webhook security**: The system checks for unset session keys, unrestricted overrides, and missing allowlist configurations.

**Network exposure**: The audit flags header-spoofing risks, mDNS metadata leakage, and dangerous Docker network modes (host, container namespace joins).

**Authentication**: Warns when gateway HTTP APIs lack shared-secret protection with `gateway.auth.mode="none"`.

## Remediation Scope

The `--fix` option applies conservative changes: flipping open group policies to allowlists, enabling sensitive log redaction, and tightening file permissions. Notably, it avoids rotating credentials, disabling tools, or removing plugins -- changes requiring explicit operator intervention.
