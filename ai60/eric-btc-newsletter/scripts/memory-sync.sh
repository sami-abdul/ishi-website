#!/bin/bash
# =============================================================================
# Memory Sync Script (GitHub API)
# eric-btc-newsletter
# Pushes MEMORY.md to GitHub via API -- no git required.
# =============================================================================

set -euo pipefail

# Ensure CLI tools (curl, jq, base64) are on PATH in non-interactive shells
export PATH="/usr/local/bin:/usr/bin:/bin:${PATH:-}"

# Load environment
if [ -f ~/.openclaw/.env ]; then
    # shellcheck disable=SC1091
    source ~/.openclaw/.env
fi

if [ -z "${GITHUB_TOKEN:-}" ]; then
    echo "Error: GITHUB_TOKEN not found in environment or ~/.openclaw/.env"
    exit 1
fi

# =============================================================================
# CONFIGURATION
# =============================================================================
REPO="OWNER/REPO"                  # TODO: Fill in your GitHub repo (e.g., username/eric-btc-newsletter)
BRANCH="main"
TARGET_PATH="workspace/MEMORY.md"
LOCAL_PATH="${HOME}/.openclaw/agents/eric/workspace/MEMORY.md"
AGENT_PREFIX="eric"
# =============================================================================

if [ ! -f "$LOCAL_PATH" ]; then
    echo "Error: Local MEMORY.md not found at $LOCAL_PATH"
    exit 1
fi

# Step 1: Preflight token validation
echo "Preflight: validating GitHub token..."
preflight_code=$(curl -sS -o /tmp/${AGENT_PREFIX}-gh-preflight.json -w "%{http_code}" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$REPO")

if [ "$preflight_code" -ne 200 ]; then
    msg=$(jq -r '.message // "Unknown error"' /tmp/${AGENT_PREFIX}-gh-preflight.json 2>/dev/null || echo "Unknown error")
    echo "GitHub token preflight failed: $msg"
    exit 1
fi

# Step 2: Fetch remote file metadata + content
echo "Fetching remote MEMORY.md metadata..."
get_code=$(curl -sS -o /tmp/${AGENT_PREFIX}-memory-get.json -w "%{http_code}" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$REPO/contents/$TARGET_PATH?ref=$BRANCH")

remote_sha=""
remote_content=""
if [ "$get_code" -eq 200 ]; then
    remote_sha=$(jq -r '.sha // empty' /tmp/${AGENT_PREFIX}-memory-get.json)
    remote_content=$(jq -r '.content // "" | gsub("\\n"; "") | @base64d' /tmp/${AGENT_PREFIX}-memory-get.json)
elif [ "$get_code" -ne 404 ]; then
    msg=$(jq -r '.message // "Unknown error"' /tmp/${AGENT_PREFIX}-memory-get.json 2>/dev/null || echo "Unknown error")
    echo "Failed to read remote MEMORY.md: $msg"
    exit 1
fi

# Step 3: Content equality check
local_content=$(cat "$LOCAL_PATH")
if [ -n "$remote_content" ] && [ "$remote_content" = "$local_content" ]; then
    echo "Memory is already up to date. No commit created."
    exit 0
fi

# Step 4: Upload
echo "Uploading MEMORY.md..."
b64_content=$(base64 -w 0 "$LOCAL_PATH")
commit_msg="memory($AGENT_PREFIX): Nightly sync $(date +%F)"

if [ -n "$remote_sha" ]; then
    payload=$(jq -n \
        --arg msg "$commit_msg" \
        --arg content "$b64_content" \
        --arg branch "$BRANCH" \
        --arg sha "$remote_sha" \
        '{message: $msg, content: $content, branch: $branch, sha: $sha}')
else
    payload=$(jq -n \
        --arg msg "$commit_msg" \
        --arg content "$b64_content" \
        --arg branch "$BRANCH" \
        '{message: $msg, content: $content, branch: $branch}')
fi

put_code=$(curl -sS -o /tmp/${AGENT_PREFIX}-memory-put.json -w "%{http_code}" \
    -X PUT \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    -d "$payload" \
    "https://api.github.com/repos/$REPO/contents/$TARGET_PATH")

if [ "$put_code" -eq 200 ] || [ "$put_code" -eq 201 ]; then
    commit_sha=$(jq -r '.commit.sha // "unknown"' /tmp/${AGENT_PREFIX}-memory-put.json)
    echo "Memory synced successfully. Commit: $commit_sha"
    exit 0
fi

msg=$(jq -r '.message // "Unknown error"' /tmp/${AGENT_PREFIX}-memory-put.json 2>/dev/null || echo "Unknown error")
echo "Memory sync failed: $msg"
exit 1
