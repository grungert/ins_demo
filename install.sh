#!/bin/bash

# Documentation Repository Installer
# This script handles the complete installation including:
# - Agent system files (.claude/)
# - Claude Code CLI verification
# - Memory bank initialization
# - Interactive template setup
# Usage: curl -sSL https://raw.githubusercontent.com/your-org/your-repo/main/install.sh | bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Progress indicators
TOTAL_STEPS=11
CURRENT_STEP=0

# Installation modes
MODE="install"  # install, update, repair, verify

show_progress() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    echo ""
    echo -e "${BLUE}[Step $CURRENT_STEP/$TOTAL_STEPS] $1${NC}"
    echo "----------------------------------------"
}

show_banner() {
    echo -e "${BLUE}========================================================${NC}"
    echo -e "${BLUE}     Documentation Repository Installer                ${NC}"
    echo -e "${BLUE}     Memory Bank & Agent System Setup                  ${NC}"
    echo -e "${BLUE}========================================================${NC}"
    echo ""
}

# Function to check if a command exists
check_command() {
    if ! command -v "$1" &> /dev/null; then
        return 1
    else
        return 0
    fi
}

# Function to check Claude Code CLI
check_claude_code() {
    show_progress "Checking Claude Code CLI"

    if ! check_command "claude"; then
        echo -e "${RED}✗ Claude Code CLI not found${NC}"
        echo ""
        echo "Claude Code is required for this documentation system to work."
        echo ""
        echo -e "${YELLOW}Installation instructions:${NC}"
        echo "1. Visit: https://claude.ai/code"
        echo "2. Download and install Claude Code for your platform"
        echo "3. Verify installation with: claude --version"
        echo "4. Re-run this installer"
        echo ""
        read -p "Would you like to open the download page? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            if check_command "open"; then
                open "https://claude.ai/code"
            elif check_command "xdg-open"; then
                xdg-open "https://claude.ai/code"
            else
                echo "Please visit https://claude.ai/code to download Claude Code"
            fi
        fi
        exit 1
    fi

    # Test Claude Code is working
    if ! claude --version &> /dev/null; then
        echo -e "${RED}✗ Claude Code CLI found but not working properly${NC}"
        echo "Please check your Claude Code installation"
        exit 1
    fi

    echo -e "${GREEN}✓ Claude Code CLI is installed and working${NC}"
}

# Function to check required tools
check_prerequisites() {
    show_progress "Checking system prerequisites"

    local missing_tools=()

    echo "Checking required tools..."

    # Check Git
    if ! check_command "git"; then
        missing_tools+=("git")
        echo -e "${RED}✗ git not found${NC}"
    else
        echo -e "${GREEN}✓ git $(git --version 2>/dev/null | cut -d' ' -f3)${NC}"
    fi

    # If tools are missing, provide installation instructions
    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo ""
        echo -e "${RED}Missing required tool: git${NC}"
        echo ""
        echo "Installation instructions:"
        echo "  Git: https://git-scm.com/downloads"
        echo ""
        read -p "Install git and run installer again. Exit now? (Y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Nn]$ ]]; then
            exit 1
        fi
    fi

    echo -e "${GREEN}✓ All prerequisites met${NC}"
}

