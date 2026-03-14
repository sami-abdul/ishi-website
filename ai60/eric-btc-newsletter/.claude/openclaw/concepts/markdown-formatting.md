# Markdown Formatting

OpenClaw converts Markdown into an intermediate representation (IR) before rendering across different chat channels, maintaining consistency while adapting to each platform's requirements.

## Core Architecture

The system follows a three-step pipeline:

1. **Parse Markdown to IR** - Creates plain text with style spans (bold, italic, strike, code, spoiler) and link metadata using UTF-16 offsets
2. **Chunk the IR** - Splits text before rendering to prevent formatting breaks across chunks
3. **Render per channel** - Converts IR to Slack mrkdwn, Telegram HTML, or Signal style ranges

## Channel-Specific Rendering

Each platform receives tailored output:
- **Slack:** Uses mrkdwn syntax with `<url|label>` links
- **Telegram:** Applies HTML tags (`<b>`, `<i>`, `<s>`, `<code>`, `<a href>`)
- **Signal:** Plain text with style ranges; links display as "label (url)"

## Table Handling

Tables adapt through the `markdown.tables` configuration:
- `code` - renders as code blocks (default)
- `bullets` - converts rows to bullet points
- `off` - disables parsing entirely

## Chunking Safeguards

Code fences remain intact as single blocks. Inline styles never split across chunks and reopen as needed. List and blockquote prefixes stay with their content to prevent mid-prefix breaks.

## Implementation Guidelines

When adding formatters: parse once using shared helpers, implement channel-specific renderers, chunk before rendering, update the adapter, and test thoroughly, paying special attention to UTF-16 offsets for Signal compatibility.
