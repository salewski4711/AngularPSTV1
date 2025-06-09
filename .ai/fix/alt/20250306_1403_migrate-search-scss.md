# Task: Search Component SCSS zu Tailwind Migration

## Titel
Migration von search.component.scss zu Tailwind CSS

## Beschreibung
Die search.component.scss ist mit 2.55KB über dem Budget (550 bytes zu viel). Die Datei enthält Styles für die Such-Komponente mit Dropdown-Ergebnissen.

## Betroffene Dateien
- `/mnt/c/Code/AngularV1/src/app/shared/components/search/search.component.scss`
- `/mnt/c/Code/AngularV1/src/app/shared/components/search/search.component.html`
- `/mnt/c/Code/AngularV1/src/app/shared/components/search/search.component.ts`

## Geschätzter Aufwand
1-2 Story Points

## Abhängigkeiten
Keine

## Migrations-Mapping

### Search Container
```scss
.search-container → 'relative w-full'
```

### Search Input Group
```scss
.search-input-group → 'relative'
.search-icon → 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'
.search-input → 'w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
.clear-button → 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
```

### Search Dropdown
```scss
.search-dropdown → 'absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50'
```

### Loading State
```scss
.search-loading → 'flex items-center justify-center py-4'
.loading-spinner → 'animate-spin h-5 w-5 text-gray-400'
.loading-text → 'ml-2 text-sm text-gray-500 dark:text-gray-400'
```

### Results Section
```scss
.search-results → 'py-2'
.results-section → 'mb-2'
.section-title → 'px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'
```

### Result Items
```scss
.result-item → 'block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors'
.result-item.selected → 'bg-gray-100 dark:bg-gray-700'
.result-content → 'flex items-center'
.result-icon → 'flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3'
.result-icon-svg → 'h-5 w-5 text-gray-600 dark:text-gray-400'
.result-details → 'flex-1 min-w-0'
.result-title → 'text-sm font-medium text-gray-900 dark:text-gray-100 truncate'
.result-subtitle → 'text-xs text-gray-500 dark:text-gray-400 truncate'
```

### No Results
```scss
.no-results → 'py-8 text-center'
.no-results-icon → 'mx-auto h-12 w-12 text-gray-400'
.no-results-text → 'mt-2 text-sm text-gray-500 dark:text-gray-400'
```

### Recent Searches
```scss
.recent-searches → 'py-2'
.recent-header → 'px-3 py-2 flex items-center justify-between'
.recent-title → 'text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'
.clear-recent → 'text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
```

### Search Highlights
```scss
.highlight → 'font-semibold text-orange-600 dark:text-orange-400'
```

### Mobile Optimizations
```scss
@media (max-width: 640px) {
  .search-dropdown → 'fixed left-0 right-0 top-16 rounded-none border-x-0'
  .search-input → 'text-base' // Verhindert Zoom auf iOS
}
```

## Keyboard Navigation Styles
```scss
// Fokus-Styles für Keyboard-Navigation
.result-item:focus → 'outline-none ring-2 ring-inset ring-orange-500'
```

## Scrollbar Styling
```scss
// Custom Scrollbar (als Tailwind Plugin)
.search-dropdown::-webkit-scrollbar → 'w-2'
.search-dropdown::-webkit-scrollbar-track → 'bg-gray-100 dark:bg-gray-900'
.search-dropdown::-webkit-scrollbar-thumb → 'bg-gray-400 dark:bg-gray-600 rounded'
```

## Prüfkriterium "Done"
- [ ] Alle SCSS-Klassen durch Tailwind ersetzt
- [ ] SCSS-Datei gelöscht
- [ ] Component styleUrl entfernt
- [ ] Dropdown korrekt positioniert
- [ ] Keyboard-Navigation funktioniert
- [ ] Mobile-Optimierungen erhalten
- [ ] Loading & Empty States styled
- [ ] Dark Mode vollständig
- [ ] Bundle-Größe um ~2KB reduziert
- [ ] Code Review bestanden