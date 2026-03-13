## Coding Style

- Prefer immutability: use `const`, `readonly`, frozen objects. Mutate only when performance requires it.
- Files must not exceed 800 lines. Split at logical boundaries when approaching limit.
- Functions must not exceed 50 lines. Extract helpers when logic grows.
- Maximum nesting depth: 4 levels. Use early returns and guard clauses.
- Composition over inheritance. Prefer small, composable functions over class hierarchies.
- One export per file for main abstractions. Utility files may have multiple exports.
- Name functions and variables to eliminate the need for comments. `getUserById` not `getUser`.
- Group imports: external deps, internal modules, types. Separate groups with blank line.
- No barrel files (`index.ts` re-exports) unless the module has a clear public API.
- Delete dead code immediately. Do not comment it out.
