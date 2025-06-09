# Task: Wizard-Style Progress Bar Integration

## 🎯 Objective
Extend Progress Bar component with stepped "wizard" variant from `02d-wizard-demo.html`.

## 👨‍💻 Senior Developer Context
- Use SOLID principles (extend, don't modify)
- Apply DRY (reuse existing infrastructure)
- Tailwind CSS only (no custom styles)
- Angular 18+ best practices

## 📐 Technical Spec

### New Interface
```typescript
type ProgressVariant = 'linear' | 'circular' | 'steps';

interface ProgressStep {
  id: string | number;
  label: string;
  status: 'completed' | 'current' | 'pending' | 'error';
  icon?: string;
}
```

### Tailwind Classes
- Completed: `bg-success text-white`
- Current: `bg-primary text-white border-2 border-primary`
- Pending: `bg-white dark:bg-gray-800 border-2 border-gray-300`
- Connector: `h-px bg-gray-300 dark:bg-gray-700`

## 🔧 Implementation
1. Create `StepsProgressComponent`
2. Add step indicators & connectors
3. Support click/keyboard navigation
4. Maintain backward compatibility

## ✅ Acceptance Criteria
- [ ] Matches wizard demo design
- [ ] Only Tailwind utilities
- [ ] Dark mode support
- [ ] Full accessibility
- [ ] Unit tests >80%
- [ ] OnPush strategy

## 📚 Resources
- Source: `C:\Code\CRM_Chatgpt_WEB\...\02d-wizard-demo.html`
- Target: `C:\Code\AngularV1\...\progress-bar\`
