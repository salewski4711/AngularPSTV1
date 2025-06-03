# Angular CRM Refactoring Backlog

## Priority Classification
- 🔴 **Critical**: Blocks development or causes production issues
- 🟡 **High**: Significant impact on performance, maintainability, or UX
- 🟢 **Medium**: Important for long-term health
- 🔵 **Low**: Nice to have improvements

---

## 🔴 Critical Priority (Sprint 1-2)

### 1. Implement Testing Infrastructure
**Components Affected**: All (9 components)
**Effort**: 8 Story Points
**Impact**: Prevents regressions, enables confident refactoring

#### Tasks:
- [ ] Configure Jest or enhance Karma setup
- [ ] Create test utilities and mocks
- [ ] Add test templates for common patterns
- [ ] Implement CI/CD test requirements
- [ ] Write initial test suite for ButtonBetaComponent

### 2. Add Change Detection Strategy
**Components Affected**: All (9 components)
**Effort**: 3 Story Points  
**Impact**: Significant performance improvement

#### Implementation:
```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

---

## 🟡 High Priority (Sprint 3-4)

### 3. Fix Type Safety Issues
**Components Affected**: IconComponent, HeaderComponent
**Effort**: 5 Story Points
**Impact**: Prevents runtime errors, improves IDE support

#### IconComponent Fix:
```typescript
// Create icon types
export type IconName = keyof typeof ICONS;

// Update component
@Input({ required: true }) name!: IconName;
```

### 4. Implement Design Token System
**Effort**: 8 Story Points
**Impact**: Consistent theming, easier maintenance

#### Tasks:
- [ ] Create design-tokens.ts with color, spacing, typography
- [ ] Replace hardcoded values in all components
- [ ] Document token usage
- [ ] Create migration guide

### 5. Accessibility Improvements
**Components Affected**: SpinnerComponent, HeaderComponent, ButtonBetaComponent
**Effort**: 5 Story Points
**Impact**: WCAG compliance, better UX for all users

#### Critical Fixes:
- [ ] Add role="status" to SpinnerComponent
- [ ] Add aria-current to navigation
- [ ] Improve icon-only button accessibility
- [ ] Add proper loading announcements

---

## 🟢 Medium Priority (Sprint 5-6)

### 6. Extract Shared Patterns
**Effort**: 5 Story Points
**Impact**: DRY principle, easier maintenance

#### Tasks:
- [ ] Create base component class for common functionality
- [ ] Extract button configuration to separate file
- [ ] Create shared size/variant types
- [ ] Implement composition patterns

### 7. Documentation Enhancement
**Components Affected**: All
**Effort**: 8 Story Points
**Impact**: Better onboarding, reduced support burden

#### Tasks:
- [ ] Add JSDoc to all public APIs
- [ ] Create component usage examples
- [ ] Document component lifecycle
- [ ] Add inline code examples

### 8. Error Handling Implementation
**Components Affected**: LogoComponent, IconComponent
**Effort**: 3 Story Points
**Impact**: Better user experience, easier debugging

#### Implementation:
```typescript
// IconComponent error handling
if (!ICONS[this.name]) {
  console.warn(`Icon "${this.name}" not found`);
  return this.renderFallbackIcon();
}
```

---

## 🔵 Low Priority (Future Sprints)

### 9. Performance Optimizations
**Effort**: 5 Story Points
- [ ] Implement virtual scrolling for large lists
- [ ] Add lazy loading for routes
- [ ] Optimize bundle size
- [ ] Implement service workers

### 10. Enhanced Developer Experience
**Effort**: 3 Story Points
- [ ] Create component generator schematics
- [ ] Add Storybook for component documentation
- [ ] Implement hot module replacement
- [ ] Create VS Code snippets

---

## Technical Debt Summary

### By Category:
- **Testing**: 9 components with 0% coverage
- **Performance**: No OnPush strategy implemented
- **Type Safety**: 4 components with type issues
- **Accessibility**: 3 components with a11y issues
- **Documentation**: 100% missing JSDoc

### By Component Priority:
1. **ButtonBetaComponent** - Core UI element (High)
2. **IconComponent** - Used everywhere (High)
3. **HeaderComponent** - Main navigation (High)
4. **SpinnerComponent** - Loading states (Medium)
5. **LogoComponent** - Branding (Low)

---

## Sprint Planning Recommendation

### Sprint 1-2 (2 weeks):
- Testing infrastructure setup
- OnPush for all components
- Critical type safety fixes

### Sprint 3-4 (2 weeks):
- Design token system
- Accessibility audit and fixes
- Documentation for core components

### Sprint 5-6 (2 weeks):
- Pattern extraction
- Error handling
- Performance optimizations

### Ongoing:
- Maintain > 80% test coverage
- Document new components
- Regular accessibility audits

---

## Success Metrics

### Code Quality:
- [ ] 80%+ test coverage
- [ ] 0 TypeScript errors
- [ ] All components use OnPush
- [ ] 100% JSDoc coverage

### Performance:
- [ ] < 50ms component render time
- [ ] < 3s initial load time
- [ ] 90+ Lighthouse score

### Developer Experience:
- [ ] < 1 day onboarding for new devs
- [ ] < 30min to create new component
- [ ] Automated quality checks

---

## Notes

1. **Migration Strategy**: Start with high-traffic components
2. **Testing Priority**: Focus on public APIs first
3. **Breaking Changes**: Coordinate with consumers before type changes
4. **Documentation**: Update as you refactor, not after