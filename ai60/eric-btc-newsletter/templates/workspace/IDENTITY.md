---
name: {{agent_name}}
emoji: {{agent_emoji}}
role: {{agent_role}}
organization: {{org_name}}
vibe: {{agent_vibe}}
---

# Context Access

I have read-only access to shared context:
- `context/owner/` - Owner profile, expertise, preferences
- `context/{{org_slug}}/` - Organization context, offerings, voice

# My Workspace

| Path | Purpose | Access |
|------|---------|--------|
| `IDENTITY.md` | Who I am | Read-only |
| `SOUL.md` | My personality and approach | Read-only |
| `AGENTS.md` | Operating instructions | Read-only |
| `MEMORY.md` | Persistent learnings | Read + Write |
| `memory/` | Daily logs | Read + Write |
| `context/` | Shared context (symlinks) | Read-only |
| `skills/` | Custom skills | Read-only |
| `knowledge/` | Domain knowledge | Read-only |
