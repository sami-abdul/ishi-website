## Performance & Model Selection

- Use subagents (Task tool) to prevent context window pollution. Each gets fresh context.
- Main conversation holds only summaries from subagent work.
- Prefer Haiku for lightweight searches and simple code generation.
- Prefer Sonnet for standard development tasks.
- Reserve Opus for architecture decisions, complex debugging, and critical code review.
- Read only what you need. Do not read entire large files when a targeted search suffices.
- Glob and Grep before Read. Narrow down to specific files before reading them.
- When context is getting long, summarize completed work and focus on remaining tasks.
