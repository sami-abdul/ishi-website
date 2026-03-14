# OpenClaw Memory System Overview

## Core Architecture

OpenClaw's memory system uses **plain Markdown files stored in the agent workspace** as the single source of truth. The model only "remembers" information that persists on disk through two dedicated memory layers:

- **Daily logs** (`memory/YYYY-MM-DD.md`): Append-only files for day-to-day notes and running context
- **Long-term memory** (`MEMORY.md`): Curated, durable information loaded only in private sessions

## Memory Tools

Two agent-facing tools provide access to these files:

1. **`memory_search`**: Semantic recall over indexed Markdown snippets using vector embeddings
2. **`memory_get`**: Targeted file reads with graceful degradation (returns empty content if file doesn't exist)

## Automatic Memory Flushing

When sessions approach context limit, OpenClaw triggers a silent agentic turn prompting the model to write durable memories before compaction occurs. This prevents important information loss during context window management.

## Vector Search Capabilities

OpenClaw supports multiple embedding providers:

- **Remote**: OpenAI, Gemini, Voyage, Mistral (with API keys)
- **Local**: Node-llama-cpp with auto-downloading GGUF models
- **Self-hosted**: Ollama support

The system enables **hybrid search** combining vector similarity (semantic matching) with BM25 keyword retrieval, ensuring both paraphrased concepts and exact tokens are discoverable.

## Advanced Features

**MMR Re-ranking**: Reduces redundant snippets by balancing relevance with diversity using maximal marginal relevance algorithms.

**Temporal Decay**: Applies exponential score reduction based on memory age, with a configurable half-life (default 30 days). Evergreen files like `MEMORY.md` skip decay.

**QMD Backend** (experimental): Uses a local-first search sidecar combining BM25, vectors, and reranking without requiring separate infrastructure.

**Session Indexing** (experimental): Optional transcript indexing for recalling recent conversations without touching the main memory index.

## Configuration Highlights

Memory search auto-selects providers based on available credentials. Custom OpenAI-compatible endpoints are supported via `remote.baseUrl` configuration. Multimodal indexing (images and audio) is available exclusively with Gemini Embedding 2.
