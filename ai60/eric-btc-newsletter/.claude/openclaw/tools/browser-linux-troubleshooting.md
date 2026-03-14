# Browser Troubleshooting Guide Summary

This documentation addresses Chrome/Chromium launch failures on Linux systems, particularly Ubuntu.

## Main Issue

OpenClaw's browser server fails with: "Failed to start Chrome CDP on port 18800" on Linux distributions where Chromium is installed as a snap package, due to AppArmor sandbox restrictions.

## Recommended Solutions

**Solution 1** involves installing Google Chrome's official `.deb` package and configuring OpenClaw to use `/usr/bin/google-chrome-stable` with headless mode enabled.

**Solution 2** provides an alternative for snap users: running Chromium manually in attach-only mode, with optional systemd automation for auto-starting the browser service.

## Key Configuration Options

The documentation outlines essential settings including:
- Browser enable/disable toggle
- Executable path specification
- Headless mode and sandbox settings
- Chrome DevTools Protocol port assignment
- Attach-only mode for pre-launched browsers

## Verification Methods

Users can verify functionality via HTTP requests to check browser status and test browsing capabilities.

## Secondary Issue Addressed

The guide also covers scenarios where "the chrome profile extension relay is running, but no tab is connected," recommending users switch to the managed browser profile or properly attach the extension.
