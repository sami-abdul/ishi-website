# Channel Location Parsing Documentation

## Overview

OpenClaw converts location data from chat platforms into both readable text and structured metadata. The system supports three major messaging platforms: Telegram, WhatsApp, and Matrix.

## Text Rendering Formats

Locations appear in messages with specific emoji indicators:

- **Pin locations**: `📍 48.858844, 2.294351 ±12m`
- **Named venues**: `📍 Eiffel Tower — Champ de Mars, Paris (48.858844, 2.294351 ±12m)`
- **Live shares**: `🛰 Live location: 48.858844, 2.294351 ±12m`

User captions or comments are appended below the location line.

## Structured Context Fields

When locations are detected, the system populates these fields in the context payload:

- `LocationLat` — latitude coordinate
- `LocationLon` — longitude coordinate
- `LocationAccuracy` — precision margin in meters (optional)
- `LocationName` — place name (optional)
- `LocationAddress` — street address (optional)
- `LocationSource` — indicates type: pin, place, or live
- `LocationIsLive` — boolean flag

## Platform-Specific Handling

**Telegram** maps venue information to name and address fields; live locations include timing data.

**WhatsApp** extracts captions from both standard and live location messages.

**Matrix** parses geo URIs as pin locations, disregarding elevation data.
