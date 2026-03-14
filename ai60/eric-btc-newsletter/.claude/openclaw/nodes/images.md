# Image and Media Support

## Overview

The WhatsApp channel via Baileys Web supports sending and receiving media with specific handling rules for different file types.

## Key Features

**Sending Media:**
- Command: `openclaw message send --media <path-or-url> [--message <caption>]`
- Supports local files or HTTP(S) URLs
- Optional captions; media-only sends are allowed
- Includes `--dry-run` and `--json` output options

**File Type Handling:**

Images are "resize & recompress to JPEG (max side 2048px)" with a target of 5 MB, capped at 6 MB. Audio and video files pass through up to 16 MB, with audio sent as voice notes. Documents can reach 100 MB while preserving filenames.

**Special Features:**
- GIF-style playback via MP4 with `gifPlayback: true` flag
- MIME detection uses magic bytes, headers, then file extensions
- Auto-replies can include media from configuration

## Inbound Media Processing

When messages contain media, the system:
- Downloads files to temporary locations
- Exposes `{{MediaUrl}}` and `{{MediaPath}}` template variables
- Processes media understanding (transcription/descriptions) when configured
- Copies media into Docker sandboxes when applicable

## Size Limits Summary

| Type | Limit |
|------|-------|
| Images (outbound) | ~6 MB |
| Audio/Video (outbound) | 16 MB |
| Documents (outbound) | 100 MB |
| Images (understanding) | 10 MB |
| Audio (understanding) | 20 MB |
| Video (understanding) | 50 MB |

Oversized or corrupted media generates clear error messages, with understanding tasks skipped but replies still processed.
