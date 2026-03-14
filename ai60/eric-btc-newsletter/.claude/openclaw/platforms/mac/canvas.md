# Canvas Documentation Summary

## Core Overview

Canvas is a lightweight visual workspace embedded in the macOS app using `WKWebView`. It supports HTML/CSS/JS, A2UI, and interactive UI surfaces, with state stored in `~/Library/Application Support/OpenClaw/canvas/<session>/`.

## Key Features

**File Serving**: A custom URL scheme (`openclaw-canvas://`) serves Canvas files. For example, `openclaw-canvas://main/` maps to the session's root `index.html`. If no index exists, a built-in scaffold appears.

**Panel Behavior**: The panel is borderless and resizable, anchors near the menu bar, remembers position per session, and auto-reloads when files change. Only one Canvas panel displays at a time, though sessions can be switched.

## Agent Control

Agents interact with Canvas via the Gateway WebSocket, supporting:
- Panel visibility toggling
- Navigation to local paths or URLs
- JavaScript evaluation
- Screenshot capture

Commands like `openclaw nodes canvas navigate --node <id> --url "/"` enable these operations.

## A2UI Integration

A2UI v0.8 renders inside Canvas at the Gateway's A2UI host URL. The system supports four message types: `beginRendering`, `surfaceUpdate`, `dataModelUpdate`, and `deleteSurface`. Note: "createSurface (v0.9) is not supported."

## Agent Triggering

Canvas can initiate agent runs through deep links like `openclaw://agent?message=...`, with confirmation prompts unless valid keys are provided.

## Security

The custom scheme prevents directory traversal, local content uses no loopback server, and external URLs require explicit navigation.