# Chrome Extension Documentation

## Overview

The OpenClaw Chrome extension enables agent control of existing Chrome tabs through a browser relay system rather than launching a separate managed profile.

## Key Components

The system consists of three parts: a browser control service (Gateway or node), a local relay server running on `http://127.0.0.1:18792` by default, and an MV3 Chrome extension that uses the `chrome.debugger` API to pipe Chrome DevTools Protocol messages.

## Installation Process

Users install the extension via `openclaw browser extension install`, locate its directory with `openclaw browser extension path`, then load it as an unpacked extension at `chrome://extensions` after enabling Developer mode.

## Configuration

The built-in `chrome` profile targets the extension relay. Before first use, set the Port and Gateway token in the extension's Options page. These values must align with the Gateway's authentication configuration.

## Operation

Attachment happens through a toolbar button click, which displays "ON" when active. The extension controls only explicitly attached tabs—not whichever tab the user is viewing. A "!" badge indicates relay connectivity or authentication issues.

## Gateway Scenarios

When the Gateway and Chrome run on the same machine, the relay starts automatically. For remote Gateways, deploy a node host on the machine running Chrome so the Gateway can proxy browser actions.

## Security Considerations

"The model can click/type/navigate in that tab, read page content, access whatever the tab's logged-in session can access." This approach lacks isolation compared to dedicated profiles, so users should employ separate Chrome profiles and restrict relay access to private networks.
