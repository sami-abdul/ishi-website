# OpenClaw Plugins Documentation

## Overview
The `openclaw plugins` command manages Gateway plugins and extensions that load in-process.

## Available Commands

The following operations are supported:

- **list**: Display all plugins
- **info**: Show details for a specific plugin
- **enable/disable**: Activate or deactivate plugins
- **uninstall**: Remove plugins
- **doctor**: Diagnose plugin issues
- **update**: Refresh plugin versions
- **install**: Add new plugins

## Key Requirements

Plugins must include an `openclaw.plugin.json` manifest file with a JSON Schema definition. The system prevents plugins with missing or invalid manifests from loading.

Bundled plugins ship disabled by default and require explicit activation.

## Installation Details

Installation accepts npm package specifications, local file paths, or archives (.zip, .tgz, .tar.gz, .tar). The system rejects git/URL specs and semantic version ranges for security purposes.

The documentation notes that "treat plugin installs like running code." Users should prefer pinned versions and exact specifications rather than flexible version ranges.

For npm installations, dependency scripts run with `--ignore-scripts` protection enabled.

## Uninstall & Update Behavior

Uninstalling removes plugin records from configuration, clears memory slots (resetting to default), and deletes files unless `--keep-files` is specified.

Updates apply only to npm-installed plugins. When artifact integrity hashes change, the system prompts for confirmation before proceeding.
