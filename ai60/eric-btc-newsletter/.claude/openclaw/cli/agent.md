# openclaw agent

## `openclaw agent`

This command executes an agent turn through the Gateway, with the `--local` flag enabling embedded operation. Use the `--agent <id>` parameter to direct commands to a specific configured agent.

**Related resources:**
* Agent send tool: [Agent send](/tools/agent-send)

## Examples

```bash
openclaw agent --to +15555550123 --message "status update" --deliver
openclaw agent --agent ops --message "Summarize logs"
openclaw agent --session-id 1234 --message "Summarize inbox" --thinking medium
openclaw agent --agent ops --message "Generate report" --deliver --reply-channel slack --reply-to "#reports"
```

## Notes

* When command execution triggers `models.json` regeneration, SecretRef-managed provider credentials are stored as non-secret markers (such as environment variable names like `secretref-env:ENV_VAR_NAME`, or `secretref-managed`), rather than resolved secret plaintext.

* Marker writes follow source-authority: OpenClaw preserves markers from the active source config snapshot, not from resolved runtime secret values.
