# Health Checks on macOS

## Overview

The documentation describes health monitoring features for a macOS menu bar application that tracks connection status for linked channels.

## Key Features

**Status Indicators:**
The application displays connection status through a color-coded dot system: green indicates "linked + socket opened recently," orange shows "connecting/retrying," and red signals "logged out or probe failed."

**Settings Panel:**
A Health card within the General tab presents information including authentication age, session storage details, probe timestamps, and error codes. Users can manually trigger health checks or access log files from this interface.

**Channel Management:**
The Channels tab allows users to view status and perform actions specific to WhatsApp and Telegram, such as generating login QR codes or logging out.

## Technical Implementation

The system executes `openclaw health --json` approximately every 60 seconds and on-demand through a shell executor. The application maintains separate caches for successful snapshots and errors to minimize visual flicker while displaying timestamp information.

## Alternative Access

Users can also employ CLI commands like `openclaw status` and `openclaw status --deep` for health verification, supplemented by log file analysis at `/tmp/openclaw/openclaw-*.log` for debugging connection events.