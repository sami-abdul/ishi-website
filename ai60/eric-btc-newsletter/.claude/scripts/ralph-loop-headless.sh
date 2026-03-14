#!/usr/bin/env bash
set -euo pipefail

# macOS timeout shim
if ! command -v timeout &>/dev/null; then
  timeout() {
    local dur=$1; shift
    perl -e "alarm $dur; exec @ARGV" -- "$@"
  }
fi

# Ralph Wiggum Headless Loop
# Each iteration calls `claude --print` with the task prompt.
# Checks output for <promise>COMPLETION_PROMISE</promise> tags.
# Loops until: promise found OR max iterations OR timeout.

PROMPT="${1:?Usage: ralph-loop-headless.sh \"PROMPT\" [MAX_ITER] [PROMISE] [TIMEOUT_SEC] [VERIFY_TIMEOUT]}"
MAX_ITERATIONS="${2:-10}"
COMPLETION_PROMISE="${3:-DONE}"
TIMEOUT_PER_ITERATION="${4:-300}"
VERIFY_TIMEOUT="${5:-120}"

ITERATION=0
FOUND_PROMISE=false
LAST_VERIFICATION=""
OUTPUT_DIR="/tmp/ralph-loop-$$"
mkdir -p "$OUTPUT_DIR"

# Cleanup on exit
cleanup() {
  rm -rf "$OUTPUT_DIR"
}
trap cleanup EXIT

# Graceful cancellation
cancelled=false
cancel_handler() {
  echo "" >&2
  echo "[ralph] Cancellation requested. Finishing current iteration..." >&2
  cancelled=true
}
trap cancel_handler SIGINT SIGTERM

echo "[ralph] Starting Ralph Wiggum loop" >&2
echo "[ralph] Prompt: ${PROMPT:0:80}..." >&2
echo "[ralph] Max iterations: $MAX_ITERATIONS" >&2
echo "[ralph] Completion promise: $COMPLETION_PROMISE" >&2
echo "[ralph] Timeout per iteration: ${TIMEOUT_PER_ITERATION}s" >&2
echo "[ralph] Verification timeout: ${VERIFY_TIMEOUT}s" >&2
echo "" >&2

while [ "$ITERATION" -lt "$MAX_ITERATIONS" ] && [ "$FOUND_PROMISE" = "false" ] && [ "$cancelled" = "false" ]; do
  ITERATION=$((ITERATION + 1))
  ITER_OUTPUT="$OUTPUT_DIR/iteration-${ITERATION}.txt"

  echo "[ralph] === Iteration $ITERATION / $MAX_ITERATIONS ===" >&2

  # Build the iteration prompt
  ITER_PROMPT="$PROMPT

--- Ralph Wiggum Context ---
Iteration: $ITERATION / $MAX_ITERATIONS
Completion promise: $COMPLETION_PROMISE

RULES:
- Complete the task described above.
- When the task is FULLY complete and verified, output: <promise>$COMPLETION_PROMISE</promise>
- You may ONLY output the promise when it is completely TRUE.
- You MUST NOT lie to escape the loop.
- If you are stuck, explain what is blocking you instead of falsely completing.
- If this is iteration > 1, check what previous iterations accomplished by reading the actual files.
- After each iteration, work-verifier will run. Address any issues it finds."

  # Include previous verification results if available
  if [ -n "$LAST_VERIFICATION" ]; then
    ITER_PROMPT="$ITER_PROMPT

