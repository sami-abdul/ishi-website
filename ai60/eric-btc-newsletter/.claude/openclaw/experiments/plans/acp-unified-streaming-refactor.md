# Unified Runtime Streaming Refactor Plan

## Overview

This documentation describes a comprehensive refactor initiative aimed at consolidating streaming pipelines across multiple runtime environments. The plan addresses fragmentation in how different runtimes (`main`, `subagent`, and `acp`) handle event streaming, coalescing, and delivery.

## Core Problem

The current architecture distributes streaming logic across multiple runtime-specific implementations. As the documentation notes, "Formatting/coalescing bugs can be fixed in one path but remain in others," creating maintenance challenges and inconsistent behavior across runtimes.

## Proposed Solution

The refactor introduces a unified pipeline with five key components:

1. **Runtime adapters** that emit standardized events
2. **Shared stream assembler** for text/tool/status event coalescing
3. **Shared channel projector** for chunking and formatting
4. **Shared delivery ledger** for idempotent send semantics
5. **Outbound adapter** for checkpoint recording

## Canonical Events

The standardized event schema includes: `turn_started`, `text_delta`, `block_final`, `tool_started`, `tool_finished`, `status`, `turn_completed`, `turn_failed`, and `turn_cancelled`.

## Implementation Strategy

The rollout follows a three-phase approach: shadow mode testing, runtime-by-runtime migration, and legacy code removal. Key acceptance criteria include passing shared contract tests, consistent Discord chunking behavior, and duplicate-free crash recovery.