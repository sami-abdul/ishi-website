# Diffs Plugin Documentation

## Overview

The Diffs plugin converts textual changes into visual diff artifacts. It accepts either before/after text or unified patches, returning viewer URLs, rendered files (PNG/PDF), or both.

## Key Features

**Input Options:**
- Before and after text comparison
- Unified patch format

**Output Modes:**
- Canvas viewer (gateway-hosted URL)
- Rendered file (PNG or PDF)
- Combined viewer and file output

## Quick Implementation

Enable the plugin via configuration:

```json5
{
  plugins: {
    entries: {
      diffs: {
        enabled: true,
      },
    },
  },
}
```

Call with mode parameter: `"view"` for canvas presentation, `"file"` for chat delivery, or `"both"`.

## Tool Parameters

**Required inputs (choose one):**
- `before` + `after`: original and updated text (512 KiB max each)
- `patch`: unified diff format (2 MiB max)

**Optional configuration:**
- `path`: display filename
- `lang`: language hint
- `mode`: output type
- `layout`: "unified" or "split"
- `fileFormat`: "png" or "pdf"
- `fileQuality`: "standard", "hq", or "print"
- `ttlSeconds`: viewer expiration (default 1800, max 21600)

## Security Defaults

The viewer operates as loopback-only (`127.0.0.1`) by default with tokenized access paths. Remote access requires explicit enablement via `security.allowRemoteViewer: true` in configuration.

## Browser Requirements

File rendering modes need a Chromium-compatible browser, discoverable through executable path configuration or environment variables.

## Output Structure

Responses include metadata under `details` containing artifact ID, viewer URL, file paths, and expiration timestamps depending on the selected mode.
