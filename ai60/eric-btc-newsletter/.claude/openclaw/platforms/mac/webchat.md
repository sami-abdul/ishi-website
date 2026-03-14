# WebChat Documentation

## Overview
The macOS menu bar application integrates the WebChat interface as a SwiftUI component, connecting to the Gateway and utilizing the **main session** for the selected agent with session-switching capabilities.

## Connection Modes

**Local Mode**: Direct connection to the local Gateway WebSocket.

**Remote Mode**: Establishes SSH tunnel forwarding through the Gateway control port as the data transport layer.

## Launch Options

Manual launch via Lobster menu → "Open Chat"

For testing with auto-launch:
```bash
dist/OpenClaw.app/Contents/MacOS/OpenClaw --webchat
```

## Logging

Access logs using `./scripts/clawlog.sh` with subsystem `ai.openclaw` and category `WebChatSwiftUI`.

## Technical Architecture

The implementation leverages Gateway WS methods including `chat.history`, `chat.send`, `chat.abort`, `chat.inject` along with events like `chat`, `agent`, `presence`, `tick`, and `health`. Session management defaults to the primary session (`main` or `global` depending on scope), with UI-based session switching. Onboarding operates through a separate session to isolate initial setup.

## Security Considerations

Remote mode restricts SSH forwarding to the Gateway WebSocket control port exclusively.

## Constraints

"The UI is optimized for chat sessions (not a full browser sandbox)."