# Plugin Manifest Documentation

## Overview

OpenClaw requires every plugin to include an `openclaw.plugin.json` manifest file at the plugin root. This file enables configuration validation without executing plugin code.

## Required Fields

Every manifest must contain:

- **`id`** (string): The canonical plugin identifier
- **`configSchema`** (object): A JSON Schema defining the plugin's configuration structure

## Optional Fields

Plugins may also specify:

- `kind`: Plugin category (e.g., "memory", "context-engine")
- `channels`: Channel IDs the plugin registers
- `providers`: Provider IDs the plugin registers
- `skills`: Skill directories to load relative to the plugin root
- `name`: Display name for the plugin
- `description`: Brief plugin summary
- `uiHints`: Configuration field metadata for UI rendering
- `version`: Plugin version information

## Schema Requirements

"Every plugin must ship a JSON Schema, even if it accepts no config." An empty schema following the pattern `{ "type": "object", "additionalProperties": false }` is acceptable.

## Validation Rules

- Unknown channel keys trigger errors unless declared in a plugin manifest
- Plugin IDs referenced in configuration must be discoverable
- Missing or broken manifests prevent validation and trigger Doctor warnings
- Disabled plugins retain their configuration but generate warnings

## Key Implementation Notes

- Manifests are required for all plugins, including local filesystem loads
- The manifest handles discovery and validation; runtime loads the module separately
- Plugin kinds are selected through `plugins.slots.*` configuration
- Plugins with native module dependencies should document build requirements
