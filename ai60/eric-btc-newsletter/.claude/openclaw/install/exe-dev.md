# OpenClaw on exe.dev

**Goal:** OpenClaw Gateway running on an exe.dev VM, reachable via `https://<vm-name>.exe.xyz`

Note: This guide assumes exe.dev's default **exeuntu** image.

## Beginner Quick Path

1. Visit https://exe.new/openclaw
2. Enter your authentication key/token
3. Click "Agent" next to your VM and wait
4. ???
5. Profit

## Requirements

* exe.dev account
* `ssh exe.dev` access to exe.dev virtual machines (optional)

## Automated Install with Shelley

Shelley can install OpenClaw using this prompt:

> "Set up OpenClaw (https://docs.openclaw.ai/install) on this VM. Use the non-interactive and accept-risk flags..."

## Manual Installation

### 1) Create the VM

```bash
ssh exe.dev new
ssh <vm-name>.exe.xyz
```

Keep the VM stateful—OpenClaw stores state in `~/.openclaw/` and `~/.openclaw/workspace/`.

### 2) Install Prerequisites

```bash
sudo apt-get update
sudo apt-get install -y git curl jq ca-certificates openssl
```

### 3) Install OpenClaw

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### 4) Setup nginx Proxy

Edit `/etc/nginx/sites-enabled/default`:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    listen 8000;
    listen [::]:8000;

    server_name _;

    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Standard proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeout settings for long-lived connections
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

### 5) Access OpenClaw

Visit `https://<vm-name>.exe.xyz/`. If authentication is required, retrieve your token with `openclaw config get gateway.auth.token` or generate one using `openclaw doctor --generate-gateway-token`. Approve devices with `openclaw devices list` and `openclaw devices approve <requestId>`.

## Remote Access

Remote access uses exe.dev's authentication. HTTP traffic from port 8000 forwards to `https://<vm-name>.exe.xyz` with email authentication.

## Updating

```bash
npm i -g openclaw@latest
openclaw doctor
openclaw gateway restart
openclaw health
```

**Guide:** [Updating](/install/updating)
