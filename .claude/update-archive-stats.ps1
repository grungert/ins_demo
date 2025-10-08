# Archive Statistics Update Script - PowerShell Version
# Updates archive-index.md with current file counts and recent activity
# Usage: .\update-archive-stats.ps1 [config-file]

param(
    [string]$ConfigFile = ""
)

# Set strict mode and error handling
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Default configuration file
if (-not $ConfigFile) {
    $ConfigFile = Join-Path $ScriptDir "archive-config.json"
}

# Check if we can parse JSON
$UseDefaults = $false
try {
    if (Test-Path $ConfigFile) {
        $Config = Get-Content $ConfigFile | ConvertFrom-Json
    } else {
        $UseDefaults = $true
    }
}
catch {
    Write-Warning "Failed to parse JSON config. Using default settings."
    $UseDefaults = $true
}

# Load configuration or use defaults
if ($UseDefaults) {
    Write-Host "Using default configuration..."
    $RecentCount = 10
    $MemoryBankDir = Join-Path (Split-Path $ScriptDir -Parent) ".memory-bank"
    $DocsDir = Join-Path $MemoryBankDir "docs"
    $ArchiveIndex = Join-Path $MemoryBankDir "archive-index.md"
    $TitleFormat = "capitalize"
    $DateFormat = "yyyy-MM-dd HH:mm"
} else {
    Write-Host "Loading configuration from $ConfigFile..."
    $RecentCount = if ($Config.recentItems.count) { $Config.recentItems.count } else { 10 }
    $MemoryBankPath = if ($Config.paths.memoryBank) { $Config.paths.memoryBank } else { ".memory-bank" }
    $MemoryBankDir = Join-Path (Split-Path $ScriptDir -Parent) $MemoryBankPath
    $DocsPath = if ($Config.paths.docsDir) { $Config.paths.docsDir } else { ".memory-bank/docs" }
    $DocsDir = Join-Path (Split-Path $ScriptDir -Parent) $DocsPath
    $ArchiveIndexPath = if ($Config.paths.archiveIndex) { $Config.paths.archiveIndex } else { ".memory-bank/archive-index.md" }
    $ArchiveIndex = Join-Path (Split-Path $ScriptDir -Parent) $ArchiveIndexPath
    $TitleFormat = if ($Config.recentItems.titleFormat) { $Config.recentItems.titleFormat } else { "capitalize" }
    $DateFormat = if ($Config.recentItems.dateFormat) { $Config.recentItems.dateFormat } else { "yyyy-MM-dd HH:mm" }
}

# Convert paths to absolute paths and create directories if needed
if (-not (Test-Path $MemoryBankDir)) {
    Write-Host "Warning: Memory bank directory doesn't exist. Creating: $MemoryBankDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $MemoryBankDir -Force | Out-Null
}

if (-not (Test-Path $DocsDir)) {
    Write-Host "Warning: Docs directory doesn't exist. Creating: $DocsDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $DocsDir -Force | Out-Null
    @("completed-tasks", "research-sessions", "system-architecture", "best-practices", "errors", "decisions") | ForEach-Object {
        New-Item -ItemType Directory -Path (Join-Path $DocsDir $_) -Force | Out-Null
    }
}

$ArchiveIndexDir = Split-Path -Parent $ArchiveIndex
if (-not (Test-Path $ArchiveIndexDir)) {
    Write-Host "Warning: Archive index directory doesn't exist. Creating: $ArchiveIndexDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $ArchiveIndexDir -Force | Out-Null
}

$MemoryBankDir = Resolve-Path $MemoryBankDir -ErrorAction SilentlyContinue
$DocsDir = Resolve-Path $DocsDir -ErrorAction SilentlyContinue
$ArchiveIndex = $ArchiveIndex  # Keep as-is since we created the directory

Write-Host "Using paths:"
Write-Host "  Memory Bank: $MemoryBankDir"
Write-Host "  Docs Dir: $DocsDir"
Write-Host "  Archive Index: $ArchiveIndex"


# Count files in each category (excluding index files)
function Count-MarkdownFiles {
    param([string]$Path)

    if (Test-Path $Path) {
        return (Get-ChildItem -Path $Path -Filter "*.md" -File | Where-Object { $_.Name -notlike "*-index.md" } | Measure-Object).Count
    } else {
        return 0
    }
}

