# Nodes Documentation

## Core Concept
A "node" functions as a companion device (macOS, iOS, Android, or headless) that connects to the Gateway WebSocket and exposes command surfaces like `canvas.*`, `camera.*`, and `device.*` through the `node.invoke` interface.

## Key Characteristics
- Nodes operate as **peripherals, not gateways**, and don't run the gateway service
- They require **device pairing** for WebSocket connections
- Messages from Telegram/WhatsApp arrive at the gateway level, not nodes

## Main Command Categories

**Device Management:**
- Pairing and status tracking via `openclaw devices list/approve/reject`
- Node discovery and description commands

**Canvas Operations:**
- Screenshots via `canvas.snapshot`
- Navigation, JavaScript evaluation, and UI controls
- A2UI (v0.8 JSONL) support for interface management

**Media Capture:**
- Photo capture from device cameras (both front/back)
- Video clip recording (clamped to 60 seconds)
- Screen recording functionality where supported

**System Integration:**
- Location services (when enabled)
- SMS capabilities on Android devices
- Android-specific commands for notifications, contacts, calendar, and motion sensors

## Remote Node Host Setup
When the gateway and execution environment are on separate machines, configure a node host with authentication via environment variables (`OPENCLAW_GATEWAY_TOKEN`) or SSH tunneling for secure connections.

## Security Features
- Exec approvals enforced locally at `~/.openclaw/exec-approvals.json`
- Allowlist-based command authorization per node
- File-binding verification for interpreter commands
