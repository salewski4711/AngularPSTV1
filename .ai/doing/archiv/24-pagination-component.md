# Task 24: Pagination Component [WITH EXTRACTION]

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17-23, 25-27
**Time:** 2 hours
**Source:** `C:\Code\CRM_Chatgpt_WEB\component-validation\tables\02-tailwind-demo.html`

## Objective
Create pagination component for data navigation.

## Component Features
- Page numbers
- Previous/Next buttons
- First/Last buttons
- Page size selector
- Total items display
- Compact mode

## Files to Create
```
src/app/shared/components/pagination/
├── pagination.component.ts
├── pagination.component.html
└── pagination.component.spec.ts
```

## Showcase Location
```
pages/molecules/pagination-showcase/
└── pagination-showcase.component.ts
```

## Props
- currentPage: number
- totalItems: number
- itemsPerPage: number
- maxPages?: number
- showPageSize?: boolean

## Acceptance Criteria
- [ ] Extract pagination patterns
- [ ] Page calculation correct
- [ ] All buttons working
- [ ] Responsive design
- [ ] Accessibility
