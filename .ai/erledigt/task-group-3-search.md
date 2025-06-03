## GRUPPE 3: Search Component
**Agent:** `search-agent` | **File:** `src/app/shared/components/search/`

### TASK-3.1: Icon Size Parameters
**Issue:** String not assignable to number
**Fix:**
- Line 28: `size="sm"` → `[size]="16"`
- Line 47: `size="lg"` → `[size]="24"`

### TASK-3.2: Icon Name Type-Errors
**Issue:** Invalid icon names
**Fix:**
- Line 32: `name="loader"` → use valid IconName or create custom icon
- Line 61: Dynamic icon in `getResultIcon()` - ensure valid return types

### TASK-3.3: Search Result Icon Method
**Implementation needed:**
```typescript
getResultIcon(type: string): IconName {
  const iconMap: Record<string, IconName> = {
    'page': 'file',
    'user': 'user',
    'document': 'file-text',
    'default': 'search'
  };
  return iconMap[type] || iconMap['default'];
}
```

**Exit:** ✅ SearchComponent compiles and renders correctly