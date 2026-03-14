# Creating Custom Skills in OpenClaw

OpenClaw enables extensibility through "skills"—directories containing a `SKILL.md` file with instructions and optional supporting resources.

## Setup Process

To build your first skill, create a directory in `~/.openclaw/workspace/skills/` and add a `SKILL.md` file using YAML frontmatter for metadata. The file should include the skill name, description, and markdown instructions for the LLM.

According to the documentation, you should "instruct the model on *what* to do, not how to be an AI." This approach keeps guidance focused and effective.

## Key Considerations

The guide emphasizes three core principles:

1. **Clarity**: Keep instructions concise and task-focused
2. **Security**: When using bash tools, prevent command injection vulnerabilities from user inputs
3. **Validation**: Test new skills locally before deployment

## Discovery and Distribution

After creating a skill, refresh OpenClaw to index your new capability. The platform also supports community contribution through ClawHub, where developers can share and discover additional skills.

For complete documentation, the guide references a comprehensive index available at the docs site's llms.txt file.
