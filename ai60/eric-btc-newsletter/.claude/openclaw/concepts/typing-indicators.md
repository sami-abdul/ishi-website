# Typing Indicators

Typing indicators are visual cues displayed in chat while a run is active. The OpenClaw system provides configurable control over when these indicators appear and how frequently they refresh.

## Defaults

When `agents.defaults.typingMode` remains unset, the system follows legacy behavior:

* **Direct chats**: typing begins immediately when the model loop starts
* **Group chats with mention**: typing begins immediately
* **Group chats without mention**: typing begins only when message text streams
* **Heartbeat runs**: typing is disabled

## Available Modes

Configure `agents.defaults.typingMode` to one of these options:

* `never` - typing indicator never appears
* `instant` - typing begins "as soon as the model loop begins, even if the run later returns only the silent reply token"
* `thinking` - typing starts on first reasoning delta (requires `reasoningLevel: "stream"`)
* `message` - typing starts on first non-silent text delta

The modes fire progressively: `never` -> `message` -> `thinking` -> `instant`

## Configuration

Set typing behavior at the agent level:

```json5
{
  agent: {
    typingMode: "thinking",
    typingIntervalSeconds: 6,
  },
}
```

Override per session:

```json5
{
  session: {
    typingMode: "message",
    typingIntervalSeconds: 4,
  },
}
```

## Important Notes

* `message` mode skips typing for silent-only replies
* `thinking` requires streaming reasoning to function
* Heartbeats never display typing indicators
* `typingIntervalSeconds` controls refresh frequency, not start timing (default: 6 seconds)
