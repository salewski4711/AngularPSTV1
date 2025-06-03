## GRUPPE 2: Mobile Menu Component
**Agent:** `mobile-menu-agent` | **File:** `src/app/shared/components/mobile-menu/`

### TASK-2.1: Animation Imports
**Fix:** Add missing animation imports
```typescript
import { animate, state, style, transition, trigger } from '@angular/animations';
```

### TASK-2.2: Icon Size Type-Errors  
**Issue:** String not assignable to number
**Fix:** Change all icon sizes:
- Line 25: `size="24"` → `[size]="24"`
- Line 35: `size="20"` → `[size]="20"`  
- Line 54: `size="20"` → `[size]="20"`
- Line 70: `size="16"` → `[size]="16"`
- Line 116: `size="20"` → `[size]="20"`
- Line 124: `size="20"` → `[size]="20"`

### TASK-2.3: Icon Name Type-Errors
**Fix:**
- Line 124: `name="log-out"` → `name="logout"`
- Line 53: Dynamic icon binding - ensure valid IconName types

### TASK-2.4: Badge Properties
**Issue:** Can't bind to 'text', invalid variant/size
**Fix:**
- Add `@Input() text: string` to BadgeComponent
- Fix variant: `variant="primary"` → valid BadgeVariant
- Fix size: `size="small"` → valid BadgeSize

### TASK-2.5: Avatar Properties  
**Issue:** Can't bind to 'image', invalid size
**Fix:**
- Add `@Input() image: string` to AvatarComponent
- Fix size: `size="small"` → valid AvatarSize

### TASK-2.6: ThemeService Observable
**Fix:** Line 115: `isDarkMode$` → `isDarkMode`

**Exit:** ✅ MobileMenuComponent compiles without errors