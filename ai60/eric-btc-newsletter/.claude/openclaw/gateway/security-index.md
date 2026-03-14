# Security Guide for OpenClaw

## Core Security Model

OpenClaw operates on a **personal assistant security model** designed for one trusted operator boundary per gateway. The system explicitly does not provide hostile multi-tenant isolation for adversarial users sharing a single gateway.

> "OpenClaw is **not** a hostile multi-tenant security boundary for multiple adversarial users sharing one agent/gateway."

For mixed-trust environments, the documentation recommends maintaining separate gateways with distinct credentials and ideally separate OS users or hosts.

## Key Trust Boundaries

The security architecture distinguishes between several critical boundaries:

**Gateway Authentication** serves as the primary control plane, not per-message validation. Session keys function as routing selectors rather than authorization tokens. Operator access with read/control-plane permissions is a trusted role that can inspect gateway metadata by design.

**Deployment Assumptions**: The host and configuration boundary are inherently trusted. If someone can modify Gateway host state or the `~/.openclaw` directory, treat them as a trusted operator. Running a single Gateway for multiple mutually untrusted operators "is **not a recommended setup**."

## Rapid Security Hardening

The baseline configuration for quick deployment includes:

```json5
{
  gateway: {
    mode: "local",
    bind: "loopback",
    auth: { mode: "token", token: "replace-with-long-random-token" },
  },
  session: {
    dmScope: "per-channel-peer",
  },
  tools: {
    profile: "messaging",
    deny: ["group:automation", "group:runtime", "group:fs"],
    fs: { workspaceOnly: true },
    exec: { security: "deny", ask: "always" },
  },
}
```

This configuration maintains local-only access, isolates direct messages, and disables control-plane tools by default.

## Critical Audit Points

Running `openclaw security audit` checks for common vulnerabilities including:

- **Inbound access policies** (DM/group allowlists preventing unauthorized triggering)
- **Tool blast radius** (elevated tools combined with open rooms)
- **Network exposure** (binding scope and authentication strength)
- **Browser control exposure** (remote node and relay port security)
- **Filesystem permissions** (preventing group/world-readable state)
- **Plugin management** (ensuring explicit allowlists for extensions)

The audit tool can auto-fix permission issues with the `--fix` flag.

## Direct Message Security

Direct message channels support four policy modes:

- **Pairing** (default): Unknown senders receive time-limited pairing codes
- **Allowlist**: Unknown senders are blocked entirely
- **Open**: Publicly accessible (requires explicit `"*"` in channel allowlist)
- **Disabled**: Inbound DMs ignored

For multi-user scenarios, setting `session.dmScope: "per-channel-peer"` isolates conversations by sender while maintaining continuity within each relationship.

## Credential and Secret Management

Sensitive data locations requiring protection include:

- WhatsApp credentials: `~/.openclaw/credentials/whatsapp/<accountId>/creds.json`
- Channel tokens: Configuration files or environment variables
- Pairing allowlists: `~/.openclaw/credentials/<channel>-allowFrom.json`
- Model auth profiles: `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`
- Session transcripts: `~/.openclaw/agents/<agentId>/sessions/*.jsonl`

These files should maintain `600` permissions (user read/write only), with parent directories set to `700`.

## Prompt Injection Risks

> "Prompt injection is when an attacker crafts a message that manipulates the model into doing something unsafe"

While system prompts provide soft guidance, the documentation emphasizes that hard enforcement comes from tool policy, execution approvals, sandboxing, and channel allowlists. Smaller or legacy models are significantly more susceptible to injection attacks.

Mitigation strategies include:

- Keeping inbound DMs restricted through pairing/allowlists
- Preferring mention-based activation in group settings
- Treating links and pasted instructions as potentially hostile
- Running sensitive operations in sandboxed environments
- Selecting instruction-hardened, latest-generation models for tool-enabled agents

## Network and Exposure Controls

The Gateway binds to a single port (default 18789) serving WebSocket and HTTP traffic, including the Control UI and canvas hosting. Binding modes control listener scope:

- **Loopback** (default): Local clients only
- **LAN/Tailnet/Custom**: Expanded attack surface requiring shared authentication

The documentation strongly recommends Tailscale Serve over direct LAN binds, as Serve maintains loopback binding while Tailscale manages access control.

## Sandboxing Strategy

Two complementary approaches isolate tool execution:

- **Full container isolation**: Running the entire Gateway in Docker
- **Tool-level sandboxing**: Docker-isolated tool execution on a host Gateway

The `agents.defaults.sandbox.scope` setting controls isolation granularity at agent or session levels.

## Browser Control Considerations

Enabling browser automation grants the model ability to drive a real browser with access to existing logged-in sessions. The documentation advises:

- Using dedicated profiles separate from personal daily-driver browsers
- Disabling browser sync and password managers in agent profiles where possible
- Treating remote gateway browser control as equivalent to operator access
- Keeping Gateway and node hosts on private networks (Tailscale)
- Setting `browser.ssrfPolicy.dangerouslyAllowPrivateNetwork: false` for strict internal-destination blocking

## Access Control Precedence

For shared workspaces and multi-agent deployments, access control hierarchy matters:

1. **DM/Group policies** (who can trigger the bot)
2. **Tool allowlists/denylists** (what capabilities are available)
3. **Sandboxing** (where execution occurs)
4. **Model selection** (instruction robustness)

## Incident Response Workflow

If a security event occurs, the documentation recommends:

1. **Contain**: Stop the Gateway and set `gateway.bind: "loopback"`
2. **Rotate**: Update `gateway.auth.token`, client credentials, and provider API keys
3. **Audit**: Review logs, transcripts, and configuration changes
4. **Collect**: Document timestamp, version, and incident details

## Security Audit Severity Reference

The audit tool assigns priorities to findings:

- **Critical**: Filesystem world-writable state, authentication bypass, public network exposure
- **Warn**: Information disclosure, insecure compatibility toggles, policy drift
- **Info**: Model version notices or minor configuration concerns

Each finding includes a specific configuration key to address and notes whether auto-fixing is available.
