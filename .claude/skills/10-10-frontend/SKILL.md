---
name: 10-10-frontend
description: |
  Use when perfecting a frontend design through iterative visual evaluation.
  Triggers: "make it look perfect", "10/10 design", "iterate on the design", "polish the UI".
  Loops: screenshot → evaluate → fix → re-screenshot until design scores 10/10.
---

# 10/10 Frontend

Iterate on frontend design using Playwright screenshots until the design scores a perfect 10/10.

## The Loop

### Step 1: Screenshot

Take a Playwright screenshot of the current state:

```typescript
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:PORT');
await page.screenshot({ path: 'screenshot.png', fullPage: true });
await browser.close();
```

### Step 2: Evaluate

Read the screenshot and rate it on these criteria (each 1-10):

| Criterion | What to Assess |
|-----------|---------------|
| **Typography** | Font choices, hierarchy, sizing, spacing, readability |
| **Color** | Palette cohesion, contrast, mood, distinctiveness |
| **Layout** | Spatial composition, alignment, visual flow, responsiveness |
| **Polish** | Hover states, transitions, micro-interactions, loading states |
| **Distinctiveness** | Does it look like AI-generated slop or like a crafted design? |

**Overall score** = average of all criteria.

### Step 3: Fix

For each criterion scoring below 8:
- Identify the specific elements that are weak
- Apply fixes following the `/frontend-design` skill guidelines
- Make 1-3 targeted changes (don't overhaul everything at once)

### Step 4: Re-screenshot

Go back to Step 1. Take a new screenshot after fixes.

## Stop Condition

Stop when ALL criteria score 8+ AND overall score is 10/10.

If after 5 iterations the score is stuck:
- Step back and reconsider the aesthetic direction
- Try a completely different approach for the weakest area
- Consult the user for preference input

## Rules

- Always screenshot at desktop (1440x900) AND mobile (390x844) widths
- Evaluate both viewports in each iteration
- Do not declare 10/10 prematurely — be honest in your assessment
- Document each iteration: score, changes made, reasoning
- Maximum 10 iterations. If not 10/10 by then, report what's remaining.
