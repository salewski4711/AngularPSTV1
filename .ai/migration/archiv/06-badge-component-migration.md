# Task 06: Badge Component Migration

## Status: 🔴 Not Started
**Priority: LOW**  
**Estimated Time: 2 hours**

## Objective
Implement Badge/Chip component for status indicators and tags.

## Implementation
- Path: `src/app/shared/components/badge/`
- File: badge.component.ts

## Features
- [ ] Variants: info, success, warning, error, neutral
- [ ] Sizes: sm, md, lg
- [ ] Icon support (left/right)
- [ ] Dismissible option with close button
- [ ] Dot indicator variant
- [ ] Counter/number badges

## Tailwind Classes
```typescript
Base: 'inline-flex items-center rounded-full font-medium'
Sizes: {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
}
Variants: {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  neutral: 'bg-gray-100 text-gray-800'
}
```

## Example
```html
<pst-badge variant="success" size="md" icon="check">
  Active
</pst-badge>

<pst-badge variant="warning" [dismissible]="true" (dismiss)="onDismiss()">
  Pending Approval
</pst-badge>
```

## Testing
- [ ] All variants rendering
- [ ] Dismissible functionality
- [ ] Icon integration
- [ ] Dark mode styles
