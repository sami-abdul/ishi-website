# Lobster Documentation

## Overview

Lobster is a workflow runtime for OpenClaw that enables deterministic, multi-step tool sequences with built-in approval checkpoints. The system operates as a typed pipeline executor rather than a traditional programming language.

## Core Functionality

**Key Features:**
- Single tool call executes complete workflows instead of multiple sequential calls
- Approval gates halt execution at specified points for human review
- Resumable workflows via tokens—continue without re-running completed steps
- JSON-based pipeline specification for auditability and determinism

## Design Philosophy

The developers chose a DSL approach over standard programming because it provides:
- Native pause/resume with durable tokens
- Built-in determinism and replay capability
- Constrained surface area reducing unpredictable AI behavior
- Runtime-enforced safety (timeouts, output caps, allowlists)

## Execution Model

OpenClaw launches the local `lobster` CLI, which processes pipeline definitions and returns JSON envelopes. Workflows can reference prior step outputs using `$step.stdout` or `$step.json` syntax.

## Integration with LLM Tasks

Optional `llm-task` plugin enables structured AI steps within deterministic pipelines, allowing classification, summarization, and drafting while maintaining workflow predictability.

## Configuration

Enable via:
```json
{
  "tools": {
    "alsoAllow": ["lobster"]
  }
}
```

## Output

Returns status indicators:
- `ok` - completed successfully
- `needs_approval` - paused awaiting decision
- `cancelled` - denied or cancelled

## Safety Properties

- Subprocess execution limited to local environment
- No integrated secret management
- Disabled in sandboxed contexts
- Enforced timeouts and output size limits
