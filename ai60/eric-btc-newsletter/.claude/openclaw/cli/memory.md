# Memory Management Documentation

## Overview

The `openclaw memory` command manages semantic memory indexing and search capabilities. The system relies on an active memory plugin (default: `memory-core`) that can be disabled by setting `plugins.slots.memory = "none"`.

## Core Commands

**Status Check:**
```bash
openclaw memory status
openclaw memory status --deep
openclaw memory status --json
```

**Indexing:**
```bash
openclaw memory index --force
openclaw memory index --agent main --verbose
```

**Search:**
```bash
openclaw memory search "meeting notes"
openclaw memory search --query "deployment" --max-results 20
```

## Key Options

**For `memory status` and `memory index`:**
- `--agent <id>`: Target a specific agent
- `--verbose`: Display detailed operational logs

**For `memory status`:**
- `--deep`: Check vector and embedding availability
- `--index`: Trigger reindexing if needed
- `--json`: Output in JSON format

**For `memory search`:**
- Query via positional argument or `--query` flag (flag takes precedence)
- `--max-results <n>`: Limit returned matches
- `--min-score <n>`: Filter lower-scoring results
- `--json`: Format output as JSON

## Important Notes

The command supports additional search paths through `memorySearch.extraPaths` configuration. Secret credential fields resolve through active gateway snapshots; unavailable gateways cause immediate failure. Compatibility requires a gateway supporting `secrets.resolve` methods.
