#!/bin/bash

# MCP Setup Script for Documentation Generation System
# This script sets up ALL required MCP servers for the repository
# All MCPs are mandatory for full documentation generation capabilities

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MCP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${MCP_DIR}/../.." && pwd)"
MCP_SERVERS_DIR="$HOME/projects/mcp-servers"

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  MCP Setup for Documentation Generation${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""
echo "Project directory: $PROJECT_ROOT"
echo ""
echo "This script will set up ALL required MCP servers:"
echo "  ✓ mcp-atlassian (Jira/Confluence integration)"
echo "  ✓ context7 (Documentation access)"
echo "  ✓ browser-tools (Browser automation)"
echo "  ✓ figma-api (Figma design analysis)"
echo ""
echo "All MCPs are required for the documentation system to work properly."
echo ""

# Ensure we're in the correct project directory for MCP configuration
echo "Ensuring MCP setup is run from the correct project directory..."
cd "$PROJECT_ROOT"
echo "Current directory: $(pwd)"
echo ""

# Function to check if a command exists
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}ERROR: $1 is not installed or not in PATH${NC}"
        return 1
    else
        echo -e "${GREEN}✓ $1 found${NC}"
        return 0
    fi
}

# Function to check if Claude Code is installed and working
check_claude() {
    if ! command -v claude &> /dev/null; then
        echo -e "${RED}ERROR: Claude Code CLI is not installed${NC}"
        echo "Please install Claude Code first: https://claude.ai/code"
        exit 1
    fi
    
    # Test basic claude command
    if ! claude --version &> /dev/null; then
        echo -e "${RED}ERROR: Claude Code CLI is not working properly${NC}"
        echo "Please check your Claude Code installation"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Claude Code CLI is working${NC}"
}

# Function to prompt for missing environment variables
setup_environment() {
    echo -e "${YELLOW}Setting up environment configuration...${NC}"
    
    if [ ! -f "${MCP_DIR}/.env" ]; then
        if [ -f "${MCP_DIR}/.env.template" ]; then
            echo "Copying .env.template to .env..."
            cp "${MCP_DIR}/.env.template" "${MCP_DIR}/.env"
            echo -e "${YELLOW}Please edit .env file with your actual credentials:${NC}"
            echo "  1. Get Atlassian API tokens: https://id.atlassian.com/manage-profile/security/api-tokens"
            echo "  2. Get Figma API token: Figma → Settings → Security → Personal access tokens"
            echo "  3. Update company URLs and project filters"
            echo ""
            echo -e "${RED}After editing .env, run this script again.${NC}"
            exit 1
        else
            echo -e "${RED}ERROR: .env.template not found${NC}"
            exit 1
        fi
    fi
    
    # Load environment variables
    set -a
    source "${MCP_DIR}/.env"
    set +a
    
    # Check required variables
    local required_vars=(
        "JIRA_URL"
        "JIRA_USERNAME" 
        "JIRA_API_TOKEN"
        "CONFLUENCE_URL"
        "CONFLUENCE_USERNAME"
        "CONFLUENCE_API_TOKEN"
        "FIGMA_API_KEY"
    )
    
    local missing_vars=()
    for var in "${required_vars[@]}"; do
        var_value="${!var}"
        if [ -z "$var_value" ] || [[ "$var_value" == *"your_"*"_here" ]] || [[ "$var_value" == *"your-company"* ]] || [[ "$var_value" == *"your.email"* ]]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -gt 0 ]; then
        echo -e "${RED}ERROR: Please set the following required variables in .env:${NC}"
        for var in "${missing_vars[@]}"; do
            echo "  - $var"
        done
        echo ""
        echo "Edit .env file and set actual values, then run this script again."
        exit 1
    fi
    
    echo -e "${GREEN}✓ Environment configuration loaded${NC}"
}

# Function to setup Atlassian MCP
setup_atlassian_mcp() {
    echo -e "${YELLOW}Setting up Atlassian MCP...${NC}"
    
    # Ensure we're in the project directory
    cd "$PROJECT_ROOT"
    
    # Create MCP servers directory
    mkdir -p "$MCP_SERVERS_DIR"
    cd "$MCP_SERVERS_DIR"
    
    # Clone or update repository
    if [ -d "mcp-atlassian" ]; then
        echo "Updating existing mcp-atlassian..."
        cd mcp-atlassian
        git pull
    else
        echo "Cloning mcp-atlassian repository..."
        git clone https://github.com/sooperset/mcp-atlassian.git
        cd mcp-atlassian
    fi
    
    # Install dependencies
    echo "Installing dependencies..."
    uv sync
    
    # Copy environment variables
    cp "${MCP_DIR}/.env" .env
    
    # Return to project directory before adding MCP
    cd "$PROJECT_ROOT"
    
    # Add to Claude Code
    echo "Adding to Claude Code..."
    claude mcp remove mcp-atlassian -s local 2>/dev/null || true
    claude mcp add mcp-atlassian \
        --env "CONFLUENCE_URL=${CONFLUENCE_URL}" \
        --env "CONFLUENCE_USERNAME=${CONFLUENCE_USERNAME}" \
        --env "CONFLUENCE_API_TOKEN=${CONFLUENCE_API_TOKEN}" \
        --env "JIRA_URL=${JIRA_URL}" \
        --env "JIRA_USERNAME=${JIRA_USERNAME}" \
        --env "JIRA_API_TOKEN=${JIRA_API_TOKEN}" \
        --env "JIRA_PROJECTS_FILTER=${JIRA_PROJECTS_FILTER}" \
        --env "CONFLUENCE_SPACES_FILTER=${CONFLUENCE_SPACES_FILTER}" \
        -- uv run --directory "${MCP_SERVERS_DIR}/mcp-atlassian" mcp-atlassian
    
    echo -e "${GREEN}✓ Atlassian MCP configured${NC}"
}