# Function to detect existing installation
detect_existing_installation() {
    show_progress "Detecting existing installation"

    local has_claude=false
    local has_memory=false
    local has_claudemd=false

    [ -d ".claude" ] && has_claude=true
    [ -d ".memory-bank" ] && has_memory=true
    [ -f "CLAUDE.md" ] && has_claudemd=true

    if $has_claude || $has_memory || $has_claudemd; then
        echo -e "${YELLOW}Existing documentation system files detected:${NC}"
        $has_claude && echo "  • .claude/"
        $has_memory && echo "  • .memory-bank/"
        $has_claudemd && echo "  • CLAUDE.md"
        echo ""
        echo "What would you like to do?"
        echo "  1. Update existing installation"
        echo "  2. Backup and reinstall"
        echo "  3. Repair installation"
        echo "  4. Cancel"

        read -p "Choose (1-4): " -n 1 -r
        echo

        case $REPLY in
            1)
                MODE="update"
                echo -e "${BLUE}Update mode selected${NC}"
                ;;
            2)
                echo -e "${YELLOW}Creating backup...${NC}"
                BACKUP_DIR="docs-backup-$(date +%Y%m%d_%H%M%S 2>/dev/null || echo "$(date | tr ' :' '__')")"
                mkdir -p "$BACKUP_DIR"

                $has_claude && mv .claude "$BACKUP_DIR/"
                $has_memory && mv .memory-bank "$BACKUP_DIR/"
                $has_claudemd && mv CLAUDE.md "$BACKUP_DIR/"

                echo -e "${GREEN}✓ Files backed up to: $BACKUP_DIR${NC}"
                MODE="install"
                ;;
            3)
                MODE="repair"
                echo -e "${BLUE}Repair mode selected${NC}"
                ;;
            4)
                echo "Installation cancelled."
                exit 0
                ;;
            *)
                echo "Invalid choice. Installation cancelled."
                exit 1
                ;;
        esac
    else
        echo -e "${GREEN}✓ No existing installation detected${NC}"
        MODE="install"
    fi
}

# Helper function to ask if file should be overridden
ask_override() {
    local file=$1
    echo -n "$file exists. Override? (y/N): "
    read -r -n 1 response
    echo
    [[ $response =~ ^[Yy]$ ]]
}

# Function to ensure memory bank directory structure exists
ensure_memory_bank_structure() {
    echo "Creating memory bank directory structure..."
    mkdir -p .memory-bank/docs/completed-docs
    mkdir -p .memory-bank/docs/research-sessions
    mkdir -p .memory-bank/docs/component-patterns
    mkdir -p .memory-bank/docs/documentation-practices
    mkdir -p .memory-bank/docs/design-decisions
    mkdir -p .memory-bank/.logs
    echo -e "${GREEN}✓ Memory bank structure created${NC}"
}

# Function to install system files
install_system_files() {
    show_progress "Installing documentation system files"

    # Create temporary directory
    TEMP_DIR="docs-install-temp-$$"

    # Clone the repository
    echo "Downloading latest version from feature/agent-improvements branch..."
    if ! git clone --quiet -b feature/agent-improvements https://github.com/bildstudio/bildai-hillmetrics-mind-docs.git "$TEMP_DIR" 2>/dev/null; then
        echo -e "${RED}✗ Failed to download documentation system${NC}"
        echo "Please check your internet connection and try again."
        exit 1
    fi

    if [ "$MODE" = "update" ] || [ "$MODE" = "repair" ]; then
        # Update mode - selective copying
        if [ -d "$TEMP_DIR/.claude" ]; then
            echo "Updating agent files..."
            if [ -d ".claude" ]; then
                if ask_override ".claude"; then
                    cp -r "$TEMP_DIR/.claude" ./
                fi
            else
                cp -r "$TEMP_DIR/.claude" ./
            fi
        fi

        if [ -f "$TEMP_DIR/CLAUDE.md" ]; then
            echo "Updating workflow guide..."
            if [ -f "CLAUDE.md" ]; then
                if ask_override "CLAUDE.md"; then
                    cp "$TEMP_DIR/CLAUDE.md" ./
                fi
            else
                cp "$TEMP_DIR/CLAUDE.md" ./
            fi
        fi
    else
        # Fresh install
        if [ -d "$TEMP_DIR/.claude" ]; then
            echo "Installing agent files..."
            cp -r "$TEMP_DIR/.claude" ./ || { echo -e "${RED}✗ Failed to copy .claude${NC}"; exit 1; }
        fi

        if [ -f "$TEMP_DIR/CLAUDE.md" ]; then
            echo "Installing workflow guide..."
            cp "$TEMP_DIR/CLAUDE.md" ./ || { echo -e "${RED}✗ Failed to copy CLAUDE.md${NC}"; exit 1; }
        fi
    fi

    # Ensure memory bank structure exists
    ensure_memory_bank_structure

    # Verify installation
    if [ ! -d ".claude" ]; then
        echo -e "${RED}✗ .claude directory missing after installation${NC}"
        exit 1
    fi

    if [ ! -f "CLAUDE.md" ]; then
        echo -e "${RED}✗ CLAUDE.md missing after installation${NC}"
        exit 1
    fi

    # Clean up
    rm -rf "$TEMP_DIR"

    echo -e "${GREEN}✓ System files installed successfully${NC}"
}

