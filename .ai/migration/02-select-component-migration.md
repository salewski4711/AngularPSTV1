# Task 02: Select Component Migration

## Status: 🔴 Not Started
**Priority: HIGH** (Kritisch für Forms)  
**Estimated Time: 5-6 hours**

## Objective
Implement a full-featured Select/Dropdown component with Tailwind CSS styling, supporting single/multi-select, search, and grouping.

## Prerequisites
- [ ] Analyze `/forms/02-tailwind-demo.html` for select examples
- [ ] Review native HTML select limitations
- [ ] Plan custom dropdown implementation

## Implementation Checklist

### Phase 1: Core Component
```typescript
// Path: src/app/shared/components/select/
- [ ] select.component.ts (main component)
- [ ] select.types.ts (interfaces & types)
- [ ] select-option.component.ts (option item)
- [ ] select-group.component.ts (option grouping)
```

### Phase 2: Features
- [ ] Single select mode
- [ ] Multi-select with checkboxes
- [ ] Search/filter functionality
- [ ] Option groups with headers
- [ ] Clear button
- [ ] Custom option templates
- [ ] Keyboard navigation (Arrow keys, Enter, Escape)
- [ ] Virtual scrolling for large lists

### Phase 3: Tailwind Styling
- [ ] Dropdown panel with shadow
- [ ] Hover states for options
- [ ] Selected state styling
- [ ] Focus indicators
- [ ] Smooth animations (dropdown open/close)
- [ ] Dark mode support

### Phase 4: Integration
- [ ] ControlValueAccessor implementation
- [ ] Form validation support
- [ ] Disabled state handling
- [ ] Loading state for async data

## Acceptance Criteria
- [ ] Accessible (ARIA combobox pattern)
- [ ] Mobile-friendly (touch support)
- [ ] Performance with 1000+ options
- [ ] No external dependencies
- [ ] Consistent with design system

## Example Usage
```html
<app-select
  label="Project Type"
  placeholder="Select a project type"
  [options]="projectTypes"
  [multiple]="false"
  [searchable]="true"
  [(ngModel)]="selectedType"
/>
```
