## Structured Logging (Winston)

This project uses Winston for structured logging.

### Logger Location

`src/lib/logger.ts` (or equivalent for your stack)

### Log Levels

| Level | When to Use |
|-------|-------------|
| `error` | Unexpected failures, unhandled exceptions, critical errors |
| `warn` | Recoverable issues, deprecation notices, retry attempts |
| `info` | State changes, request/response summaries, startup/shutdown |
| `debug` | Detailed operation logs, variable values, flow tracing |

### Usage

```typescript
import { logger } from '@/lib/logger';

logger.info('User created', { userId: user.id, email: user.email });
logger.error('Payment failed', { orderId, error: err.message, stack: err.stack });
```

### Rules

- Always use structured fields (objects), never string interpolation for data
- Never log secrets, tokens, passwords, or full request bodies with credentials
- Include correlation IDs for request tracing
- Log at function entry/exit for important operations in debug mode
- Error logs must include error message and stack trace
- `logs/` directory is gitignored — logs are ephemeral