# Function to setup Context7 MCP
setup_context7_mcp() {
    echo -e "${YELLOW}Setting up Context7 MCP...${NC}"
    
    # Ensure we're in the project directory
    cd "$PROJECT_ROOT"
    
    claude mcp remove context7 -s local 2>/dev/null || true
    claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
    
    echo -e "${GREEN}✓ Context7 MCP configured${NC}"
}

# Function to setup Browser Tools MCP
setup_browser_tools_mcp() {
    echo -e "${YELLOW}Setting up Browser Tools MCP...${NC}"
    
    # Ensure we're in the project directory
    cd "$PROJECT_ROOT"
    
    # Remove existing configuration
    claude mcp remove browser-tools -s local 2>/dev/null || true
    
    # Add browser tools MCP
    claude mcp add browser-tools \
        --env "BROWSER_TOOLS_SERVER_URL=${BROWSER_TOOLS_SERVER_URL:-http://localhost:3025}" \
        -- npx -y @agentdeskai/browser-tools-mcp@latest
    
    echo -e "${GREEN}✓ Browser Tools MCP configured${NC}"
    echo -e "${YELLOW}NOTE: Browser Tools server must be running separately:${NC}"
    echo "  npx @agentdeskai/browser-tools-server@latest"
}

# Function to setup Figma API MCP
setup_figma_mcp() {
    echo -e "${YELLOW}Setting up Figma API MCP...${NC}"
    
    # Ensure we're in the project directory
    cd "$PROJECT_ROOT"
    
    claude mcp remove figma-api -s local 2>/dev/null || true
    claude mcp add figma-api \
        --env "FIGMA_API_KEY=${FIGMA_API_KEY}" \
        -- npx -y figma-developer-mcp --figma-api-key="${FIGMA_API_KEY}" --stdio
    
    echo -e "${GREEN}✓ Figma API MCP configured${NC}"
}

# Function to verify MCP connections
verify_mcps() {
    echo -e "${YELLOW}Verifying MCP connections...${NC}"
    
    # Get MCP status
    echo "Checking MCP server status..."
    claude mcp list
    
    echo ""
    echo -e "${GREEN}✓ All MCPs configured successfully!${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Start browser tools server in a separate terminal:"
    echo "   npx @agentdeskai/browser-tools-server@latest"
    echo ""
    echo "2. Test the documentation agents:"
    echo "   > Use the tech-doc-generator to document a component with Figma URL"
    echo ""
    echo "3. Check MCP status anytime with:"
    echo "   claude mcp list"
}

# Main execution
main() {
    echo -e "${YELLOW}Checking prerequisites...${NC}"
    
    # Check required tools
    local tools_ok=true
    check_command "node" || tools_ok=false
    check_command "npm" || tools_ok=false
    check_command "uv" || tools_ok=false
    check_command "git" || tools_ok=false
    check_claude
    
    if [ "$tools_ok" = false ]; then
        echo -e "${RED}Please install missing tools and try again.${NC}"
        echo "Installation guides:"
        echo "  - Node.js: https://nodejs.org/"
        echo "  - uv: https://docs.astral.sh/uv/getting-started/installation/"
        echo "  - Git: https://git-scm.com/downloads"
        exit 1
    fi
    
    # Setup environment
    setup_environment
    
    echo -e "${YELLOW}Installing MCP servers...${NC}"
    
    # Setup all required MCPs
    setup_atlassian_mcp
    setup_context7_mcp
    setup_browser_tools_mcp
    setup_figma_mcp
    
    # Verify setup
    verify_mcps
    
    echo ""
    echo -e "${GREEN}================================================${NC}"
    echo -e "${GREEN}  MCP Setup Complete!${NC}"
    echo -e "${GREEN}================================================${NC}"
    echo ""
    echo "All required MCP servers are now configured."
    echo "The documentation generation agents are ready to use."
}

# Run main function
main "$@"