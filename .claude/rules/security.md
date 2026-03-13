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
- Next.js: never expose env vars to client without `NEXT_PUBLIC_` prefix.
- Next.js: use Server Components for data fetching — no API keys in client bundles.
- Next.js: validate Server Action inputs with Zod schemas.
- Next.js: set Content Security Policy in `next.config.js`.
- Next.js: use `next/headers` for CSRF protection on Server Actions.
