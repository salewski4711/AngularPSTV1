## GRUPPE 1: Core Dependencies
**Agent:** `dependency-agent` | **Priorität:** KRITISCH

### TASK-1.1: Angular Animations
```bash
cd C:\Code\AngularV1
npm install @angular/animations
```

### TASK-1.2: ButtonComponent Fix
**Issue:** Module not found in navigation-demo.component.ts
**Location:** `src/app/shared/components/button/`

**Action:**
1. Check if ButtonComponent exists
2. Create if missing:
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'pst-button',
  template: `<button [class]="classes"><ng-content></ng-content></button>`,
  standalone: true
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  get classes(): string {
    return `btn btn-${this.variant} btn-${this.size}`;
  }
}
```
3. Update barrel exports
4. Fix import in navigation-demo.component.ts

**Exit:** ✅ No missing module errors