# macOS VMs

## Overview

This guide explains how to run OpenClaw on sandboxed macOS virtual machines, offering isolation and macOS-specific capabilities like iMessage support.

## Deployment Options

The documentation recommends three approaches:

1. **Small Linux VPS** — affordable always-on Gateway with minimal overhead
2. **Dedicated hardware** — Mac mini or Linux box for residential IP and browser automation (avoids datacenter IP blocking)
3. **Hybrid setup** — Gateway on VPS with Mac connected as a node for UI automation when needed

macOS VMs are specifically recommended when you require macOS-only features or want strict separation from your primary machine.

## Key Methods

**Local virtualization via Lume** on Apple Silicon Macs provides:
- Isolated macOS environment without affecting host system
- iMessage capabilities through BlueBubbles integration
- Quick VM cloning for instant reset
- Zero hardware or cloud expenses

**Cloud-hosted options** include MacStadium and other vendors supporting SSH access.

## Installation Summary

The setup process involves:
1. Installing Lume package manager
2. Creating a macOS VM instance
3. Completing system setup and enabling SSH
4. Installing OpenClaw via npm
5. Configuring messaging channels (WhatsApp, Telegram, etc.)
6. Running the VM headlessly

## Notable Features

**BlueBubbles integration** enables iMessage functionality by connecting the VM's Apple ID through a local Web API, allowing agents to send and receive iMessages natively.

The documentation suggests creating a "golden image" snapshot before customization, enabling quick resets by cloning the baseline VM.
