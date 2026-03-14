# OpenResponses Gateway Integration Plan

## Overview

OpenClaw Gateway is planning to add support for the OpenResponses standard, an open inference framework designed for agentic workflows. The initiative involves creating a `/v1/responses` endpoint while maintaining the existing `/v1/chat/completions` endpoint as a legacy compatibility layer.

## Key Components

**The proposed architecture includes:**

- A new Zod-based schema module (`open-responses.schema.ts`) for validation
- A dedicated HTTP handler (`openresponses-http.ts`) for the `/v1/responses` endpoint
- Independent configuration flags allowing each endpoint to be toggled separately
- Strict module boundaries preventing schema type sharing between endpoints

## Phase 1 Implementation Scope

The initial release focuses on:

- Accepting `input` as either strings or structured `ItemParam` arrays
- Supporting message roles (system, developer, user, assistant) and function call outputs
- Extracting system/developer messages into `extraSystemPrompt`
- Rejecting unsupported content types (images, files) with appropriate error responses
- Returning single assistant messages with `output_text` content

## Streaming Strategy

Server-sent events will follow a prescribed sequence: "response.created," followed by item and content part additions, then repeated text deltas, concluding with "response.completed" and a literal `[DONE]` marker.

## Testing and Documentation

The plan includes end-to-end test coverage for authentication, response shapes, event ordering, and session routing, with documentation updates following implementation completion.