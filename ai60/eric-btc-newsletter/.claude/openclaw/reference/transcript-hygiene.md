# Transcript Hygiene

The documentation describes **provider-specific fixes** applied to transcripts before model context is built. These are **in-memory** adjustments used to satisfy strict provider requirements.

## Key Implementation Details

The sanitization process operates through two main components:

1. **Policy Selection & Application**: Centralized in the embedded runner, with logic in `src/agents/transcript-policy.ts` and `sanitizeSessionHistory` function
2. **Session File Repair**: A separate pass that may rewrite malformed JSONL files by removing invalid lines, with original files backed up

## Universal Rules Applied

**Image Handling**: All providers undergo image payload sanitization to prevent rejection due to size limits. The system downscales oversized base64 images, with a configurable default maximum dimension of 1200 pixels.

**Malformed Tool Calls**: Assistant tool-call blocks lacking both `input` and `arguments` fields are removed before context building to prevent provider rejections from partially persisted calls.

**Inter-session Input Tagging**: When prompts route between sessions, the system adds `message.provenance.kind = "inter_session"` metadata and prepends a `[Inter-session message]` marker in-memory.

## Provider-Specific Adjustments

Different providers receive targeted fixes:
- **OpenAI/Codex**: Image sanitization and orphaned reasoning signature cleanup only
- **Google/Gemini**: Tool ID sanitization, result pairing repair, turn validation, and bootstrap ordering
- **Anthropic/Minimax**: Tool result pairing repair and consecutive user turn merging
- **Mistral**: Strict 9-character alphanumeric tool ID format