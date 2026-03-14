# Testing Documentation

OpenClaw implements a comprehensive testing strategy with three Vitest suites of increasing realism and cost.

## Test Suite Structure

**Unit/Integration Tests** (`pnpm test`) run pure unit tests and deterministic in-process integrations without external dependencies. These execute in CI and complete quickly.

**E2E Tests** (`pnpm test:e2e`) validate multi-instance gateway behavior, WebSocket/HTTP surfaces, and node pairing. The documentation notes: "Multi-instance gateway end-to-end behavior" is the primary focus, running in CI without real credentials.

**Live Tests** (`pnpm test:live`) assess real provider and model functionality using actual credentials. The documentation states these are "not CI-stable by design" due to real networks and provider policies.

## Quick Start Commands

For most workflows: `pnpm build && pnpm check && pnpm test`

When targeting specific scenarios:
- Coverage validation: `pnpm test:coverage`
- End-to-end checks: `pnpm test:e2e`
- Real provider validation: `pnpm test:live`

## Live Testing Configuration

Live tests discover credentials from profile stores (`~/.openclaw/credentials/`) and environment variables. The suite supports narrowing through allowlist environment variables like `OPENCLAW_LIVE_MODELS` and `OPENCLAW_LIVE_GATEWAY_MODELS`.

Key selection includes "modern" models (Claude 4.5, GPT-5.x, Gemini 3, GLM 4.7, and others) and enables targeted regression testing across OpenAI, Anthropic, Google, and other providers.

## Docker Support

Optional Docker runners execute tests in isolated containers, mounting local configuration and sourcing profile files for credential management.

## Regression Testing Philosophy

The documentation emphasizes adding CI-safe regressions when fixing provider issues, preferring mock implementations to live-only tests, and keeping live tests narrowly scoped via environment variables.
