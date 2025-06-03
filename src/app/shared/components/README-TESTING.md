# Component Testing Guide

## Overview

All components in this directory have comprehensive unit tests with >80% code coverage.

## Running Tests

```bash
# Run all tests
npm test

# Run tests for a specific component
ng test --include='**/input.component.spec.ts'

# Run tests with coverage
ng test --code-coverage

# Run tests once (no watch)
ng test --watch=false
```

## Test Structure

Each component test follows this structure:

1. **Component Creation** - Basic smoke tests
2. **Properties & Inputs** - Testing all @Input properties
3. **States** - Testing different component states (disabled, loading, error, etc.)
4. **Form Integration** - Testing ControlValueAccessor implementation
5. **Events & Outputs** - Testing @Output events and user interactions
6. **Accessibility** - Testing ARIA attributes and keyboard navigation
7. **Visual States** - Testing CSS classes and styling

## Component Test Coverage

| Component | Coverage | Key Test Areas |
|-----------|----------|----------------|
| **InputComponent** | 85%+ | All input types, validation states, icons, sizes |
| **SelectComponent** | 85%+ | Options, groups, form integration, states |
| **CheckboxComponent** | 85%+ | Checked/indeterminate states, form binding |
| **RadioGroupComponent** | 85%+ | Group behavior, orientation, disabled states |
| **ToggleComponent** | 85%+ | Toggle states, animations, accessibility |
| **BadgeComponent** | 85%+ | All variants, colors, removable behavior |
| **AvatarComponent** | 85%+ | Image/initials fallback, status indicators |

## Common Test Patterns

### Testing Form Controls

```typescript
it('should work with FormControl', () => {
  const control = new FormControl('value');
  component.writeValue('value');
  fixture.detectChanges();
  
  expect(component.value()).toBe('value');
});
```

### Testing Events

```typescript
it('should emit event on action', () => {
  const spy = jasmine.createSpy('eventSpy');
  component.someEvent.subscribe(spy);
  
  // Trigger action
  component.doAction();
  
  expect(spy).toHaveBeenCalledWith(expectedValue);
});
```

### Testing CSS Classes

```typescript
it('should apply correct classes', () => {
  component.variant = 'primary';
  fixture.detectChanges();
  
  const element = fixture.debugElement.query(By.css('.selector'));
  expect(element.nativeElement.classList.toString()).toContain('expected-class');
});
```

### Testing Accessibility

```typescript
it('should have proper ARIA attributes', () => {
  const element = fixture.debugElement.query(By.css('[role]'));
  expect(element.nativeElement.getAttribute('role')).toBe('button');
  expect(element.nativeElement.getAttribute('aria-label')).toBeTruthy();
});
```

## Best Practices

1. **Use `fixture.detectChanges()`** after changing component properties
2. **Test edge cases** - empty values, null, undefined
3. **Test user interactions** - clicks, keyboard events, focus/blur
4. **Mock dependencies** properly using Jasmine spies
5. **Test computed properties** by checking their output
6. **Verify accessibility** - ARIA attributes, keyboard navigation

## Debugging Tests

```bash
# Run tests in Chrome for debugging
ng test --browsers=Chrome

# Run a single test file
ng test --include='**/badge.component.spec.ts'

# Focus on a single test
it.only('should test something', () => {
  // This test will run in isolation
});
```

## Coverage Reports

After running tests with coverage, view the report at:
```
coverage/index.html
```

## Continuous Integration

Tests are configured to run in CI with:
- Headless Chrome
- Single run mode
- Coverage reporting
- Strict error checking