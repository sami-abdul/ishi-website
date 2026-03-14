---
name: knowledge-sync
description: Fetch latest context and knowledge from GitHub API
user-invocable: true
---

# Knowledge Sync (GitHub API)

Fetch the latest context and knowledge from GitHub. This is a read-only operation.

## MANDATORY: Follow This Workflow Exactly

You MUST execute the steps below in order. Do NOT improvise, skip steps, or substitute your own approach. Run `node scripts/sync-context.js` and report its output.

## When to Use

User says:
- "sync knowledge"
- "update context"
- "pull latest"
- "refresh knowledge"
- "get updates"

## Architecture

```
+---------------------------------------------------------+
|              Knowledge Sync via GitHub API               |
+---------------------------------------------------------+
|                                                         |
|  READ-ONLY SOURCES:                                     |
|    - owner/           (owner profile, expertise)        |
|    - orgs/{{org_slug}}/  (organization context)         |
|                                                         |
|  METHOD: node scripts/sync-context.js (HTTPS to GitHub) |
|                                                         |
+---------------------------------------------------------+
```

## Workflow

### Step 1: Run the sync script

```bash
cd ~/.openclaw/workspace && node scripts/sync-context.js
```

The script handles:
1. Token validation (preflight check against GitHub API)
2. Fetching directory listings for each mapped path
3. Downloading file contents with content equality checks
4. Writing updated files to local `context/` directory
5. Recursing into subdirectories

### Step 2: Report result

On success:
```
Knowledge synced from GitHub.

Updated:
- [list of files that changed]

Unchanged:
- [list of files that were already current]
```

On failure:
```
Knowledge sync failed: [error from script output]
```

## What Gets Synced (Read-Only)

| Path | Description |
|------|-------------|
| `owner/` | Owner profile, expertise, portfolio, preferences |
| `orgs/{{org_slug}}/` | Organization context, offerings, voice |
| `orgs/{{org_slug}}/knowledge/` | Domain knowledge files |

## Error Handling

| Error | Response |
|-------|----------|
| 404 Not Found | "File [path] not found in repo. It may have been moved or deleted." |
| 401 Unauthorized | "GitHub token may be invalid or expired. Check GITHUB_TOKEN in ~/.openclaw/.env" |
| Network error | "Could not reach GitHub API. Check internet connection." |

## Why GitHub API Instead of Git?

1. **No Local Git State**: Agents don't need to manage git repos
2. **Selective Fetch**: Only get the files you need, not entire repo
3. **Simpler**: No merge conflicts, no rebase issues
4. **Security**: No write access to unintended files

## Notes

- This is a **read-only** operation
- Your local MEMORY.md is not affected
- Use `/memory-sync` to push your memory changes
- Context files are human-managed; agents only read them
