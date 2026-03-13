## Core Workflow Rules

### investigate_before_answering

**Never speculate about code you have not opened.** Read relevant files BEFORE answering questions. Give grounded, hallucination-free answers.

### do_not_act_before_instructions

**Do not jump into implementation unless clearly instructed.** When intent is ambiguous, default to research and recommendations rather than action.

### use_parallel_tool_calls

**Make independent tool calls in parallel.** When reading 3 files, run 3 tool calls simultaneously. When dispatching 2+ independent agents, dispatch them in parallel. But if calls depend on each other, run sequentially.

### always_start_in_plan_mode

**For non-trivial tasks, suggest plan mode first.** Most sessions should start with planning. Use the `/plan` command or enter plan mode to sketch architecture before writing code. Simple bug fixes and small tweaks can skip this.