# Function to open file in default editor
open_in_editor() {
    local file=$1
    if check_command "code"; then
        code "$file"
    elif check_command "$EDITOR"; then
        $EDITOR "$file"
    elif check_command "nano"; then
        nano "$file"
    elif check_command "vi"; then
        vi "$file"
    else
        echo -e "${YELLOW}No editor found. Please edit manually: $file${NC}"
    fi
}

# Function to configure API tokens interactively
configure_api_tokens() {
    echo ""
    echo -e "${BLUE}API Token Configuration${NC}"
    echo "========================"
    echo ""
    echo "Leave blank to skip any service you don't use."
    echo ""

    ENV_FILE=".claude/mcp/.env"

    # Atlassian configuration
    echo -e "${YELLOW}Atlassian (Jira/Confluence)${NC}"
    read -p "Jira URL (e.g., https://company.atlassian.net): " jira_url
    if [ -n "$jira_url" ]; then
        read -p "Email: " jira_email
        read -s -p "API Token: " jira_token
        echo

        # Update .env file with cross-platform sed
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i.bak "s|JIRA_URL=.*|JIRA_URL=\"$jira_url\"|" "$ENV_FILE"
            sed -i.bak "s|JIRA_USERNAME=.*|JIRA_USERNAME=\"$jira_email\"|" "$ENV_FILE"
            sed -i.bak "s|JIRA_API_TOKEN=.*|JIRA_API_TOKEN=\"$jira_token\"|" "$ENV_FILE"
            sed -i.bak "s|CONFLUENCE_URL=.*|CONFLUENCE_URL=\"$jira_url/wiki\"|" "$ENV_FILE"
            sed -i.bak "s|CONFLUENCE_USERNAME=.*|CONFLUENCE_USERNAME=\"$jira_email\"|" "$ENV_FILE"
            sed -i.bak "s|CONFLUENCE_API_TOKEN=.*|CONFLUENCE_API_TOKEN=\"$jira_token\"|" "$ENV_FILE"
            rm -f "$ENV_FILE.bak"
        else
            sed -i "s|JIRA_URL=.*|JIRA_URL=\"$jira_url\"|" "$ENV_FILE"
            sed -i "s|JIRA_USERNAME=.*|JIRA_USERNAME=\"$jira_email\"|" "$ENV_FILE"
            sed -i "s|JIRA_API_TOKEN=.*|JIRA_API_TOKEN=\"$jira_token\"|" "$ENV_FILE"
            sed -i "s|CONFLUENCE_URL=.*|CONFLUENCE_URL=\"$jira_url/wiki\"|" "$ENV_FILE"
            sed -i "s|CONFLUENCE_USERNAME=.*|CONFLUENCE_USERNAME=\"$jira_email\"|" "$ENV_FILE"
            sed -i "s|CONFLUENCE_API_TOKEN=.*|CONFLUENCE_API_TOKEN=\"$jira_token\"|" "$ENV_FILE"
        fi
    fi

    echo ""
    echo -e "${YELLOW}Figma${NC}"
    read -s -p "Figma API Key (or press Enter to skip): " figma_key
    echo
    if [ -n "$figma_key" ]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i.bak "s|FIGMA_API_KEY=.*|FIGMA_API_KEY=\"$figma_key\"|" "$ENV_FILE"
            rm -f "$ENV_FILE.bak"
        else
            sed -i "s|FIGMA_API_KEY=.*|FIGMA_API_KEY=\"$figma_key\"|" "$ENV_FILE"
        fi
    fi

    echo ""
    echo -e "${GREEN}✓ API tokens configured${NC}"
}

