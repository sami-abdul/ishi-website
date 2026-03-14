# Release Checklist

This document outlines the process for releasing OpenClaw using npm and macOS, requiring `pnpm` (Node 22+) from the repo root with a clean working tree before tagging and publishing.

## Operator Trigger

Upon receiving a "release" command, complete the preflight checklist immediately:

- Review this document and `docs/platforms/mac/release.md`
- Load environment variables from `~/.profile` and verify `SPARKLE_PRIVATE_KEY_FILE` and App Store Connect variables are configured
- Access Sparkle keys from `~/Library/CloudStorage/Dropbox/Backup/Sparkle` if necessary

## Versioning Strategy

OpenClaw uses calendar-based versioning with these patterns:

**Stable releases:** `YYYY.M.D` format (e.g., `v2026.3.8`)
**Beta releases:** `YYYY.M.D-beta.N` format (e.g., `v2026.3.8-beta.1`)
**Key rules:** No zero-padding for months or days; use `latest` and `beta` as npm dist-tags; development follows the `main` branch without formal tagging

## Release Checklist Steps

### 1. Version & Metadata
- Update `package.json` version number
- Run `pnpm plugins:sync` to align extension versions and changelogs
- Modify CLI/version strings in `src/version.ts` and Baileys user agent in `src/web/session.ts`
- Verify package metadata and `bin` configuration
- Execute `pnpm install` if dependencies changed

### 2. Build & Artifacts
- Run `pnpm canvas:a2ui:bundle` if A2UI inputs were modified
- Execute `pnpm run build` to regenerate `dist/`
- Verify npm package `files` configuration includes required directories
- Confirm `dist/build-info.json` exists with expected commit hash
- Optionally pack with `npm pack --pack-destination /tmp` for inspection

### 3. Changelog & Documentation
- Update `CHANGELOG.md` with user-facing highlights in descending version order
- Ensure README examples and flags match current CLI behavior

### 4. Validation
- Run `pnpm build` and `pnpm check`
- Execute `pnpm test` or `pnpm test:coverage`
- Run `pnpm release:check` to verify npm pack contents
- Execute `OPENCLAW_INSTALL_SMOKE_SKIP_NONROOT=1 pnpm test:install:smoke`
- Optionally run full installer smoke tests and E2E tests for different providers

### 5. macOS App (Sparkle)
- Build and sign the macOS application, then create a distribution zip
- Generate Sparkle appcast using `scripts/make_appcast.sh` and update `appcast.xml`
- Follow `platforms/mac/release` documentation for exact commands and environment variables
- Note: `APP_BUILD` must be numeric and monotonic without `-beta` suffix

### 6. Publish (npm)
- Confirm clean git status; commit and push as needed
- Verify npm trusted publishing is configured
- Push matching git tag to trigger `.github/workflows/openclaw-npm-release.yml`
- Verify registry with `npm view openclaw version` and `npm view openclaw dist-tags`
- Test installation with `npx -y openclaw@X.Y.Z --version`

### 7. GitHub Release & Appcast
- Tag and push: `git tag vX.Y.Z && git push origin vX.Y.Z`
- Create GitHub release with title `openclaw X.Y.Z` including full changelog
- Attach build artifacts (tarball, zip files, dSYM zip)
- Commit and push updated `appcast.xml`
- Verify from clean directory: `npx -y openclaw@X.Y.Z send --help`
- Announce release notes

## Plugin Publishing

Only publish existing npm plugins under `@openclaw/*` scope. Bundled plugins not on npm remain disk-only. The current npm plugin list includes twelve packages like `@openclaw/bluebubbles`, `@openclaw/discord`, and `@openclaw/matrix`. Release notes should highlight new optional bundled plugins not enabled by default.

## Troubleshooting

Common issues include npm pack hanging due to macOS app bundles in `dist/`--fix by whitelisting `package.json` `files` entries. For npm authentication loops, use legacy auth. For cache issues during verification, use a fresh cache directory. Force-update tags if late fixes are needed, ensuring GitHub release assets remain synchronized.