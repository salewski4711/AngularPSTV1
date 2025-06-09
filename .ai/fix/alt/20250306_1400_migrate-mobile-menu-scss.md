# Task: Mobile Menu SCSS zu Tailwind Migration

## Titel
Migration von mobile-menu.component.scss zu Tailwind CSS

## Beschreibung
Die mobile-menu.component.scss ist mit 5.76KB die größte SCSS-Datei und überschreitet das Budget um 1.76KB. Diese Datei enthält 315 Zeilen Custom CSS, die zu Tailwind-Utilities migriert werden müssen.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/src/app/shared/components/mobile-menu/mobile-menu.component.scss`
- `/mnt/c/Code/AngularV1/src/app/shared/components/mobile-menu/mobile-menu.component.html`
- `/mnt/c/Code/AngularV1/src/app/shared/components/mobile-menu/mobile-menu.component.ts`

## Geschätzter Aufwand
3-4 Story Points

## Abhängigkeiten
Keine direkten Abhängigkeiten, aber visuelle Tests erforderlich

## Migrations-Mapping

### Host Styles
```scss
:host {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}
```
→ Host-Binding in Component:
```typescript
@HostBinding('class') hostClass = 'fixed inset-0 z-[9999] pointer-events-none';
```

### Backdrop
```scss
.mobile-menu-backdrop → 'absolute inset-0 bg-black/50 dark:bg-black/70 pointer-events-auto'
```

### Container
```scss
.mobile-menu-container → 'absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col pointer-events-auto'
```

### Header Section
```scss
.mobile-menu-header → 'flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'
.logo-section → 'flex-1'
.logo → 'h-8 w-auto filter brightness-0 saturate-100 dark:filter-none'
.close-button → 'flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors'
```

### Search Section
```scss
.mobile-menu-search → 'p-4 border-b border-gray-200 dark:border-gray-700'
.search-button → 'flex items-center gap-2 w-full p-2 px-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
```

### Navigation
```scss
.mobile-menu-nav → 'flex-1 overflow-y-auto py-4'
.menu-list → 'list-none'
.menu-item → 'mb-1'
.menu-button → 'flex items-center justify-between w-full px-4 py-2 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
.menu-button.has-children → 'font-semibold'
.menu-icon → 'text-gray-600 dark:text-gray-400'
.expand-icon → 'transition-transform text-gray-600 dark:text-gray-400'
.expand-icon.expanded → 'rotate-180'
```

### Submenu
```scss
.submenu → 'bg-gray-50 dark:bg-black/20'
.submenu-item → 'border-l-4 border-gray-200 hover:border-orange-500'
.submenu-link → 'block py-2 px-4 pl-12 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
```

### Footer
```scss
.mobile-menu-footer → 'mt-auto p-4 border-t border-gray-200 dark:border-gray-700'
.user-info → 'flex items-center gap-3 mb-4'
.user-details → 'flex-1'
.user-name → 'font-semibold text-gray-900 dark:text-gray-100 text-sm'
.user-email → 'text-gray-600 dark:text-gray-400 text-xs'
.footer-actions → 'flex items-center gap-2'
.theme-toggle → 'flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors'
.logout-button → 'flex items-center gap-2 flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
```

### Scrollbar (Custom Utilities erforderlich)
```scss
// Muss in tailwind.config.js als Plugin hinzugefügt werden
```

## Animations
Die Animations (@fadeIn, @slideIn, @expandCollapse) sind bereits in der TypeScript-Component definiert und müssen nicht migriert werden.

## Prüfkriterium "Done"
- [ ] Alle SCSS-Klassen durch Tailwind ersetzt
- [ ] SCSS-Datei gelöscht
- [ ] Component styleUrl entfernt
- [ ] Visuelle Tests bestanden (Mobile & Desktop)
- [ ] Dark Mode funktioniert
- [ ] Bundle-Größe um ~5KB reduziert
- [ ] Keine Layout-Regressionen
- [ ] Code Review bestanden