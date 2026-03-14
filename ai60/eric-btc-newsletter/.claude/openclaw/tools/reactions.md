# Reactions Documentation

## Overview
This page documents reaction tooling with shared semantics across multiple communication channels.

## Core Requirements
When adding reactions, an `emoji` parameter is required. To remove reactions, you can use an empty `emoji` value or set `remove: true`, depending on the channel.

## Channel-Specific Behavior

**Discord & Slack**: Empty `emoji` clears all bot reactions; `remove: true` deletes only that specific emoji.

**Google Chat**: Empty `emoji` removes all app reactions; `remove: true` removes just the specified emoji.

**Telegram**: Empty `emoji` removes bot reactions. The `remove: true` option also removes reactions but requires a non-empty `emoji` for validation purposes.

**WhatsApp**: Empty `emoji` removes the bot reaction; `remove: true` functions like empty emoji, though a non-empty `emoji` is still needed.

**Zalo Personal** (`zalouser`): Requires non-empty `emoji` values; `remove: true` removes that specific emoji reaction.

**Signal**: When `channels.signal.reactionNotifications` is enabled, inbound reaction notifications trigger system events.
