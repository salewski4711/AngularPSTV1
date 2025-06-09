# Task 26: Time Picker Component

## Status: 🟡 Ready for Development
**Can be done in parallel with:** Tasks 17-25, 27
**Time:** 2.5 hours
**Dependencies:** None

## Objective
Create time picker component for time selection.

## Component Features
- 12/24 hour format
- Minute intervals
- Dropdown or input mode
- Keyboard input
- Validation
- AM/PM toggle

## Files to Create
```
src/app/shared/components/time-picker/
├── time-picker.component.ts
├── time-picker.component.html
└── time-picker.component.spec.ts
```

## Showcase Location
```
pages/molecules/time-picker-showcase/
└── time-picker-showcase.component.ts
```

## Props
- value: string
- format: '12' | '24'
- minuteInterval?: number
- min?: string
- max?: string

## Acceptance Criteria
- [ ] Time selection working
- [ ] Format switching
- [ ] Input validation
- [ ] Keyboard support
- [ ] Accessibility
