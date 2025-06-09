# SCSS zu Tailwind Migration Plan

## Übersicht

Ziel: Reduzierung der Bundle-Größe um mindestens 10KB durch Migration von SCSS zu Tailwind CSS.

### Priorisierte SCSS-Dateien nach Größe:

1. **mobile-menu.component.scss** - 5.76KB (Einsparung: ~5KB)
2. **login.component.scss** - 4.59KB (Einsparung: ~4KB)  
3. **top-navigation.component.scss** - 2.74KB (Einsparung: ~2KB)
4. **search.component.scss** - 2.55KB (Einsparung: ~2KB)

**Gesamte potenzielle Einsparung: ~13KB**

## Migrations-Strategie

### Phase 1: Vorbereitung
1. CSS-Variablen zu Tailwind Config mapping
2. Erstellung von Utility-Klassen für wiederkehrende Patterns
3. Test-Setup für visuelle Regression

### Phase 2: Schrittweise Migration
1. Component für Component migrieren
2. SCSS-Klassen durch Tailwind-Klassen ersetzen
3. Custom Animations in Tailwind Config definieren
4. Tests nach jeder Migration

### Phase 3: Cleanup
1. SCSS-Dateien löschen
2. Build verifizieren
3. Bundle-Größe messen

## Detaillierte Migrations-Tasks

### 1. Mobile Menu Component (Priorität: HOCH)
- **Geschätzte Zeit**: 3-4 Stunden
- **Komplexität**: Hoch (viele Custom Styles)
- **Bundle-Impact**: 5.76KB Reduktion

### 2. Login Component (Priorität: HOCH)
- **Geschätzte Zeit**: 2-3 Stunden
- **Komplexität**: Mittel
- **Bundle-Impact**: 4.59KB Reduktion

### 3. Top Navigation Component (Priorität: MITTEL)
- **Geschätzte Zeit**: 2 Stunden
- **Komplexität**: Mittel
- **Bundle-Impact**: 2.74KB Reduktion

### 4. Search Component (Priorität: MITTEL)
- **Geschätzte Zeit**: 1-2 Stunden
- **Komplexität**: Niedrig
- **Bundle-Impact**: 2.55KB Reduktion

## CSS-Variablen Mapping

```scss
// SCSS Variables
--color-background → bg-white dark:bg-gray-900
--color-surface → bg-gray-50 dark:bg-gray-800
--color-border → border-gray-200 dark:border-gray-700
--color-text-primary → text-gray-900 dark:text-gray-100
--color-text-secondary → text-gray-600 dark:text-gray-400
--spacing-xs → p-1 (0.25rem)
--spacing-sm → p-2 (0.5rem)
--spacing-md → p-4 (1rem)
--spacing-lg → p-6 (1.5rem)
--radius-md → rounded-lg
```

## Erwartete Herausforderungen

1. **Animations**: Custom Keyframes müssen in tailwind.config.js definiert werden
2. **Pseudo-Elements**: ::before/::after Styles benötigen Custom Utilities
3. **Complex Selectors**: Verschachtelte Selektoren müssen umstrukturiert werden
4. **Media Queries**: Dark Mode bereits mit Tailwind kompatibel

## Erfolgs-Metriken

- [ ] Bundle-Größe unter 500KB
- [ ] Keine visuellen Regressionen
- [ ] Alle Tests bestehen
- [ ] Performance-Verbesserung messbar