# `openclaw uninstall`

This command uninstalls the gateway service and local data while keeping the CLI installed.

## Usage Examples

```bash
openclaw backup create
openclaw uninstall
openclaw uninstall --all --yes
openclaw uninstall --dry-run
```

## Important Note

Run `openclaw backup create` first if you want a restorable snapshot before removing state or workspaces.
