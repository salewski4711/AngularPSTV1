# Task 04: Radio Component Migration

## Status: 🔴 Not Started
**Priority: MEDIUM**  
**Estimated Time: 3 hours**

## Objective
Implement Radio button component with group support and Tailwind styling.

## Implementation
- Path: `src/app/shared/components/radio/`
- Components: radio.component.ts, radio-group.component.ts

## Features
- [ ] Radio button with custom styling
- [ ] RadioGroup container for managing selection
- [ ] Horizontal/vertical layouts
- [ ] Disabled state (individual & group)
- [ ] Keyboard navigation (Arrow keys)
- [ ] Form integration

## Tailwind Classes
```typescript
Radio: 'h-4 w-4 border-gray-300 text-primary focus:ring-primary'
Label: 'ml-3 block text-sm font-medium text-gray-700'
Group: 'space-y-4' // or 'space-x-4 flex' for horizontal
```

## Example
```html
<pst-radio-group [(value)]="selectedOption" [name]="'options'">
  <pst-radio value="option1" label="Option 1" />
  <pst-radio value="option2" label="Option 2" />
  <pst-radio value="option3" label="Option 3" [disabled]="true" />
</pst-radio-group>
```

## Testing
- [ ] Group selection logic
- [ ] Keyboard navigation
- [ ] Form integration
- [ ] Accessibility