--- Previous Verification Results ---
$LAST_VERIFICATION"
  fi

  # Run claude --print with timeout
  if timeout "$TIMEOUT_PER_ITERATION" claude --print --dangerously-skip-permissions "$ITER_PROMPT" > "$ITER_OUTPUT" 2>/dev/null; then
    echo "[ralph] Iteration $ITERATION completed" >&2
  else
    EXIT_CODE=$?
    if [ "$EXIT_CODE" -eq 124 ]; then
      echo "[ralph] Iteration $ITERATION timed out after ${TIMEOUT_PER_ITERATION}s" >&2
    else
      echo "[ralph] Iteration $ITERATION exited with code $EXIT_CODE" >&2
    fi
  fi

  # Run work-verifier agent after each iteration
  echo "[ralph] Running work-verifier..." >&2
  VERIFY_OUTPUT="$OUTPUT_DIR/verify-${ITERATION}.txt"
  VERIFY_PROMPT="You are the work-verifier agent. Verify the work done so far for this task:

$PROMPT

Run the verification checklist from .claude/agents/work-verifier.md:
1. Run tests (if test command available)
2. Run build (if build command available)
3. Check code quality (no debug statements, no hardcoded secrets)
4. Verify requirements against the original task
5. Check for regressions

Output your verification results in the standard format:
=== Work Verification ===
## Results
| Check | Status | Notes |
...
## Verdict: VERIFIED | NEEDS WORK"

  if timeout "$VERIFY_TIMEOUT" claude --print --dangerously-skip-permissions "$VERIFY_PROMPT" > "$VERIFY_OUTPUT" 2>/dev/null; then
    echo "[ralph] Work verification completed" >&2
    LAST_VERIFICATION=$(cat "$VERIFY_OUTPUT")

    # Show verification summary
    if grep -q "VERIFIED" "$VERIFY_OUTPUT" 2>/dev/null; then
      echo "[ralph] Verification: VERIFIED" >&2
    elif grep -q "NEEDS WORK" "$VERIFY_OUTPUT" 2>/dev/null; then
      echo "[ralph] Verification: NEEDS WORK" >&2
      # Extract issues if present
      grep -A 5 "## Issues Found" "$VERIFY_OUTPUT" >&2 2>/dev/null || true
    fi
  else
    echo "[ralph] Work verification timed out or failed" >&2
    LAST_VERIFICATION="Verification could not be completed (timeout or error)"
  fi
  echo "" >&2

  # Check for completion promise in output
  if grep -q "<promise>$COMPLETION_PROMISE</promise>" "$ITER_OUTPUT" 2>/dev/null; then
    FOUND_PROMISE=true
    echo "[ralph] Completion promise found in iteration $ITERATION!" >&2
  else
    echo "[ralph] No completion promise found. Continuing..." >&2
  fi

  # Print a summary of the iteration output (last 5 lines)
  echo "[ralph] Output tail:" >&2
  tail -5 "$ITER_OUTPUT" >&2 2>/dev/null || true
  echo "" >&2
done

# Final status
echo "" >&2
if [ "$FOUND_PROMISE" = "true" ]; then
  echo "[ralph] Loop completed successfully in $ITERATION iteration(s)." >&2
  echo "[ralph] Promise '$COMPLETION_PROMISE' was fulfilled." >&2

  # Show final verification status
  FINAL_VERIFY="$OUTPUT_DIR/verify-${ITERATION}.txt"
  if [ -f "$FINAL_VERIFY" ]; then
    if grep -q "VERIFIED" "$FINAL_VERIFY" 2>/dev/null; then
      echo "[ralph] Final verification: PASSED" >&2
    elif grep -q "NEEDS WORK" "$FINAL_VERIFY" 2>/dev/null; then
      echo "[ralph] Warning: Final verification indicated NEEDS WORK" >&2
      echo "[ralph] Review the verification output for details." >&2
    fi
  fi
elif [ "$cancelled" = "true" ]; then
  echo "[ralph] Loop cancelled by user after $ITERATION iteration(s)." >&2
else
  echo "[ralph] Loop ended after $ITERATION iteration(s) without completion." >&2
  echo "[ralph] The task may need manual intervention." >&2
fi

# Output the last iteration's full output to stdout
if [ -f "$ITER_OUTPUT" ]; then
  cat "$ITER_OUTPUT"
fi