$CompletedTasks = Count-MarkdownFiles (Join-Path $DocsDir "completed-tasks")
$ResearchSessions = Count-MarkdownFiles (Join-Path $DocsDir "research-sessions")
$ArchitecturePatterns = Count-MarkdownFiles (Join-Path $DocsDir "system-architecture")
$BestPractices = Count-MarkdownFiles (Join-Path $DocsDir "best-practices")
$ErrorSolutions = Count-MarkdownFiles (Join-Path $DocsDir "errors")
$Decisions = Count-MarkdownFiles (Join-Path $DocsDir "decisions")

# Calculate derived statistics
$TotalItems = $CompletedTasks + $ResearchSessions
$TotalKnowledge = $ArchitecturePatterns + $BestPractices + $ErrorSolutions + $Decisions

# Generate timestamp
$Timestamp = Get-Date -Format $DateFormat

# Function to format titles
function Format-Title {
    param([string]$Title)
    
    if ($TitleFormat -eq "capitalize") {
        # Convert underscores and hyphens to spaces, then capitalize each word
        $Title = $Title -replace '[_-]', ' '
        return (Get-Culture).TextInfo.ToTitleCase($Title.ToLower())
    } else {
        # Just convert underscores and hyphens to spaces
        return $Title -replace '[_-]', ' '
    }
}

# Get recent files (configurable count, sorted by modification time)
Write-Host "Gathering recent $RecentCount files..."
$RecentFiles = ""

