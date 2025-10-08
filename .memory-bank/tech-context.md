# [PROJECT_NAME] - Technical Context & Constraints

## Overview

This document provides technical context for documentation generation, including design system details, technology constraints, and implementation guidelines that all components must follow.

## Design System

### Library/Framework
**Name**: [e.g., "Material UI v5", "Reshaped UI", "Chakra UI", "Custom Design System"]
**Version**: [e.g., "5.14.x", "2.x", "custom"]
**Documentation**: [Link to design system docs]

### Theming Approach
**Method**: [e.g., "CSS-in-JS with styled-components", "CSS Modules", "Tailwind CSS", "Reshaped theming"]
**Theme Provider**: [e.g., "ThemeProvider from @mui/material", "ConfigProvider from Reshaped"]
**Token System**: [e.g., "Design tokens in theme object", "CSS custom properties", "Tailwind config"]

### Component Library Usage
**Base Components**: [e.g., "Use Material UI components as base", "Use Reshaped UI primitives", "Custom components only"]
**Customization**: [e.g., "Extend via sx prop", "Wrap in custom components", "Theme overrides"]
**Composition**: [e.g., "Compose from library primitives", "Build on top of base components"]

## Design Token System

### Available Token Categories
**Colors**:
- Primary palette: [e.g., "primary.main, primary.light, primary.dark"]
- Secondary palette: [e.g., "secondary.main, secondary.light, secondary.dark"]
- Semantic colors: [e.g., "success, warning, error, info"]
- Text colors: [e.g., "text.primary, text.secondary, text.disabled"]
- Background colors: [e.g., "background.default, background.paper"]
- Border colors: [e.g., "divider, border.light, border.dark"]

**Spacing**:
- Unit: [e.g., "8px base unit", "4px base unit", "rem-based"]
- Scale: [e.g., "0, 0.5, 1, 1.5, 2, 3, 4, 6, 8 (multipliers of base)"]
- Usage: [e.g., "Use theme.spacing(n) function", "Use spacing tokens directly"]

**Typography**:
- Families: [e.g., "font.primary (Roboto), font.mono (Fira Code)"]
- Sizes: [e.g., "text.xs, text.sm, text.base, text.lg, text.xl, text.2xl"]
- Weights: [e.g., "font.light (300), font.regular (400), font.medium (500), font.bold (700)"]
- Line heights: [e.g., "leading.tight, leading.normal, leading.relaxed"]

**Shadows/Elevation**:
- System: [e.g., "Material Design elevation levels 0-24", "Custom shadow scale"]
- Tokens: [e.g., "shadow.xs, shadow.sm, shadow.md, shadow.lg, shadow.xl"]

**Border Radius**:
- Tokens: [e.g., "radius.none, radius.sm, radius.md, radius.lg, radius.full"]
- Default: [e.g., "radius.md for most components"]

**Z-Index**:
- Layers: [e.g., "z.base (0), z.dropdown (1000), z.modal (1300), z.tooltip (1500)"]
- Usage: [e.g., "Use named layers, avoid arbitrary z-index values"]

**Transitions/Animations**:
- Durations: [e.g., "duration.fast (150ms), duration.normal (300ms), duration.slow (500ms)"]
- Easings: [e.g., "ease.in, ease.out, ease.inOut"]
- Usage: [e.g., "Use transition tokens for consistency"]

### Token Access Pattern
[How to access tokens in code]:
```typescript
// Example:
import { useTheme } from '@reshaped/react';
const theme = useTheme();
// Access: theme.color.primary, theme.spacing(2), etc.
```

### Missing Token Protocol
**When design requires tokens not in system**:
1. Document gap in "Tokenization Gaps" section of tech doc
2. Use closest available token as temporary solution
3. Propose new token with rationale
4. [Team-specific approval process]

## Implementation Constraints

### Component Structure
**File Organization**: [e.g., "Component per file in /components", "Feature-based folders"]
**Naming Convention**: [e.g., "PascalCase for components", "kebab-case for files"]
**Export Pattern**: [e.g., "Named exports", "Default exports", "Barrel exports from index"]

### State Management Rules
**Local State**: [e.g., "useState/useReducer for component-only state"]
**Global State**: [e.g., "Zustand stores for cross-component state"]
**Server State**: [e.g., "React Query for all API data fetching"]
**State Location**: [e.g., "Lift state to closest common parent", "Keep state as local as possible"]

