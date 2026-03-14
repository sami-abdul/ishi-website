#!/usr/bin/env bash
set -euo pipefail

# E2E Testing Ralph Wiggum Loop
# Runs iterative E2E testing using Playwright + Claude
#
# Usage:
#   ./e2e-results/run-e2e-loop.sh [MAX_ITERATIONS] [TIMEOUT_PER_ITERATION]
#
# Environment:
#   APP_URL          - App URL to test (default: http://localhost:3000)
#   RALPH_SCRIPT     - Path to ralph-loop-headless.sh (auto-detected)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

MAX_ITERATIONS="${1:-15}"
TIMEOUT_PER_ITERATION="${2:-600}"

# App URL — customize this
APP_URL="${APP_URL:-http://localhost:3000}"

# Find ralph-loop-headless.sh — check common locations
RALPH_SCRIPT=""
for candidate in \
  "$PROJECT_DIR/.claude/scripts/ralph-loop-headless.sh" \
  "$HOME/.claude-templates/pre-dev-setup/scaffold/.claude/scripts/ralph-loop-headless.sh" \
  "$(dirname "$PROJECT_DIR")/.claude/scripts/ralph-loop-headless.sh"; do
  if [ -f "$candidate" ]; then
    RALPH_SCRIPT="$candidate"
    break
  fi
done

if [ -z "$RALPH_SCRIPT" ]; then
  echo "[e2e] ERROR: ralph-loop-headless.sh not found"
  echo "[e2e] Searched:"
  echo "[e2e]   $PROJECT_DIR/.claude/scripts/ralph-loop-headless.sh"
  echo "[e2e]   $HOME/.claude-templates/pre-dev-setup/scaffold/.claude/scripts/ralph-loop-headless.sh"
  exit 1
fi

# Pre-flight checks
echo "[e2e] === Pre-flight Checks ==="

# 1. Check app is running
if ! curl -s -o /dev/null -w "%{http_code}" "$APP_URL" | grep -qE "200|301|302|303|307|308"; then
  echo "[e2e] ERROR: App not reachable at $APP_URL"
  echo "[e2e] Start the app first, then re-run this script."
  exit 1
fi
echo "[e2e] App reachable at $APP_URL"

# 2. Check Playwright is installed
if ! npx playwright --version &>/dev/null; then
  echo "[e2e] ERROR: Playwright not installed."
  echo "[e2e] Run: pnpm add -Dw playwright @playwright/test tsx && npx playwright install chromium"
  exit 1
fi
echo "[e2e] Playwright available"

# 3. Check screenshots dir exists
mkdir -p "$SCRIPT_DIR/screenshots"
echo "[e2e] Screenshots directory ready"

# 4. Check auth state exists
if [ ! -f "$SCRIPT_DIR/auth-state.json" ]; then
  echo "[e2e] ERROR: No auth state found at $SCRIPT_DIR/auth-state.json"
  echo "[e2e] Save auth state:"
  echo "[e2e]   npx tsx e2e-results/playwright-helper.ts login <email> <password>"
  echo "[e2e]   npx tsx e2e-results/playwright-helper.ts save-auth  (opens browser)"
  exit 1
fi
echo "[e2e] Auth state found"

echo ""
echo "[e2e] === Starting E2E Test Loop ==="
echo "[e2e] App URL: $APP_URL"
echo "[e2e] Max iterations: $MAX_ITERATIONS"
echo "[e2e] Timeout per iteration: ${TIMEOUT_PER_ITERATION}s"
echo "[e2e] Project: $PROJECT_DIR"
echo ""

# Build the prompt
LOOP_PROMPT=$(cat "$SCRIPT_DIR/loop-prompt.md")

FULL_PROMPT="You are testing a web app at $APP_URL.

Working directory: $PROJECT_DIR

IMPORTANT FILES:
- Test plan and instructions: $SCRIPT_DIR/loop-prompt.md
- Phase tracker: $SCRIPT_DIR/phase-tracker.md
- Findings document: $SCRIPT_DIR/FINDINGS.md
- Playwright helper: $SCRIPT_DIR/playwright-helper.ts
- Screenshots dir: $SCRIPT_DIR/screenshots/

Read the phase-tracker.md to find the next untested phase, then follow the instructions in loop-prompt.md exactly.

$LOOP_PROMPT"

# Run the ralph loop
cd "$PROJECT_DIR"
"$RALPH_SCRIPT" "$FULL_PROMPT" "$MAX_ITERATIONS" "ALL_PHASES_TESTED" "$TIMEOUT_PER_ITERATION"

echo ""
echo "[e2e] === Loop Finished ==="
echo "[e2e] Results: $SCRIPT_DIR/FINDINGS.md"
echo "[e2e] Screenshots: $SCRIPT_DIR/screenshots/"

# Show summary
TOTAL_PHASES=$(grep -c '^\- \[' "$SCRIPT_DIR/phase-tracker.md" 2>/dev/null || echo "0")
TESTED=$(grep -c '\[x\]' "$SCRIPT_DIR/phase-tracker.md" 2>/dev/null || echo "0")
echo "[e2e] Phases tested: $TESTED / $TOTAL_PHASES"

CRITICAL=$(grep -c "Severity.*Critical" "$SCRIPT_DIR/FINDINGS.md" 2>/dev/null || echo "0")
MAJOR=$(grep -c "Severity.*Major" "$SCRIPT_DIR/FINDINGS.md" 2>/dev/null || echo "0")
MINOR=$(grep -c "Severity.*Minor" "$SCRIPT_DIR/FINDINGS.md" 2>/dev/null || echo "0")
COSMETIC=$(grep -c "Severity.*Cosmetic" "$SCRIPT_DIR/FINDINGS.md" 2>/dev/null || echo "0")

echo "[e2e] Issues found: $CRITICAL critical, $MAJOR major, $MINOR minor, $COSMETIC cosmetic"
