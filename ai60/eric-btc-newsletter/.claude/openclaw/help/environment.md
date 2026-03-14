# Environment Variables in OpenClaw

OpenClaw manages environment variables across multiple sources with a clear hierarchy that prevents overriding existing values.

## Variable Precedence

The system respects variables in this order (highest to lowest priority):

1. Process environment from parent shell/daemon
2. Local `.env` file in current working directory
3. Global `.env` at `~/.openclaw/.env`
4. Config `env` block in `~/.openclaw/openclaw.json`
5. Optional login-shell imports (if enabled)

## Configuration Methods

**Inline configuration** in the config file supports two equivalent formats:

```json5
{
  env: {
    OPENROUTER_API_KEY: "sk-or-...",
    vars: {
      GROQ_API_KEY: "gsk-...",
    },
  },
}
```

**Shell environment import** automatically loads missing variables from your login shell:

```json5
{
  env: {
    shellEnv: {
      enabled: true,
      timeoutMs: 15000,
    },
  },
}
```

## Runtime and UI Variables

OpenClaw injects context markers (`OPENCLAW_SHELL`) into child processes to enable context-specific shell logic. Theme settings include `OPENCLAW_THEME` (light/dark) and support for terminal background color detection via `COLORFGBG`.

## Path Configuration

Key path variables allow customization:

- `OPENCLAW_HOME`: Override home directory for all internal paths
- `OPENCLAW_STATE_DIR`: Override state directory (default `~/.openclaw`)
- `OPENCLAW_CONFIG_PATH`: Override config file location

## Variable Substitution

Use `${VAR_NAME}` syntax to reference environment variables within config values, or employ SecretRef objects for fields supporting secret references.
