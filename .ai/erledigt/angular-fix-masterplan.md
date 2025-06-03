# Angular Multi-Agent Fix Plan
**Projekt:** C:\Code\AngularV1 - 30+ Errors

## 🎯 Master Prompt
```
Master Coordinator für Angular-Fehlerbehebung. 
Arbeite systematisch durch Gruppen 1-7.
Nach jeder Gruppe: Build-Test!
```

## 📊 Agent Tasks

### **G1: CORE** 🔴 [KRITISCH] - `dependency-agent`
- [ ] `npm install @angular/animations`
- [ ] ButtonComponent erstellen

### **G2: MOBILE MENU** 🟡 [HOCH] - `mobile-menu-agent`
- [ ] Animation Imports fixen
- [ ] Icon Size/Name Type-Fehler
- [ ] Badge/Avatar Properties
- [ ] ThemeService Observable

### **G3: SEARCH** 🟡 [HOCH] - `search-agent`
- [ ] Icon Size Parameter fixen
- [ ] Icon Name Type-Fehler
- [ ] Search Result Icon Method

### **G4: NOTIFICATIONS** 🟡 [MITTEL] - `notifications-agent`
- [ ] Animation Imports
- [ ] Icon Method fixen

### **G5: TOP NAV** 🟡 [MITTEL] - `top-nav-agent`
- [ ] Event Handler Parameter
- [ ] Mobile Menu Properties

### **G6: HEADER** 🟢 [NIEDRIG] - `header-cleanup-agent`
- [ ] Unused Imports entfernen

### **G7: SCSS** 🟢 [NIEDRIG] - `scss-modernization-agent`
- [ ] @import zu @use

## 🚀 Start: `claude-code "Execute G1 first"`