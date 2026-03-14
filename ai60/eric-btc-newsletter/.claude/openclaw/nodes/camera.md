# Camera Capture Documentation

OpenClaw provides camera functionality across multiple platforms through agent workflows:

## Platform Support

**iOS, Android, and macOS nodes** each support photo and video capture via Gateway invocation, with outputs in JPG and MP4 formats respectively.

## Key Features

**User Control**: Camera access is "gated behind user-controlled settings" with defaults varying by platform (iOS/Android default enabled; macOS defaults disabled).

**Photo Capture** (`camera.snap`): Supports facing selection, quality adjustment (0-1 scale), and optional delay. Responses include base64-encoded image data with dimensions, protected by a 5 MB payload limit through recompression.

**Video Capture** (`camera.clip`): Records clips up to 60 seconds with optional audio inclusion, returning MP4 format with duration and audio status metadata.

## Platform-Specific Requirements

**Android** requires runtime permissions (CAMERA and RECORD_AUDIO when applicable) with user prompts when needed. **iOS and Android** restrict camera commands to foreground operation only. **macOS** includes a companion app setting and offers screen recording as an alternative to camera capture.

## CLI Integration

The OpenClaw CLI provides convenient helpers that decode media to temporary files and return `MEDIA:<path>` output for streamlined agent workflows.
