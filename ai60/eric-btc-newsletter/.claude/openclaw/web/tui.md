# TUI (Terminal UI)

## Quick Start

Launch the Gateway:
```bash
openclaw gateway
```

Open the TUI:
```bash
openclaw tui
```

Type a message and press Enter.

**For remote gateways:**
```bash
openclaw tui --url ws://<host>:<port> --token <gateway-token>
```

Use `--password` if your Gateway uses password auth.

## Interface Overview

The TUI displays:
- **Header:** connection URL, current agent, current session
- **Chat log:** user messages, assistant replies, system notices, tool cards
- **Status line:** connection/run state (connecting, running, streaming, idle, error)
- **Footer:** connection state, agent, session, model, think/verbose/reasoning settings, token counts, delivery status
- **Input:** text editor with autocomplete

## Mental Model: Agents + Sessions

Agents are unique slugs (e.g., `main`, `research`). Sessions belong to the current agent.

Session keys follow the format: `agent:<agentId>:<sessionKey>`
- `/session main` expands to `agent:<currentAgent>:main`
- `/session agent:other:main` switches to that specific agent session

**Session scope options:**
- `per-sender` (default): each agent has multiple sessions
- `global`: the TUI always uses the `global` session

The current agent and session display in the footer.

## Sending + Delivery

Messages are sent to the Gateway; delivery to providers is off by default.

Enable delivery:
- `/deliver on`
- Settings panel
- `openclaw tui --deliver`

## Pickers + Overlays

Available overlays:
- **Model picker:** list available models and set session override
- **Agent picker:** choose a different agent
- **Session picker:** shows only sessions for the current agent
- **Settings:** toggle deliver, tool output expansion, and thinking visibility

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Send message |
| Esc | Abort active run |
| Ctrl+C | Clear input (press twice to exit) |
| Ctrl+D | Exit |
| Ctrl+L | Model picker |
| Ctrl+G | Agent picker |
| Ctrl+P | Session picker |
| Ctrl+O | Toggle tool output expansion |
| Ctrl+T | Toggle thinking visibility (reloads history) |

## Slash Commands

**Core commands:**
- `/help`
- `/status`
- `/agent <id>` or `/agents`
- `/session <key>` or `/sessions`
- `/model <provider/model>` or `/models`

**Session controls:**
- `/think <off|minimal|low|medium|high>`
- `/verbose <on|full|off>`
- `/reasoning <on|off|stream>`
- `/usage <off|tokens|full>`
- `/elevated <on|off|ask|full>` (alias: `/elev`)
- `/activation <mention|always>`
- `/deliver <on|off>`

**Session lifecycle:**
- `/new` or `/reset` (reset the session)
- `/abort` (abort the active run)
- `/settings`
- `/exit`

Other Gateway slash commands (e.g., `/context`) are forwarded to the Gateway and displayed as system output.

## Local Shell Commands

Prefix a line with `!` to run a local shell command on the TUI host.

- The TUI prompts once per session to allow local execution
- Commands run in a fresh, non-interactive shell in the TUI working directory
- Local shell commands receive `OPENCLAW_SHELL=tui-local` in their environment
- A lone `!` is sent as a normal message; leading spaces do not trigger local execution

## Tool Output

Tool calls display as cards with arguments and results. Press Ctrl+O to toggle between collapsed and expanded views. Partial updates stream into the same card while tools run.

## Terminal Colors

The TUI maintains assistant body text in your terminal's default foreground for readability on both dark and light backgrounds.

**Auto-detection override:**
- `OPENCLAW_THEME=light` for light backgrounds
- `OPENCLAW_THEME=dark` to force the original dark palette

## History + Streaming

On connect, the TUI loads the latest history (default 200 messages). Streaming responses update in place until finalized. The TUI listens to agent tool events for richer tool cards.

## Connection Details

The TUI registers with the Gateway as `mode: "tui"`. Reconnects display a system message; event gaps surface in the log.

## Options

- `--url <url>`: Gateway WebSocket URL (defaults to config or `ws://127.0.0.1:<port>`)
- `--token <token>`: Gateway token (if required)
- `--password <password>`: Gateway password (if required)
- `--session <key>`: Session key (default: `main`, or `global` when scope is global)
- `--deliver`: Deliver assistant replies to the provider (default off)
- `--thinking <level>`: Override thinking level for sends
- `--timeout-ms <ms>`: Agent timeout in ms (defaults to `agents.defaults.timeoutSeconds`)
- `--history-limit <n>`: History entries to load (default 200)

**Note:** When setting `--url`, the TUI does not fall back to config or environment credentials. Pass `--token` or `--password` explicitly.

## Troubleshooting

**No output after sending a message:**
- Run `/status` in the TUI to confirm the Gateway is connected
- Check Gateway logs: `openclaw logs --follow`
- Confirm the agent can run: `openclaw status` and `openclaw models status`
- Enable delivery if expecting messages in a chat channel: `/deliver on` or `--deliver`

**Connection issues:**
- `disconnected`: ensure the Gateway is running and `--url/--token/--password` are correct
- No agents in picker: check `openclaw agents list` and routing config
- Empty session picker: you might be in global scope or have no sessions yet
