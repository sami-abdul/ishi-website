# ClawHub: OpenClaw's Public Skill Registry

ClawHub functions as a free, public registry where users can discover, share, and manage skills—specialized bundles that extend OpenClaw's capabilities. The platform emphasizes accessibility for both technical and non-technical users.

## Core Functionality

The service operates on a straightforward model: users publish skill bundles containing a `SKILL.md` file and supporting materials, ClawHub assigns versions and indexes them, and other users can browse and install these skills into their OpenClaw workspace.

## Key Features

Users gain access to several capabilities: publishing new skills or updated versions, discovering skills through search and tags, downloading skill bundles, and reporting problematic content. Moderators enjoy additional powers including hiding, unhiding, deleting, or banning.

## Getting Started

Installation requires running either `npm i -g clawhub` or `pnpm add -g clawhub`. Once installed, basic workflows include searching ("clawhub search 'calendar'"), installing skills ("clawhub install <skill-slug>"), and updating them later.

## Security Approach

ClawHub implements an open-by-default policy with a practical safeguard: "a GitHub account must be at least one week old to publish." Community reporting mechanisms exist, with automatic hiding triggered when skills receive more than three unique reports.

## Technical Details

Skills are versioned using semantic versioning with changelog support. The system stores installation records in `.clawhub/lock.json` and supports optional telemetry for install counting, which users can disable via environment variable.
