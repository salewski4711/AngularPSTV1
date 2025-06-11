# Task 20: Dropdown Menu Component [PARTIAL EXTRACTION]

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17-19, 21-27
**Time:** 2.5 hours
**Source:** `C:\Code\CRM_Chatgpt_WEB\component-validation\navigation\02-tailwind-demo-complete.html`

## Objective
Create dropdown menu component for context menus and selections.

## Component Features
- Trigger button
- Menu items with icons
- Dividers
- Disabled items
- Keyboard navigation
- Position: bottom, top, left, right

## Files to Create
```
src/app/shared/components/dropdown/
├── dropdown.component.ts
├── dropdown.component.html
├── dropdown.component.spec.ts
└── dropdown.directive.ts
```

## Showcase Location
```
pages/molecules/dropdown-showcase/
└── dropdown-showcase.component.ts
```

## Props
- items: MenuItem[]
- position: 'bottom' | 'top' | 'left' | 'right'
- trigger: 'click' | 'hover'
- closeOnSelect?: boolean

## Acceptance Criteria
- [ ] Extract dropdown patterns
- [ ] Positioning logic
- [ ] Keyboard navigation
- [ ] Click outside close
- [ ] Accessibility
