# Exec Approvals Documentation

## Overview

Exec approvals function as a "safety interlock" for sandboxed agents executing commands on real hosts. They work alongside tool policies and elevated gating to enforce command execution controls through a combination of policy rules, allowlists, and optional user approval.

## Key Components

**Enforcement Location:**
Exec approvals run locally on execution hosts—either the gateway machine or node runners (macOS companion app or headless node host).

**Configuration File:**
Settings are stored in `~/.openclaw/exec-approvals.json`, containing version info, socket configuration, default policies, and per-agent allowlists.

## Policy Controls

The system offers three primary policy knobs:

1. **Security levels:** deny (block all), allowlist (allow only approved commands), or full (allow everything)
2. **Ask behavior:** off (no prompts), on-miss (prompt when allowlist doesn't match), or always (prompt every time)
3. **Ask fallback:** determines behavior when no UI is available—deny, allowlist, or full

## Safe Binaries

Certain stdin-only utilities like `jq`, `cut`, and `head` can run without explicit allowlist entries. These "safe bins" reject positional file arguments and prevent path-based token injection to eliminate file-existence oracle vulnerabilities.

## Management Interface

Users can configure approvals through the Control UI under Nodes → Exec approvals, or via the `openclaw approvals` CLI command. The interface allows editing defaults, agent-specific overrides, and allowlist patterns while displaying usage metadata.

## Approval Process

When approval is required, the gateway broadcasts requests to operators, who can approve them once, add to permanent allowlists, or deny. Approvals can also be forwarded to chat channels for `/approve` command resolution.
