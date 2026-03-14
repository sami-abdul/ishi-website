# OpenClaw Features Documentation

## Overview

OpenClaw offers a comprehensive platform for multi-channel AI agent deployment. The system emphasizes integration flexibility through multiple messaging platforms and extensibility via plugins.

## Key Capabilities

**Communication Channels**: The platform supports "WhatsApp, Telegram, Discord, and iMessage with a single Gateway," enabling unified agent deployment across diverse messaging services.

**Extension Architecture**: Users can "Add Mattermost and more with extensions," allowing customization beyond built-in integrations.

**Agent Management**: The system provides "Multi-agent routing with isolated sessions," enabling separate workspaces and conversation contexts.

**Media Handling**: Comprehensive support for "Images, audio, and documents in and out" of conversations.

**User Interfaces**: Access through web-based controls and desktop applications including a macOS companion app.

**Mobile Integration**: Dedicated iOS and Android applications offering voice, chat, camera access, and device-level commands.

## Technical Architecture

The implementation leverages specific libraries (Baileys for WhatsApp Web, grammY for Telegram, channels.discord.js for Discord) and supports streaming responses for extended outputs. Session management automatically consolidates direct chats into a shared main channel while maintaining isolation for group conversations.

Authentication integrates OAuth flows for both Anthropic and OpenAI subscriptions. Voice transcription and media processing are available as optional features.
