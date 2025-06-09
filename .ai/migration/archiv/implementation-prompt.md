# 🚀 Prompt für die Implementierung der Atom-Komponenten

## Aufgabe: Migration von Atom-Komponenten nach Angular mit Tailwind CSS

### Zielsetzung
Extrahiere und implementiere die fehlenden Atom-Komponenten aus dem CRM_Chatgpt_WEB Projekt (`C:\Code\CRM_Chatgpt_WEB\component-validation`) in das Angular-Projekt (`C:\Code\AngularV1`).

### Quellanalyse erforderlich
1. **Analysiere NUR die aktuellen Tailwind-Implementierungen:**
   - `/forms/02-tailwind-demo.html` - Input, Select, Checkbox, Radio, Toggle Komponenten
   - `/badges/02-tailwind-demo.html` - Badge/Chip Komponenten
   - `/buttons/tokens-draft.json` - Button-Spezifikationen (bereits teilweise implementiert)
   
   ⚠️ **WICHTIG**: Ignoriere alle `01-pattern-analysis.html` Dateien - diese sind veraltet!

2. **Extrahiere Design-Tokens aus:**
   - `tokens-final.json` oder `tokens-draft.json` Dateien in den jeweiligen Unterordnern
   - NUR die `02-tailwind-demo.html` für Komponentenverhalten und Styling

### Zu implementierende Komponenten

#### 1. InputComponent
- Varianten: text, number, password, email, tel
- States: default, hover, focus, disabled, error, success
- Features: Label, Placeholder, Hilfstext, Validierung, Icons (optional)
- Pfad: `/src/app/shared/components/input/`

#### 2. SelectComponent 
- Features: Single/Multi-Select, Suche (optional), Gruppierung
- States: default, hover, focus, disabled, error
- Pfad: `/src/app/shared/components/select/`

#### 3. CheckboxComponent
- States: unchecked, checked, indeterminate, disabled
- Features: Label-Integration, Formular-Binding
- Pfad: `/src/app/shared/components/checkbox/`

#### 4. RadioComponent
- Features: Radio-Group Support, Label-Integration
- States: unchecked, checked, disabled
- Pfad: `/src/app/shared/components/radio/`

#### 5. ToggleComponent
- States: off, on, disabled
- Features: Label links/rechts, Größenvarianten
- Pfad: `/src/app/shared/components/toggle/`

#### 6. BadgeComponent
- Varianten: info, success, warning, error, neutral
- Größen: sm, md, lg
- Features: Icon-Support, Dismissable (optional)
- Pfad: `/src/app/shared/components/badge/`

#### 7. AvatarComponent
- Varianten: image, initials, icon
- Größen: xs, sm, md, lg, xl
- Features: Status-Indikator, Fallback
- Pfad: `/src/app/shared/components/avatar/`

### Implementierungsrichtlinien

#### Technische Anforderungen
- Angular 17+ mit Standalone Components
- TypeScript strict mode
- Reactive Forms Support
- Accessibility (ARIA) konform
- **Tailwind CSS v3+ für alle Styles**
- **KEINE inline styles oder separate CSS-Dateien**
- **Nutze computed() für dynamische Klassen**

#### Tailwind CSS Konfiguration
```javascript
// ProSolarTec Farben sind bereits konfiguriert:
colors: {
  primary: '#F99600',    // Orange
  secondary: '#1C3661',  // Blau
  // Weitere Farben aus der Config nutzen
}
```

#### Code-Standards (WICHTIG!)
1. **DRY Prinzip**: 
   - Gemeinsame Base-Klassen für Form-Controls
   - Wiederverwendbare Tailwind-Klassenkombinationen
   - Shared Types und Interfaces

2. **SOLID Prinzipien**:
   - Single Responsibility: Jede Komponente hat genau eine Aufgabe
   - Open/Closed: Erweiterbar durch Inputs, nicht durch Modifikation
   - Interface Segregation: Spezifische Interfaces pro Komponente

3. **Angular Best Practices**:
   - OnPush Change Detection
   - Strong Typing (keine 'any' Types)
   - Reactive Programmierung mit Signals/computed()
   - ControlValueAccessor für Form-Integration

### Testing & Dokumentation
- Unit Tests für jede Komponente (min. 80% Coverage)
- Integration Tests für Form-Binding
- Accessibility Tests
- README.md pro Komponente mit Verwendungsbeispielen

### Wichtige Hinweise
- KEINE CSS-Dateien erstellen
- ALLE Styles über Tailwind-Klassen
- Nutze die existierende Tailwind-Konfiguration
- Beachte die ProSolarTec Farbpalette
- Dark Mode von Anfang an mitdenken
- Basiere dich NUR auf `02-tailwind-demo.html` Dateien

Beginne mit der Analyse der `02-tailwind-demo.html` Dateien und erstelle dann die Komponenten nach den genannten Standards.
