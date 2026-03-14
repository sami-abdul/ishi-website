# Location Command Documentation

## Overview

The location command enables nodes to request geographic data through the `location.get` command. The feature operates on an opt-in basis with multi-level permission controls.

## Key Configuration Options

The system uses a selector model rather than a binary toggle to accommodate OS-level permission architecture:

- **Enabled Mode**: `off | whileUsing`
- **Precise Location**: Separate boolean toggle

As stated in the documentation: *"Selecting `whileUsing` requests foreground permission."* The actual permission grant ultimately depends on the operating system's decision.

## Command Parameters

When invoking `location.get`, developers may specify:
- `timeoutMs`: Maximum wait duration
- `maxAgeMs`: Cache validity window
- `desiredAccuracy`: `coarse|balanced|precise`

## Response Structure

A successful response includes coordinates, accuracy metrics, altitude, speed, heading, timestamp, precision flag, and location source (GPS, WiFi, cellular, or unknown).

## Error Handling

The system returns stable error codes for common failure scenarios: disabled selector, missing permissions, background execution restrictions, timeout conditions, and system unavailability.

## Platform-Specific Behavior

Android enforces a significant constraint: *"Android app denies `location.get` while backgrounded."* Users must maintain the application in the foreground when requesting location data on Android devices.

## Integration Points

Location functionality integrates with the nodes tool, CLI commands, and agent frameworks for programmatic access.
