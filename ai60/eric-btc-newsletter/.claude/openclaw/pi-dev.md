# Pi Development Workflow

## Overview

This page provides guidance for developers working on the Pi integration within OpenClaw, covering testing, linting, and manual debugging procedures.

## Key Commands

**Quality gates:** The documentation recommends running `pnpm lint && pnpm build && pnpm test` before pushing changes.

**Test execution:** Developers can run Pi-specific tests using Vitest with patterns matching files like `src/agents/pi-*.test.ts` and related test suites.

**Live testing:** Setting the `OPENCLAW_LIVE_TEST=1` environment variable enables integration tests against actual providers.

## Development Workflow

The recommended manual testing approach involves:
- Running the gateway locally via `pnpm gateway:dev`
- Executing agents directly through CLI commands
- Using the TUI interface for interactive debugging

## State Management

Application state stores under `~/.openclaw` by default, with an override available through the `OPENCLAW_STATE_DIR` environment variable. The documentation details selective reset options -- developers can clear only sessions while preserving authentication credentials to avoid unnecessary re-authentication.