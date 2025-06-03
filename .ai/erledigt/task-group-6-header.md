## GRUPPE 6: Header Component Cleanup
**Agent:** `header-cleanup-agent` | **File:** `src/app/layouts/header/`

### TASK-6.1: Remove Unused Imports
**Issue:** RouterLink and RouterLinkActive not used in template
**Fix:**
1. Check header.component.html for RouterLink usage
2. If not used, remove from imports:
```typescript
// Remove if not in template:
imports: [CommonModule, LogoComponent, /* RouterLink, RouterLinkActive, */ IconComponent, ...]
```

**Exit:** ✅ No unused import warnings