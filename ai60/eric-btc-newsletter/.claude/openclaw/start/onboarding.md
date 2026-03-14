# Onboarding (macOS App)

## Overview

This document outlines the initial setup experience for OpenClaw on macOS, designed to provide a "day 0" experience by configuring the Gateway location, authenticating, and allowing the agent to self-bootstrap.

## Setup Steps

**System Approvals**
The process begins with macOS security dialogs -- first approving the application warning, then granting permission to discover local networks.

**Security Orientation**
Users encounter a security notice explaining that "OpenClaw is a personal agent: one trusted operator boundary." The setup defaults new local configurations to a `coding` tools profile rather than an unrestricted `full` profile, balancing capability with safety.

**Gateway Location**
Users choose where the Gateway operates:
- **Local**: Onboarding can configure authentication and store credentials locally
- **Remote (SSH/Tailnet)**: Credentials must already exist on the gateway host
- **Configure Later**: Skip setup entirely

A key point: "The wizard now generates a token even for loopback, so local WS clients must authenticate."

**Permission Requests**
The setup requests TCC (Transparency, Consent, and Control) permissions for:
- Automation (AppleScript)
- Notifications
- Accessibility
- Screen Recording
- Microphone
- Speech Recognition
- Camera
- Location

**Optional CLI Installation**
Users can install a global `openclaw` command-line tool via npm/pnpm for terminal workflows.

**Onboarding Chat Session**
Finally, a dedicated chat session launches where the agent introduces itself and guides next steps, keeping initial guidance separate from regular conversations.
