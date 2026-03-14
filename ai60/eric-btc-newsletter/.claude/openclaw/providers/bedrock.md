# Amazon Bedrock Integration

OpenClaw supports Amazon Bedrock models through pi-ai's Bedrock Converse streaming provider, leveraging AWS SDK credentials rather than API keys.

## Key Features

**Supported Configuration:**
- Provider identifier: `amazon-bedrock`
- API type: `bedrock-converse-stream`
- Authentication method: AWS credential chain (environment variables, shared config, or instance roles)
- Default region: `us-east-1`

## Automatic Model Discovery

When AWS credentials are present, OpenClaw can automatically identify compatible Bedrock models. The discovery process filters for models supporting streaming and text output, with results cached for one hour by default.

Configuration settings include options to enable/disable discovery, specify regions, filter by provider names like "anthropic" or "amazon," adjust cache duration, and set default context window and token limits.

## Setup Requirements

To onboard, you need AWS credentials on the gateway host. These can be provided through:
- Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
- Regional settings (`AWS_REGION` or `AWS_DEFAULT_REGION`)
- Optional session tokens and profile names
- Bearer tokens for Bedrock API access

The configuration requires specifying a provider with the appropriate base URL, API type, and model definitions including context windows and token limits.

## EC2 Instance Role Considerations

When running on EC2 with an IAM role, the AWS SDK automatically authenticates via instance metadata service. However, credential detection requires setting `AWS_PROFILE=default` as a workaround signal.

Required IAM permissions include `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, and `bedrock:ListFoundationModels` for discovery capabilities.
