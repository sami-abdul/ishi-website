# macOS Permissions Documentation Summary

The page covers how macOS Transparent Consent and Control (TCC) manages application permissions and the factors that affect their stability.

## Key Stability Requirements

For persistent permission grants, applications must maintain: "Same path: run the app from a fixed location (for OpenClaw, `dist/OpenClaw.app`)" along with consistent bundle identifiers, proper code signing with real certificates, and stable signatures across rebuilds.

## Why Permissions May Disappear

Ad-hoc signing creates a new identity with each build, causing macOS to treat the application as unfamiliar. This can result in lost permission grants and hidden prompts until stale entries are removed.

## Recovery Steps

When permission prompts vanish, the documentation recommends: quitting the application, removing its entry from System Settings privacy controls, relaunching from the same directory to re-authorize, and potentially using `tccutil` commands or restarting macOS entirely.

## File Access Considerations

The system may restrict Terminal and background processes from accessing Desktop, Documents, and Downloads folders. Users can either grant permissions within their execution context or move files to the OpenClaw workspace directory as an alternative.

**Testing Note:** Real certificates should always be used during permission testing, as ad-hoc builds won't properly persist permission states.