# Voice Call Plugin Documentation

## Overview
The Voice Call plugin enables outbound notifications and multi-turn conversations with inbound capabilities. It operates within the Gateway process and supports multiple providers: Twilio, Telnyx, Plivo, and a mock dev provider.

## Installation
Two options are available:
1. **NPM installation** (recommended): `openclaw plugins install @openclaw/voice-call`
2. **Local folder installation** (development): `openclaw plugins install ./extensions/voice-call`

Both require Gateway restart after installation.

## Key Configuration Areas

**Provider Setup**: The config requires selecting a provider and supplying relevant credentials (AccountSid for Twilio, API key for Telnyx, etc.).

**Webhook Requirements**: "Twilio/Telnyx require a publicly reachable webhook URL" for operation.

**Public Exposure**: Options include setting a direct `publicUrl`, using ngrok tunneling, or Tailscale funnel mode.

**Streaming Security**: Includes socket timeout protection, connection limits per IP, and total connection caps.

## TTS Integration
Voice Call leverages core `messages.tts` configuration (OpenAI or ElevenLabs) but allows plugin-level overrides. "Edge TTS is ignored for voice calls" due to telephony audio requirements.

## Inbound Calls
Disabled by default. Enablement requires setting `inboundPolicy: "allowlist"` with allowed phone numbers and optional greeting.

## Interface Options
- **CLI**: Commands like `openclaw voicecall call`, `continue`, `speak`, `end`, `status`
- **Agent Tool**: Named `voice_call` with actions for initiating, continuing, and managing calls
- **Gateway RPC**: Methods under `voicecall.*` namespace for programmatic access
