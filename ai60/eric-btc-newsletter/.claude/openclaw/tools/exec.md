# Exec Tool Documentation

## Overview

The Exec Tool enables running shell commands in a workspace with support for both foreground and background execution through the `process` tool.

## Key Parameters

Essential parameters include:
- **command** (required): The shell command to execute
- **workdir**: Working directory (defaults to cwd)
- **env**: Environment variable overrides
- **yieldMs**: Auto-background delay (default 10000ms)
- **background**: Immediate background execution
- **timeout**: Command expiration (default 1800 seconds)
- **pty**: Pseudo-terminal support for TTY-dependent CLIs
- **host**: Execution location (`sandbox`, `gateway`, or `node`)
- **security**: Enforcement mode (`deny`, `allowlist`, or `full`)

## Execution Hosts

The tool supports three execution contexts:

- **Sandbox** (default): Containerized execution with restricted access
- **Gateway**: Host execution with approval controls
- **Node**: Remote execution via paired companion app or headless service

## Security & Approvals

Background sessions are scoped per agent, and "gateway/node approvals are controlled by `~/.openclaw/exec-approvals.json`." The tool rejects certain environment variables (`PATH` and loader overrides) on host execution to prevent binary hijacking.

## PATH Handling

- **Gateway host**: Merges login-shell `PATH` with minimal daemon defaults
- **Sandbox**: Runs login shell, allowing `tools.exec.pathPrepend` configuration
- **Node host**: Uses node service environment without `PATH` overrides

## Safe Bins & Allowlist

The documentation distinguishes between safe bins (stdin-only stream filters) and manual allowlist entries. "Do not treat `safeBins` as a generic allowlist, and do not add interpreter/runtime binaries."

## Special Features

- **apply_patch** (experimental): Structured multi-file edits for compatible models
- **Process tool**: Manages background sessions with polling, key sending, and text pasting
- **Session overrides**: `/exec` command sets per-session defaults without modifying config
