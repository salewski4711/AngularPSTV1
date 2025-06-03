# CLAUDE CODE: Angular Fix Agent (PROMOTION)
**C:\Code\AngularV1 | Promote ButtonBetaComponent → ButtonComponent**

## 🔴 G1: CORE - BUTTON PROMOTION
```bash
cd C:\Code\AngularV1
npm install @angular/animations

# Promote ButtonBeta to Production
mv "src/app/shared/components-beta/button/button-beta.component.ts" "src/app/shared/components/button/button.component.ts"

# Edit button.component.ts:
# 1. selector: 'app-button-beta' → 'app-button'
# 2. class: ButtonBetaComponent → ButtonComponent  
# 3. Remove: @Input() showBetaBadge = true;
# 4. Remove: showBetaBadge template section

ng build --dry-run && echo "✅ G1 done - Button promoted!"
```

## 🟡 G2: MOBILE MENU
```typescript
// Add to mobile-menu.component.ts:
import { animate, state, style, transition, trigger } from '@angular/animations';
```
Fix template: `size="24"` → `[size]="24"` (Lines 25,35,54,70,116,124)
Fix: `name="log-out"` → `name="logout"` + `isDarkMode$` → `isDarkMode`

## 🟡 G3: SEARCH  
Fix: `size="sm"` → `[size]="16"`, `size="lg"` → `[size]="24"`, `name="loader"` → `name="loader-2"`
Add: `getResultIcon(type: string) { return {'page':'file-text','user':'user','default':'search'}[type] || 'search'; }`

## 🟡 G4: NOTIFICATIONS
Add: `import { animate, style, transition, trigger } from '@angular/animations';`
Add: `getNotificationIcon(type: string) { return {'success':'check-circle','error':'x-circle','default':'bell'}[type] || 'bell'; }`

## 🟡 G5: TOP NAV
Fix: `onSearchSubmit(query: string)` + `onUserMenuAction(action: string)`
Add to MobileMenu: `@Input() showSearch = true; @Input() showNotifications = true; @Input() showUserMenu = true;`

## 🟢 G6: HEADER - Remove unused RouterLink/RouterLinkActive imports
## 🟢 G7: SCSS - Replace `@import` with `@use`

## 🎯 FINAL: `ng build --configuration=production && echo "🎉 PROMOTED & FIXED!"`