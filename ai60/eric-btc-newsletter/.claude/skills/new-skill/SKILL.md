---
name: new-skill
description: |
  Use when creating a new Claude Code skill for the project.
  Triggers: "create skill", "new skill", "add skill", "write a skill".
  Guides through CSO-optimized skill creation with TDD methodology.
---

# New Skill Creator

You are a skill creation wizard. You will guide the user through creating a new Claude Code skill following CSO (Claude Search Optimization) and TDD principles.

## Step 1: Interview

Ask ONE question at a time:

1. **Skill name** — kebab-case identifier (e.g., `api-scaffolding`)
2. **Skill type** — Which type?
   - **Discipline**: Enforces a methodology (like TDD, systematic-debugging)
   - **Technique**: Teaches a specific approach (like frontend-design)
   - **Pattern**: Applies a reusable pattern (like feature-dev phases)
   - **Reference**: Provides information/lookup (like API docs)
3. **Problem statement** — What problem does this skill solve? What goes wrong WITHOUT it?
4. **Trigger conditions** — When should Claude auto-detect this skill is needed? List 3-5 specific signals.

## Step 2: Write the Description (CSO Rules)

The description in YAML frontmatter is CRITICAL. Follow these rules exactly:

**MUST:**
- Start with "Use when..."
- List specific trigger conditions and symptoms
- Include exact phrases users might say

**MUST NOT:**
- Summarize the workflow (Claude will follow the summary shortcut instead of reading the full body)
- Use generic language like "helps with development"
- Exceed 3 lines

**Example good description:**
```
description: |
  Use when debugging a failing test, unexpected behavior, or production error.
  Triggers: "why is this failing", "debug", "investigate", "root cause", stack traces, error messages.
  NEVER skip to a fix without completing the investigation phases.
```

**Example bad description:**
```
description: |
  A 6-phase debugging methodology that starts with understanding the problem,
  gathering evidence, forming hypotheses, and testing them systematically.
```

## Step 3: Write the Skill Body

Structure based on skill type:

### For Discipline skills:
```markdown
# [Skill Name]

## THE RULE
[One-sentence non-negotiable rule]

## THE METHOD
[Step-by-step methodology, numbered phases]

## RATIONALIZATION TABLE
| Excuse | Why It's Wrong | What To Do Instead |
[Common ways Claude might try to skip the methodology]

## ABSOLUTE PROHIBITION
[What Claude must NEVER do, even if it seems faster]
```

### For Technique skills:
```markdown
# [Skill Name]

## WHEN TO USE
[Specific conditions]

## THE TECHNIQUE
[Step-by-step approach]

## QUALITY CRITERIA
[How to evaluate if the technique was applied correctly]

## ANTI-PATTERNS
[Common mistakes to avoid]
```

### For Pattern skills:
```markdown
# [Skill Name]

## PATTERN
[The reusable pattern with phases]

## PHASE 1: [Name]
[Details]

## PHASE N: [Name]
[Details]

## COMPLETION CRITERIA
[When the pattern is complete]
```

### For Reference skills:
```markdown
# [Skill Name]

## LOOKUP
[How to find information]

## REFERENCE
[The actual reference material]
```

## Step 4: TDD for Skills

Before saving, verify the skill with this RED-GREEN-REFACTOR cycle:

1. **RED**: Without the skill loaded, would Claude handle the trigger scenario correctly? (Expected: No — Claude would skip steps, use wrong approach, etc.)
2. **GREEN**: With the skill loaded, does Claude follow the methodology? Check:
   - Does the description trigger correctly on the right keywords?
   - Does the body provide clear, unambiguous instructions?
   - Are there rationalization loopholes Claude could exploit to skip steps?
3. **REFACTOR**: Close any loopholes found. Add to the RATIONALIZATION TABLE or ABSOLUTE PROHIBITION section.

## Step 5: Save

Create the skill at `.claude/skills/{skill-name}/SKILL.md`.

Confirm to user:
```
Skill created: .claude/skills/{skill-name}/SKILL.md
Invoke with: /{skill-name}
Type: {type}
Triggers: {trigger list}
```

## Token Budget

Skills should be under 500 words. If longer, the skill is trying to do too much — split it.
