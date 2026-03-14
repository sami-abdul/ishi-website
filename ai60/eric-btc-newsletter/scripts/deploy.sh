#!/bin/bash
# =============================================================================
# Agent Deployment Script
# eric-btc-newsletter
# =============================================================================
#
# Usage:
#   ./deploy.sh                # Deploy workspace files only (local)
#   ./deploy.sh --setup        # Deploy + run post-deployment setup (cron jobs)
#   ./deploy.sh --docker       # Deploy via Docker Compose
#   ./deploy.sh --docker-build # Build and deploy via Docker Compose
#
# =============================================================================

set -e

# Parse arguments
RUN_SETUP=false
DOCKER_MODE=false
DOCKER_BUILD=false
for arg in "$@"; do
    case $arg in
        --setup)
            RUN_SETUP=true
            shift
            ;;
        --docker)
            DOCKER_MODE=true
            shift
            ;;
        --docker-build)
            DOCKER_MODE=true
            DOCKER_BUILD=true
            shift
            ;;
    esac
done

# =============================================================================
# CONFIGURATION
# =============================================================================
DEPLOY_TARGET="local"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKSPACE_DIR="$PROJECT_ROOT/workspace"
PROJECT_NAME="eric-btc-newsletter"
# =============================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== Agent Deployment ===${NC}"
echo "Target: $DEPLOY_TARGET"
echo "Project: $PROJECT_NAME"
echo "Mode: $([ "$DOCKER_MODE" = true ] && echo 'Docker' || echo 'Local')"
echo ""

# =============================================================================
# Docker Deployment Mode
# =============================================================================
if [ "$DOCKER_MODE" = true ]; then
    echo -e "${YELLOW}[1/3] Preparing Docker deployment...${NC}"

    if ! command -v docker &> /dev/null; then
        echo -e "${RED}Error: docker not installed${NC}"
        exit 1
    fi

    if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}Error: docker compose not installed${NC}"
        exit 1
    fi

    COMPOSE_CMD="docker compose"
    if ! command -v docker compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
    fi

    echo -e "${YELLOW}[2/3] $([ "$DOCKER_BUILD" = true ] && echo 'Building and starting' || echo 'Starting') containers...${NC}"
    if [ "$DOCKER_BUILD" = true ]; then
        $COMPOSE_CMD -f "$PROJECT_ROOT/docker-compose.yml" up -d --build
    else
        $COMPOSE_CMD -f "$PROJECT_ROOT/docker-compose.yml" up -d
    fi

    echo -e "${YELLOW}[3/3] Verifying containers...${NC}"
    $COMPOSE_CMD -f "$PROJECT_ROOT/docker-compose.yml" ps

    echo ""
    echo -e "${GREEN}=== Docker Deployment Complete ===${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Check logs:    $COMPOSE_CMD logs -f"
    echo "  2. Check health:  $COMPOSE_CMD exec openclaw-gateway openclaw gateway health"
    echo "  3. Stop:          $COMPOSE_CMD down"
    echo ""
    exit 0
fi

# =============================================================================
# Local Deployment Mode
# =============================================================================

# Function to run command locally
run_remote() {
    bash -c "$1"
}

# Function to copy file locally
copy_to_remote() {
    local src="$1"
    local dest="$2"
    cp "$src" "$dest"
}

# Function to copy directory locally
copy_dir_to_remote() {
    local src="$1"
    local dest="$2"
    cp -r "$src" "$dest"
}

# =============================================================================
# Step 1: Verify connection
# =============================================================================
echo -e "${YELLOW}[1/6] Verifying local environment...${NC}"
echo -e "${GREEN}Local deployment - connected${NC}"

# =============================================================================
# Step 2: Create workspace directories
# =============================================================================
echo -e "${YELLOW}[2/6] Creating workspace directories...${NC}"
run_remote "mkdir -p ~/.openclaw/workspace/{skills,knowledge,memory,scripts,context}"
echo -e "${GREEN}Directories created${NC}"

# =============================================================================
# Step 3: Copy workspace files
# =============================================================================
echo -e "${YELLOW}[3/6] Copying workspace files...${NC}"

# Copy bootstrap files
for file in IDENTITY.md SOUL.md USER.md AGENTS.md TOOLS.md MEMORY.md CRON_JOBS.md; do
    if [ -f "$WORKSPACE_DIR/$file" ]; then
        echo "  Copying $file..."
        copy_to_remote "$WORKSPACE_DIR/$file" "~/.openclaw/workspace/$file"
    fi
