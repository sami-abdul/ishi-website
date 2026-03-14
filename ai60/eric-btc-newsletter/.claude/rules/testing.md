## Testing

- No production code without a failing test first (TDD when applicable).
- Test must fail before writing the code that makes it pass.
- Mock minimally: prefer real implementations. Only mock external I/O (network, filesystem, time).
- Test behavior, not implementation. Tests should survive refactors.
- Each test should test exactly one thing. Name it: `should [expected behavior] when [condition]`.
- Coverage thresholds: aim for 80%+ on new code. Do not chase 100% on getters/setters.
- Integration tests for API endpoints and database queries. Unit tests for business logic.
- Tests must be deterministic. No random data, no time-dependent assertions without mocking time.
- Clean up test fixtures. Each test starts with a clean state.
- Run the full test suite before suggesting a task is complete.
