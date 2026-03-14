# openclaw reset

## Overview
The `openclaw reset` command removes local configuration and state while maintaining the CLI installation.

## Command Syntax
```bash
openclaw backup create
openclaw reset
openclaw reset --dry-run
openclaw reset --scope config+creds+sessions --yes --non-interactive
```

## Key Information
Run `openclaw backup create` first if you want a restorable snapshot before removing local state.
