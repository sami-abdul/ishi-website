# Elevated Mode Documentation

## Overview

The Elevated Mode feature allows agents to execute commands with elevated privileges on the gateway host. According to the documentation, "/elevated on" runs on the gateway host while keeping exec approvals, whereas "/elevated full" auto-approves exec requests.

## Key Directives

The system supports four directive forms:

- **on/ask**: Runs on gateway host, maintains exec approvals
- **full**: Runs on gateway host with auto-approval of exec calls
- **off**: Disables elevated mode

As stated in the docs, these directives only impact sandboxed agents; "unsandboxed agents" experience no location changes.

## Access Control

Elevated mode relies on a dual-gate system. The global setting `tools.elevated` establishes baseline permissions, while individual agent configurations via `agents.list[].tools.elevated` can further restrict access. Both gates must permit the feature.

## Authorization Requirements

Senders must match allowlist criteria defined in `tools.elevated.allowFrom`, with support for provider-specific lists (Discord, WhatsApp, etc.). The documentation specifies that "mutable sender metadata requires explicit prefixes" like `name:`, `username:`, and `tag:`.

## Session Management

Users establish session-level defaults by sending directive-only messages. The resolution hierarchy prioritizes inline directives first, then session overrides, finally falling back to global defaults from `agents.defaults.elevatedDefault`.
