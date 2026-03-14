# CONTRIBUTING THREAT MODEL

## Overview
OpenClaw welcomes threat model contributions from anyone, regardless of security expertise. The project uses MITRE ATLAS framework to organize and assess security threats to AI systems.

## Contribution Types

**Add a Threat:** Submit attack vectors or risks through the [openclaw/trust GitHub issues](https://github.com/openclaw/trust/issues). Include the scenario, affected components, severity estimate, and relevant research -- but these aren't required.

**Suggest Mitigations:** Propose specific, actionable solutions like "rate limiting at 10 messages/minute" rather than vague approaches.

**Propose Attack Chains:** Describe how multiple threats combine into realistic attack scenarios with narrative explanations.

**Improve Existing Content:** Fix typos, clarify language, update outdated information, or enhance examples via pull requests.

## Framework Details

The threat model uses **MITRE ATLAS**, a framework for adversarial threats in AI/ML systems. Threats receive IDs (T-EXEC-003, etc.) across eight categories: reconnaissance, initial access, execution, persistence, defense evasion, discovery, exfiltration, and impact.

Risk assessment follows four levels: critical (system compromise), high (significant damage likely), medium (moderate risk), and low (unlikely with limited impact).

## Process

Submissions are triaged within 48 hours, assessed for feasibility and ATLAS mapping, documented, and merged into the threat model.

## Important Note

This is for threat modeling discussions, not reporting active vulnerabilities. Security disclosures follow separate responsible disclosure procedures at [trust.openclaw.ai](https://trust.openclaw.ai).