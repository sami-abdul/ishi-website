# Trusted Proxy Authentication

## Overview
The documentation explains how to configure OpenClaw Gateway to delegate authentication to a reverse proxy. This approach is suitable when running behind identity-aware proxies like Pomerium, Caddy with OAuth, nginx with oauth2-proxy, or Traefik.

## Key Use Cases
Implement trusted proxy authentication when:
- Operating OpenClaw behind an "identity-aware proxy" that handles user authentication
- The proxy transmits user identity through HTTP headers
- Running in containerized environments where the proxy is the sole access point
- Addressing WebSocket authorization issues related to token transmission

## Implementation Mechanism
The authentication flow involves four steps: proxy authenticates users, adds an identity header to requests, OpenClaw verifies the request originates from a configured trusted proxy IP, and the system extracts user identity from the specified header.

## Core Configuration Requirements
```json5
{
  gateway: {
    bind: "loopback",
    trustedProxies: ["10.0.0.1"],
    auth: {
      mode: "trusted-proxy",
      trustedProxy: {
        userHeader: "x-forwarded-user",
        allowUsers: ["user@example.com"]
      }
    }
  }
}
```

Essential configuration fields include `gateway.trustedProxies` (required IP addresses), `gateway.auth.mode` ("trusted-proxy"), and `gateway.auth.trustedProxy.userHeader` (identity header name).

## Security Considerations
Before deployment, verify the gateway is "firewalled from everything except your proxy," restrict `trustedProxies` to actual IPs, ensure the proxy overwrites headers rather than appending them, and consider enabling the `allowUsers` allowlist. The security audit deliberately flags this feature as critical severity.

## Proxy Integration Examples
Documentation includes configuration samples for Pomerium (using `x-pomerium-claim-email`), Caddy with OAuth, nginx with oauth2-proxy (using `x-auth-request-email`), and Traefik with Forward Auth.
