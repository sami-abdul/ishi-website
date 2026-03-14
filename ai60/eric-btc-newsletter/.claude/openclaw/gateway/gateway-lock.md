# Gateway Lock

## Why

The gateway implements a locking mechanism to accomplish three goals:

- Restrict operation to a single gateway instance per base port on each host; additional instances require separate profiles and distinct ports
- Automatically clear locks after crashes or forced termination without requiring manual cleanup
- Quickly reject startup attempts when the control port is unavailable with an informative message

## Mechanism

The implementation relies on the WebSocket listener (default `ws://127.0.0.1:18789`) binding exclusively at startup:

- The exclusive TCP listener attachment happens immediately during initialization
- When binding fails with `EADDRINUSE`, the system throws `GatewayLockError` with a message indicating another instance occupies that address
- The operating system automatically reclaims the listener upon process termination, whether graceful shutdown, crash, or forced kill, eliminating the need for separate lock files or cleanup procedures
- Closing the WebSocket and underlying HTTP server during shutdown releases the port quickly

## Error surface

Two error conditions can occur:

- Port occupation by another process: throws `GatewayLockError("another gateway instance is already listening on ws://127.0.0.1:<port>")`
- Other binding failures: surfaces as `GatewayLockError("failed to bind gateway socket on ws://127.0.0.1:<port>: ...")`

## Operational notes

- When another process holds the port, the error message remains consistent; resolve by freeing the port or specifying an alternative using `openclaw gateway --port <port>`
- The macOS application maintains its own lightweight PID guard before launching the gateway; the runtime lock is ultimately enforced by the WebSocket binding mechanism
