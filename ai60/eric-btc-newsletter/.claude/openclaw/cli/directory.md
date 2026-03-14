# OpenClaw Directory Documentation

## Overview

The `openclaw directory` command enables lookups for channels supporting directory features, including contacts, peers, groups, and user profiles.

## Essential Flags

Key options include `--channel <name>` (required for multi-channel setups), `--account <id>` (defaults to channel configuration), and `--json` (for programmatic output).

## Primary Purpose

This tool helps users "find IDs you can paste into other commands (especially `openclaw message send --target ...`)." Results typically come from configuration-based allowlists rather than live provider directories.

## Channel-Specific ID Formats

Different platforms use distinct identifier patterns:
- **WhatsApp**: Phone numbers for DMs; alphanumeric strings for group chats
- **Telegram**: Usernames or numeric identifiers
- **Slack**: User and channel prefixes with alphanumeric codes
- **Discord**: User and channel specifications with numeric IDs
- **Matrix**: User, room, and alias formats with server addresses
- **Teams**: User and conversation identifiers
- **Zalo variants**: User IDs or thread identifiers

## Core Commands

Three primary command categories exist: retrieving self information, listing peers with optional filtering and limits, and accessing group data including membership details.
