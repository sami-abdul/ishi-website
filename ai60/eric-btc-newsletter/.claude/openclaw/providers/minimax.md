# MiniMax Documentation

## Overview

MiniMax M2.5 (released December 23, 2025) is described as being "built for real-world complex tasks," with particular strengths in multi-language coding, web/app development, and tool compatibility.

## Key Improvements in M2.5

The model offers several enhancements, including stronger support for languages like Rust, Java, and Go; better web and mobile development capabilities; and improved handling of complex instruction sequences. Additionally, it delivers "more concise responses with lower token usage," potentially reducing costs and iteration time.

## Setup Options

**OAuth Method (Recommended):** Users can authenticate through MiniMax's Coding Plan via OAuth without needing an API key, with support for both international (`api.minimax.io`) and China-based (`api.minimaxi.com`) endpoints.

**API Key Configuration:** Users can manually configure MiniMax M2.5 through the CLI or by editing the configuration file, with context window support up to 200,000 tokens.

**Fallback Configuration:** The model can serve as a secondary option behind a primary model like Claude Opus.

**Local Inference:** MiniMax M2.5 can run locally via LM Studio on sufficiently powerful hardware.

## Pricing

Input costs are listed at 0.3 per million tokens, while output costs are 1.2 per million tokens for both standard and highspeed variants.

## Troubleshooting

Configuration issues typically stem from missing provider setup or environment variables, with case-sensitive model IDs required for proper functionality.