# Function to setup environment
setup_environment() {
    show_progress "Configuring environment"

    ENV_FILE=".claude/mcp/.env"

    # Check if .env exists
    if [ -f "$ENV_FILE" ]; then
        # Load and check existing configuration
        set -a
        source "$ENV_FILE" 2>/dev/null || true
        set +a

        # Check if it has placeholder values
        if [[ "${JIRA_URL:-}" == *"your-company"* ]] || \
           [[ "${JIRA_USERNAME:-}" == *"your.email"* ]] || \
           [[ "${JIRA_API_TOKEN:-}" == *"your_"*"_here" ]] || \
           [ -z "${JIRA_API_TOKEN:-}" ]; then
            echo -e "${YELLOW}Environment configuration needs setup${NC}"
            NEEDS_CONFIG=true
        else
            echo -e "${GREEN}✓ Environment already configured${NC}"
            NEEDS_CONFIG=false
        fi
    else
        # Create from template
        if [ -f ".claude/mcp/.env.template" ]; then
            cp .claude/mcp/.env.template "$ENV_FILE"
            echo -e "${YELLOW}Created .env from template${NC}"
            NEEDS_CONFIG=true
        else
            echo -e "${RED}✗ .env.template not found${NC}"
            exit 1
        fi
    fi

    # Interactive configuration if needed
    if $NEEDS_CONFIG; then
        echo ""
        echo "MCP servers require API tokens for external services."
        echo ""
        read -p "Would you like to configure API tokens now? (y/N): " -n 1 -r
        echo

        if [[ $REPLY =~ ^[Yy]$ ]]; then
            configure_api_tokens
        else
            echo ""
            echo -e "${YELLOW}You'll need to configure API tokens later:${NC}"
            echo "  1. Edit: $ENV_FILE"
            echo "  2. Add your API tokens"
            echo "  3. Run: .claude/mcp/setup-mcps.sh"
            echo ""
            echo "Token acquisition:"
            echo "  - Atlassian: https://id.atlassian.com/manage-profile/security/api-tokens"
            echo "  - Figma: Settings > Security > Personal access tokens"
        fi
    fi
}

# Function to install MCP servers
install_mcp_servers() {
    show_progress "Installing MCP servers"

    # Check if setup script exists
    if [ ! -f ".claude/mcp/setup-mcps.sh" ]; then
        echo -e "${RED}✗ MCP setup script not found${NC}"
        exit 1
    fi

    # Make script executable
    chmod +x .claude/mcp/setup-mcps.sh

    # Check if we have valid configuration
    ENV_FILE=".claude/mcp/.env"
    if [ -f "$ENV_FILE" ]; then
        set -a
        source "$ENV_FILE" 2>/dev/null || true
        set +a

        # Check if tokens are configured
        if [[ "${JIRA_API_TOKEN:-}" == *"your_"*"_here" ]] || [ -z "${JIRA_API_TOKEN:-}" ]; then
            echo -e "${YELLOW}⚠ API tokens not configured${NC}"
            echo "MCP servers will be installed but may not work without tokens."
            echo ""
            read -p "Continue anyway? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "Skipping MCP installation. You can run .claude/mcp/setup-mcps.sh later."
                return
            fi
        fi
    fi

    echo "Running MCP setup..."

    # Run the MCP setup script
    if .claude/mcp/setup-mcps.sh; then
        echo -e "${GREEN}✓ MCP servers installed${NC}"
    else
        echo -e "${YELLOW}⚠ MCP setup completed with warnings${NC}"
        echo "You may need to configure API tokens and re-run .claude/mcp/setup-mcps.sh"
    fi
}

