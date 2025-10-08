#!/bin/bash
# Enhanced agent activity logging for SubagentStop hook
# Detects which agent ran and logs detailed information

mkdir -p .memory-bank/.logs
TIMESTAMP="[$(date +"%Y-%m-%d %H:%M:%S")]"

# Get session ID if available
SESSION_ID=""
if [ -f .memory-bank/.logs/.session-start ]; then
    SESSION_ID="[Session: $(cat .memory-bank/.logs/.session-start)] "
fi

# Enable debug mode (set to 1 for debugging, 0 for production)
DEBUG=1

# Debug logging function
debug_log() {
    if [ "$DEBUG" -eq 1 ]; then
        echo "[DEBUG] $1" >> .memory-bank/.logs/agent-debug.log
    fi
}

debug_log "=== Agent detection started at $(date) ==="

# Detect agent type by checking recently modified files
AGENT="unknown"

# Helper function to check if file was modified in last N seconds
file_modified_recently() {
    local file="$1"
    local seconds="${2:-10}"

    if [ ! -f "$file" ]; then
        return 1
    fi

    # Get file modification time
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        mod_time=$(stat -f "%m" "$file" 2>/dev/null)
    else
        # Linux
        mod_time=$(stat -c "%Y" "$file" 2>/dev/null)
    fi

    current_time=$(date +%s)
    time_diff=$((current_time - mod_time))

    [ "$time_diff" -le "$seconds" ]
}

# Check for doc-archival-agent (completed component folder)
debug_log "Checking for doc-archival-agent..."
if [ -d .memory-bank/docs/completed-docs ]; then
    # Find most recently modified component folder using ls -t (cross-platform)
    LATEST_COMPONENT=$(ls -td .memory-bank/docs/completed-docs/*/ 2>/dev/null | head -1 | sed 's:/$::')

    if [ -n "$LATEST_COMPONENT" ]; then
        COMPONENT_NAME=$(basename "$LATEST_COMPONENT")
        debug_log "Latest component folder: $COMPONENT_NAME"

        # Check if active files exist in component folder (sign of archival)
        if [ -f "$LATEST_COMPONENT/active-tech-doc.md" ] && [ -f "$LATEST_COMPONENT/active-story-doc.md" ]; then
            if file_modified_recently "$LATEST_COMPONENT/active-tech-doc.md" 60; then
                debug_log "Component archived recently - AGENT=doc-archival-agent"
                AGENT="doc-archival-agent"

                # Check if already logged (tail first, then grep)
                if ! tail -1 .memory-bank/.logs/subagent-activity.log 2>/dev/null | grep -q "Component: $COMPONENT_NAME.*$(date +%Y-%m-%d)"; then
                    echo "$TIMESTAMP ${SESSION_ID}Agent: $AGENT | Component: $COMPONENT_NAME | Action: Archived with patterns/practices" >> .memory-bank/.logs/subagent-activity.log
                fi
            fi
        fi
    fi
fi

# Check for story-doc-generator (stories folder with recent stories)
if [ "$AGENT" = "unknown" ]; then
    debug_log "Checking for story-doc-generator..."
    if [ -d .memory-bank/docs/completed-docs ]; then
        # Find most recently modified story file using ls -t (cross-platform)
        LATEST_STORY=$(ls -t .memory-bank/docs/completed-docs/*/stories/*.md 2>/dev/null | head -1)

        if [ -n "$LATEST_STORY" ] && file_modified_recently "$LATEST_STORY" 60; then
            debug_log "Story file modified recently - AGENT=story-doc-generator"
            AGENT="story-doc-generator"
            COMPONENT_DIR=$(dirname $(dirname "$LATEST_STORY"))
            COMPONENT_NAME=$(basename "$COMPONENT_DIR")
            STORY_COUNT=$(find "$COMPONENT_DIR/stories" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')

            # Check if already logged (tail first, then grep)
            if ! tail -1 .memory-bank/.logs/subagent-activity.log 2>/dev/null | grep -q "Component: $COMPONENT_NAME.*$STORY_COUNT stories.*$(date +%Y-%m-%d)"; then
                echo "$TIMESTAMP ${SESSION_ID}Agent: $AGENT | Component: $COMPONENT_NAME | Stories: $STORY_COUNT | Output: docs/completed-docs/$COMPONENT_NAME/stories/" >> .memory-bank/.logs/subagent-activity.log
            fi
        fi
    fi
fi

# Check for tech-doc-generator (tech doc in component folder)
if [ "$AGENT" = "unknown" ]; then
    debug_log "Checking for tech-doc-generator..."
    if [ -d .memory-bank/docs/completed-docs ]; then
        # Find most recently modified tech doc using ls -t (cross-platform), excluding stories
        LATEST_TECH_DOC=$(ls -t .memory-bank/docs/completed-docs/*/*.md 2>/dev/null | grep -v "/stories/" | head -1)

        if [ -n "$LATEST_TECH_DOC" ] && file_modified_recently "$LATEST_TECH_DOC" 60; then
            debug_log "Tech doc modified recently - AGENT=tech-doc-generator"
            AGENT="tech-doc-generator"
            COMPONENT_DIR=$(dirname "$LATEST_TECH_DOC")
            COMPONENT_NAME=$(basename "$COMPONENT_DIR")
            TECH_DOC_FILE=$(basename "$LATEST_TECH_DOC")

            # Extract category from filename (YYYY-MM-DD-{category}-{Component}.md)
            CATEGORY=$(echo "$TECH_DOC_FILE" | cut -d'-' -f4)

            # Check if already logged (tail first, then grep)
            if ! tail -1 .memory-bank/.logs/subagent-activity.log 2>/dev/null | grep -q "Component: $COMPONENT_NAME.*Type: $CATEGORY.*$(date +%Y-%m-%d)"; then
                echo "$TIMESTAMP ${SESSION_ID}Agent: $AGENT | Component: $COMPONENT_NAME | Type: $CATEGORY | Output: docs/completed-docs/$COMPONENT_NAME/$TECH_DOC_FILE" >> .memory-bank/.logs/subagent-activity.log
            fi
        fi
    fi
