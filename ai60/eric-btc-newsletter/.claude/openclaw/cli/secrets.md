# OpenClaw Secrets Management Documentation

## Overview

The `openclaw secrets` command manages SecretRefs and maintains runtime snapshot integrity. It provides four primary operations:

- **reload**: Gateway RPC that re-resolves references and atomically swaps the runtime snapshot
- **audit**: Read-only scan for plaintext storage, unresolved references, and configuration drift
- **configure**: Interactive setup for providers and credential mapping (requires TTY)
- **apply**: Executes saved plans and removes targeted plaintext residues

## Recommended Workflow

The documentation suggests this operator loop:

```
openclaw secrets audit --check
openclaw secrets configure
openclaw secrets apply --from /tmp/openclaw-secrets-plan.json --dry-run
openclaw secrets apply --from /tmp/openclaw-secrets-plan.json
openclaw secrets audit --check
openclaw secrets reload
```

## Key Exit Codes

For CI/automation integration: `audit --check` returns exit code 1 on findings, and unresolved references return code 2.

## Audit Capabilities

The audit command detects:
- Plaintext secrets
- Unresolved reference issues
- Credential precedence conflicts between configuration files
- Residual sensitive data in generated model files
- Legacy authentication store entries

Header detection uses heuristic matching for common credential patterns like "authorization," "x-api-key," and "token."

## Configure Command

This interactive helper builds provider and credential changes through a multi-step flow: provider setup, credential mapping, and preflight validation. Notable flags include `--providers-only`, `--skip-provider-setup`, and `--agent <id>` for scoped operations.

Important constraint: Homebrew-installed exec providers may require `allowSymlinkCommand: true` paired with `trustedDirs` configuration for security.

## Apply & Rollback

The `apply` command updates `openclaw.json`, `auth-profiles.json`, legacy auth stores, and environment files. Notably, no rollback backups are generated -- safety relies on strict preflight checks and atomic application with in-memory failure recovery.
