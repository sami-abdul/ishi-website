# Thinking Levels Documentation

## Core Functionality

The thinking levels feature allows users to control reasoning depth through inline directives like `/t <level>`, `/think:<level>`, or `/thinking <level>`. Available options range from `off` to `adaptive`, with each level corresponding to different reasoning intensities.

## Key Features

**Directive Options:** The system supports seven thinking levels—`off`, `minimal`, `low`, `medium`, `high`, `xhigh`, and `adaptive`—each mapped to specific reasoning budgets. Higher levels enable more extensive computational thinking.

**Resolution Hierarchy:** Directives follow a priority order: inline message directives take precedence, followed by session overrides, global defaults, and finally provider-specific fallbacks.

**Session Control:** Users can establish persistent session defaults by sending directive-only messages. The system confirms changes and allows querying current settings via `/think` without arguments.

## Provider Considerations

Different model providers have specific constraints. As noted: "Anthropic Claude 4.6 models default to `adaptive`" when no explicit setting is provided. Z.AI implements binary thinking support, while Moonshot restricts certain tool-choice parameters during enabled thinking.

## Additional Controls

The documentation also covers verbose directives (`/verbose`), reasoning visibility toggling (`/reasoning`), and heartbeat probe behavior, allowing granular control over output detail and agent transparency levels.
