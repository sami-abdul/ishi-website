# Command Queue Documentation

## Overview

The Command Queue system manages inbound auto-reply runs across channels through serialization to prevent collisions while enabling safe parallelism. According to the documentation, it "serialize[s] inbound auto-reply runs (all channels) through a tiny in-process queue to prevent multiple agent runs from colliding."

## Key Mechanics

**Lane-based Processing**: The system uses a FIFO queue with lane-aware concurrency. Session-specific runs are queued by session key to ensure "only one active run per session," while overall parallelism is capped through a global lane (default: `main`).

**User Experience**: Even during queue wait times, "typing indicators still fire immediately on enqueue (when supported by the channel) so user experience is unchanged while we wait our turn."

## Queue Modes

The system supports five primary modes for handling inbound messages:

- **steer**: Inject immediately into current run; falls back to followup if not streaming
- **followup**: Enqueue for the next agent turn
- **collect**: Coalesce queued messages into a single followup turn (default)
- **steer-backlog**: Execute steer while preserving the message for a followup
- **interrupt**: Legacy mode that aborts active runs

## Configuration

Key options include debounce timing, message caps per session, and overflow policies. The default configuration specifies "debounceMs: 1000, cap: 20, drop: summarize" for queue management.

## Implementation Details

The system requires no external dependencies and uses "pure TypeScript + promises," operating entirely in-process without background worker threads.
