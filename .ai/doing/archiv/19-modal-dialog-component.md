# Task 19: Modal/Dialog Component [WITH EXTRACTION]

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17-18, 20-27
**Time:** 3 hours
**Source:** `C:\Code\CRM_Chatgpt_WEB\component-validation\modals\02-tailwind-demo.html`

## Objective
Create modal/dialog component for overlays and popups.

## Component Features
- Sizes: sm, md, lg, xl
- Header, body, footer sections
- Close button
- Backdrop click close
- Keyboard (ESC) support
- Animation

## Files to Create
```
src/app/shared/components/modal/
├── modal.component.ts
├── modal.component.html
├── modal.component.spec.ts
└── modal.service.ts
```

## Showcase Location
```
pages/molecules/modal-showcase/
└── modal-showcase.component.ts
```

## Props
- isOpen: boolean
- size: 'sm' | 'md' | 'lg' | 'xl'
- title?: string
- closeOnBackdrop?: boolean
- closeOnEsc?: boolean

## Acceptance Criteria
- [ ] Extract modal patterns
- [ ] Backdrop working
- [ ] Keyboard navigation
- [ ] Focus trap
- [ ] Animations
