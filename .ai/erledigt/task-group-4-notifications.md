## GRUPPE 4: Notifications Component
**Agent:** `notifications-agent` | **File:** `src/app/shared/components/notifications/`

### TASK-4.1: Animation Imports
**Fix:** Add missing imports
```typescript
import { animate, style, transition, trigger } from '@angular/animations';
```

### TASK-4.2: Notification Icon Method
**Issue:** Line 70 - Invalid icon type return
**Fix:** Implement proper method:
```typescript
getNotificationIcon(type: string): IconName {
  const iconMap: Record<string, IconName> = {
    'success': 'check',
    'warning': 'alert-triangle',
    'error': 'x',
    'info': 'info',
    'default': 'bell'
  };
  return iconMap[type] || iconMap['default'];
}
```

**Exit:** ✅ NotificationsComponent animations work