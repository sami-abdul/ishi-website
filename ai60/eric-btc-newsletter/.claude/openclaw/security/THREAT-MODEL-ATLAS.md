# OpenClaw Threat Model v1.0

## Overview
This document presents a comprehensive security threat analysis of the OpenClaw AI agent platform and ClawHub skill marketplace, built on the MITRE ATLAS framework for AI/ML systems.

## System Architecture

The threat model defines five trust boundaries:
1. **Channel Access** - Gateway authentication and AllowFrom validation
2. **Session Isolation** - Per-agent session key management
3. **Tool Execution** - Docker sandbox or host execution with SSRF protection
4. **External Content** - XML wrapping for fetched URLs and emails
5. **Supply Chain** - ClawHub skill publishing with moderation

## Critical Threats Identified

**Prompt Injection (T-EXEC-001)** represents the highest-priority risk: "Attacker sends crafted prompts to manipulate agent behavior" with Critical impact and High likelihood.

**Malicious Skill Installation (T-PERSIST-001)** poses equal danger through supply chain compromise: "Attacker publishes malicious skill to ClawHub" with no sandboxing currently protecting execution.

**Credential Harvesting (T-EXFIL-003)** highlights vulnerability: "Malicious skill harvests credentials from agent context" since skills run with full agent privileges.

## Risk Assessment

The threat matrix identifies three P0 (Critical) priorities:
- T-EXEC-001: Direct prompt injection
- T-PERSIST-001: Malicious skill installation
- T-EXFIL-003: Credential harvesting from skills

Seven additional P1 (High) threats require attention, including resource exhaustion and unauthorized command execution.

## Immediate Recommendations

Priority actions include completing VirusTotal integration, implementing skill sandboxing, and adding output validation for sensitive operations.

## Moderation Limitations

Current ClawHub moderation relies on regex pattern matching with known limitations: "Simple regex easily bypassed" through obfuscation, with analysis limited to metadata rather than actual code behavior.