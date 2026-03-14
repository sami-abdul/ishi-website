---
name: tdd
description: |
  Use when implementing new features, fixing bugs, or when the user asks for test-driven development.
  Triggers: "TDD", "test first", "red green refactor", "write tests", "test-driven".
  NEVER write production code without a failing test first.
---

# Test-Driven Development

MANDATORY: Follow RED-GREEN-REFACTOR. No exceptions.

## THE RULE

No production code exists without a failing test that demanded it.

## RED: Write a Failing Test

1. Write the simplest test that describes the desired behavior
2. Run it. It MUST fail. If it passes, the test is wrong or the feature already exists.
3. The test name describes the behavior: `should [expected] when [condition]`
4. Test ONLY one behavior per test

## GREEN: Make It Pass

1. Write the MINIMUM production code to make the test pass
2. Do not write code "for later" or "just in case"
3. Hardcode return values if that's all it takes. Seriously.
4. Run the test. It MUST pass now.

## REFACTOR: Clean Up

1. Remove duplication between test and production code
2. Improve names, extract functions, simplify logic
3. Run ALL tests after each refactor step — they must stay green
4. Do not add behavior during refactoring

## Cycle Speed

Each RED-GREEN-REFACTOR cycle should be 1-5 minutes. If a cycle takes longer:
- The step is too big. Break it down.
- Write a simpler test first.

## RATIONALIZATION TABLE

| Excuse | Why It Fails |
|--------|-------------|
| "I'll write tests after" | You won't. And the code won't be testable. |
| "This is too simple to test" | Simple untested code becomes complex untested code. |
| "I need to write the whole thing first" | No. One test, one behavior, one cycle. |
| "Testing slows me down" | Testing speeds you up. Debugging untested code is what's slow. |
| "The test would be trivial" | Good. Trivial tests catch non-trivial regressions. |
| "I know it works" | Prove it. With a test. |

## ABSOLUTE PROHIBITION

- NEVER write production code before a failing test demands it.
- NEVER write more than one failing test at a time.
- NEVER skip the REFACTOR step — accumulated tech debt compounds.
- NEVER delete a failing test to make the suite green.
- NEVER write a test that can't fail.
