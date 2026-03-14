# Session Binding Channel Agnostic Plan

## Overview

This document outlines a long-term architecture for channel-agnostic session binding. The primary goals include establishing subagent-bound session routing as a core feature while maintaining channel-specific behaviors in adapters.

## Key Problems Being Addressed

The current system has mixed concerns that create edge cases:

- "completion content policy, destination routing policy, Discord specific details" are entangled
- This causes issues like duplicate deliveries across channels and stale token usage

## Iteration 1 Implementation Plan

### Core Interfaces

The proposal introduces three main type definitions:

1. **SessionBindingRecord** - tracks binding relationships between conversations and sessions
2. **SessionBindingService** - manages bind/unbind operations and resolution
3. **BoundDeliveryRouter** - determines where completion events should be delivered

Key types include `BindingTargetKind` (subagent or session), `BindingStatus` (active/ending/ended), and `ConversationRef` for channel-agnostic conversation references.

### Scope Limitations

This iteration deliberately limits scope to:

- "only `task_completion` is routed through this new path; existing paths for other event kinds remain as-is"
- Discord remains the first adapter
- No ACP binding targets yet
- No global replacement of all delivery paths

### Required Fixes

Four correctness issues must be resolved:

1. Refresh token usage when reusing thread binding managers
2. Record outbound activity for webhook-based sends
3. Stop implicit main channel fallback for bound thread destinations
4. Maintain existing defaults (thread binding spawning disabled by default)

## Testing and Rollout

The proposal requires specific test coverage for token rotation, webhook activity tracking, prevention of duplicate deliveries, and preservation of legacy behavior when features are disabled.

Rollout follows a phased approach: land interfaces behind feature gates, route Discord completions through the router, verify with targeted tests, and maintain backward compatibility.