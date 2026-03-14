# Development Channels

OpenClaw maintains three distinct update channels for releases:

**Channel Overview:**
The project offers "stable" (npm `latest`), "beta" (npm `beta`), and "dev" (git `main`) distribution channels. Notably, vetted builds move to stable "without changing the version number — dist-tags are the source of truth for npm installs."

**Switching Between Channels:**
Users can update channels via git or npm/pnpm using `openclaw update --channel [stable|beta|dev]`. The `dev` option ensures a git checkout installation, while `stable` and `beta` install from npm using corresponding dist-tags.

**Plugin Synchronization:**
When switching channels, OpenClaw synchronizes plugin sources—dev versions prefer bundled plugins from git, while stable/beta restore npm packages.

**Release Guidelines:**
Tag recommendations include date-based naming (`vYYYY.M.D` for stable, `vYYYY.M.D-beta.N` for beta). Tags should remain immutable, and npm dist-tags serve as the authoritative source for installs.

**Platform Considerations:**
Beta and dev builds may lack macOS app releases, though their git tags and npm dist-tags can still be published.
