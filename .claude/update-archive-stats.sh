#!/bin/bash

# Archive Statistics Update Script
# Updates archive-index.md with current file counts and recent activity
# Usage: ./update-archive-stats.sh [config-file]

set -e

# Load cross-platform utilities
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if [ -f "$SCRIPT_DIR/os-utils.sh" ]; then
    source "$SCRIPT_DIR/os-utils.sh"
elif [ -f "$(dirname "$SCRIPT_DIR")/os-utils.sh" ]; then
    source "$(dirname "$SCRIPT_DIR")/os-utils.sh"
else
    echo "Warning: Cross-platform utilities not found. Some features may not work on all platforms."
fi

# Configuration file (already have SCRIPT_DIR from above)
CONFIG_FILE="${1:-$SCRIPT_DIR/archive-config.json}"

# Check if jq is available (for JSON parsing)
if ! command -v jq &> /dev/null; then
    echo "Warning: jq not found. Using default settings."
    USE_DEFAULTS=true
else
    USE_DEFAULTS=false
fi

# Load configuration or use defaults
if [ "$USE_DEFAULTS" = "true" ] || [ ! -f "$CONFIG_FILE" ]; then
    echo "Using default configuration..."
    RECENT_COUNT=10
    MEMORY_BANK_DIR="$SCRIPT_DIR/../.memory-bank"
    DOCS_DIR="$MEMORY_BANK_DIR/docs"
    ARCHIVE_INDEX="$MEMORY_BANK_DIR/archive-index.md"
    TITLE_FORMAT="capitalize"
    DATE_FORMAT="+%Y-%m-%d %H:%M"
else
    echo "Loading configuration from $CONFIG_FILE..."
    RECENT_COUNT=$(jq -r '.recentItems.count // 10' "$CONFIG_FILE")
    MEMORY_BANK_PATH=$(jq -r '.paths.memoryBank // ".memory-bank"' "$CONFIG_FILE")
    MEMORY_BANK_DIR="$SCRIPT_DIR/../$MEMORY_BANK_PATH"
    DOCS_PATH=$(jq -r '.paths.docsDir // ".memory-bank/docs"' "$CONFIG_FILE")
    DOCS_DIR="$SCRIPT_DIR/../$DOCS_PATH"
    ARCHIVE_INDEX_PATH=$(jq -r '.paths.archiveIndex // ".memory-bank/archive-index.md"' "$CONFIG_FILE")
    ARCHIVE_INDEX="$SCRIPT_DIR/../$ARCHIVE_INDEX_PATH"
    TITLE_FORMAT=$(jq -r '.recentItems.titleFormat // "capitalize"' "$CONFIG_FILE")
    DATE_FORMAT=$(jq -r '.recentItems.dateFormat // "+%Y-%m-%d %H:%M"' "$CONFIG_FILE")
fi

# Convert paths to absolute paths and create directories if needed
if [ ! -d "$MEMORY_BANK_DIR" ]; then
    echo "Warning: Memory bank directory doesn't exist. Creating: $MEMORY_BANK_DIR"
    mkdir -p "$MEMORY_BANK_DIR"
fi

if [ ! -d "$DOCS_DIR" ]; then
    echo "Warning: Docs directory doesn't exist. Creating: $DOCS_DIR"
    mkdir -p "$DOCS_DIR"/{completed-docs,research-sessions,component-patterns,documentation-practices,design-decisions}
fi

MEMORY_BANK_DIR="$(cd "$MEMORY_BANK_DIR" && pwd)"
DOCS_DIR="$(cd "$DOCS_DIR" 2>/dev/null && pwd || echo "$DOCS_DIR")"

# Handle archive index path more safely
ARCHIVE_INDEX_DIR="$(dirname "$ARCHIVE_INDEX")"
if [ ! -d "$ARCHIVE_INDEX_DIR" ]; then
    echo "Warning: Archive index directory doesn't exist. Creating: $ARCHIVE_INDEX_DIR"
    mkdir -p "$ARCHIVE_INDEX_DIR"
fi
ARCHIVE_INDEX="$(cd "$ARCHIVE_INDEX_DIR" && pwd)/$(basename "$ARCHIVE_INDEX")"

echo "Using paths:"
echo "  Memory Bank: $MEMORY_BANK_DIR"
echo "  Docs Dir: $DOCS_DIR"
echo "  Archive Index: $ARCHIVE_INDEX"


