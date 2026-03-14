# Gmail Pub/Sub Integration Documentation

## Overview
This documentation describes integrating Gmail notifications with OpenClaw through Google Cloud Pub/Sub, enabling automated email processing and delivery to chat surfaces.

## Core Architecture
The system flow involves: Gmail watch -> Pub/Sub push -> `gog gmail watch serve` -> OpenClaw webhook. The setup requires Google Cloud tools, the `gog` CLI, OpenClaw webhooks, and Tailscale for secure tunneling.

## Key Requirements
Users need several prerequisites: `gcloud` CLI installed and authenticated, `gog` (gogcli) authorized for their Gmail account, OpenClaw hooks enabled, and Tailscale configured. The documentation notes that "Tailscale is what we support" for public endpoints, though other tunnels are possible but unsupported.

## Configuration
The example hook configuration demonstrates enabling the Gmail preset and mapping incoming emails to OpenClaw agents. Templates allow customization of how email data appears, with options to specify delivery channels and LLM models. Users can override default models and set safety boundaries around external content.

## Setup Methods
Two approaches exist: the recommended wizard (`openclaw webhooks gmail setup`) automates most configuration, or manual step-by-step setup for custom deployments. The wizard handles dependency installation on macOS and generates appropriate config files automatically.

## Key Features
- Automatic gateway start with watch renewal
- Configurable message templates for email formatting
- Model selection per-hook or as defaults
- Safety boundaries for external content handling
- Testing and debugging commands