# Function to setup memory bank templates
setup_memory_bank_templates() {
    show_progress "Setting up memory bank templates"

    echo -e "${BLUE}Memory Bank Initialization${NC}"
    echo "The documentation agents require 3 core files for project context:"
    echo ""

    local templates_to_setup=(
        "project-brief:Project context and requirements"
        "system-patterns:Component architecture patterns"
        "tech-context:Technical constraints and design system"
    )

    for template_info in "${templates_to_setup[@]}"; do
        local template_name=$(echo "$template_info" | cut -d: -f1)
        local template_desc=$(echo "$template_info" | cut -d: -f2)
        local template_file=".claude/templates/${template_name}.template.md"
        local target_file=".memory-bank/${template_name}.md"

        echo ""
        echo -e "${BLUE}${template_name}.md${NC} - ${template_desc}"

        if [ -f "$target_file" ]; then
            echo -e "${YELLOW}  File already exists: $target_file${NC}"
            read -p "  Override? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "  Skipping..."
                continue
            fi
        fi

        if [ -f "$template_file" ]; then
            # Automatically copy template
            cp "$template_file" "$target_file"
            echo -e "  ${GREEN}✓ Template copied to $target_file${NC}"

            read -p "  Would you like to fill it now? (Y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Nn]$ ]]; then
                echo "  Opening in editor... (Please fill [PLACEHOLDERS])"
                open_in_editor "$target_file"
                echo ""
                read -p "  Press Enter when done..."
                echo -e "  ${GREEN}✓ You can edit anytime: $target_file${NC}"
            else
                echo -e "  ${YELLOW}You can fill this later: $target_file${NC}"
            fi
        else
            echo -e "  ${YELLOW}Warning: Template not found: $template_file${NC}"
        fi
    done

    echo ""
    echo -e "${GREEN}✓ Memory bank template setup complete${NC}"
}

# Function to validate installation
validate_installation() {
    show_progress "Validating installation"

    local errors=0

    echo "Checking required files and directories..."

    # Check .claude directory
    if [ -d ".claude" ]; then
        echo -e "${GREEN}✓ .claude/${NC}"

        # Check subdirectories
        [ -d ".claude/agents" ] && echo -e "${GREEN}  ✓ agents/${NC}" || { echo -e "${RED}  ✗ agents/ missing${NC}"; errors=$((errors + 1)); }
        [ -d ".claude/hooks" ] && echo -e "${GREEN}  ✓ hooks/${NC}" || { echo -e "${YELLOW}  ! hooks/ missing (optional)${NC}"; }
        [ -d ".claude/templates" ] && echo -e "${GREEN}  ✓ templates/${NC}" || { echo -e "${RED}  ✗ templates/ missing${NC}"; errors=$((errors + 1)); }
        [ -f ".claude/update-archive-stats.sh" ] && echo -e "${GREEN}  ✓ update-archive-stats.sh${NC}" || { echo -e "${YELLOW}  ! update-archive-stats.sh missing (optional)${NC}"; }
    else
        echo -e "${RED}✗ .claude/ directory missing${NC}"
        errors=$((errors + 1))
    fi

    # Check .memory-bank structure
    if [ -d ".memory-bank" ]; then
        echo -e "${GREEN}✓ .memory-bank/${NC}"

        # Check required subdirectories
        [ -d ".memory-bank/docs" ] && echo -e "${GREEN}  ✓ docs/${NC}" || { echo -e "${RED}  ✗ docs/ missing${NC}"; errors=$((errors + 1)); }
        [ -d ".memory-bank/docs/completed-docs" ] && echo -e "${GREEN}  ✓ docs/completed-docs/${NC}" || { echo -e "${RED}  ✗ docs/completed-docs/ missing${NC}"; errors=$((errors + 1)); }
        [ -d ".memory-bank/docs/research-sessions" ] && echo -e "${GREEN}  ✓ docs/research-sessions/${NC}" || { echo -e "${RED}  ✗ docs/research-sessions/ missing${NC}"; errors=$((errors + 1)); }

        # Check core files
        [ -f ".memory-bank/project-brief.md" ] && echo -e "${GREEN}  ✓ project-brief.md${NC}" || { echo -e "${YELLOW}  ! project-brief.md not initialized${NC}"; }
        [ -f ".memory-bank/system-patterns.md" ] && echo -e "${GREEN}  ✓ system-patterns.md${NC}" || { echo -e "${YELLOW}  ! system-patterns.md not initialized${NC}"; }
        [ -f ".memory-bank/tech-context.md" ] && echo -e "${GREEN}  ✓ tech-context.md${NC}" || { echo -e "${YELLOW}  ! tech-context.md not initialized${NC}"; }
    else
        echo -e "${RED}✗ .memory-bank/ directory missing${NC}"
        errors=$((errors + 1))
    fi

    # Check CLAUDE.md
    if [ -f "CLAUDE.md" ]; then
        echo -e "${GREEN}✓ CLAUDE.md${NC}"
    else
        echo -e "${RED}✗ CLAUDE.md missing${NC}"
        errors=$((errors + 1))
    fi

    echo ""
    if [ $errors -eq 0 ]; then
        echo -e "${GREEN}✓ All required files and directories present${NC}"
        return 0
    else
        echo -e "${RED}✗ Installation has $errors error(s)${NC}"
        return 1
    fi
}

