# OpenClaw Doctor Command Documentation

The `openclaw doctor` command performs health checks and quick fixes for the gateway and channels. It offers three execution modes:

- Basic run: `openclaw doctor`
- Repair mode: `openclaw doctor --repair` (also accepts `--fix`)
- Deep analysis: `openclaw doctor --deep`

## Key Features

**Interactive behavior:** Prompts for keychain or OAuth fixes only appear when running in a terminal environment with stdin available, unless `--non-interactive` is explicitly set.

**Configuration management:** The repair function creates a backup at `~/.openclaw/openclaw.json.bak` and removes unrecognized configuration keys while documenting each removal.

**File system cleanup:** Detects orphaned transcript files in the sessions directory and safely archives them with `.deleted.<timestamp>` naming for space recovery.

**Scheduler optimization:** Scans `~/.openclaw/cron/jobs.json` for outdated cron job structures and rewrites them before runtime normalization occurs.

**Model credentials:** Performs readiness checks for memory-search functionality and recommends running `openclaw configure --section model` when embedding credentials are absent.

**Sandbox validation:** Reports warnings if sandbox mode is enabled but Docker isn't installed, suggesting either installation or disabling the feature.

## macOS Configuration Override Issue

Prior `launchctl` environment variable assignments can override config file values and cause authentication failures. Users can check and remove these overrides using the provided launchctl commands.
