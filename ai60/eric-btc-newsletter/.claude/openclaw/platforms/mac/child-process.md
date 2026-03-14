# Gateway Lifecycle on macOS

The OpenClaw macOS application manages the Gateway through launchd rather than spawning it as a child process. The app attempts to connect to an existing Gateway on the configured port; if unavailable, it activates the launchd service using the external `openclaw` CLI.

## Default Launchd Behavior

The application installs a per-user LaunchAgent with the label `ai.openclaw.gateway` (or `ai.openclaw.<profile>` for named profiles). When Local mode is active, the app verifies the LaunchAgent is loaded and starts the Gateway if needed. Logs appear in the launchd gateway log path, accessible through Debug Settings.

Common management commands:

```bash
launchctl kickstart -k gui/$UID/ai.openclaw.gateway
launchctl bootout gui/$UID/ai.openclaw.gateway
```

Substitute `ai.openclaw.<profile>` when using named profiles.

## Unsigned Development Builds

The script `scripts/restart-mac.sh --no-sign` enables rapid local development without signing keys. To prevent launchd from referencing unsigned binaries, it creates `~/.openclaw/disable-launchagent`. Signed builds automatically clear this marker; manual removal requires:

```bash
rm ~/.openclaw/disable-launchagent
```

## Attach-Only Mode

Launch with `--attach-only` or `--no-launchd` to prevent launchd management entirely. The app will only connect to an already-running Gateway. Toggle this behavior in Debug Settings.

## Remote Mode

Remote connections skip local Gateway startup, instead using SSH tunneling to connect to a remote host.

## Launchd Advantages

The preference for launchd stems from automatic login startup, built-in restart mechanisms, and predictable logging.