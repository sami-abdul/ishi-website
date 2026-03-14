# macOS Release Documentation Summary

## Overview

This documentation describes the OpenClaw macOS release process using Sparkle auto-updates. The system requires Developer ID signing, notarization, and appcast management for secure distribution.

## Key Prerequisites

The setup requires several components:

- **Developer ID Application certificate** installed locally
- **Sparkle private key** referenced via `SPARKLE_PRIVATE_KEY_FILE` environment variable
- **Notary credentials** for Gatekeeper-safe distribution (keychain profile or API key)
- **pnpm** package manager with dependencies installed
- **Sparkle tools** automatically fetched via SwiftPM

## Build Process

The documentation emphasizes that `APP_BUILD` must remain "numeric + monotonic (no `-beta`)" to ensure proper Sparkle version comparison. When omitted, the system auto-derives the value from `APP_VERSION` using a `YYYYMMDDNN` format.

For release builds, `package-mac-dist.sh` defaults to universal architecture (`arm64 x86_64`), though this can be overridden for specific needs.

## Release Steps

1. **Build artifacts** using `package-mac-dist.sh` with appropriate environment variables
2. **Generate appcast entry** via `make_appcast.sh`, which creates HTML release notes from `CHANGELOG.md`
3. **Publish assets** to GitHub release alongside updated `appcast.xml`
4. **Verify** that URLs return 200 status and update flow functions properly

The documentation emphasizes that both the signed app and appcast must be published before users can receive updates.