# Node + tsx Crash

## Issue Overview

OpenClaw experiences a startup failure when using Node with `tsx`, manifesting as:

> "Running OpenClaw via Node with `tsx` fails at startup with: `[openclaw] Failed to start CLI: TypeError: __name is not a function`"

The problem emerged after transitioning development scripts from Bun to `tsx` on January 6, 2026.

## Root Cause Analysis

The investigation identifies that `tsx` relies on esbuild for TypeScript/ESM transformation. When esbuild's `keepNames` feature is enabled, it generates a `__name` helper function. The crash suggests this helper either doesn't exist at runtime or becomes overwritten during the Node 25 module loading process.

## Environment Details

- **Node versions affected:** 25.3.0, 22.22.0
- **Tool:** tsx 4.21.0
- **Operating System:** macOS (likely affects other platforms)

## Reproduction Methods

Users can trigger the issue via:

```bash
node --import tsx src/entry.ts status
```

Or using the minimal reproduction script:

```bash
node --import tsx scripts/repro/tsx-name-repro.ts
```

## Available Solutions

**Working alternatives include:**

1. Using Bun for development scripts
2. Running TypeScript compiler with `tsc --watch`, then executing compiled output
3. Testing Node LTS versions (22/24) to determine if the issue is Node 25-specific

The document references esbuild's `keepNames` API documentation and related issues from other projects experiencing similar helper function problems.