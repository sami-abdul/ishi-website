# Mistral Documentation Summary

## Overview
The page explains how to integrate Mistral with OpenClaw for language model routing and audio transcription capabilities.

## Key Setup Information

**CLI Installation:**
Users can onboard Mistral through interactive or non-interactive command-line setup using an API key.

**LLM Configuration:**
The documentation shows configuration for using Mistral as a primary model provider, with the default model being `mistral/mistral-large-latest`.

**Audio Transcription:**
Mistral's Voxtral service enables audio processing through media understanding tools, configurable with the `voxtral-mini-latest` model.

## Technical Details

The documentation specifies several important endpoints and settings:
- Authentication relies on the `MISTRAL_API_KEY` environment variable
- Base API URL: `https://api.mistral.ai/v1`
- Audio transcription uses the `/v1/audio/transcriptions` path
- Memory embeddings utilize `/v1/embeddings` with a default `mistral-embed` model

## Additional Resources

The page references a complete documentation index available at the OpenClaw docs portal for discovering additional pages.