done

# Copy knowledge base
if [ -d "$WORKSPACE_DIR/knowledge" ]; then
    echo "  Copying knowledge base..."
    copy_dir_to_remote "$WORKSPACE_DIR/knowledge" "~/.openclaw/workspace/"
fi

# Copy custom skills
if [ -d "$WORKSPACE_DIR/skills" ]; then
    echo "  Copying custom skills..."
    copy_dir_to_remote "$WORKSPACE_DIR/skills" "~/.openclaw/workspace/"
fi

# Copy scripts
if [ -d "$WORKSPACE_DIR/scripts" ]; then
    echo "  Copying scripts..."
    TMP_SCRIPTS=$(mktemp -d)
    mkdir -p "$TMP_SCRIPTS/scripts"
    for script in "$WORKSPACE_DIR/scripts"/*; do
        script_name=$(basename "$script")
        cp "$script" "$TMP_SCRIPTS/scripts/"
    done
    copy_dir_to_remote "$TMP_SCRIPTS/scripts" "~/.openclaw/workspace/"
    rm -rf "$TMP_SCRIPTS"
fi

# Copy context directories
echo "  Copying context..."
run_remote "mkdir -p ~/.openclaw/workspace/context"

# Copy owner context
REPO_ROOT="$(cd "$PROJECT_ROOT/../../.." && pwd)"
if [ -d "$REPO_ROOT/owner" ]; then
    echo "    Copying owner context..."
    copy_dir_to_remote "$REPO_ROOT/owner" "~/.openclaw/workspace/context/"
fi

echo -e "${GREEN}Workspace files copied${NC}"

# =============================================================================
# Step 4: Check configuration
# =============================================================================
echo -e "${YELLOW}[4/6] Checking configuration...${NC}"

if run_remote "test -f ~/.openclaw/.env" 2>/dev/null; then
    echo "  .env already exists"
else
    echo -e "${YELLOW}  .env not found. Configure manually.${NC}"
fi

if run_remote "test -f ~/.openclaw/openclaw.json" 2>/dev/null; then
    echo "  openclaw.json already exists"
    echo "  Updating workspace path..."
    run_remote "cd ~/.openclaw && jq '.agents.defaults.workspace = \"~/.openclaw/workspace\"' openclaw.json > openclaw.json.tmp && mv openclaw.json.tmp openclaw.json"
fi

echo -e "${GREEN}Configuration checked${NC}"

# =============================================================================
# Step 5: Set permissions
# =============================================================================
echo -e "${YELLOW}[5/6] Setting file permissions...${NC}"
run_remote "chmod 600 ~/.openclaw/.env 2>/dev/null || true"
run_remote "chmod 644 ~/.openclaw/openclaw.json 2>/dev/null || true"
echo -e "${GREEN}Permissions set${NC}"

# =============================================================================
# Step 6: Restart gateway
# =============================================================================
echo -e "${YELLOW}[6/6] Restarting OpenClaw gateway...${NC}"
run_remote "export PATH=\$HOME/.npm-global/bin:\$PATH && openclaw gateway restart" || {
    echo -e "${YELLOW}Gateway restart failed - may need manual restart${NC}"
}

# =============================================================================
# Step 7 (Optional): Run post-deployment setup
# =============================================================================
if [ "$RUN_SETUP" = true ]; then
    echo -e "${YELLOW}[7/7] Running post-deployment setup...${NC}"
    if [ -f "$SCRIPT_DIR/setup.sh" ]; then
        echo "  Running setup.sh..."
        chmod +x "$SCRIPT_DIR/setup.sh"
        "$SCRIPT_DIR/setup.sh"
        echo -e "${GREEN}Setup complete${NC}"
    else
        echo -e "${YELLOW}  No setup.sh found, skipping...${NC}"
    fi
fi

# Summary
echo ""
echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo ""
echo "Next steps:"
echo "  1. Configure .env:    nano ~/.openclaw/.env"
echo "  2. Verify skills:     openclaw skills list"
echo "  3. Check status:      openclaw gateway status"
echo ""

if [ "$RUN_SETUP" = false ]; then
    echo "To run post-deployment setup (cron jobs):"
    echo "  ./deploy.sh --setup"
    echo ""
fi
