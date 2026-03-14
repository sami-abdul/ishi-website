# CI Pipeline

## Overview

The OpenClaw CI pipeline executes automatically on pushes to `main` and pull requests, utilizing intelligent scoping to avoid running expensive jobs when only documentation or native code changes occur.

## Jobs and Their Functions

The pipeline includes thirteen distinct jobs with varying purposes:

- **docs-scope**: Identifies documentation-only modifications; runs consistently
- **changed-scope**: Determines which platform areas were affected (Node, macOS, Android, Windows); runs for non-documentation PRs
- **check**: Validates TypeScript types, linting, and formatting; runs on main pushes or PRs affecting Node
- **check-docs**: Performs Markdown linting and validates links; triggered by documentation changes
- **code-analysis**: Enforces a 1000-line threshold on code additions; PRs only
- **secrets**: Scans for exposed credentials; always executes
- **build-artifacts**: Creates distribution artifacts once for sharing; runs for non-docs, Node-related changes
- **release-check**: Validates npm package contents following the build job
- **checks**: Executes Node and Bun testing plus protocol validation
- **checks-windows**: Platform-specific testing for Windows environments
- **macos**: Runs Swift and TypeScript testing for macOS PRs
- **android**: Gradle build and testing for Android changes

## Execution Strategy

The pipeline orders jobs strategically: "cheap checks fail before expensive ones run." Initial parallel execution includes scope detection and TypeScript validation (~1-2 minutes), followed by artifact building, then platform-specific testing jobs.

## Infrastructure

Three runner types support the pipeline: Ubuntu Blacksmith instances handle most Linux jobs, Windows Blacksmith runners execute Windows-specific tests, and macOS runners support native platform testing.

## Local Development

Developers can replicate CI checks locally using: `pnpm check`, `pnpm test`, `pnpm check:docs`, and `pnpm release:check`.