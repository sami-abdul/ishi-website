# OpenClaw Configure Documentation

## Overview
The `openclaw configure` command provides an interactive setup wizard for credentials, devices, and agent defaults.

## Key Features

**Model Selection**: The wizard now includes a multi-select feature for the `agents.defaults.models` allowlist, which determines what appears in `/model` and the model picker interface.

**Configuration Methods**: Users can run `openclaw config` without arguments to launch the wizard, or use `openclaw config get|set|unset` for non-interactive modifications.

## Important Setup Notes

- Gateway mode selection updates `gateway.mode` automatically; you may select "Continue" if only this change is needed
- Channel-based services (Slack, Discord, Matrix, Teams) request channel/room allowlists--supporting both names and IDs with automatic resolution
- Token authentication with daemon installation validates SecretRef configuration but doesn't store plaintext tokens in supervisor metadata
- Unresolved token SecretRefs block daemon installation with guidance for resolution
- Simultaneous configuration of both `gateway.auth.token` and `gateway.auth.password` without an explicit `gateway.auth.mode` setting prevents daemon installation

## Usage Examples

```bash
openclaw configure
openclaw configure --section model --section channels
```

## Related Resources

- [Configuration Reference](/gateway/configuration)
- [Config CLI Documentation](/cli/config)
