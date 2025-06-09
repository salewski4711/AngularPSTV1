# Task 21: Tabs Component [WITH EXTRACTION]

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17-20, 22-27
**Time:** 2.5 hours
**Source:** `C:\Code\CRM_Chatgpt_WEB\component-validation\navigation\02c-detail-tabs-demo.html`

## Objective
Create tabs component for content organization.

## Component Features
- Tab variants: line, pills, bordered
- Icons in tabs
- Disabled tabs
- Scrollable tabs
- Keyboard navigation
- Lazy loading content

## Files to Create
```
src/app/shared/components/tabs/
├── tabs.component.ts
├── tabs.component.html
├── tab-panel.component.ts
└── tabs.component.spec.ts
```

## Showcase Location
```
pages/molecules/tabs-showcase/
└── tabs-showcase.component.ts
```

## Props
- tabs: Tab[]
- variant: 'line' | 'pills' | 'bordered'
- activeTab: number
- scrollable?: boolean

## Acceptance Criteria
- [ ] Extract tab patterns
- [ ] All variants working
- [ ] Keyboard navigation
- [ ] Content switching
- [ ] Responsive behavior
