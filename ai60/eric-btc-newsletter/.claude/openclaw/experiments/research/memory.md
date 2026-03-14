# Workspace Memory Research v2

This documentation outlines an offline-first memory architecture for Claude agents, designed to balance human readability with machine recall efficiency.

## Core Architecture

The system proposes maintaining Markdown as the authoritative source while building a derived SQLite index for structured retrieval. The workspace structure separates daily narrative logs from curated "bank" files containing world facts, experiences, opinions, and entity profiles.

As the document explains: "keep Markdown as the canonical, reviewable source of truth, but adds structured recall (search, entity summaries, confidence updates) via a derived index."

## Key Operational Loop

Three operations drive the memory system:

**Retain** involves extracting 2-5 narrative facts from daily logs, tagged by type (World/Biographical/Opinion) and entity mentions.

**Recall** queries the index through lexical search, entity lookups, temporal filters, and opinion retrieval -- returning results with source citations.

**Reflect** is a scheduled process that updates entity summaries, evolves opinion confidence scores, and proposes edits to core memory files.

## Practical Implementation

The recommendation prioritizes simplicity: "start with SQLite FTS + (optional) simple embeddings; you'll get most UX wins immediately." Advanced techniques like SuCo become relevant only when dealing with very large corpora.

The minimal viable implementation requires only adding entity pages, a `## Retain` section in daily logs, and SQLite full-text search capabilities.