# [PROJECT_NAME] - Component Architecture Patterns

## Overview

This document captures component architecture patterns identified across [PROJECT_NAME] documentation. As components are documented, reusable patterns emerge and are cataloged here for reference.

*This is a living document - patterns are added as they're discovered through documentation work.*

## Component Classification

### Atom Components
**Characteristics**:
- Single-purpose UI elements
- No child components
- Minimal or no local state
- Reusable across the application

**Common Examples**:
- Buttons (primary, secondary, icon)
- Input fields (text, number, select)
- Labels and badges
- Icons and avatars

**State Management**: Props-based, minimal local state for hover/focus

**Documentation Pattern**: Simple functional requirements, focus on visual states and accessibility

### Molecule Components
**Characteristics**:
- Composite of 2-3 atom components
- Single cohesive function
- Local state for component-specific behavior
- Reusable units

**Common Examples**:
- Search bars (input + icon + button)
- Form fields (label + input + error message)
- Cards (content container with header/footer)
- Menu items (icon + label + action)

**State Management**: Local state (useState/reactive refs), props for parent communication

**Documentation Pattern**: Focused functional requirements, interaction patterns for composite behavior

### Organism Components
**Characteristics**:
- Complex compositions of molecules and atoms
- Significant functionality and business logic
- Often includes API integration
- May manage global state

**Common Examples**:
- [Add project-specific examples as discovered - e.g., "Data grids with sorting/filtering"]
- [e.g., "Navigation headers with user menus"]
- [e.g., "Sidebar navigation with routing"]
- [e.g., "Form wizards with validation"]

**State Management**: [Framework-specific - e.g., "Zustand stores", "Pinia stores", "Context API"] + data fetching libraries

**Documentation Pattern**: Comprehensive functional requirements, API contracts, complex state management, extensive interaction flows

### Widget Components
**Characteristics**:
- Standalone mini-applications
- Complete feature sets
- Independent functionality
- May have own routing or complex workflows

**Common Examples**:
- [Add project-specific examples as discovered - e.g., "Column configuration panels"]
- [e.g., "Advanced filter builders"]
- [e.g., "Report generation wizards"]
- [e.g., "Settings management interfaces"]

**State Management**: [Framework-specific] stores + complex data fetching

**Documentation Pattern**: Full application-like documentation, multiple user flows, extensive state management

## Common Patterns by Category

### Grid/Table Patterns
*[Add patterns as grids/tables are documented]*

**Common Requirements**:
- Sorting (single/multi-column)
- Filtering (inline/panel-based)
- Pagination (offset/cursor)
- Row selection (single/multi)
- Column management (show/hide, reorder, resize)

**Common NFRs**:
- Loading states (skeleton, spinner)
- Empty states (no data, no results)
- Performance (virtualization for 1000+ rows)
- Accessibility (keyboard navigation, ARIA tables)

**Story Breakdown Pattern**:
- Infrastructure (data layer, API integration)
- Core rendering (table structure, rows, cells)
- Sorting and filtering
- Selection and actions
- Column management
- Performance and accessibility

### Form Patterns
*[Add patterns as forms are documented]*

**Common Requirements**:
- Field validation (real-time/on-submit)
- Error messaging
- Submit/cancel actions
- Form state tracking (dirty/pristine)

**Common NFRs**:
- Accessibility (labels, ARIA, keyboard nav)
- Validation feedback (inline/summary)
- Unsaved changes warnings

**Story Breakdown Pattern**:
- Infrastructure (form state, validation schema)
- Field components and layout
- Validation and error handling
- Submission flow
- Accessibility compliance

### Navigation Patterns
*[Add patterns as navigation components are documented]*

**Common Requirements**:
- Active route highlighting
- Menu hierarchy (nested items)
- Routing integration
- Expand/collapse for nested items

**Common NFRs**:
- Keyboard navigation (Tab, Arrow keys)
- ARIA navigation landmarks
- Visual focus indicators
- Smooth transitions

**Story Breakdown Pattern**:
- Infrastructure (routing setup, state)
- Basic navigation structure
- Active state management
- Nested navigation
- Accessibility and keyboard support

### Modal/Overlay Patterns
*[Add patterns as modals/overlays are documented]*

**Common Requirements**:
- Open/close mechanisms
- Backdrop behavior (click-to-close)
- ESC key to close
- Content scrolling
- Action buttons (confirm/cancel)

**Common NFRs**:
- Focus management (trap focus, restore on close)
- Z-index/layer management
- Animations (slide-in, fade)
- ARIA dialog roles

**Story Breakdown Pattern**:
- Infrastructure (overlay state management)
- Basic modal structure
- Backdrop and close behavior
- Focus management and accessibility
- Animations and transitions

## Design Token Patterns

### Color Tokens
**Semantic Structure**:
- Primary/secondary/tertiary colors
- State colors (success, warning, error, info)
- Text colors (primary, secondary, disabled)
- Background colors (surface, elevated, overlay)
- Border colors

### Spacing Tokens
**Scale**: [e.g., "4px base, 8px increments" or "Tailwind spacing scale"]
- Micro spacing (inside components)
- Component spacing (between elements)
- Layout spacing (section gaps, page margins)

### Typography Tokens
**Hierarchy**:
- Headings (h1-h6 or display/title/subtitle)
- Body text (regular, emphasized, small)
- Labels and captions
- Code/monospace

### Shadow/Elevation Tokens
**Levels**: [e.g., "Material Design elevation levels 0-24" or "Custom shadow scale"]

### Radius Tokens
**Scale**: [e.g., "None, small, medium, large, full"]

## API Integration Patterns

### Data Fetching
**Library**: [e.g., "React Query", "SWR", "Apollo Client"]
**Pattern**: [e.g., "useQuery hooks", "composables", "services"]
**Caching Strategy**: [e.g., "Stale-while-revalidate", "Cache-first", "Network-only"]

### State Management
**Library**: [e.g., "Zustand", "Pinia", "Redux Toolkit", "Context API"]
**Pattern**: [e.g., "Slice-based stores", "Feature-based modules"]
**Persistence**: [e.g., "LocalStorage sync", "SessionStorage", "None"]

### Error Handling
**Strategy**: [e.g., "Error boundaries", "Global error handler", "Toast notifications"]

## Notes

- This document evolves as more components are documented
- Patterns are extracted by the doc-archival-agent from completed work
- Use this as reference when documenting similar components

---

**Instructions for filling this template:**
1. Replace [PROJECT_NAME] with your project name
2. Fill in project-specific frameworks and libraries
3. Add examples to pattern sections as components are documented
4. This file grows organically - start simple and expand
5. Save filled template to `.memory-bank/system-patterns.md`
6. Agents will reference this for architectural context
