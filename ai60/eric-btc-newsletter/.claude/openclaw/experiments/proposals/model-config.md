# Model Config (Exploration)

## Overview
This document outlines "ideas for future model configuration" and is explicitly noted as exploratory rather than a finalized specification. For current implementation details, users should consult existing documentation on models, model failover, and OAuth profiles.

## Key Motivations
Operators seek three primary capabilities:
- Support for multiple authentication profiles per provider (distinguishing personal and work accounts)
- Simplified model selection using an intuitive naming scheme with predictable fallback behavior
- Clear categorization distinguishing text-only models from image-capable alternatives

## Proposed Approach
The high-level direction suggests:
- Maintaining straightforward model selection via `provider/model` syntax with optional aliases
- Enabling multiple authentication profiles per provider with defined ordering
- Implementing a global fallback list ensuring consistent failover across all sessions
- Restricting image routing overrides to explicitly configured scenarios

## Unresolved Considerations
Three significant questions remain open for discussion:
- Whether profile rotation should operate at the provider or model level
- How the user interface should present profile selection options during sessions
- What migration strategy best protects users transitioning from legacy configuration approaches