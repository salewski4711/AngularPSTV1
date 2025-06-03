# 🔧 Component Showcase - Fix Implementation Problems

## Übersicht
Die Component Showcase ist zu 90% implementiert, hat aber kritische Integrationsprobleme. Dieser Prompt beschreibt alle notwendigen Fixes.

## 🚨 Identifizierte Probleme

### Problem 1: ShowcaseLayoutComponent nicht in Routes integriert
**Datei:** `/src/app/features/components-showcase/showcase.routes.ts`
**Problem:** Die Layout-Komponente mit Sidebar-Navigation wird nicht verwendet
**Fix:** Routes mit Layout-Component wrappen

### Problem 2: Example Files fehlen für fast alle Komponenten  
**Verzeichnis:** `/src/app/features/components-showcase/examples/`
**Problem:** Nur Button hat Example Files, alle anderen fehlen
**Fix:** Example Files für alle Komponenten erstellen ODER ExampleLoaderService entfernen

### Problem 3: ExampleLoaderService wird nicht verwendet
**Problem:** Service existiert, wird aber nirgends importiert/verwendet
**Fix:** Entweder integrieren oder entfernen

### Problem 4: Avatar-Showcase Kompilierungsfehler
**Datei:** `/src/app/features/components-showcase/pages/atoms/avatar-showcase/avatar-showcase.component.ts`
**Problem:** CodeBlockComponent wird nicht erkannt trotz korrektem Import
**Fix:** Component-Import prüfen und ggf. Cache-Problem lösen

## 📋 Aufgaben für die KI

### Task 1: Routes mit Layout wrappen
```typescript
// In showcase.routes.ts ändern zu:
export const showcaseRoutes: Routes = [
  {
    path: '',
    component: ShowcaseLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'atoms/button',
        pathMatch: 'full'
      },
      // ... rest of routes as children
    ]
  }
];
```

### Task 2: ExampleLoaderService entfernen (empfohlen)
Da die Showcase-Komponenten bereits inline Code-Beispiele haben:
1. Lösche `/src/app/features/components-showcase/services/example-loader.service.ts`
2. Lösche das leere `/examples/` Verzeichnis (außer button examples)
3. Entferne alle Referenzen zum ExampleLoaderService

### Task 3: Example Files in Assets verschieben (Alternative)
Falls Example Files beibehalten werden sollen:
1. Verschiebe `/examples/` nach `/src/assets/examples/`
2. Update ExampleLoaderService path zu `assets/examples/`
3. Erstelle Example Files für alle Komponenten

### Task 4: Avatar-Showcase Import-Problem beheben
1. Prüfe ob CodeBlockComponent korrekt exportiert ist
2. Stelle sicher, dass der Import-Pfad stimmt
3. Falls Problem besteht, füge temporär CUSTOM_ELEMENTS_SCHEMA hinzu

### Task 5: PlaygroundComponent zu allen Showcases hinzufügen (optional)
Für interaktive Demos in allen Showcase-Seiten:
1. Import PlaygroundComponent in alle showcase components
2. Füge Playground-Tab mit Config hinzu (wie in button-showcase)

## 🎯 Prioritäten
1. **KRITISCH:** Task 1 (Layout-Integration) - Ohne das ist Navigation nicht sichtbar
2. **WICHTIG:** Task 2 oder 3 (ExampleLoader aufräumen) - Vereinfacht die Struktur
3. **OPTIONAL:** Task 5 (Playground überall) - Verbessert User Experience

## ✅ Erfolgskriterien
- [ ] Showcase-Layout mit Sidebar ist sichtbar auf `/components`
- [ ] Keine Kompilierungsfehler mehr
- [ ] Avatar-Showcase funktioniert
- [ ] Konsistente Struktur (entweder MIT oder OHNE ExampleLoader)

## 💡 Empfehlung
Ich empfehle Task 2 (ExampleLoaderService entfernen), da:
- Code-Beispiele bereits inline in Components sind
- Weniger Komplexität
- Keine HTTP-Requests nötig
- Einfacher zu warten

## 🚀 Start-Befehl für die KI
```
Beginne mit Task 1 (Layout-Integration), dann Task 2 (ExampleLoader entfernen), 
dann Task 4 (Avatar-Fix). Task 5 ist optional.
```