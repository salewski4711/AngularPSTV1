# Task 01: Input Component Migration

## Status: 🔴 Not Started
**Priority: HIGH** (Kritisch für Forms)  
**Estimated Time: 4-6 hours**

## Objective
Migrate and implement a comprehensive Input component from CRM_Chatgpt_WEB to Angular with full Tailwind CSS styling and reactive forms support.

## Prerequisites
- [ ] Analyze `/forms/02-tailwind-demo.html` (aktuelle Tailwind-Implementierung)
- [ ] Review existing ButtonBetaComponent for pattern consistency
- [ ] Check tailwind.config.js for available utilities

## Phase 1: Analysis (1 hour)
- [ ] Extract input patterns from `C:\Code\CRM_Chatgpt_WEB\component-validation\forms\02-tailwind-demo.html`
- [ ] Document all input variants (text, number, password, email, tel)
- [ ] Identify all states (default, hover, focus, disabled, error, success)
- [ ] List required icons and helper elements

## Phase 2: Implementation (3 hours)

### 2.1 Create Type Definitions
```typescript
// Path: src/app/shared/components/input/input.types.ts
- [ ] Define InputType type
- [ ] Define InputSize type
- [ ] Define InputState type
- [ ] Create InputConfig interface
```

### 2.2 Implement Base Component
```typescript
// Path: src/app/shared/components/input/input.component.ts
- [ ] Create standalone component with ControlValueAccessor
- [ ] Implement computed() for dynamic Tailwind classes
- [ ] Add all @Input() properties
- [ ] Implement validation logic
- [ ] Add icon support (left/right positions)
- [ ] Implement label, helper text, error message
```

### 2.3 Tailwind Classes Structure
```typescript
- [ ] Base: 'block w-full rounded-md transition-colors duration-200'
- [ ] Sizes: sm, md, lg with appropriate padding/text-size
- [ ] States: border colors, focus rings, disabled opacity
- [ ] Dark mode: dark:bg-gray-800 dark:border-gray-600
- [ ] Error state: border-red-500 text-red-600
```

## Phase 3: Testing (1 hour)
- [ ] Unit tests for all input types
- [ ] ControlValueAccessor integration tests
- [ ] Accessibility tests (ARIA attributes)
- [ ] Dark mode visual tests
- [ ] Form validation integration

## Phase 4: Documentation (0.5 hours)
- [ ] Create README.md with usage examples
- [ ] Add JSDoc comments
- [ ] Create examples in playground component
- [ ] Document all Input properties and events

## Acceptance Criteria
- [ ] All input types working (text, number, password, email, tel)
- [ ] Full keyboard navigation support
- [ ] Reactive forms integration
- [ ] Accessible (WCAG 2.1 AA compliant)
- [ ] Responsive design
- [ ] Dark mode support
- [ ] No CSS files (only Tailwind)
- [ ] 80%+ test coverage

## Code Example
```typescript
<app-input
  type="email"
  label="Email Address"
  placeholder="name@example.com"
  size="md"
  [required]="true"
  [hasError]="emailControl.invalid && emailControl.touched"
  error="Please enter a valid email"
  icon="mail"
  iconPosition="left"
  [(ngModel)]="email"
/>
```

## Dependencies
- CommonModule
- ReactiveFormsModule
- IconComponent (existing)
- Tailwind CSS

## Notes
- Follow DRY principle with base classes
- Ensure consistent API with ButtonBetaComponent
- Consider creating shared form utilities
