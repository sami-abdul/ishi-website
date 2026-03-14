# System Prompt Documentation Summary

## Overview
OpenClaw generates custom system prompts for each agent run, featuring fixed sections that guide model behavior and provide operational context.

## Core Sections

The system prompt includes these key components:

- **Tooling**: Available tools with brief descriptions
- **Safety**: Guardrails advising against power-seeking or oversight circumvention
- **Skills**: Instructions for loading skill files on demand
- **Self-Update**: Guidance on running configuration and update commands
- **Workspace**: Working directory information
- **Documentation**: Local docs paths and usage guidance
- **Sandbox Details**: Runtime environment and execution capabilities (when enabled)
- **Date & Time**: User timezone and formatting preferences
- **Runtime Info**: Host, OS, Node version, model, and thinking level

## Prompt Modes

OpenClaw supports three rendering modes:

1. **Full** (default): Complete sections for primary agents
2. **Minimal**: Streamlined version for sub-agents, omitting skills, self-update, and messaging sections
3. **None**: Only base identity information

## Bootstrap Injection

Files automatically injected into context include: AGENTS.md, SOUL.md, TOOLS.md, IDENTITY.md, USER.md, HEARTBEAT.md, BOOTSTRAP.md, and MEMORY.md. These consume tokens, so brevity is essential, especially memory files.

File size limits are configurable, with defaults at 20,000 characters per file and 150,000 total.

## Key Design Philosophy

Safety guardrails remain "advisory" only; hard enforcement relies on tool policies, sandboxing, and execution approvals.
