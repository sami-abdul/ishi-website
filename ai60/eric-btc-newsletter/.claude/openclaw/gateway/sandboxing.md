# Sandboxing in OpenClaw

## Overview

OpenClaw offers optional Docker container sandboxing to limit the impact of tool execution errors. When enabled, tools run in isolated containers rather than directly on the host system, though "this is not a perfect security boundary."

## Key Components Sandboxed

Tool execution operations (`exec`, `read`, `write`, `edit`, `apply_patch`, `process`) run in containers when enabled. The system also supports optional sandboxed browser functionality with features like password-protected noVNC access and CDP (Chrome DevTools Protocol) ingress restrictions.

Components that remain on the host include the Gateway process itself and tools explicitly configured for elevated execution.

## Configuration Options

**Activation modes** control when sandboxing applies:
- `"off"`: disabled entirely
- `"non-main"`: active only for non-main sessions (default recommendation)
- `"all"`: every session runs sandboxed

**Scope settings** determine container allocation:
- `"session"` (default): one container per user session
- `"agent"`: one container per agent
- `"shared"`: single container for all sandboxed sessions

**Workspace access** controls sandbox visibility:
- `"none"` (default): isolated sandbox workspace
- `"ro"`: read-only agent workspace mounting
- `"rw"`: read-write workspace access

## Custom Mounts and Security

Additional host directories can be bound using the format `host:container:mode`. OpenClaw blocks dangerous mount sources like `/etc`, `/proc`, `/sys`, and Docker sockets. "Sensitive mounts (secrets, SSH keys, service credentials) should be `:ro` unless absolutely required."

## Container Images

The default sandbox image is `openclaw-sandbox:bookworm-slim`. Alternative builds include `openclaw-sandbox-common:bookworm-slim` (with curl, jq, Node.js, Python, git) and a specialized browser image. By default, sandbox containers operate with no network access.
