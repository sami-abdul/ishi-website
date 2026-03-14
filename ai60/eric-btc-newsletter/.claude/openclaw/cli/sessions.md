# Sessions Documentation

## Overview

The `openclaw sessions` command manages stored conversation sessions. Users can list sessions across different agent stores and perform maintenance operations.

## Basic Usage

The command supports several scope options:
- Default configured agent store
- Specific agent via `--agent <id>`
- All configured agents with `--all-agents`
- Explicit store path using `--store <path>`

## Key Features

**Listing Sessions**

Users can retrieve session information in text or JSON formats. The `--active` flag filters sessions by age in minutes.

**Cleanup Maintenance**

The cleanup operation includes:
- `--dry-run`: Preview pruning actions without applying changes
- `--enforce`: Apply maintenance regardless of configuration mode
- `--active-key`: Protect specific active keys from eviction
- `--json`: Output structured results

The command maintains "session stores/transcripts only" and does not manage cron run logs, which have separate configuration.

## Output Examples

Both list and cleanup operations support JSON output showing agent IDs, store paths, session counts, and maintenance metrics like pruned entries and capped transcripts.

## Related Configuration

Session behavior is controlled through the Configuration reference at `/gateway/configuration-reference#session`.
