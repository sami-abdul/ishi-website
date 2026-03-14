# Formal Verification (Security Models)

## Overview
OpenClaw maintains formal security models using TLA+/TLC to verify enforcement of security policies including authorization, session isolation, tool gating, and misconfiguration safety.

## Key Points

**Current State:**
The project provides "an executable, attacker-driven security regression suite" with runnable model-checks and paired negative models that demonstrate realistic bug classes.

**Important Limitations:**
- Models represent abstractions, not the complete TypeScript implementation
- Results are bounded by explored state space; passing checks don't guarantee security beyond modeled assumptions
- Some claims depend on correct deployment and configuration

## Model Categories Tested

The formal models cover five main security areas:

1. **Gateway exposure** - validates authentication blocks unauthorized remote access
2. **nodes.run pipeline** - confirms command allowlist and approval requirements
3. **Pairing store gating** - checks TTL and pending-request caps
4. **Ingress gating** - verifies mention requirements prevent bypass attempts
5. **Session isolation** - ensures DMs from different peers remain separate

## v1++ Extensions

Advanced models address real-world scenarios including concurrent access, idempotency, and trace correlation across distributed message processing.

**Repository:** Models are maintained separately at [vignesh07/openclaw-formal-models](https://github.com/vignesh07/openclaw-formal-models) with reproducible results via TLC/Make targets.