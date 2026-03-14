# Local Models

## Overview

OpenClaw supports local model deployment, though with specific requirements. The documentation emphasizes that "Local is doable, but OpenClaw expects large context + strong defenses against prompt injection."

## Hardware Requirements

For optimal performance, the system recommends investing in substantial GPU infrastructure, approximately **$30,000 or more** for maxed-out Mac Studios or equivalent rigs. A single 24GB GPU can function for lighter workloads, though with increased latency. Users should prioritize full-size model variants rather than aggressively quantized versions to mitigate security risks.

## Recommended Setup

**LM Studio + MiniMax M2.5** represents the preferred local configuration. This approach:

- Loads MiniMax M2.5 in LM Studio
- Runs a local server (default: `http://127.0.0.1:1234`)
- Uses Responses API to separate reasoning from final text output

The setup includes configuration options for context windows of 196,608 tokens and maximum output of 8,192 tokens.

## Deployment Strategies

**Hybrid configurations** allow combining hosted primary models with local fallbacks, ensuring redundancy when local infrastructure experiences downtime. The documentation supports **regional hosting options** through OpenRouter, enabling jurisdiction-specific data routing while maintaining provider flexibility.

## Compatibility

Beyond LM Studio, the system accepts any OpenAI-compatible local proxy, including vLLM, LiteLLM, and custom gateways, provided they expose OpenAI-style `/v1` endpoints.

## Security Considerations

Local deployment bypasses provider-side content filters, necessitating narrower agent configurations and aggressive prompt compaction to minimize injection vulnerabilities.
