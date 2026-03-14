# Long-Term Memory

Persistent operational memory for this agent.

---

## Critical Rules

1. Memory/context sync uses GitHub API pathways only (`scripts/memory-sync.sh`, `scripts/sync-context.js`).
2. Never commit or expose secrets.
3. Every critical workflow must end with a final report.
4. Follow timeout/retry policy and avoid polling loops.
5. Token source: `GITHUB_TOKEN` from `~/.openclaw/.env` only. Never read/write `.github_token`.
6. {{channel_type}} delivery: {{channel_group_id}} only (never DM by default).

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

---

## Single Source of Truth

Define canonical parameters here that other files reference. Examples:
- Search keywords
- Filter thresholds
- Operational rules

**This is the only place these parameters are defined. All other files reference here.**

---

## Hard/Soft Thresholds

### Hard Thresholds (auto-fail / auto-reject)

| Signal | Threshold | Action |
|--------|-----------|--------|
| {{hard_signal}} | {{hard_threshold}} | fail step / reject item |

### Soft Thresholds (warn)

| Signal | Threshold | Action |
|--------|-----------|--------|
| {{soft_signal}} | {{soft_threshold}} | continue with warning |

---

## Proof Asset Catalog

Maintain links to evidence assets used in reports, proposals, or outputs.

| Asset | Type | URL/Path |
|-------|------|----------|
| {{asset_name}} | {{asset_type}} | {{asset_url}} |

---

## Baselines

Capture expected healthy values.

- Performance baseline:
  - {{perf_metric}}: {{perf_target}}
- Service baseline:
  - {{service_endpoint}}: {{expected_response}}

---

## Known Failure Modes + Fallbacks

| Failure Mode | Detection | Fallback | Remediation |
|--------------|-----------|----------|-------------|
| command timeout | timeout reached | retry <= 2 then fallback path | exact command/action |
| dependency missing | command not found | run alternate check | install/fix command |

---

## Notification Preferences

| Channel | Address | When |
|---------|---------|------|
| {{channel_type}} | {{channel_group_id}} | All alerts, reports |
| Email | {{notification_email}} | [optional: specific events] |

---

## Lessons Learned

Append entries only after validated incidents.

### Entry Template

```markdown
### YYYY-MM-DD - <short title>
- incident:
- root_cause:
- what_worked:
- what_failed:
- permanent_fix:
```

---

## Notes

Domain-specific notes, client preferences, and durable context.
