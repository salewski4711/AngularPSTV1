# PROMPT: Migrate ALL Components from app- to pst- Prefix

## 🎯 Task
Replace ALL `app-` prefixes with `pst-` (ProSolarTec) throughout the Angular project.

## 📋 Scope Analysis
Found **120+ components** and **500+ template references** using `app-` prefix:

### Target Files:
- **Component selectors**: 120+ `.component.ts` files
- **Template usage**: 500+ HTML templates and inline templates  
- **README/Documentation**: Multiple `.md` files with examples
- **Test files**: `.spec.ts` files with component usage

## 🔧 Migration Steps

### 1. Update Component Selectors
```bash
# Regex Replace in all .ts files:
Find: selector:\s*['"]app-([^'"]+)['"]
Replace: selector: 'pst-$1'
```

### 2. Update HTML Templates
```bash
# Opening tags
Find: <pst-([^>\s]+)
Replace: <pst-$1

# Closing tags  
Find: </pst-([^>\s]+)>
Replace: </pst-$1>

# Self-closing tags
Find: <pst-([^/>]+)/>
Replace: <pst-$1/>
```

### 3. Update Documentation & Examples
```bash
# Update README and example files
Find: <pst-
Replace: <pst-

# Update selector examples in docs
Find: selector:\s*['"]app-
Replace: selector: 'pst-
```
## 📂 Target Directories:
```
src/app/
├── shared/components/          (50+ components)
├── features/components-showcase/ (60+ showcase components)  
├── design-system/             (3 components)
├── layouts/                   (1 component)
├── features/                  (10+ feature components)
└── core/                      (if any)
```

## ⚠️ EXCEPTIONS - DO NOT Change:
- `app-root` (main app selector)
- `app.component.ts` (root component)
- `app.html`, `app.scss`, `app.routes.ts`
- Third-party component selectors

## 🔍 Key Components to Update:
**Atoms**: alert, avatar, badge, button, checkbox, divider, icon, input, link, logo, progress-bar, radio, select, skeleton, spinner, tag, toggle, tooltip

**Molecules**: accordion, breadcrumb, bottom-navigation, button-group, card, date-picker, dropdown, file-upload, form-field, modal, notifications, pagination, search-modal, tabs, time-picker, user-menu

**Organisms**: mobile-menu, search, stepper, top-navigation

**Showcases**: All showcase components (60+)

## ✅ Validation Steps:
```bash
# 1. Build check
ng build --configuration=development

# 2. Serve check  
ng serve --port 4201

# 3. Verify no errors:
# - No "Unknown element" errors
# - No template compilation errors
# - All components render correctly

# 4. Test key pages:
# - http://localhost:4201/showcase
# - http://localhost:4201/components
```

## 🎯 Expected Results:
- ✅ All component selectors use `pst-` prefix
- ✅ All template references updated
- ✅ Documentation examples updated  
- ✅ Clean build with no errors
- ✅ ProSolarTec branding consistency

## 📝 Post-Migration Checklist:
- [ ] Update angular.json prefix setting to `pst`
- [ ] Update tslint/eslint rules for component prefix
- [ ] Update component generation scripts
- [ ] Update development documentation

---
**🚀 This migration establishes ProSolarTec's custom component prefix across the entire design system!**