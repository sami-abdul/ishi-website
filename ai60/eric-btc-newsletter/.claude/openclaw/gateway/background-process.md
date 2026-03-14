# Background Exec and Process Tool

## Overview

OpenClaw provides shell command execution through two complementary tools: `exec` for running commands and `process` for managing background sessions.

## exec Tool

**Key Parameters:**
- `command` (required): The shell command to execute
- `yieldMs` (default 10000): Delay before automatic backgrounding
- `background` (bool): Immediately background the command
- `timeout` (seconds, default 1800): Process termination limit
- `elevated` (bool): Run on host if elevated mode is enabled
- `pty` (bool): Request a real TTY
- `workdir`, `env`: Working directory and environment variables

**Behavior:**
Foreground executions return output directly. When backgrounded, the tool provides a `sessionId` and status indicator. Output remains in memory until the session is polled or cleared. If the `process` tool is disabled, commands run synchronously.

**Environment Variables:**
- `PI_BASH_YIELD_MS`: Default yield duration
- `PI_BASH_MAX_OUTPUT_CHARS`: In-memory output limit
- `OPENCLAW_BASH_PENDING_MAX_OUTPUT_CHARS`: Per-stream output cap
- `PI_BASH_JOB_TTL_MS`: TTL for finished sessions (1m–3h range)

**Configuration Options:**
- `tools.exec.backgroundMs` (default 10000)
- `tools.exec.timeoutSec` (default 1800)
- `tools.exec.cleanupMs` (default 1800000)
- `tools.exec.notifyOnExit`: Enqueue system events on backgrounded process exit
- `tools.exec.notifyOnExitEmptySuccess`: Trigger events for successful runs without output

## process Tool

**Available Actions:**
- `list`: Display running and finished sessions
- `poll`: Retrieve new output and exit status
- `log`: Read aggregated output with optional pagination
- `write`: Send stdin data
- `kill`: Terminate a background session
- `clear`: Remove finished sessions from memory
- `remove`: Kill or clear sessions

**Important Notes:**
Only backgrounded sessions persist in memory. Sessions are lost on process restart. Logs enter chat history only when polled. The tool is scoped per agent and cannot access sessions from other agents. Default output returns the last 200 lines unless pagination parameters are specified.

## Usage Examples

**Long-running task with polling:**
```json
{ "tool": "exec", "command": "sleep 5 && echo done", "yieldMs": 1000 }
{ "tool": "process", "action": "poll", "sessionId": "<id>" }
```

**Immediate background execution:**
```json
{ "tool": "exec", "command": "npm run build", "background": true }
```

**Send input to a session:**
```json
{ "tool": "process", "action": "write", "sessionId": "<id>", "data": "y\n" }
```