fi

# Check for research-agent (research session)
if [ "$AGENT" = "unknown" ]; then
    debug_log "Checking for research-agent..."
    if [ -d .memory-bank/docs/research-sessions ]; then
        # Find most recently modified research file using ls -t (cross-platform)
        LATEST_RESEARCH=$(ls -t .memory-bank/docs/research-sessions/*.md 2>/dev/null | grep -v "index.md" | head -1)

        if [ -n "$LATEST_RESEARCH" ] && file_modified_recently "$LATEST_RESEARCH" 60; then
            debug_log "Research file modified recently - AGENT=research-agent"
            AGENT="research-agent"
            TOPIC=$(grep -m1 "^# " "$LATEST_RESEARCH" 2>/dev/null | cut -c3-)
            OUTPUT_FILE=$(basename "$LATEST_RESEARCH")

            # Check if this file is already logged to prevent duplicates (tail first, then grep)
            if ! tail -1 .memory-bank/.logs/subagent-activity.log 2>/dev/null | grep -q "Output: docs/research-sessions/$OUTPUT_FILE.*$(date +%Y-%m-%d)"; then
                echo "$TIMESTAMP ${SESSION_ID}Agent: $AGENT | Topic: $TOPIC | Output: docs/research-sessions/$OUTPUT_FILE" >> .memory-bank/.logs/subagent-activity.log
            fi
        fi
    fi
fi

# Only log if we detected a meaningful agent
if [ "$AGENT" != "unknown" ]; then
    debug_log "Agent detected: $AGENT"
else
    debug_log "No meaningful agent detected - skipping log"
fi

debug_log "=== Agent detection completed ==="
