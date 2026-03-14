# macOS Signing

## Debug Build Signing Process

The build process, managed through `scripts/package-mac-app.sh`, accomplishes several key functions:

- Establishes a consistent debug bundle identifier (`ai.openclaw.mac.debug`)
- Configures the Info.plist with the specified bundle ID
- Invokes `scripts/codesign-mac-app.sh` to sign binaries and maintain TCC permissions across rebuilds
- Enables trusted timestamps for Developer ID signatures by default
- Inserts build metadata (timestamp and git commit hash) into Info.plist
- Requires Node 22 or higher for TypeScript and Control UI compilation

## Configuration Options

The `SIGN_IDENTITY` environment variable controls which certificate signs the application. Developers can configure their shell profile to always use a preferred certificate, or specify it per-build.

**Three signing approaches are available:**

1. Automatic identity selection (default)
2. Real Developer ID Application certificate
3. Ad-hoc signing (requires explicit enablement via `ALLOW_ADHOC_SIGNING=1` or `SIGN_IDENTITY="-"`)

## Ad-hoc Signing Considerations

Ad-hoc signing automatically disables the Hardened Runtime to prevent crashes when loading embedded frameworks like Sparkle. However, this approach compromises TCC permission persistence between rebuilds.

## Build Metadata

The packaging script embeds two metadata values: `OpenClawBuildTimestamp` (UTC timestamp) and `OpenClawGitCommit` (short hash), which the About tab displays to show build information and development status.