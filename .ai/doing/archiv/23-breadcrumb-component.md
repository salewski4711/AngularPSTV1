# Task 23: Breadcrumb Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17-22, 24-27
**Time:** 1.5 hours
**Dependencies:** None

## Objective
Create breadcrumb navigation component.

## Component Features
- Auto-generate from routes
- Custom separators
- Icons support
- Truncation for long items
- Home icon option
- Responsive (mobile)

## Files to Create
```
src/app/shared/components/breadcrumb/
├── breadcrumb.component.ts
├── breadcrumb.component.html
└── breadcrumb.component.spec.ts
```

## Showcase Location
```
pages/molecules/breadcrumb-showcase/
└── breadcrumb-showcase.component.ts
```

## Props
- items: BreadcrumbItem[]
- separator?: string | TemplateRef
- showHome?: boolean
- maxItems?: number

## Acceptance Criteria
- [ ] Route integration
- [ ] Custom separators
- [ ] Truncation working
- [ ] Mobile responsive
- [ ] Accessibility
