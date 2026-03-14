# Browser Evaluate CDP Refactor

## Context
The `act:evaluate` function executes user-provided JavaScript within a page using Playwright (`page.evaluate` or `locator.evaluate`). Because Playwright serializes CDP commands per page, long-running or stuck evaluations can block the entire page command queue, causing subsequent actions to appear frozen.

PR #13498 introduces temporary safety measures (bounded evaluate, abort propagation, recovery attempts). This plan describes a larger refactor that isolates `act:evaluate` from Playwright entirely.

## Goals
- Prevent `act:evaluate` from permanently blocking later browser actions on the same tab
- Use timeouts as single source of truth end-to-end
- Treat abort and timeout consistently across HTTP and in-process dispatch
- Support element targeting for evaluate without abandoning Playwright
- Maintain backward compatibility

## Non-goals
- Replace all browser actions with CDP implementations
- Remove existing safety net from PR #13498
- Introduce unsafe capabilities beyond `browser.evaluateEnabled` gate
- Add process isolation for evaluate

## Current Architecture
Callers send `act:evaluate` -> browser control service -> Playwright execution -> serialized page commands. A stuck evaluate blocks the queue and hangs subsequent operations.

## Proposed Architecture

### 1. Deadline Propagation
Introduce unified budget concept using `createBudget({ timeoutMs, signal })` that returns:
- `signal`: linked AbortSignal
- `deadlineAtMs`: absolute deadline
- `remainingMs()`: remaining budget helper

Apply this across `src/browser/client-fetch.ts`, `src/node-host/runner.ts`, and browser action implementations.

### 2. Separate Evaluate Engine (CDP Path)
New module `src/browser/cdp-evaluate.ts` connects to CDP endpoint separately from Playwright:
- Uses `Target.attachToTarget({ targetId, flatten: true })` for independent session
- Runs `Runtime.evaluate` for page-level evaluate
- Runs `DOM.resolveNode` plus `Runtime.callFunctionOn` for element evaluate
- On timeout/abort: sends `Runtime.terminateExecution` and closes WebSocket

### 3. Element Targeting Via Ref Enhancement
Extend stored role ref metadata:
- **Today**: `{ role, name, nth }`
- **Proposed**: `{ role, name, nth, backendDOMNodeId?: number }`

At snapshot time, populate `backendDOMNodeId` by fetching AX tree via CDP (`Accessibility.getFullAXTree`) using same duplicate handling rules. Best-effort mapping leaves field undefined if unable to resolve.

### 4. Recovery Path
Maintain existing recovery mechanisms (terminate execution + disconnect Playwright) as fallback for legacy callers and edge cases.

## Implementation Plan

**Deliverables:**
1. Shared budget helper linking timeout + AbortSignal
2. Update all caller paths for consistent timeout semantics
3. Implement `src/browser/cdp-evaluate.ts` with independent session management
4. Extend ref metadata with optional `backendDOMNodeId`
5. Populate backendDOMNodeId during snapshot creation
6. Update `act:evaluate` routing: CDP evaluate preferred, Playwright fallback
7. Preserve last-resort recovery as non-default path
8. Add tests for timeout behavior and abort cancellation
9. Add observability for duration, termination usage, and fallback rates

## Acceptance Criteria
- Deliberately hung evaluate returns within caller budget without wedging tab
- `timeoutMs` behaves consistently across CLI, agent tool, node proxy, and in-process calls
- Element evaluate uses CDP when `backendDOMNodeId` available; fallback path remains bounded

## Testing Plan
- Unit tests: role matching logic and budget helper behavior
- Integration tests: timeout returns within budget, abort cancels evaluate
- Contract tests: ensure `BrowserActRequest`/`BrowserActResponse` compatibility

## Risks and Mitigations
- **Imperfect mapping**: best-effort approach with fallback and debug tooling
- **`Runtime.terminateExecution` side effects**: only use on timeout/abort with documentation
- **Extra overhead**: fetch AX tree only when snapshots requested, cache per target
- **Extension relay limitations**: use browser-level APIs, maintain Playwright fallback

## Open Questions
- Should new engine be configurable as `playwright`, `cdp`, or `auto`?
- Expose new "nodeRef" format for advanced users or keep `ref` only?
- How should frame and selector-scoped snapshots participate in AX mapping?