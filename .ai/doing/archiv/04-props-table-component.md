# Task 4: Props Table Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** All other tasks
**Estimated Time:** 1.5 hours
**Dependencies:** None

## Objective
Create a component to display component properties in a clean table format.

## Implementation

### Component Structure
```typescript
// Path: src/app/features/components-showcase/shared/components/props-table.component.ts

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

// Component should display:
// - Property name
// - Type (with syntax highlighting)
// - Default value
// - Required indicator
// - Description
```

### Features
- [ ] Sortable columns
- [ ] Search/filter functionality
- [ ] Responsive table (mobile-friendly)
- [ ] Copy property name on click
- [ ] Expandable descriptions for long text

### Example Usage
```html
<app-props-table [props]="componentProps" />
```

## Styling
- Use Tailwind table utilities
- Sticky header for long lists
- Alternating row colors
- Highlight on hover

## Acceptance Criteria
- [ ] Clean, readable table layout
- [ ] Mobile responsive
- [ ] Search works correctly
- [ ] Dark mode support