### Data Fetching Patterns
**Library**: [e.g., "React Query v4", "SWR v2", "Apollo Client v3"]
**Hook Pattern**: [e.g., "useQuery for reads, useMutation for writes"]
**Cache Strategy**: [e.g., "Stale-while-revalidate", "Cache-first"]
**Error Handling**: [e.g., "Error boundaries + inline error states"]
**Loading States**: [e.g., "Suspense + skeleton screens", "Inline loading indicators"]

### Accessibility Requirements
**Standard**: [e.g., "WCAG 2.1 AA compliance required"]
**Keyboard Navigation**: [e.g., "All interactive elements keyboard accessible"]
**Screen Readers**: [e.g., "Proper ARIA labels and roles"]
**Focus Management**: [e.g., "Visible focus indicators, logical tab order"]
**Color Contrast**: [e.g., "4.5:1 for normal text, 3:1 for large text"]

### Performance Guidelines
**Bundle Size**: [e.g., "Code-split routes", "Lazy load heavy components"]
**Rendering**: [e.g., "Use memo for expensive renders", "Virtualize long lists"]
**Images**: [e.g., "Use Next/Image or equivalent", "Lazy load below fold"]
**Metrics**: [e.g., "Target LCP < 2.5s, FID < 100ms, CLS < 0.1"]

### Testing Requirements
**Unit Tests**: [e.g., "Required for all logic functions"]
**Component Tests**: [e.g., "Testing Library for component behavior"]
**Integration Tests**: [e.g., "Happy paths for critical flows"]
**E2E Tests**: [e.g., "Playwright for critical user journeys"]
**Coverage**: [e.g., "80% coverage target for new code"]

## Platform-Specific Constraints

### Responsive Behavior
[Define your responsive strategy]:
- **Target Platforms**: [e.g., "Desktop only", "Mobile-first responsive", "Universal responsive"]
- **Breakpoints**: [e.g., "sm: 640px, md: 768px, lg: 1024px, xl: 1280px"]
- **Approach**: [e.g., "Desktop-first design", "Mobile-first design", "Content-first design"]
- **Touch vs Mouse**: [e.g., "Mouse/keyboard only", "Touch-friendly targets (44px min)"]

### Browser Support
**Supported Browsers**: [e.g., "Chrome 90+, Firefox 88+, Safari 14+, Edge 90+"]
**Polyfills**: [e.g., "Core-js for ES6+ features", "No polyfills needed"]
**Fallbacks**: [e.g., "Graceful degradation for older browsers"]

## Development Workflow

### Code Style
**Linting**: [e.g., "ESLint with Airbnb config", "ESLint + Prettier"]
**Formatting**: [e.g., "Prettier with project config"]
**TypeScript**: [e.g., "Strict mode enabled", "Type safety required"]

### Documentation in Code
**Component Props**: [e.g., "JSDoc comments for all props"]
**Complex Logic**: [e.g., "Inline comments for non-obvious code"]
**Storybook**: [e.g., "Stories required for all UI components"]

### Git Workflow
**Branches**: [e.g., "Feature branches from main", "GitFlow model"]
**Commits**: [e.g., "Conventional Commits format"]
**PRs**: [e.g., "Require approval from 1 reviewer", "CI must pass"]

## Integration Points

### Backend APIs
**Base URL**: [e.g., "https://api.example.com/v1"]
**Authentication**: [e.g., "JWT tokens in Authorization header"]
**Request Format**: [e.g., "JSON body, RESTful endpoints"]
**Error Format**: [e.g., "Standardized error response shape"]

### Third-Party Services
**Analytics**: [e.g., "Google Analytics 4", "Mixpanel"]
**Error Tracking**: [e.g., "Sentry for error monitoring"]
**Feature Flags**: [e.g., "LaunchDarkly", "Environment variables"]

## Notes

This document should be updated when:
- New design tokens are added
- Technical constraints change
- New libraries/frameworks are adopted
- Platform requirements evolve

---

**Instructions for filling this template:**
1. Replace all [PLACEHOLDERS] with project-specific information
2. Add examples from your actual codebase
3. Include code snippets showing token/pattern usage
4. Update as project tech stack evolves
5. Save filled template to `.memory-bank/tech-context.md`
6. Agents will reference this for implementation constraints