# Count files in each category (excluding index files and active files)
# Count component folders (not individual files) in completed-docs
COMPLETED_DOCS=$(find "$DOCS_DIR/completed-docs" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ' 2>/dev/null || echo "0")

# Count files in other categories
if command -v count_lines &> /dev/null; then
    research_files=$(find "$DOCS_DIR/research-sessions" -name "*.md" -not -name "*-index.md" -type f 2>/dev/null)
    pattern_files=$(find "$DOCS_DIR/component-patterns" -name "*.md" -not -name "*-index.md" -type f 2>/dev/null)
    practice_files=$(find "$DOCS_DIR/documentation-practices" -name "*.md" -not -name "*-index.md" -type f 2>/dev/null)
    decision_files=$(find "$DOCS_DIR/design-decisions" -name "*.md" -not -name "*-index.md" -type f 2>/dev/null)

    RESEARCH_SESSIONS=$(if [ -n "$research_files" ]; then count_lines "$research_files"; else echo "0"; fi)
    COMPONENT_PATTERNS=$(if [ -n "$pattern_files" ]; then count_lines "$pattern_files"; else echo "0"; fi)
    DOC_PRACTICES=$(if [ -n "$practice_files" ]; then count_lines "$practice_files"; else echo "0"; fi)
    DESIGN_DECISIONS=$(if [ -n "$decision_files" ]; then count_lines "$decision_files"; else echo "0"; fi)
else
    # Fallback for environments without os-utils.sh
    RESEARCH_SESSIONS=$(find "$DOCS_DIR/research-sessions" -name "*.md" -not -name "*-index.md" -type f 2>/dev/null | wc -l | tr -d ' ' 2>/dev/null || echo "0")
    COMPONENT_PATTERNS=$(find "$DOCS_DIR/component-patterns" -name "*.md" -not -name "*-index.md" -type f 2>/dev/null | wc -l | tr -d ' ' 2>/dev/null || echo "0")
    DOC_PRACTICES=$(find "$DOCS_DIR/documentation-practices" -name "*.md" -not -name "*-index.md" -type f 2>/dev/null | wc -l | tr -d ' ' 2>/dev/null || echo "0")
    DESIGN_DECISIONS=$(find "$DOCS_DIR/design-decisions" -name "*.md" -not -name "*-index.md" -type f 2>/dev/null | wc -l | tr -d ' ' 2>/dev/null || echo "0")
fi

# Count total user stories across all components
TOTAL_STORIES=$(find "$DOCS_DIR/completed-docs" -path "*/stories/*.md" -type f 2>/dev/null | wc -l | tr -d ' ' 2>/dev/null || echo "0")

# Calculate derived statistics
TOTAL_ITEMS=$((COMPLETED_DOCS + RESEARCH_SESSIONS))
TOTAL_KNOWLEDGE=$((COMPONENT_PATTERNS + DOC_PRACTICES + DESIGN_DECISIONS))

# Generate timestamp
if command -v format_date &> /dev/null; then
    TIMESTAMP=$(format_date "$DATE_FORMAT")
else
    # Fallback for environments without os-utils.sh
    TIMESTAMP=$(date "$DATE_FORMAT" 2>/dev/null || date)
fi

# Function to format titles
format_title() {
    local title="$1"
    if [ "$TITLE_FORMAT" = "capitalize" ]; then
        # Convert underscores and hyphens to spaces, then capitalize each word (macOS compatible)
        echo "$title" | tr '_-' ' ' | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}} 1'
    else
        # Just convert underscores and hyphens to spaces
        echo "$title" | tr '_-' ' '
    fi
}