if (Test-Path $DocsDir) {
    # Find all markdown files and sort by modification time
    $AllFiles = Get-ChildItem -Path $DocsDir -Filter "*.md" -File -Recurse | 
                Where-Object { $_.Name -notlike "*-index.md" } |
                Sort-Object LastWriteTime -Descending |
                Select-Object -First $RecentCount
    
    foreach ($File in $AllFiles) {
        $FileName = [System.IO.Path]::GetFileNameWithoutExtension($File.Name)
        
        # Extract date from filename if present (YYYY-MM-DD format)
        if ($FileName -match '^(\d{4}-\d{2}-\d{2})_(.+)$') {
            $DatePart = $Matches[1]
            $TitlePart = $Matches[2]
            # Format title properly
            $DisplayTitle = Format-Title $TitlePart
            $RelativePath = "docs/" + $File.FullName.Substring($DocsDir.Length + 1).Replace('\', '/')
            $RecentFiles += "- $DatePart`: [$DisplayTitle]($RelativePath)`n"
        } else {
            # Fallback for files without date prefix
            $DisplayTitle = Format-Title $FileName
            $RelativePath = "docs/" + $File.FullName.Substring($DocsDir.Length + 1).Replace('\', '/')
            $RecentFiles += "- [$DisplayTitle]($RelativePath)`n"
        }
    }
}

# If no recent files found, add placeholder
if (-not $RecentFiles) {
    $RecentFiles = "- No items archived yet - ready for first project work`n"
}

# Create the updated content
$Content = @"
# Archive Index - Knowledge Navigation Hub

<!-- AUTO-GENERATED SECTION START -->
## Statistics (Last Updated: $Timestamp)
**Total Archived Items**: $TotalItems
- **Completed Tasks**: $CompletedTasks 
- **Research Sessions**: $ResearchSessions

**Knowledge Assets**: $TotalKnowledge
- **Architecture Patterns**: $ArchitecturePatterns
- **Best Practices**: $BestPractices
- **Error Solutions**: $ErrorSolutions
- **Technical Decisions**: $Decisions

**Success Metrics**: 
- Average Task Completion: $(if ($CompletedTasks -gt 0) { "Tracking active" } else { "Ready to track" })
- Knowledge Growth Rate: $(if ($TotalKnowledge -gt 0) { "Growing" } else { "Initialized" })

## Recent Activity (Last $RecentCount Items)
$($RecentFiles.TrimEnd())
<!-- AUTO-GENERATED SECTION END -->

## Knowledge Navigation

### Detailed Knowledge Indexes
Access comprehensive information through specialized indexes:

**🏗️ Architecture Knowledge**: [system-architecture-index.md](docs/system-architecture-index.md)
- Documented patterns, design decisions, and architectural approaches
- Usage examples and implementation guidelines
- Pattern effectiveness tracking and evolution

**📋 Implementation Knowledge**: [best-practices-index.md](docs/best-practices-index.md)
- Validated practices and proven methodologies
- Effectiveness metrics and application guidelines
- Practice evolution and refinement tracking

**🔍 Decision Knowledge**: [decisions-index.md](docs/decisions-index.md)
- Technical decisions with full context and rationale
- Alternative approaches considered and outcomes
- Decision effectiveness and satisfaction tracking

**🛠️ Problem-Solving Knowledge**: [errors-index.md](docs/errors-index.md)
- Documented problems with complete solution procedures
- Troubleshooting decision trees and prevention strategies
- Solution effectiveness and pattern recognition

**🔬 Research Knowledge**: [research-sessions-index.md](docs/research-sessions-index.md)
- Multi-source analysis with evidence validation
- Technology evaluation and implementation recommendations
- Comprehensive investigation findings with confidence levels

### Direct Content Access
Browse chronological work directly:

**✅ Completed Tasks**: [docs/completed-tasks/](docs/completed-tasks/)
- Implementation records organized by completion date
- Full context preservation with technical details
- Cross-references to research and architectural decisions

**🔍 Research Sessions**: [docs/research-sessions/](docs/research-sessions/)
- Comprehensive research findings and recommendations
- Multi-source analysis with evidence and confidence levels
- Implementation guidance and alternative approaches

## Search Strategies

### Finding Similar Work
1. **By Technology/Topic**: Use PowerShell's Select-String or Windows search to find relevant content
2. **By Date Range**: Browse folders directly using date-based file naming
3. **By Problem Type**: Check errors-index.md for categorized troubleshooting
4. **By Pattern**: Use system-architecture-index.md for structural approaches

### Quick Navigation Paths
- **Recent Work**: Check "Recent Activity" section above for latest completions
- **Architecture Decisions**: Go directly to decisions-index.md for choice context
- **Implementation Guidance**: Start with best-practices-index.md for proven approaches
- **Problem Resolution**: Begin with errors-index.md for known solutions

## Usage Guidelines

### For New Team Members
1. Read ``project-brief.md`` for project context and objectives
2. Review ``system-patterns.md`` for current architecture overview
3. Check ``tech-context.md`` for technology constraints and requirements
4. Browse this index for historical project knowledge and lessons learned

### For Continuing Development Work
1. Check ``active-task.md`` for current session context and progress
2. Search completed-tasks/ for similar past implementations and approaches
3. Reference system-architecture-index.md for established patterns and guidelines
4. Update relevant indexes after completing significant work or discoveries

### For Problem Solving and Research
1. Search errors-index.md for known issues and proven solution approaches
2. Check decisions-index.md for context of past architectural choices and alternatives
3. Review best-practices-index.md for proven approaches and methodologies
4. Cross-reference related work in completed-tasks/ for implementation examples

## System Integration

**Memory Bank Compatibility**: Claude Code Agent Orchestration System v1.0
**Agent Integration**: All 3 agents (setup-agent, research-agent, memory-manager) operational  
**Automation**: This index is automatically updated by the archive statistics script
**Configuration**: Settings managed through .claude/archive-config.json
**Automated Maintenance**: All indexes automatically updated based on file organization

---

*This archive index is automatically maintained through the archive statistics script using configuration from .claude/archive-config.json. Statistics and recent activity are updated after each archival session. Detailed knowledge indexes are automatically maintained based on file organization.*
"@

# Write the updated content
$Content | Set-Content -Path $ArchiveIndex -Encoding UTF8

# Function to update individual index files
function Update-CategoryIndex {
    param(
        [string]$Category,
        [string]$Title,
        [string]$IndexFile,
        [string]$Directory
    )

    Write-Host "Updating $Title index..."

    # Initialize variables
    $RecentFiles = ""

    if (Test-Path $Directory) {
        # Find all markdown files (excluding index files)
        $Files = Get-ChildItem -Path $Directory -Filter "*.md" |
                 Where-Object { $_.Name -notmatch ".*-index\.md$" } |
                 Sort-Object LastWriteTime -Descending

        # Process recent files (top 5)
        $RecentFilesList = $Files | Select-Object -First 5
        foreach ($File in $RecentFilesList) {
            $FileName = [System.IO.Path]::GetFileNameWithoutExtension($File.Name)

            # Try to match the YYYY-MM-DD_category_name-type pattern
            if ($FileName -match "^(\d{4}-\d{2}-\d{2})_(.+)$") {
                $DatePart = $matches[1]
                $TitlePart = $matches[2]
                $DisplayTitle = Format-Title $TitlePart
                $RelativePath = "$Category/$($File.Name)"
                $RecentFiles += "- $DatePart`: [$DisplayTitle]($RelativePath)`n"
            } else {
                # Fallback for files without date prefix
                $DisplayTitle = Format-Title $FileName
                $RelativePath = "$Category/$($File.Name)"
                $RecentFiles += "- [$DisplayTitle]($RelativePath)`n"
            }
        }

        # Remove trailing newlines
        $RecentFiles = $RecentFiles.TrimEnd()
    }

    # Set default messages if no files found
    if ([string]::IsNullOrEmpty($RecentFiles)) {
        $RecentFiles = "*Most recent $Category will appear here*"
    }

    # Check if index file exists - if yes, update only Recent section
    if (Test-Path $IndexFile) {
        # Read existing content
        $existingContent = Get-Content $IndexFile -Raw

        # Update only the Recent section, preserving all other content
        $updatedContent = ""
        $inRecentSection = $false
        $recentPrinted = $false

        foreach ($line in ($existingContent -split "`r?`n")) {
            if ($line -match "^## Recent") {
                $updatedContent += "$line`n"
                $updatedContent += "$RecentFiles`n"
                $inRecentSection = $true
                $recentPrinted = $true
            }
            elseif ($inRecentSection -and ($line -match "^##[^#]" -or $line -match "^---")) {
                $inRecentSection = $false
                $updatedContent += "$line`n"
            }
            elseif (-not $inRecentSection) {
                $updatedContent += "$line`n"
            }
        }

        # Write the updated content back to the file
        $updatedContent.TrimEnd() | Set-Content -Path $IndexFile -Encoding UTF8
        Write-Host "   ✅ Updated $Title index (preserved content)" -ForegroundColor Green
    }
    else {
        # Create new file with minimal template (first time only)
        $IndexContent = @"
# $Title Index

Quick navigation for $Category.

## Recent $Title
$RecentFiles

---

## File Naming Convention
$Title files use: ``YYYY-MM-DD_[category]_[descriptive-name]-$($Category.TrimEnd('s')).md``

**Note**: This index is automatically updated by the archive statistics script.
"@
        # Write the new index content
        $IndexContent | Set-Content -Path $IndexFile -Encoding UTF8
        Write-Host "   ✅ Created $Title index" -ForegroundColor Green
    }
}

# Update all individual index files
Update-CategoryIndex "system-architecture" "System Architecture Patterns" (Join-Path $DocsDir "system-architecture-index.md") (Join-Path $DocsDir "system-architecture")
Update-CategoryIndex "best-practices" "Best Practices" (Join-Path $DocsDir "best-practices-index.md") (Join-Path $DocsDir "best-practices")
Update-CategoryIndex "errors" "Errors and Solutions" (Join-Path $DocsDir "errors-index.md") (Join-Path $DocsDir "errors")
Update-CategoryIndex "decisions" "Technical Decisions" (Join-Path $DocsDir "decisions-index.md") (Join-Path $DocsDir "decisions")
Update-CategoryIndex "research-sessions" "Research Sessions" (Join-Path $DocsDir "research-sessions-index.md") (Join-Path $DocsDir "research-sessions")

# Note: Fresh active-task.md template creation is handled by memory-manager agent
# This script focuses solely on updating archive statistics and indexes

Write-Host "✅ All archive indexes updated successfully!" -ForegroundColor Green
Write-Host "   - Total Items: $TotalItems"
Write-Host "   - Completed Tasks: $CompletedTasks"
Write-Host "   - Research Sessions: $ResearchSessions"
Write-Host "   - Knowledge Assets: $TotalKnowledge"
Write-Host "     • Architecture Patterns: $ArchitecturePatterns"
Write-Host "     • Best Practices: $BestPractices"
Write-Host "     • Error Solutions: $ErrorSolutions"
Write-Host "     • Technical Decisions: $Decisions"
Write-Host "   - Recent Items Shown: $RecentCount"
Write-Host "   - Updated: $Timestamp"
Write-Host "   - Index files updated: 6 (archive + 5 category indexes)"