# Function to run health check
run_health_check() {
    show_progress "Running system health check"

    local warnings=0

    # Check if agents are accessible
    if [ -d ".claude/agents" ]; then
        local agent_count=$(find .claude/agents -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')
        if [ "$agent_count" -gt 0 ]; then
            echo -e "${GREEN}✓ Found $agent_count agent(s)${NC}"
        else
            echo -e "${YELLOW}! No agent files found${NC}"
            warnings=$((warnings + 1))
        fi
    fi

    # Check if templates exist
    if [ -d ".claude/templates" ]; then
        local template_count=$(find .claude/templates -name "*.template.md" -type f 2>/dev/null | wc -l | tr -d ' ')
        if [ "$template_count" -gt 0 ]; then
            echo -e "${GREEN}✓ Found $template_count template(s)${NC}"
        else
            echo -e "${YELLOW}! No template files found${NC}"
            warnings=$((warnings + 1))
        fi
    fi

    # Check MCP configuration
    if [ -f ".claude/mcp/.env" ]; then
        # Check if .env has been configured (not using placeholder values)
        if grep -q "your-company\|your_.*_here" ".claude/mcp/.env" 2>/dev/null; then
            echo -e "${YELLOW}! MCP servers not configured (placeholder tokens in .env)${NC}"
            echo "    Run: .claude/mcp/setup-mcps.sh"
            warnings=$((warnings + 1))
        else
            echo -e "${GREEN}✓ MCP servers configured${NC}"
        fi
    else
        echo -e "${YELLOW}! MCP configuration missing (.claude/mcp/.env)${NC}"
        echo "    Run: .claude/mcp/setup-mcps.sh"
        warnings=$((warnings + 1))
    fi

    # Check if hooks are executable
    if [ -d ".claude/hooks" ]; then
        local hook_count=$(find .claude/hooks -name "*.sh" -type f 2>/dev/null | wc -l | tr -d ' ')
        if [ "$hook_count" -gt 0 ]; then
            echo -e "${GREEN}✓ Found $hook_count hook(s)${NC}"
        else
            echo -e "${YELLOW}! No hook files found${NC}"
            warnings=$((warnings + 1))
        fi
    fi

    # Check if memory bank core files are filled
    local unfilled_files=()
    for file in project-brief.md system-patterns.md tech-context.md; do
        if [ -f ".memory-bank/$file" ]; then
            if grep -q "\[.*\]" ".memory-bank/$file" 2>/dev/null; then
                unfilled_files+=("$file")
            fi
        fi
    done

    if [ ${#unfilled_files[@]} -gt 0 ]; then
        echo -e "${YELLOW}! Memory bank files need filling:${NC}"
        for file in "${unfilled_files[@]}"; do
            echo "    • .memory-bank/$file"
        done
        warnings=$((warnings + 1))
    else
        echo -e "${GREEN}✓ Memory bank core files initialized${NC}"
    fi

    echo ""
    if [ $warnings -eq 0 ]; then
        echo -e "${GREEN}✓ System health check passed${NC}"
    else
        echo -e "${YELLOW}! System operational with $warnings warning(s)${NC}"
    fi
}

# Function to show next steps
show_next_steps() {
    show_progress "Installation Complete!"

    echo ""
    echo -e "${GREEN}========================================================${NC}"
    echo -e "${GREEN}     Documentation System Successfully Installed!      ${NC}"
    echo -e "${GREEN}========================================================${NC}"
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo ""
    echo "1. ${YELLOW}IMPORTANT - Restart Claude Code to activate MCP servers${NC}"
    echo "   • Close and reopen Claude Code"
    echo "   • Verify MCP: claude mcp list"
    echo ""
    echo "2. Configure MCP API tokens (if skipped during installation):"
    echo "   • Edit: .claude/mcp/.env"
    echo "   • Add API tokens for Jira, Figma, Context7"
    echo "   • Run: .claude/mcp/setup-mcps.sh"
    echo "   • Token acquisition:"
    echo "     - Atlassian: https://id.atlassian.com/manage-profile/security/api-tokens"
    echo "     - Figma: Settings > Security > Personal access tokens"
    echo ""
    echo "3. Fill memory bank templates (if not done):"
    echo "   • .memory-bank/project-brief.md - Add your project information"
    echo "   • .memory-bank/system-patterns.md - Define your architecture"
    echo "   • .memory-bank/tech-context.md - Configure tech stack details"
    echo ""
    echo "4. Verify your setup:"
    echo "   ./install.sh --verify"
    echo ""
    echo "5. Start documenting:"
    echo "   > Use research-agent to analyze [component] with Figma URL"
    echo "   > Use tech-doc-generator to document [component]"
    echo "   > Use story-doc-generator to create stories for [component]"
    echo ""
    echo "6. Read documentation:"
    echo "   • CLAUDE.md - Complete workflow guide"
    echo "   • .claude/agents/ - Agent capabilities"
    echo "   • .claude/mcp/README.md - MCP troubleshooting"
    echo ""
    echo -e "${GREEN}Happy Documenting!${NC}"
    echo ""
}

# Main installation flow
main() {
    clear
    show_banner

    # Determine what to do based on arguments
    case "${1:-}" in
        --update)
            MODE="update"
            ;;
        --repair)
            MODE="repair"
            ;;
        --verify)
            MODE="verify"
            ;;
        --help)
            echo "Usage: $0 [--update|--repair|--verify|--help]"
            echo ""
            echo "Options:"
            echo "  --update  Update existing installation"
            echo "  --repair  Repair broken installation"
            echo "  --verify  Verify installation status"
            echo "  --help    Show this help message"
            exit 0
            ;;
    esac

    # Verify mode - just check status
    if [ "$MODE" = "verify" ]; then
        TOTAL_STEPS=3
        check_claude_code
        validate_installation
        run_health_check
        exit 0
    fi

    # Full installation/update/repair flow
    check_prerequisites
    check_claude_code
    detect_existing_installation
    install_system_files
    setup_environment
    install_mcp_servers
    setup_memory_bank_templates
    validate_installation
    run_health_check

    show_next_steps
}

# Run main function
main "$@"
