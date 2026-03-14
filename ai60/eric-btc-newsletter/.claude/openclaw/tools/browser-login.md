# Browser Login Documentation

## Key Points

**Manual Login Approach**: The documentation strongly recommends users "sign in manually" in the OpenClaw browser rather than providing automated credentials, as this prevents triggering anti-bot security measures.

**Dedicated Chrome Profile**: OpenClaw operates through a separate Chrome profile named "openclaw" with an orange-tinted interface, distinct from your regular browsing profile.

**Access Methods**: Users can either request the agent to open the browser for manual login, or launch it directly via command line using `openclaw browser start`.

**X/Twitter Best Practices**: For social media platforms, the guidance suggests using the host browser for reading, searching, and posting to minimize bot detection risks.

**Sandboxing Considerations**: Sandboxed browser sessions are more prone to triggering bot defenses. The documentation provides configuration options to enable host browser control when needed, including the setting `allowHostControl: true` for non-sandboxed access.

**Profile Configuration**: Users managing multiple browser profiles can specify which one to use with the `--browser-profile` parameter.

The page emphasizes security and account protection as primary concerns when integrating automated agents with web platforms requiring authentication.
