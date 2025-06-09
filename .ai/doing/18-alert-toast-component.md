# Task 18: Alert/Toast Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17, 19-27
**Time:** 2.5 hours
**Dependencies:** None

## Objective
Create alert/toast notification component for user feedback.

## Component Features
- Types: success, error, warning, info
- Dismissible option
- Auto-dismiss timer
- Position: top, bottom
- Animation in/out
- Icon support

## Files to Create
```
src/app/shared/components/alert/
├── alert.component.ts
├── alert.component.html
├── alert.component.spec.ts
└── alert.service.ts
```

## Showcase Location
```
pages/molecules/alert-showcase/
└── alert-showcase.component.ts
```

## Props
- type: 'success' | 'error' | 'warning' | 'info'
- message: string
- dismissible?: boolean
- duration?: number
- position?: 'top' | 'bottom'

## Acceptance Criteria
- [ ] All alert types styled
- [ ] Dismiss functionality
- [ ] Toast service working
- [ ] Animations smooth
- [ ] Accessibility
