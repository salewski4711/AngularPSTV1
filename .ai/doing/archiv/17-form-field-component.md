# Task 17: Form Field Component [WITH EXTRACTION]

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 18-27
**Time:** 2.5 hours
**Source:** `C:\Code\CRM_Chatgpt_WEB\component-validation\forms\02-tailwind-demo.html`

## Objective
Form field component combining label, input, and error messages.

## Component Features
- Label with required indicator
- Input integration
- Error message display
- Help text support
- Validation states

## Files to Create
```
src/app/shared/components/form-field/
├── form-field.component.ts
├── form-field.component.html
└── form-field.component.spec.ts
```

## Showcase Location
```
pages/molecules/form-field-showcase/
└── form-field-showcase.component.ts
```

## Props
- label, name, type
- required, error, helpText
- disabled

## Acceptance Criteria
- [ ] Extract form patterns from source
- [ ] Error states working
- [ ] Accessibility (ARIA)
- [ ] Dark mode support
