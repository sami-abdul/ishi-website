# PTY and Process Supervision Plan

## Overview

This document outlines a comprehensive implementation for managing long-running command execution across multiple execution contexts. The initiative addresses lifecycle management, process cancellation, timeouts, and cleanup operations.

## Core Problems Addressed

The implementation targets reliability across:

- Foreground and background execution modes
- Follow-up process actions (polling, logging, signal sending, termination)
- CLI agent runner subprocesses

As the documentation states: "The goal is not just to support PTY. The goal is predictable ownership, cancellation, timeout, and cleanup with no unsafe process matching heuristics."

## Key Accomplishments

**Explicit PTY Command Contract**: The `SpawnInput` type now functions as a discriminated union, requiring explicit `ptyCommand` parameters rather than reconstructing commands from argument arrays.

**Type Decoupling**: The process layer no longer depends on agent-layer types for stdin contracts, improving architectural separation through a local `ManagedRunStdin` contract.

**Supervisor-Driven Lifecycle**: Process operations now request cancellation through the supervisor first, with real OS-level process termination as fallback when supervisor lookup fails.

**Unified Defaults**: Watchdog configuration now uses a single source of truth across CLI backends and reliability modules.

## Testing Validation

The implementation includes targeted unit tests covering supervisor registry behavior, PTY command contracts, child adapter termination semantics, and process-tree kill operations. E2E tests verify CLI runner functionality and PTY fallback scenarios.

## Intentional Boundaries

Restart behavior remains in-memory only -- orphaned processes are not recovered after restart, a deliberate design choice to avoid partial persistence risks in this implementation phase.