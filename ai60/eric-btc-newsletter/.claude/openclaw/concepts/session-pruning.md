# Session Pruning

Session pruning removes outdated tool results from the in-memory context before LLM calls, without modifying the on-disk session history.

## Key Activation Triggers

Pruning activates when `mode: "cache-ttl"` is enabled and the last Anthropic API call exceeds the specified `ttl` threshold. It exclusively affects Anthropic API calls and OpenRouter Anthropic models, influencing only the messages sent to the model for that particular request.

## Smart Defaults by Profile Type

For OAuth or setup-token profiles, the system enables cache-TTL pruning with a 1-hour heartbeat. API key profiles get cache-TTL pruning with a 30-minute heartbeat and `cacheRetention: "short"` as the default. OpenClaw preserves any explicitly configured values rather than overriding them.

## Cost and Cache Benefits

Pruning reduces `cacheWrite` expenses on the first request after TTL expiration by trimming oversized tool results. "After a prune, the TTL window resets so subsequent requests keep cache until `ttl` expires again," allowing follow-up requests to reuse freshly cached content without re-caching the entire history.

## Prunable Content

Only `toolResult` messages can be pruned. User and assistant messages remain untouched. The system protects the final `keepLastAssistants` assistant messages, skipping any tool results beyond that cutoff. Tool results containing image blocks are never trimmed.

## Configuration Example

```json5
{
  agents: {
    defaults: {
      contextPruning: {
        mode: "cache-ttl",
        ttl: "5m"
      }
    }
  }
}
```
