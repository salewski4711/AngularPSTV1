# Quick Start Commands

## Für KI-Assistenten (Claude, ChatGPT, etc.)

### Vollständige Analyse
```
Bitte analysiere alle Angular-Komponenten im Projekt C:\Code\AngularV1 
gemäß den Vorgaben in .ai/testing/component-analysis-prompt.md.
Beginne mit den Beta-Komponenten in /src/app/shared/components-beta/.
```

### Spezifische Komponenten-Analyse
```
Analysiere die folgenden Komponenten auf SOLID-Prinzipien und moderne Angular Patterns:
- ButtonBetaComponent
- ButtonGroupComponent  
- CardComponent
Verwende dabei die Kriterien aus .ai/testing/component-analysis-prompt.md
```

### Pattern-Compliance Check
```
Prüfe alle Komponenten im Verzeichnis /src/app/components auf:
1. Verwendung von Standalone Components
2. OnPush Change Detection
3. Korrekte TypeScript Types (kein 'any')
4. Reactive Forms statt Template-Driven Forms
Erstelle eine Tabelle mit dem Compliance-Status.
```

### Refactoring-Vorschläge
```
Basierend auf der Analyse, erstelle konkrete Refactoring-Vorschläge für:
1. Die 5 kritischsten Performance-Issues
2. Die 5 wichtigsten Type-Safety Probleme
3. Die 5 dringendsten Accessibility-Verbesserungen
Sortiere nach geschätztem Aufwand (Story Points).
```

## Erwartete Outputs

1. **analysis-report-[date].md** - Vollständiger Analysebericht
2. **refactoring-backlog.md** - Priorisierte Liste von Verbesserungen
3. **compliance-matrix.csv** - Übersicht über Pattern-Compliance
4. **critical-issues.md** - Sofort zu behebende Probleme
