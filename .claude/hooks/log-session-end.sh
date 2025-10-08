#!/bin/bash
# Session end logging with component counting

TIMESTAMP="[$(date +"%Y-%m-%d %H:%M:%S")]"

# Check if session start marker exists
if [ -f .memory-bank/.logs/.session-start ]; then
    SESSION_ID=$(cat .memory-bank/.logs/.session-start)

    # Extract timestamp from session ID (format: timestamp-pid)
    START_TIME=$(echo "$SESSION_ID" | cut -d'-' -f1)
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    MINUTES=$((DURATION / 60))
    SECONDS=$((DURATION % 60))
    DURATION_STR="${MINUTES}m ${SECONDS}s"

    # Count components documented during this session
    # Find component folders modified after session start
    COMPONENTS_COMPLETED=0
    if [ -d .memory-bank/docs/completed-docs ]; then
        for folder in .memory-bank/docs/completed-docs/*/; do
            if [ -d "$folder" ]; then
                # Get folder modification time
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    # macOS
                    FOLDER_MTIME=$(stat -f "%m" "$folder" 2>/dev/null)
                else
                    # Linux
                    FOLDER_MTIME=$(stat -c "%Y" "$folder" 2>/dev/null)
                fi

                # Compare with session start time
                if [ -n "$FOLDER_MTIME" ] && [ "$FOLDER_MTIME" -ge "$START_TIME" ]; then
                    COMPONENTS_COMPLETED=$((COMPONENTS_COMPLETED + 1))
                fi
            fi
        done
    fi

    # Clean up session marker
    rm -f .memory-bank/.logs/.session-start
else
    DURATION_STR="unknown"
    COMPONENTS_COMPLETED="unknown"
fi

# Get git info
BRANCH=$(git branch --show-current 2>/dev/null || echo "No git")

# Log session end with session ID
echo "$TIMESTAMP [Session: $SESSION_ID] Session ended - Duration: $DURATION_STR | Components completed: $COMPONENTS_COMPLETED | Branch: $BRANCH" >> .memory-bank/.logs/session-history.log