# Get recent files (configurable count, sorted by modification time)
echo "Gathering recent $RECENT_COUNT files..."
RECENT_FILES=""
if [ -d "$DOCS_DIR" ]; then
    # Find all markdown files and sort by modification time (cross-platform compatible)
    if command -v mktemp_cross_platform &> /dev/null; then
        temp_file=$(mktemp_cross_platform)
    else
        temp_file=$(mktemp 2>/dev/null || echo "/tmp/archive_temp_$$")
    fi
    
    # Find files and get their modification times using cross-platform method
    if command -v get_file_mtime_and_name &> /dev/null; then
        # Use cross-platform function
        find "$DOCS_DIR" -name "*.md" -not -name "*-index.md" -type f | while read -r file; do
            get_file_mtime_and_name "$file"
        done | sort -nr | head -"$RECENT_COUNT" | cut -d' ' -f2- > "$temp_file"
    else
        # Fallback: platform-specific stat commands
        if [[ "$OSTYPE" == "darwin"* ]]; then
            find "$DOCS_DIR" -name "*.md" -not -name "*-index.md" -type f -exec stat -f "%m %N" {} \; 2>/dev/null | 
            sort -nr | head -"$RECENT_COUNT" | cut -d' ' -f2- > "$temp_file"
        else
            find "$DOCS_DIR" -name "*.md" -not -name "*-index.md" -type f -exec stat -c "%Y %n" {} \; 2>/dev/null | 
            sort -nr | head -"$RECENT_COUNT" | cut -d' ' -f2- > "$temp_file"
        fi
    fi
    
    # Process each file
    while IFS= read -r file; do
        if [ -n "$file" ]; then
            # Extract filename and create link
            filename=$(basename "$file" .md)
            # Extract date from filename if present (YYYY-MM-DD format)
            if [[ $filename =~ ^([0-9]{4}-[0-9]{2}-[0-9]{2})_(.+)$ ]]; then
                date_part="${BASH_REMATCH[1]}"
                title_part="${BASH_REMATCH[2]}"
                # Format title properly
                display_title=$(format_title "$title_part")
                relative_path="docs/${file#$DOCS_DIR/}"
                RECENT_FILES="$RECENT_FILES\n- $date_part: [$display_title]($relative_path)"
            else
                # Fallback for files without date prefix
                display_title=$(format_title "$filename")
                relative_path="docs/${file#$DOCS_DIR/}"
                RECENT_FILES="$RECENT_FILES\n- [$display_title]($relative_path)"
            fi
        fi
    done < "$temp_file"
    
    # Clean up
    rm -f "$temp_file"
fi

# If no recent files found, add placeholder
if [ -z "$RECENT_FILES" ]; then
    RECENT_FILES="\n- No items archived yet - ready for first project work"
fi

# Create the updated content
cat > "$ARCHIVE_INDEX" << EOF
# Archive Index - Knowledge Navigation Hub

<!-- AUTO-GENERATED SECTION START -->
## Statistics (Last Updated: $TIMESTAMP)
**Total Documentation**: $TOTAL_ITEMS
- **Completed Components**: $COMPLETED_DOCS
- **User Stories**: $TOTAL_STORIES
- **Research Sessions**: $RESEARCH_SESSIONS

**Knowledge Assets**: $TOTAL_KNOWLEDGE
- **Component Patterns**: $COMPONENT_PATTERNS
- **Documentation Practices**: $DOC_PRACTICES
- **Design Decisions**: $DESIGN_DECISIONS

**Success Metrics**:
- Documentation Coverage: $(if [ $COMPLETED_DOCS -gt 0 ]; then echo "Tracking active"; else echo "Ready to track"; fi)
- Knowledge Growth Rate: $(if [ $TOTAL_KNOWLEDGE -gt 0 ]; then echo "Growing"; else echo "Initialized"; fi)

## Recent Activity (Last $RECENT_COUNT Items)$(echo -e "$RECENT_FILES")
<!-- AUTO-GENERATED SECTION END -->

## Knowledge Navigation

### Detailed Knowledge Indexes
Access comprehensive information through specialized indexes:

**📚 Component Documentation**: [completed-docs-index.md](docs/completed-docs-index.md)
- Complete documentation sets (technical specs + user stories) organized by component
- Implementation context with active work tracking preserved
- Cross-references to research and patterns

**🔬 Research Sessions**: [research-sessions-index.md](docs/research-sessions-index.md)
- Design & UX analysis findings with evidence validation
- Technology evaluation and implementation recommendations
- Comprehensive investigation with confidence levels

**🏗️ Component Patterns**: [component-patterns-index.md](docs/component-patterns-index.md)
- Reusable patterns extracted from documented components
- Usage scenarios and implementation guidelines
- Pattern effectiveness tracking and evolution

**📋 Documentation Practices**: [documentation-practices-index.md](docs/documentation-practices-index.md)
- Proven documentation approaches and methodologies
- Story sizing patterns and AC writing practices
- Quality improvement techniques with effectiveness metrics

**🔍 Design Decisions**: [design-decisions-index.md](docs/design-decisions-index.md)
- Technical decisions with full context and rationale
- Alternative approaches considered and outcomes
- Decision effectiveness and satisfaction tracking

### Direct Content Access
Browse documentation directly:

**📚 Completed Documentation**: [docs/completed-docs/](docs/completed-docs/)
- Component-centric organization with tech docs + user stories
- Active work context preserved for each component
- Cross-references to research, patterns, and decisions

**🔬 Research Sessions**: [docs/research-sessions/](docs/research-sessions/)
- Design & UX analysis findings
- Multi-source evidence with confidence levels
- Implementation recommendations and alternatives

**🏗️ Component Patterns**: [docs/component-patterns/](docs/component-patterns/)
- Extracted reusable patterns from documented components
- Usage scenarios and effectiveness tracking
- Pattern evolution over time

