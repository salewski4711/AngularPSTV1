## GRUPPE 7: SCSS Modernization
**Agent:** `scss-modernization-agent` | **Files:** All SCSS files

### TASK-7.1: Convert @import to @use
**Issue:** Sass @import deprecated, will be removed in Dart Sass 3.0.0

**Files to fix:**
1. `src/app/shared/components/mobile-menu/mobile-menu.component.scss:1`
2. `src/app/shared/components/top-navigation/top-navigation.component.scss:1`

**Fix:**
```scss
// OLD:
@import '../../../core/design-system/design-tokens.scss';
@import '../../../../styles/variables';

// NEW:
@use '../../../core/design-system/design-tokens' as tokens;
@use '../../../../styles/variables' as vars;

// Update usage:
// tokens.$variable-name
// vars.$variable-name
```

**Exit:** ✅ No Sass deprecation warnings