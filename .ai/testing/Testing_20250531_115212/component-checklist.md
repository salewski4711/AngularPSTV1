# Angular Component Review Checklist

Use this checklist for code reviews and when creating new components.

## 🏗️ Component Structure

### Basic Setup
- [ ] Component uses `standalone: true`
- [ ] Appropriate selector naming (app-prefix)
- [ ] File naming follows convention: `component-name.component.ts`
- [ ] Template and styles in separate files (for complex components)

### Change Detection
- [ ] Uses `ChangeDetectionStrategy.OnPush`
- [ ] Immutable state updates
- [ ] Proper use of `markForCheck()` when needed

## 📘 TypeScript & Type Safety

### Type Definitions
- [ ] No `any` types (use `unknown` if needed)
- [ ] Interfaces for complex data structures
- [ ] Proper typing for @Input() and @Output()
- [ ] Type guards for runtime safety

### Example:
```typescript
// Good
export interface ButtonConfig {
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
}

// Bad
config: any;
```

## 📝 Documentation

### Component Documentation
- [ ] JSDoc comment on component class
- [ ] Description of component purpose
- [ ] Usage example in JSDoc
- [ ] Complex logic explained with inline comments

### Input/Output Documentation
- [ ] All @Input() properties documented
- [ ] All @Output() events documented
- [ ] Default values noted
- [ ] Required vs optional clearly marked

### Example:
```typescript
/**
 * Displays a customizable button with multiple style variants
 * @example
 * <pst-button variant="primary" (clicked)="handleClick()">
 *   Click me
 * </pst-button>
 */
export class ButtonComponent {
  /**
   * Visual style variant of the button
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = 'primary';
}
```

## 🎨 Styling & Theming

### CSS Architecture
- [ ] Uses Tailwind utility classes
- [ ] No hardcoded colors (use theme tokens)
- [ ] Responsive design implemented
- [ ] Dark mode support

### Design Tokens
- [ ] Colors from design system
- [ ] Consistent spacing (8px grid)
- [ ] Typography from theme

## ♿ Accessibility

### ARIA Attributes
- [ ] Proper ARIA labels for interactive elements
- [ ] Role attributes where needed
- [ ] Loading states announced
- [ ] Error states announced

### Keyboard Navigation
- [ ] All interactive elements keyboard accessible
- [ ] Proper tab order
- [ ] Focus indicators visible
- [ ] Escape key handling (modals, dropdowns)

### Screen Reader Support
- [ ] Meaningful text alternatives
- [ ] Proper heading hierarchy
- [ ] Live regions for dynamic content

## 🚀 Performance

### Rendering Optimization
- [ ] OnPush change detection
- [ ] TrackBy functions for *ngFor
- [ ] Debounced event handlers
- [ ] Computed signals for derived state

### Bundle Size
- [ ] Lazy loaded when appropriate
- [ ] Tree-shakeable imports
- [ ] No unnecessary dependencies

## 🧪 Testing

### Unit Tests
- [ ] Component creation test
- [ ] Input property tests
- [ ] Output event tests
- [ ] User interaction tests
- [ ] Error scenario tests

### Test Coverage
- [ ] Minimum 80% code coverage
- [ ] All public methods tested
- [ ] Edge cases covered

## 🔒 Security

### Input Validation
- [ ] User inputs sanitized
- [ ] No direct DOM manipulation
- [ ] Content Security Policy compliant

## 📦 State Management

### Component State
- [ ] Uses Angular Signals for reactive state
- [ ] Computed signals for derived values
- [ ] Effects for side effects

### Example:
```typescript
// Good - Using signals
count = signal(0);
doubleCount = computed(() => this.count() * 2);

// Avoid - Using plain properties
count = 0;
get doubleCount() { return this.count * 2; }
```

## 🔌 Component API

### Inputs
- [ ] Reasonable defaults provided
- [ ] Validation where needed
- [ ] Consistent naming with other components

### Outputs
- [ ] EventEmitter with proper types
- [ ] Consistent event naming (past tense)
- [ ] Minimal event payload

## 🏛️ Architecture Patterns

### SOLID Principles
- [ ] Single Responsibility (one clear purpose)
- [ ] Open/Closed (extensible via inputs)
- [ ] Dependency Injection used properly

### Smart/Dumb Pattern
- [ ] Presentational components have no services
- [ ] Container components manage state
- [ ] Clear separation of concerns

## 📋 Code Quality

### Clean Code
- [ ] Functions < 20 lines
- [ ] Cyclomatic complexity < 10
- [ ] DRY principle followed
- [ ] Meaningful variable/function names

### Error Handling
- [ ] Graceful error handling
- [ ] User-friendly error messages
- [ ] Fallback UI for error states

## 🚦 Review Checklist Summary

### Must Have (Block PR)
- ✅ OnPush change detection
- ✅ No `any` types
- ✅ Basic accessibility (ARIA labels)
- ✅ Some tests (minimum happy path)

### Should Have (Follow-up ticket)
- ⚠️ Complete JSDoc documentation
- ⚠️ 80%+ test coverage
- ⚠️ Full keyboard navigation
- ⚠️ Performance optimizations

### Nice to Have (Tech debt)
- 💡 Storybook stories
- 💡 Visual regression tests
- 💡 Performance benchmarks
- 💡 Usage analytics

## 📝 Component Review Template

```markdown
## Component: [ComponentName]
**Reviewer**: [Your Name]
**Date**: [Date]

### ✅ Meets Requirements
- [ ] Functional requirements met
- [ ] Design matches mockups
- [ ] Responsive on all breakpoints

### 🏗️ Architecture
- [ ] OnPush: Yes/No
- [ ] Type Safety: Good/Issues
- [ ] Patterns: Followed/Violations

### 📊 Quality Metrics
- Test Coverage: __%
- Complexity: __
- Bundle Impact: __ KB

### 🐛 Issues Found
1. [Issue description]
2. [Issue description]

### 💡 Suggestions
1. [Improvement suggestion]
2. [Improvement suggestion]

### 📌 Action Items
- [ ] [Required fix]
- [ ] [Required fix]
```