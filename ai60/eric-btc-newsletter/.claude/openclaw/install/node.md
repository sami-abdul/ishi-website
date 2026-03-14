# Node.js Setup Guide

This documentation page provides comprehensive instructions for installing and configuring Node.js for OpenClaw, which requires **Node 22 or newer**.

## Key Points

**Version Check:**
Users can verify their Node installation with `node -v`, which should display v22.x.x or higher.

**Installation Methods:**
The page offers platform-specific installation approaches:
- macOS users can leverage Homebrew or download from nodejs.org
- Linux users have distribution-specific options (Ubuntu/Debian via curl and apt-get, Fedora/RHEL via dnf)
- Windows users can install via winget, Chocolatey, or the nodejs.org installer

**Version Managers:**
The documentation recommends tools like fnm, nvm, mise, and asdf for managing multiple Node versions, emphasizing the importance of proper shell initialization to ensure PATH configuration includes Node's binary directory.

**Troubleshooting:**
Two common issues receive detailed solutions:
1. The "openclaw: command not found" error typically stems from npm's global bin directory being missing from the system PATH
2. Permission errors on Linux can be resolved by configuring npm's global prefix to a user-writable directory

The page provides step-by-step diagnostic and remediation procedures for both macOS/Linux and Windows systems.
