## Security

- Never hardcode secrets, tokens, passwords, or API keys. Use environment variables.
- Validate all input at system boundaries: user input, API request bodies, URL params.
- Sanitize output to prevent XSS. Never use `innerHTML`, `dangerouslySetInnerHTML`, or `document.write` without sanitization.
- Use parameterized queries for all database operations. Never concatenate user input into SQL.
- Never use `eval()`, `new Function()`, or `exec()` with user-controlled input.
- Set secure HTTP headers: CORS, CSP, X-Content-Type-Options, X-Frame-Options.
- Auth tokens: short expiry, secure storage (httpOnly cookies or secure token storage).
- Log security-relevant events. Never log secrets or full request bodies with credentials.
- Dependencies: audit regularly (`npm audit`, `pip audit`). Pin versions in production.
- OWASP Top 10 awareness: injection, broken auth, sensitive data exposure, XXE, broken access control, misconfiguration, XSS, insecure deserialization, vulnerable components, insufficient logging.
- OpenClaw agents: no git for memory/context sync — use GitHub API scripts only. Never read/write `.github_token` files.
- Agent credentials: `GITHUB_TOKEN` from `~/.openclaw/.env` only. Auth preflight before any sync.
- OpenClaw skills: never install ClawHub skills without reviewing source code (20% malicious rate documented).
