# openclaw tui Command Documentation

## Overview
The `openclaw tui` command launches a terminal user interface connected to the Gateway.

## Description
"Open the terminal UI connected to the Gateway." This interface provides interactive access to configured gateway systems.

## Key Features

**Authentication Handling:**
The TUI automatically resolves configured gateway authentication credentials through SecretRefs, supporting token and password authentication via environment variables, files, or executable providers.

**Agent Workspace Integration:**
When executed from within a configured agent workspace directory, the system automatically selects that agent as the default session key, unless explicitly overridden using the `--session` flag with an agent ID format.

## Usage Examples

```bash
openclaw tui
openclaw tui --url ws://127.0.0.1:18789 --token <token>
openclaw tui --session main --deliver
openclaw tui --session bugfix
```

The final example demonstrates automatic agent inference when executed within an agent workspace directory.

## Related Resources
- TUI guide available at: [TUI](/web/tui)
