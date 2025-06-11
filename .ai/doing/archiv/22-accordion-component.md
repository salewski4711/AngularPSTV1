# Task 22: Accordion Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17-21, 23-27
**Time:** 2 hours
**Dependencies:** None

## Objective
Create accordion component for collapsible content sections.

## Component Features
- Single/multiple open panels
- Icons (chevron animation)
- Nested accordions
- Disabled panels
- Smooth animations
- Keyboard support

## Files to Create
```
src/app/shared/components/accordion/
├── accordion.component.ts
├── accordion.component.html
├── accordion-panel.component.ts
└── accordion.component.spec.ts
```

## Showcase Location
```
pages/molecules/accordion-showcase/
└── accordion-showcase.component.ts
```

## Props
- panels: AccordionPanel[]
- multiple?: boolean
- animated?: boolean
- iconPosition: 'left' | 'right'

## Acceptance Criteria
- [ ] Expand/collapse working
- [ ] Multiple mode
- [ ] Smooth animations
- [ ] Keyboard navigation
- [ ] Accessibility (ARIA)
