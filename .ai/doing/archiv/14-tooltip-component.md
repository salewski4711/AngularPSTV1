# Task 14: Tooltip Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 10-13, 15-16
**Estimated Time:** 3 hours
**Dependencies:** None

## Objective
Create tooltip component for contextual information on hover/focus.

## Component Features
- Positions: top, bottom, left, right, auto
- Trigger: hover, click, focus
- Arrow pointer
- Max width control
- Delay options
- Animation

## Files to Create
```
src/app/shared/components/tooltip/
├── tooltip.directive.ts    # Main directive
├── tooltip.component.ts    # Overlay component
└── tooltip.service.ts      # Position service
```

## Usage
```html
<button appTooltip="Help text" position="top">
  Hover me
</button>
```

## Props
- content: string
- position: Position
- trigger: 'hover' | 'click' | 'focus'
- delay?: number
- maxWidth?: string

## Showcase Location
```
pages/atoms/tooltip-showcase/
└── tooltip-showcase.component.ts
```

## Acceptance Criteria
- [ ] All positions work
- [ ] Auto-positioning on viewport edge
- [ ] Keyboard accessible
- [ ] Mobile touch support
