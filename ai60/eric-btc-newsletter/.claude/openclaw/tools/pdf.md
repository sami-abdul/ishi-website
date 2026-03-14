# PDF Tool Documentation

## Overview

The PDF tool analyzes one or more PDF documents and returns extracted text. It supports both single and multiple PDFs (up to 10 per call) with intelligent fallback handling across different model providers.

## Key Features

**Smart Provider Handling:**
The tool operates in native mode for Anthropic and Google models, sending raw PDF bytes directly to their APIs. For other providers, it falls back to text extraction with optional image rendering.

**Availability Requirements:**
The tool only registers when a PDF-capable model configuration exists. The system checks `agents.defaults.pdfModel`, then `agents.defaults.imageModel`, then provider defaults.

## Input Parameters

- `pdf` (string): Single PDF path or URL
- `pdfs` (string[]): Multiple PDFs, maximum 10
- `prompt` (string): Analysis instructions (default: "Analyze this PDF document.")
- `pages` (string): Page selection using ranges like "1-5" or individual numbers
- `model` (string): Optional model override with format "provider/model"
- `maxBytesMb` (number): Per-PDF size limit in megabytes

## Supported References

The tool accepts local file paths (with `~` expansion), `file://` URLs, and HTTP(S) URLs. Other schemes like FTP are rejected, and remote URLs are blocked in sandbox mode.

## Execution Modes

**Native Mode** (Anthropic, Google): Sends PDFs directly to provider APIs; does not support page filtering.

**Fallback Mode** (other providers): Extracts text from up to 20 pages; renders PNG images if text extraction yields fewer than 200 characters.

## Configuration Example

```json5
{
  agents: {
    defaults: {
      pdfModel: {
        primary: "anthropic/claude-opus-4-6",
        fallbacks: ["openai/gpt-5-mini"],
      },
      pdfMaxBytesMb: 10,
      pdfMaxPages: 20,
    },
  },
}
```

## Output Structure

Results include extracted text in `content[0].text` and metadata in `details`, such as the resolved model, execution mode, and file paths.
