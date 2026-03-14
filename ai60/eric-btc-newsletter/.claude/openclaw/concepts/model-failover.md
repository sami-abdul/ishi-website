# Model Failover - OpenClaw Documentation

## Overview

OpenClaw implements a two-stage failure recovery system: "Auth profile rotation within the current provider" and "Model fallback to the next model in `agents.defaults.model.fallbacks`."

## Auth Storage

Credentials are stored in `~/.openclaw/agents/<agentId>/agent/auth-profiles.json`, supporting two types:
- API keys: `{ provider, key }`
- OAuth tokens: `{ provider, access, refresh, expires, email? }`

## Profile Selection

Profile IDs follow the pattern `provider:default` (for API keys) or `provider:<email>` (for OAuth). When multiple profiles exist, OpenClaw prioritizes them as follows:

1. Explicit configuration via `auth.order[provider]`
2. Configured profiles in `auth.profiles`
3. Stored profiles in the auth file

Without explicit ordering, the system applies round-robin selection favoring "OAuth before API keys" and selecting the "oldest first" by usage timestamp.

## Session Pinning

OpenClaw pins auth profiles per session to maintain cache efficiency. The pinned profile remains active until session reset, compaction completion, or profile cooldown. User-specified overrides (via `/model`) lock the profile for that session only.

## Cooldowns & Disables

**Transient failures** (auth errors, rate limits, timeouts) trigger exponential backoff: 1 minute -> 5 minutes -> 25 minutes -> 1 hour.

**Billing failures** mark profiles as disabled with longer backoff (5-24 hours).

State persists in `usageStats` within the auth-profiles file.

## Model Fallback

When all profiles for a provider exhaust, OpenClaw advances to the next model specified in `agents.defaults.model.fallbacks`.
