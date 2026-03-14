# Device Model Database

## Overview

The macOS companion app provides user-friendly Apple device names in its Instances UI by converting Apple model identifiers (like `iPad16,6` or `Mac16,6`) into readable formats.

## Storage Location

The mapping files are stored as JSON in: `apps/macos/Sources/OpenClaw/Resources/DeviceModels/`

## Source

The data originates from an MIT-licensed external repository: `kyle-seongwoo-jun/apple-device-identifiers`. To maintain reproducible builds, JSON files are locked to specific upstream commits documented in `NOTICE.md`.

## Update Process

To refresh the database:

1. Select target upstream commits for both iOS and macOS files
2. Modify commit hashes in the `NOTICE.md` file
3. Download updated JSON files using curl commands pinned to those commits:

```bash
IOS_COMMIT="<commit sha for ios-device-identifiers.json>"
MAC_COMMIT="<commit sha for mac-device-identifiers.json>"

curl -fsSL "https://raw.githubusercontent.com/kyle-seongwoo-jun/apple-device-identifiers/${IOS_COMMIT}/ios-device-identifiers.json" \
  -o apps/macos/Sources/OpenClaw/Resources/DeviceModels/ios-device-identifiers.json

curl -fsSL "https://raw.githubusercontent.com/kyle-seongwoo-jun/apple-device-identifiers/${MAC_COMMIT}/mac-device-identifiers.json" \
  -o apps/macos/Sources/OpenClaw/Resources/DeviceModels/mac-device-identifiers.json
```

4. Verify the upstream license file remains current
5. Build the macOS app to confirm successful integration:

```bash
swift build --package-path apps/macos
```