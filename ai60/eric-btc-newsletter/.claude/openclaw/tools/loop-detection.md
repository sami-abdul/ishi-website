# Tool-loop Detection Documentation

## Overview

OpenClaw provides optional guardrails to prevent agents from becoming trapped in repetitive tool-call patterns. The feature is "disabled by default" and should be enabled selectively.

## Purpose

The guard addresses three key scenarios:

1. Detecting repetitive sequences showing no progress
2. Identifying high-frequency loops with identical tool calls and parameters
3. Recognizing specific patterns associated with polling tools

## Configuration

**Global settings** establish baseline behavior across all agents:

```json5
{
  tools: {
    loopDetection: {
      enabled: false,
      historySize: 30,
      warningThreshold: 10,
      criticalThreshold: 20,
      globalCircuitBreakerThreshold: 30,
      detectors: {
        genericRepeat: true,
        knownPollNoProgress: true,
        pingPong: true,
      },
    },
  },
}
```

Individual agents can override these defaults with targeted adjustments.

## Key Parameters

- **enabled**: Controls whether detection runs
- **historySize**: Recent tool calls retained for analysis
- **warningThreshold**: Signals warnings before escalation
- **criticalThreshold**: Triggers blocking of repetitive patterns
- **globalCircuitBreakerThreshold**: Maximum tolerance before intervention
- **detectors**: Three pattern-recognition types (generic repeats, polling patterns, alternating calls)

## Best Practices

Start with detection enabled using default thresholds. Maintain threshold ordering (warning < critical < circuit-breaker). When false positives occur, gradually increase thresholds or disable specific detectors rather than disabling the entire system.

## Response Behavior

Upon detection, the system reports the event and dampens or blocks subsequent tool cycles proportionally to severity, protecting against token waste and system lockups.
