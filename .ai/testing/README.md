# Angular Component Testing & Analysis Suite

## Übersicht

Diese Test-Suite bietet einen systematischen Ansatz zur Analyse und Verbesserung von Angular-Komponenten nach modernen Best Practices.

## Verwendung des Prompts

### 1. Einfache Analyse einer Komponente

```
Analysiere die ButtonBetaComponent nach dem definierten Muster in component-analysis-prompt.md
```

### 2. Vollständige Projekt-Analyse

```
Führe eine vollständige Analyse aller Komponenten im Projekt durch. 
Verwende die Konfiguration aus analysis-config.json und erstelle einen detaillierten Report.
```

### 3. Spezifische Pattern-Prüfung

```
Prüfe alle Komponenten auf die Verwendung von:
- Standalone Components
- OnPush Change Detection
- Proper TypeScript Types
Erstelle eine Liste mit Komponenten, die diese Patterns nicht verwenden.
```

## Struktur

```
.ai/testing/
├── component-analysis-prompt.md    # Haupt-Prompt für KI-Analyse
├── analysis-config.json           # Konfiguration für automatisierte Checks
├── component-checklist.md         # Manuelle Review-Checkliste
├── pattern-library.md            # Dokumentation der Patterns
├── example-analysis.md           # Beispiel-Analyse
└── README.md                     # Diese Datei
```

## Workflow

1. **Initial Analysis**: Verwende den Prompt um eine Baseline zu erstellen
2. **Priorisierung**: Sortiere Findings nach Kritikalität
3. **Refactoring**: Arbeite die High-Priority Items ab
4. **Validation**: Prüfe mit der Checklist
5. **Documentation**: Update die Pattern Library

## Integration in CI/CD

```bash
# Beispiel Pre-Commit Hook
npm run analyze:components
npm run test:patterns
```

## Metriken

- **Code Coverage**: Ziel > 80%
- **Type Safety**: 0 any-Types
- **Performance**: Alle Listen mit TrackBy
- **Accessibility**: WCAG 2.1 AA compliant

## Nächste Schritte

1. Führe die Analyse mit dem Prompt durch
2. Erstelle Tickets für gefundene Issues  
3. Definiere Team-Standards basierend auf den Patterns
4. Automatisiere wiederkehrende Checks
