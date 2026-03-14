# Polls Documentation

The documentation describes a polling feature available across multiple messaging platforms.

## Supported Platforms
The feature works with Telegram, WhatsApp, Discord, and MS Teams.

## Key Capabilities
According to the documentation, users can "create polls with customizable questions and options" across these channels using either command-line interface or API methods.

## Channel-Specific Details
Each platform has distinct constraints:
- **Telegram**: Supports 2-10 options with duration limits of 5-600 seconds
- **WhatsApp**: Allows up to 12 options with multi-select capability
- **Discord**: Offers 2-10 options with customizable duration (1-768 hours)
- **MS Teams**: Uses Adaptive Cards for poll rendering

## Implementation Methods
The feature is accessible through three approaches:
1. CLI commands using `openclaw message poll`
2. Gateway RPC method called `poll`
3. Agent tool with message action set to `"poll"`

The documentation notes that "MS Teams polls require the gateway to stay online to record votes" in a specific JSON file, distinguishing it from native poll implementations on other platforms.
