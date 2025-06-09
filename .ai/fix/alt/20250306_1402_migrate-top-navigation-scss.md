# Task: Top Navigation SCSS zu Tailwind Migration

## Titel
Migration von top-navigation.component.scss zu Tailwind CSS

## Beschreibung
Die top-navigation.component.scss ist mit 2.74KB über dem Budget (744 bytes zu viel). Die Datei enthält Styles für die Top-Navigation-Leiste.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/src/app/shared/components/top-navigation/top-navigation.component.scss`
- `/mnt/c/Code/AngularV1/src/app/shared/components/top-navigation/top-navigation.component.html`
- `/mnt/c/Code/AngularV1/src/app/shared/components/top-navigation/top-navigation.component.ts`

## Geschätzter Aufwand
2 Story Points

## Abhängigkeiten
Keine

## Migrations-Mapping

### Navigation Container
```scss
.top-nav → 'bg-white dark:bg-gray-900 shadow-md transition-colors duration-300'
.top-nav.elevated → 'shadow-lg'
.top-nav.transparent → 'bg-transparent shadow-none'
.top-nav.sticky → 'sticky top-0 z-50'
```

### Container Layout
```scss
.nav-container → 'mx-auto px-4 sm:px-6 lg:px-8'
.nav-container.full-width → 'max-w-full'
.nav-content → 'flex items-center justify-between h-16'
```

### Logo Section
```scss
.nav-logo → 'flex-shrink-0 flex items-center'
.logo-link → 'flex items-center'
```

### Navigation Menu (Desktop)
```scss
.nav-menu → 'hidden md:flex items-center space-x-8 ml-10'
.nav-item → 'relative'
.nav-link → 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors'
.nav-link.active → 'text-orange-600 dark:text-orange-400'
```

### Actions Section
```scss
.nav-actions → 'flex items-center space-x-4'
.action-button → 'p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
.action-icon → 'h-5 w-5'
```

### Mobile Menu Button
```scss
.mobile-menu-button → 'md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
```

### Dropdown Menus
```scss
.dropdown → 'relative'
.dropdown-menu → 'absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1'
.dropdown-item → 'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
.dropdown-divider → 'h-px bg-gray-200 dark:bg-gray-700 my-1'
```

### Search Bar (wenn vorhanden)
```scss
.nav-search → 'hidden lg:flex items-center flex-1 max-w-md mx-8'
.search-input → 'w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-600 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400'
```

### Badge/Indicator
```scss
.notification-badge → 'absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full'
.count-badge → 'absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'
```

### User Menu
```scss
.user-menu → 'flex items-center space-x-2'
.user-avatar → 'h-8 w-8 rounded-full'
.user-name → 'hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300'
```

## Responsive Breakpoints
```scss
// Mobile: < 768px (md)
// Desktop: >= 768px
// Large: >= 1024px (lg)
```

## Prüfkriterium "Done"
- [ ] Alle SCSS-Klassen durch Tailwind ersetzt
- [ ] SCSS-Datei gelöscht
- [ ] Component styleUrl entfernt
- [ ] Navigation funktioniert auf allen Breakpoints
- [ ] Dropdowns positioniert und styled
- [ ] Dark Mode vollständig unterstützt
- [ ] Sticky Navigation funktioniert
- [ ] Bundle-Größe um ~2KB reduziert
- [ ] Code Review bestanden