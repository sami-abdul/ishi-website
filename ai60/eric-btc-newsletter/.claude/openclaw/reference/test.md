# Tests

## Testing Commands

**Core Testing:**
- `pnpm test` runs the fast core unit lane for quick local feedback
- `pnpm test:force` terminates lingering gateway processes and executes the full Vitest suite with an isolated gateway port to prevent server test collisions
- `pnpm test:coverage` runs unit tests with V8 coverage; global thresholds target 70% for lines/branches/functions/statements

**Specialized Test Suites:**
- `pnpm test:channels` executes channel-heavy test suites
- `pnpm test:extensions` runs extension and plugin-related tests
- `pnpm test:gateway` or `OPENCLAW_TEST_INCLUDE_GATEWAY=1 pnpm test` enables gateway integration tests
- `pnpm test:e2e` performs gateway end-to-end smoke tests across multiple instances; tune workers with `OPENCLAW_E2E_WORKERS=<n>`
- `pnpm test:live` runs provider live tests requiring API keys and `LIVE=1` environment variable

**Node 24+ Behavior:**
OpenClaw automatically disables Vitest `vmForks` in favor of `forks` to prevent module linking errors; override with `OPENCLAW_TEST_VM_FORKS=0|1`.

## Local PR Gate Checklist

```
pnpm check
pnpm build
pnpm test
pnpm check:docs
```

For resource-constrained environments, use:
```
OPENCLAW_TEST_PROFILE=low OPENCLAW_TEST_SERIAL_GATEWAY=1 pnpm test
```

## Performance Benchmarking

**Model Latency Benchmark** (`scripts/bench-model.ts`):
- Command: `source ~/.profile && pnpm tsx scripts/bench-model.ts --runs 10`
- Supports environment variables for API keys and model configuration
- Latest results (20 runs): minimax median 1279ms; Claude Opus median 2454ms

**CLI Startup Benchmark** (`scripts/bench-cli-startup.ts`):
- Benchmarks `--version`, `--help`, health, status commands
- Reports averages, p50, p95, min/max, and exit distributions

## Docker-Based Tests

**Onboarding E2E:**
```bash
scripts/e2e/onboard-docker.sh
```
Drives interactive wizard setup in a clean Linux container, verifies configuration, and tests gateway startup.

**QR Import Smoke Test:**
```bash
pnpm test:docker:qr
```
Validates `qrcode-terminal` compatibility under Node 22+ in Docker.