**📋 Documentation Practices**: [docs/documentation-practices/](docs/documentation-practices/)
- Proven story sizing and AC writing approaches
- Quality improvement techniques
- Process refinement based on experience

**🔍 Design Decisions**: [docs/design-decisions/](docs/design-decisions/)
- Architectural and technical decisions with context
- Alternative approaches and rationale
- Decision outcomes and satisfaction tracking

## Search Strategies

### Finding Similar Work
1. **By Component Type**: Check completed-docs-index.md for similar components (atoms, molecules, organisms, widgets)
2. **By Pattern**: Use component-patterns-index.md for structural approaches (grids, forms, panels, navigation)
3. **By Date Range**: Browse folders directly using dated filenames (YYYY-MM-DD)
4. **By Content**: Use \`grep -r "search-term" .memory-bank/docs/\` to find relevant content

### Quick Navigation Paths
- **Recent Work**: Check "Recent Activity" section above for latest documentation
- **Pattern Library**: Go directly to component-patterns-index.md for reusable approaches
- **Best Practices**: Start with documentation-practices-index.md for proven techniques
- **Design Context**: Check design-decisions-index.md for architectural rationale

## Usage Guidelines

### For Documentation Team
1. Read \`project-brief.md\` for target project context and requirements
2. Review \`system-patterns.md\` for component architecture patterns
3. Check \`tech-context.md\` for tech stack and design system constraints
4. Browse this index for historical documentation insights

### For Creating Documentation
1. Check \`active-tech-doc.md\` for current technical documentation work
2. Check \`active-story-doc.md\` for current story generation work
3. Search completed-docs/ for similar component documentation approaches
4. Reference component-patterns-index.md for established patterns
5. Use documentation-practices-index.md for quality standards

### For Knowledge Discovery
1. Search component-patterns-index.md for reusable implementation approaches
2. Check design-decisions-index.md for architectural choices and context
3. Review documentation-practices-index.md for effective documentation techniques
4. Cross-reference completed-docs/ for complete implementation examples

## System Integration

**Memory Bank Compatibility**: Documentation Repository with Memory Bank System
**Agent Integration**: All 4 agents (research-agent, tech-doc-generator, story-doc-generator, doc-archival-agent) operational
**Automation**: This index is automatically updated by hooks after agent completion
**Configuration**: Settings managed through .claude/archive-config.json
**Automated Maintenance**: All indexes automatically updated via SubagentStop hook

---

*This archive index is automatically maintained through the archive statistics script using configuration from .claude/archive-config.json. Statistics and recent activity are updated after each archival session. Detailed knowledge indexes are automatically maintained based on file organization.*
EOF

# Function to update individual index files
update_category_index() {
    local category="$1"
    local title="$2"
    local index_file="$3"
    local directory="$4"

    echo "Updating $title index..."

    # Get recent files for this category (limit to 5 for each index)
    local recent_files=""

    if [ -d "$directory" ]; then
        # Use similar logic as main recent files but category-specific
        local temp_file_cat
        if command -v mktemp_cross_platform &> /dev/null; then
            temp_file_cat=$(mktemp_cross_platform)
        else
            temp_file_cat=$(mktemp 2>/dev/null || echo "/tmp/archive_cat_temp_$$")
        fi

        # Find files for this category
        if command -v get_file_mtime_and_name &> /dev/null; then
            find "$directory" -name "*.md" -not -name "*-index.md" -type f | while read -r file; do
                get_file_mtime_and_name "$file"
            done | sort -nr > "$temp_file_cat"
        else
            if [[ "$OSTYPE" == "darwin"* ]]; then
                find "$directory" -name "*.md" -not -name "*-index.md" -type f -exec stat -f "%m %N" {} \; 2>/dev/null | sort -nr > "$temp_file_cat"
            else
                find "$directory" -name "*.md" -not -name "*-index.md" -type f -exec stat -c "%Y %n" {} \; 2>/dev/null | sort -nr > "$temp_file_cat"
            fi
        fi

        # Process recent files (top 5)
        head -5 "$temp_file_cat" | cut -d' ' -f2- | while IFS= read -r file; do
            if [ -n "$file" ]; then
                filename=$(basename "$file" .md)
                if [[ $filename =~ ^([0-9]{4}-[0-9]{2}-[0-9]{2})_(.+)$ ]]; then
                    date_part="${BASH_REMATCH[1]}"
                    title_part="${BASH_REMATCH[2]}"
                    display_title=$(format_title "$title_part")
                    relative_path="$category/${file##*/}"
                    echo "- $date_part: [$display_title]($relative_path)"
                else
                    display_title=$(format_title "$filename")
                    relative_path="$category/${file##*/}"
                    echo "- [$display_title]($relative_path)"
                fi
            fi
        done > "/tmp/recent_${category}.txt"

        # Clean up temp file
        rm -f "$temp_file_cat"

        # Read the generated content
        if [ -s "/tmp/recent_${category}.txt" ]; then
            recent_files=$(cat "/tmp/recent_${category}.txt")
        else
            recent_files="*Most recent $category will appear here*"
        fi

        # Clean up temp files
        rm -f "/tmp/recent_${category}.txt"
    else
        recent_files="*Most recent $category will appear here*"
    fi

    # Check if index file exists - if yes, update only Recent section
    if [ -f "$index_file" ]; then
        # Update only the Recent section, preserving all other content
        temp_index=$(mktemp 2>/dev/null || echo "/tmp/index_temp_$$")

        # Use sed/grep to replace content between "## Recent" and next "##" or "---"
        # Find the line numbers
        recent_start=$(grep -n "^## Recent" "$index_file" | head -1 | cut -d: -f1)

        if [ -n "$recent_start" ]; then
            # Find the end of the Recent section (next ## heading or ---)
            recent_end=$(tail -n +$((recent_start + 1)) "$index_file" | grep -n "^##\|^---" | head -1 | cut -d: -f1)

            if [ -n "$recent_end" ]; then
                # Calculate actual line number in file
                recent_end=$((recent_start + recent_end))

                # Build new file: before + header + new content + after
                head -n "$recent_start" "$index_file" > "$temp_index"
                echo "$recent_files" >> "$temp_index"
                tail -n +"$recent_end" "$index_file" >> "$temp_index"
            else
                # No end marker found, append to end
                head -n "$recent_start" "$index_file" > "$temp_index"
                echo "$recent_files" >> "$temp_index"
            fi

            # Replace the original file
            mv "$temp_index" "$index_file"
            echo "   ✅ Updated $title index (preserved content)"
        else
            # No Recent section found, fallback to full file replacement
            rm -f "$temp_index"
            cat > "$index_file" << EOF
# $title Index

Quick navigation for ${category}.

## Recent $title
$recent_files

---

## File Naming Convention
$title files use: \`YYYY-MM-DD_[category]_[descriptive-name]-${category%s}.md\`

**Note**: This index is automatically updated by the archive statistics script.
EOF
            echo "   ✅ Created $title index (no Recent section found)"
        fi
    else
        # Create new file with minimal template (first time only)
        cat > "$index_file" << EOF
# $title Index

Quick navigation for ${category}.

## Recent $title
$recent_files

---

## File Naming Convention
$title files use: \`YYYY-MM-DD_[category]_[descriptive-name]-${category%s}.md\`

**Note**: This index is automatically updated by the archive statistics script.
EOF
        echo "   ✅ Created $title index"
    fi
}

# Update all individual index files
update_category_index "completed-docs" "Completed Documentation" "$DOCS_DIR/completed-docs-index.md" "$DOCS_DIR/completed-docs"
update_category_index "research-sessions" "Research Sessions" "$DOCS_DIR/research-sessions-index.md" "$DOCS_DIR/research-sessions"
update_category_index "component-patterns" "Component Patterns" "$DOCS_DIR/component-patterns-index.md" "$DOCS_DIR/component-patterns"
update_category_index "documentation-practices" "Documentation Practices" "$DOCS_DIR/documentation-practices-index.md" "$DOCS_DIR/documentation-practices"
update_category_index "design-decisions" "Design Decisions" "$DOCS_DIR/design-decisions-index.md" "$DOCS_DIR/design-decisions"

# Note: Fresh active work templates handled by doc-archival-agent
# This script focuses solely on updating archive statistics and indexes

echo "✅ All archive indexes updated successfully!"
echo "   - Total Documentation: $TOTAL_ITEMS"
echo "   - Completed Components: $COMPLETED_DOCS"
echo "   - User Stories: $TOTAL_STORIES"
echo "   - Research Sessions: $RESEARCH_SESSIONS"
echo "   - Knowledge Assets: $TOTAL_KNOWLEDGE"
echo "     • Component Patterns: $COMPONENT_PATTERNS"
echo "     • Documentation Practices: $DOC_PRACTICES"
echo "     • Design Decisions: $DESIGN_DECISIONS"
echo "   - Recent Items Shown: $RECENT_COUNT"
echo "   - Updated: $TIMESTAMP"
echo "   - Index files updated: 6 (archive + 5 category indexes)"