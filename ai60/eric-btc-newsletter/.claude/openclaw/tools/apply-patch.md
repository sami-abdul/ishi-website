# apply_patch Tool Documentation

## Overview

The `apply_patch` tool enables file modifications through a structured patch format, designed for multi-file or multi-hunk edits requiring greater reliability than single `edit` calls.

## Input Format

The tool accepts a single `input` string parameter containing file operations wrapped with `*** Begin Patch` and `*** End Patch` markers:

```
*** Begin File: path/to/file.txt
+line 1
+line 2
*** Update File: src/app.ts
@@
-old line
+new line
*** Delete File: obsolete.txt
*** End Patch
```

## Key Features

- **Path Support**: Accepts relative paths (from workspace) and absolute paths
- **File Operations**: Add, update, and delete files within structured hunks
- **Renaming**: Use `*** Move to:` within an update hunk to rename files
- **EOF Handling**: Mark end-of-file inserts with `*** End of File`

## Configuration

- Default behavior restricts changes to the workspace directory (`workspaceOnly: true`)
- Set `tools.exec.applyPatch.workspaceOnly` to `false` only for intentional external writes
- Tool is experimental and disabled by default; enable via `tools.exec.applyPatch.enabled`
- Restricted to OpenAI models; optionally gate by model with `tools.exec.applyPatch.allowModels`
- Configuration resides under `tools.exec` namespace only

## Example Usage

```json
{
  "tool": "apply_patch",
  "input": "*** Begin Patch\n*** Update File: src/index.ts\n@@\n-const foo = 1\n+const foo = 2\n*** End Patch"
}
```
