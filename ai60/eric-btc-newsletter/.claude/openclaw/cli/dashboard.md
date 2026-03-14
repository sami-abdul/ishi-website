# Dashboard Command Documentation

## Overview
The `openclaw dashboard` command launches the Control UI using current authentication credentials.

## Command Syntax

```bash
openclaw dashboard
openclaw dashboard --no-open
```

## Key Features

**Token Security:** The dashboard command handles authentication tokens safely by:

- Resolving configured `gateway.auth.token` SecretRefs when available
- Generating non-tokenized URLs to prevent exposure in terminal history, clipboard records, or browser arguments
- Providing explicit remediation guidance when SecretRef-managed tokens cannot be resolved
