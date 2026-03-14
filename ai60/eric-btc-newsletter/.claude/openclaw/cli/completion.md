# OpenClaw Completion Command Documentation

## Overview

The `openclaw completion` command generates shell completion scripts and can optionally install them into your shell profile.

## Usage Examples

```bash
openclaw completion
openclaw completion --shell zsh
openclaw completion --install
openclaw completion --shell fish --install
openclaw completion --write-state
openclaw completion --shell bash --write-state
```

## Available Options

- `-s, --shell <shell>`: Specify target shell (`zsh`, `bash`, `powershell`, `fish`; defaults to `zsh`)
- `-i, --install`: Adds a source line to your shell profile for completion loading
- `--write-state`: Stores completion script(s) in `$OPENCLAW_STATE_DIR/completions` instead of printing
- `-y, --yes`: Bypasses confirmation prompts during installation

## Key Details

The `--install` flag writes a small configuration block into your shell profile that references the cached completion script. Running the command without `--install` or `--write-state` outputs the script directly to stdout. The command eagerly loads command trees to ensure nested subcommands are included in completion generation.
