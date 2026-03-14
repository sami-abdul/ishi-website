---
name: memory-sync
description: Sync memory to GitHub using API (safe, path-controlled)
user-invocable: true
---

# Memory Sync (GitHub API)

Sync your memory changes to GitHub using the API. This ensures files go to the correct path and prevents accidental secret commits.

## MANDATORY: Follow This Workflow Exactly

You MUST execute the steps below in order. Do NOT improvise, skip steps, or substitute your own approach. Run `bash scripts/memory-sync.sh` and report its output.

## When to Use

User says:
- "sync your memory"
- "save your learnings"
- "commit your memory"
- "backup your notes"

## Architecture

```
+---------------------------------------------------------+
|              Memory Sync via GitHub API                  |
+---------------------------------------------------------+
|                                                         |
|  ALLOWED FILES (whitelist):                             |
|    - MEMORY.md                                          |
|    - memory/*.md                                        |
|                                                         |
|  TARGET PATH in repo:                                   |
|    agents/{{org_slug}}/{{agent_slug}}/workspace/        |
|                                                         |
|  METHOD: bash scripts/memory-sync.sh (curl to GitHub)   |
|                                                         |
+---------------------------------------------------------+
```

## Workflow

### Step 1: Run the sync script

```bash
cd ~/.openclaw/workspace && bash scripts/memory-sync.sh
```

The script handles:
1. Token validation (preflight check against GitHub API)
2. Fetching remote file SHA (needed for updates)
3. Content equality check (skips if unchanged)
4. Base64 encoding and uploading via GitHub API
5. Reporting commit SHA on success

### Step 2: Report result

On success:
```
Memory synced to GitHub.
Commit: [commit sha from script output]
```

On "already up to date":
```
Memory is already up to date. No changes needed.
```

On failure:
```
Memory sync failed: [error from script output]
```

## CRITICAL SECURITY RULES

### ONLY COMMIT THESE FILES (Whitelist)

| File | Target Path |
|------|-------------|
| `MEMORY.md` | `{{agent_path}}/MEMORY.md` |
| `memory/*.md` | `{{agent_path}}/memory/*.md` |

### NEVER COMMIT THESE (Blacklist)

| Pattern | Reason |
|---------|--------|
| `*.json` | May contain secrets (tokens, credentials) |
| `*.js` | Scripts stay on VPS only |
| `.env*` | Environment secrets |
| `context/*` | Read-only, human-managed |
| `*.log` | Temporary files |
| `node_modules/*` | Dependencies |
| Any file with "token", "secret", "password", "key" in name | Obvious secrets |

### Before Committing, ALWAYS Check

1. Is the file in the whitelist? If NO -> **STOP**
2. Does the file contain anything that looks like a secret? If YES -> **STOP**
3. Is the target path correct (`agents/{{org_slug}}/{{agent_slug}}/workspace/...`)? If NO -> **STOP**

## Error Handling

| Error | Response |
|-------|----------|
| File not in whitelist | "Cannot sync [file] - not in allowed list. Only MEMORY.md and memory/*.md can be synced." |
| API error | "GitHub API error: [message]. Try again later." |
| SHA mismatch (409) | "File was modified on GitHub. Re-run the script to fetch latest SHA and retry." |
| Token invalid (401/403) | "GitHub token may be invalid or expired. Check GITHUB_TOKEN in ~/.openclaw/.env" |

## Why GitHub API Instead of Git?

1. **Path Control**: Files always go to the correct directory in the repo
2. **No Secrets Risk**: No raw git access = can't accidentally `git add` wrong files
3. **Simpler**: No need to manage git state, branches, merges
4. **Audit Trail**: All commits clearly attributed
