#!/usr/bin/env python3
"""
Security Reminder Hook (PreToolUse)
Checks for 9 dangerous code patterns when editing files.
Shows warning once per file+rule per session. Exit code 2 blocks tool on first encounter.
"""

import json
import os
import re
import sys
import tempfile

# Security patterns to check
PATTERNS = [
    {
        "id": "github_actions_workflow",
        "name": "GitHub Actions Injection",
        "regex": r"\$\{\{.*github\.event",
        "file_glob": "*.yml",
        "message": "GitHub Actions workflow injection risk. User-controlled event data in `run:` blocks can execute arbitrary commands. Use an intermediate environment variable instead.",
    },
    {
        "id": "child_process_exec",
        "name": "Command Injection (exec)",
        "regex": r"exec\s*\(",
        "file_glob": "*.{js,ts,jsx,tsx}",
        "message": "child_process.exec() with user input enables command injection. Use execFile() with argument arrays instead.",
    },
    {
        "id": "new_function_injection",
        "name": "Code Injection (new Function)",
        "regex": r"new\s+Function\s*\(",
        "file_glob": "*.{js,ts,jsx,tsx}",
        "message": "new Function() creates code from strings, enabling injection. Avoid dynamic code generation.",
    },
    {
        "id": "eval_injection",
        "name": "Code Injection (eval)",
        "regex": r"eval\s*\(",
        "file_glob": "*.{js,ts,jsx,tsx,py}",
        "message": "eval() executes arbitrary code. Never use with user-controlled input.",
    },
    {
        "id": "react_dangerously_set_html",
        "name": "XSS (dangerouslySetInnerHTML)",
        "regex": r"dangerouslySetInnerHTML",
        "file_glob": "*.{jsx,tsx}",
        "message": "dangerouslySetInnerHTML can cause XSS. Sanitize HTML with DOMPurify before rendering.",
    },
    {
        "id": "document_write_xss",
        "name": "XSS (document.write)",
        "regex": r"document\.write\s*\(",
        "file_glob": "*.{js,ts,jsx,tsx}",
        "message": "document.write() can cause XSS. Use DOM APIs (createElement, textContent) instead.",
    },
    {
        "id": "innerhtml_xss",
        "name": "XSS (innerHTML)",
        "regex": r"\.innerHTML\s*=",
        "file_glob": "*.{js,ts,jsx,tsx}",
        "message": "innerHTML assignment can cause XSS. Use textContent for text, or sanitize HTML with DOMPurify.",
    },
    {
        "id": "pickle_deserialization",
        "name": "Arbitrary Code Execution (pickle)",
        "regex": r"pickle\.loads?\s*\(",
        "file_glob": "*.py",
        "message": "pickle.loads() can execute arbitrary code. Use JSON or a safe serialization format.",
    },
    {
        "id": "os_system_injection",
        "name": "Command Injection (os.system)",
        "regex": r"os\.system\s*\(",
        "file_glob": "*.py",
        "message": "os.system() with user input enables command injection. Use subprocess.run() with argument lists.",
    },
]


def get_state_file():
    """Get session-specific state file path."""
    session_id = os.environ.get("CLAUDE_SESSION_ID", "default")
    return os.path.join(tempfile.gettempdir(), f"security_warnings_{session_id}.json")


def load_state():
    """Load warning state from session file."""
    state_file = get_state_file()
    if os.path.exists(state_file):
        try:
            with open(state_file) as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return {}
    return {}


def save_state(state):
    """Save warning state to session file."""
    state_file = get_state_file()
    with open(state_file, "w") as f:
        json.dump(state, f)


def check_content(content, file_path):
    """Check content against security patterns. Return list of matched patterns."""
    matches = []
    for pattern in PATTERNS:
        # Check file extension match (simplified glob)
        exts = pattern["file_glob"].replace("*.", "").replace("{", "").replace("}", "").split(",")
        file_ext = os.path.splitext(file_path)[1].lstrip(".")
        if file_ext not in exts:
            continue

        if re.search(pattern["regex"], content):
            matches.append(pattern)
    return matches


def main():
    # Read hook input from stdin
    try:
        hook_input = json.load(sys.stdin)
    except (json.JSONDecodeError, IOError):
        sys.exit(0)  # Can't parse input, allow the tool

    tool_input = hook_input.get("tool_input", {})
    file_path = tool_input.get("file_path", "")
    content = tool_input.get("content", "") or tool_input.get("new_string", "")

    if not file_path or not content:
        sys.exit(0)  # No file or content to check

    # Check for security patterns
    matches = check_content(content, file_path)
    if not matches:
        sys.exit(0)  # No security concerns

    # Check state — only warn once per file+rule per session
    state = load_state()
    new_warnings = []

    for match in matches:
        key = f"{file_path}:{match['id']}"
        if key not in state:
            state[key] = True
            new_warnings.append(match)

    if not new_warnings:
        sys.exit(0)  # Already warned about these

    save_state(state)

    # Output warnings
    warnings = []
    for w in new_warnings:
        warnings.append(f"[{w['name']}] {w['message']}")

    warning_text = "\n".join(warnings)
    print(f"Security Warning for {file_path}:\n{warning_text}", file=sys.stderr)

    # Exit code 2 blocks the tool on first encounter
    sys.exit(2)


if __name__ == "__main__":
    main()
