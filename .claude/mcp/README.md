# MCP Configuration for Documentation Generation

This directory contains the configuration for Model Context Protocol (MCP) servers that are **required** for the documentation generation system. All MCP servers must be installed and configured for the agents to work properly.

## 🎯 Required MCP Servers

All four MCP servers are mandatory for full documentation generation capabilities:

| Server | Purpose | Used By | Status |
|--------|---------|---------|--------|
| **mcp-atlassian** | Jira/Confluence integration | All agents | ✅ Required |
| **context7** | Real-time library documentation | Tech doc, Story agents | ✅ Required |
| **browser-tools** | Browser automation & testing | UX extractor | ✅ Required |
| **figma-api** | Figma design analysis | Tech doc, UX extractor | ✅ Required |

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- [Claude Code CLI](https://claude.ai/code) - Latest version
- [Node.js](https://nodejs.org/) - For npm packages
- [uv](https://docs.astral.sh/uv/getting-started/installation/) - Python package manager
- [Git](https://git-scm.com/downloads) - For repository cloning

### Automated Setup (Recommended)

1. **Run the setup script:**
   ```bash
   cd .claude/mcp
   ./setup-mcps.sh
   ```

2. **On first run**, the script will:
   - Copy `.env.template` to `.env`
   - Prompt you to fill in credentials
   - Exit for you to configure

3. **Edit `.env`** with your actual credentials:
   ```bash
   nano .env  # or use your preferred editor
   ```

4. **Run setup again** after configuring `.env`:
   ```bash
   ./setup-mcps.sh
   ```

5. **Start browser tools server** (required for browser automation):
   ```bash
   npx @agentdeskai/browser-tools-server@latest
   ```

### Verification

Check that all MCPs are connected:
```bash
claude mcp list
```

Expected output:
```
mcp-atlassian: ... - ✅ Connected
context7: ... - ✅ Connected  
browser-tools: ... - ✅ Connected
figma-api: ... - ✅ Connected
```

## ⚙️ Manual Setup (If Automated Setup Fails)

### 1. Environment Configuration

Copy and configure environment file:
```bash
cp .env.template .env
nano .env
```

### 2. Atlassian MCP

```bash
# Create MCP servers directory
mkdir -p ~/projects/mcp-servers
cd ~/projects/mcp-servers

# Clone repository  
git clone https://github.com/sooperset/mcp-atlassian.git
cd mcp-atlassian

# Install dependencies
uv sync

# Copy environment config
cp /path/to/.claude/mcp/.env .env

# Add to Claude Code
claude mcp add mcp-atlassian \
  --env CONFLUENCE_URL=https://your-company.atlassian.net/wiki \
  --env CONFLUENCE_USERNAME=your.email@company.com \
  --env CONFLUENCE_API_TOKEN=your_token \
  --env JIRA_URL=https://your-company.atlassian.net \
  --env JIRA_USERNAME=your.email@company.com \
  --env JIRA_API_TOKEN=your_token \
  --env JIRA_PROJECTS_FILTER=HIL,HMDD,HMR \
  --env CONFLUENCE_SPACES_FILTER=DEV,TEAM,DOC \
  -- uv run --directory ~/projects/mcp-servers/mcp-atlassian mcp-atlassian
```

### 3. Context7 MCP

```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

### 4. Browser Tools MCP

**Start the server (required):**
```bash
npx @agentdeskai/browser-tools-server@latest
```

**Add MCP (in another terminal):**
```bash
claude mcp add browser-tools \
  --env BROWSER_TOOLS_SERVER_URL=http://localhost:3025 \
  -- npx -y @agentdeskai/browser-tools-mcp@latest
```

### 5. Figma API MCP

```bash
claude mcp add figma-api \
  --env FIGMA_API_KEY=your_figma_token \
  -- npx -y figma-developer-mcp --figma-api-key=your_figma_token --stdio
```

## 🔑 Getting API Credentials

### Atlassian API Tokens

1. Go to [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click "Create API token"  
3. Give it a descriptive name (e.g., "Claude Code MCP")
4. Copy the token immediately (it won't be shown again)

### Figma Personal Access Token

1. Go to Figma → Settings → Security
2. Scroll to "Personal access tokens"
3. Click "Create new token"
4. Give it a name and select permissions:
   - ✅ File content
   - ✅ Dev resources
5. Copy the token

### URLs and Filters

**Atlassian URLs:**
- Format: `https://your-company.atlassian.net`
- Confluence: `https://your-company.atlassian.net/wiki`

**Project/Space Filters:**
- Use comma-separated project keys: `HIL,HMDD,HMR`
- Use comma-separated space keys: `DEV,TEAM,DOC`

## 🔍 Testing MCP Integration

### Test Atlassian Integration

```bash
# In Claude Code
> Search for recent issues in HIL project
> Find confluence pages about API documentation
```

### Test Context7 Documentation

```bash
# In Claude Code  
> Get documentation for react-hook-form validation
> Show me TypeScript interface best practices
```

### Test Browser Tools

```bash
# In Claude Code (after starting browser server)
> Take a screenshot of the current page
> Navigate to github.com and click the search button
```

### Test Figma Integration

```bash
# In Claude Code
> Analyze this Figma file with depth=2: https://figma.com/design/...
> Extract component details from this Figma URL
```

## 🎨 Figma Integration Best Practices

### Understanding Depth Parameter

The `depth` parameter controls how detailed the Figma analysis is:

| Depth | Token Usage | Best For |
|-------|-------------|----------|
| 1 | ~2K tokens | Component overview, structure analysis |
| 2 | ~5K tokens | Standard component implementation (recommended) |
| 3 | ~15K tokens | Complex nested components |
| Default | 25K+ tokens | Complete detailed analysis |

### Recommended Figma Workflow

```bash
# 1. Start with overview (depth=1)
> Analyze this Figma frame with depth=1 to understand structure

# 2. Component analysis (depth=2) - RECOMMENDED DEFAULT
> Analyze the form components with depth=2

# 3. Deep analysis only when needed (depth=3)
> For the complex navigation component, use depth=3
```

### Avoiding Token Limits

If you hit token limits:
1. Use lower depth parameter
2. Ask user to select specific components
3. Focus on individual frames rather than entire files

## 🔧 Troubleshooting

### Common Issues

**MCP Server Not Connected:**
```bash
# Check status
claude mcp list

# Remove and re-add problematic server
claude mcp remove server-name -s local
# Follow setup steps again
```

**Atlassian Authentication Errors:**
- Verify API tokens haven't expired
- Check username is email format
- Ensure URLs don't have trailing slashes
- Test credentials with curl:
  ```bash
  curl -u your.email@company.com:your_api_token \
    https://your-company.atlassian.net/rest/api/2/myself
  ```

**Browser Tools Connection Issues:**
- Ensure browser server is running first
- Check port 3025 is available
- Install Chrome extension if needed
- Verify no firewall blocking

**Figma Token Limit Errors:**
```
Error: MCP tool response exceeds maximum tokens (25000)
```
**Solution:** Use depth parameter:
```bash
# Instead of default analysis
> Analyze this Figma file with depth=2
```

**Context7 Library Not Found:**
```bash
# Use library resolution first
> Resolve library ID for react-hook-form
# Then use the resolved ID
```

### Debug Mode

Enable verbose logging in `.env`:
```env
MCP_VERBOSE=true
MCP_VERY_VERBOSE=true  
MCP_LOGGING_STDOUT=true
```

### Health Check Script

Create a simple health check:
```bash
#!/bin/bash
echo "Checking MCP health..."
claude mcp list | grep "Connected" | wc -l
echo "Expected: 4 connected servers"
```

## 🤝 Integration with Documentation Agents

### Tech Doc Generator

Uses all MCPs for comprehensive documentation:
- **Figma API**: Extract design requirements
- **Context7**: Get library documentation 
- **Atlassian**: Reference existing specs
- **Browser Tools**: Validate existing implementations

### Story Generator

Uses MCPs for context and integration:
- **Atlassian**: Create Jira stories automatically
- **Context7**: Include technical references
- **Figma**: Link design specifications

### UX Extractor  

Uses MCPs for comprehensive behavior analysis:
- **Browser Tools**: Interact with prototypes
- **Figma**: Analyze design states
- **Context7**: Reference interaction patterns

## 📊 Usage Examples

### Complete Documentation Workflow

```bash
# 1. Extract UX behaviors using browser tools
> Use ux-extractor to analyze Header component prototype

# 2. Generate technical documentation with Figma + context
> Use tech-doc-generator for Header with Figma URL and UX behavior file

# 3. Create user stories with Jira integration  
> Use story-generator to create Jira stories for Header component
```

### Figma Analysis Examples

```bash
# Overview analysis
> Use tech-doc-generator with this Figma URL (depth=1) for SearchBar

# Detailed analysis  
> Generate documentation for FilterPanel using Figma URL with depth=2

# Deep analysis for complex components
> Document the DataGrid component with Figma analysis depth=3
```

## 🔄 Maintenance

### Regular Tasks

1. **Update MCP servers monthly:**
   ```bash
   cd ~/projects/mcp-servers/mcp-atlassian
   git pull
   uv sync
   ```

2. **Rotate API tokens quarterly:**
   - Generate new Atlassian tokens
   - Generate new Figma token
   - Update `.env` file
   - Re-run setup script

3. **Check MCP health weekly:**
   ```bash
   claude mcp list
   ```

### Backup Configuration

```bash
# Backup your .env (excluding from git)
cp .env .env.backup

# Document your setup for team members
echo "Company URLs, project filters, etc." > SETUP_NOTES.md
```

## 🚨 Security Best Practices

1. **Never commit `.env` file** (it's in `.gitignore`)
2. **Use minimum required permissions** for API tokens
3. **Rotate tokens regularly** (quarterly recommended)
4. **Use dedicated service accounts** for production
5. **Limit project/space filters** to minimum required
6. **Review API token usage** in Atlassian/Figma admin panels

## 📚 Additional Resources

- [Claude Code MCP Documentation](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [MCP Atlassian Repository](https://github.com/sooperset/mcp-atlassian)  
- [Context7 Documentation](https://context7.upstash.com/)
- [Browser Tools MCP](https://github.com/agentdeskai/browser-tools-mcp)
- [Figma Developer API](https://www.figma.com/developers/api)

## 🆘 Support

If you encounter issues:

1. **Check this README** for troubleshooting steps
2. **Review setup script output** for specific error messages
3. **Test individual MCPs** to isolate issues
4. **Check API credentials** and permissions
5. **Verify network connectivity** and firewall settings

For questions about the documentation agents themselves, see:
- `.claude/agents/tech-doc-generator.md`
- `.claude/agents/story-doc-generator.md`
- `.claude/agents/research-agent.md`
- `.claude/agents/doc-archival-agent.md`