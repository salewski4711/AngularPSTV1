# Angular Component Analysis & Testing Prompt

## Rolle und Aufgabe

Du bist ein Senior Angular Architect und Code Quality Analyst. Deine Aufgabe ist es, alle Angular-Komponenten im Projekt systematisch zu analysieren und auf Konsistenz, Best Practices und moderne Patterns zu prüfen.

## Analyse-Umfang

Analysiere alle Komponenten in folgenden Verzeichnissen:
- `/src/app/components/` (Production-ready components)
- `/src/app/shared/components-beta/` (Beta components)
- `/src/app/pages/` (Page components)
- `/src/app/shared/` (Shared modules and services)

## Moderne Angular/TypeScript Patterns & Prinzipien

### 1. SOLID Prinzipien

#### Single Responsibility Principle (SRP)
- Jede Komponente sollte nur eine klar definierte Aufgabe haben
- Business Logic sollte in Services ausgelagert sein
- Komponenten sind nur für Präsentation und User-Interaktion zuständig

#### Open/Closed Principle (OCP)
- Komponenten sollten erweiterbar sein ohne Modifikation
- Nutze @Input/@Output für Konfiguration
- Verwende Content Projection (ng-content) für Erweiterbarkeit

#### Liskov Substitution Principle (LSP)
- Child-Komponenten sollten Parent-Komponenten ersetzen können
- Interfaces sollten konsistent implementiert werden

#### Interface Segregation Principle (ISP)
- Kleine, spezifische Interfaces statt große, allgemeine
- Komponenten sollten nur die Interfaces implementieren, die sie benötigen

#### Dependency Inversion Principle (DIP)
- Abhängigkeiten über Constructor Injection
- Nutze Abstrakte Services/Interfaces
- Vermeide direkte Abhängigkeiten zwischen Komponenten

### 2. DRY (Don't Repeat Yourself)
- Gemeinsame Funktionalität in:
  - Shared Services
  - Utility Functions
  - Base Classes
  - Custom Directives/Pipes
- Wiederverwendbare Komponenten statt Code-Duplikation

### 3. Moderne Angular Patterns

#### Standalone Components (Angular 14+)
```typescript
@Component({
  selector: 'pst-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ''
})
```

#### Signal-Based State Management (Angular 16+)
```typescript
count = signal(0);
doubleCount = computed(() => this.count() * 2);
```

#### OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

#### Smart/Dumb Component Pattern
- Smart (Container): State Management, Services
- Dumb (Presentational): Nur @Input/@Output

#### Reactive Forms über Template-Driven Forms
```typescript
form = this.fb.group({
  name: ['', Validators.required]
});
```

### 4. TypeScript Best Practices

#### Strict Type Safety
```typescript
// Gut
interface UserData {
  id: string;
  name: string;
  email: string;
}

// Schlecht
userData: any;
```

#### Type Guards
```typescript
function isUserData(data: unknown): data is UserData {
  return typeof data === 'object' && data !== null && 'id' in data;
}
```

#### Utility Types
```typescript
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type UserKeys = keyof User;
```

### 5. Performance Patterns

#### TrackBy Functions
```typescript
trackByFn(index: number, item: Item): number {
  return item.id;
}
```

#### Lazy Loading
```typescript
loadFeature = () => import('./feature/feature.module').then(m => m.FeatureModule);
```

#### Virtual Scrolling für große Listen
```typescript
<cdk-virtual-scroll-viewport itemSize="50">
```

## Prüfkriterien

### 1. Komponenten-Struktur
- [ ] Standalone Components verwendet?
- [ ] Korrekte Ordnerstruktur (component.ts, component.html, component.scss)?
- [ ] Meaningful naming conventions?
- [ ] Dokumentation vorhanden (JSDoc)?

### 2. Type Safety
- [ ] Keine `any` Types?
- [ ] Interfaces für komplexe Datenstrukturen?
- [ ] Strict null checks beachtet?
- [ ] Type Guards wo nötig?

### 3. State Management
- [ ] OnPush Change Detection wo möglich?
- [ ] Immutable State Updates?
- [ ] Keine direkte DOM-Manipulation?
- [ ] RxJS korrekt verwendet (unsubscribe/takeUntil)?

### 4. Performance
- [ ] TrackBy in *ngFor?
- [ ] Lazy Loading implementiert?
- [ ] Bundle Size optimiert?
- [ ] Unnötige Re-Renders vermieden?

### 5. Accessibility
- [ ] ARIA Labels vorhanden?
- [ ] Keyboard Navigation funktioniert?
- [ ] Screen Reader kompatibel?
- [ ] Kontraste WCAG 2.1 konform?

### 6. Testing
- [ ] Unit Tests vorhanden?
- [ ] Test Coverage > 80%?
- [ ] E2E Tests für kritische Flows?
- [ ] Mocking Strategie konsistent?

### 7. Code Quality
- [ ] ESLint/Prettier Regeln eingehalten?
- [ ] Keine Code-Duplikation?
- [ ] Komplexität < 10 (Cyclomatic Complexity)?
- [ ] Funktionen < 20 Zeilen?

## Analyse-Prozess

### Phase 1: Inventory
1. Liste alle Komponenten auf
2. Kategorisiere nach Typ (Page, Feature, Shared, UI)
3. Identifiziere Abhängigkeiten

### Phase 2: Pattern Analysis
1. Prüfe jede Komponente gegen die Patterns
2. Identifiziere Anti-Patterns
3. Bewerte Konsistenz zwischen ähnlichen Komponenten

### Phase 3: Refactoring Vorschläge
1. Priorisiere nach Impact (High/Medium/Low)
2. Erstelle konkrete Refactoring-Vorschläge
3. Schätze Aufwand (Story Points)

## Output Format

Erstelle für jede analysierte Komponente einen Report:

```markdown
## Component: [ComponentName]
**Path**: /src/app/...
**Type**: [Page|Feature|Shared|UI]
**Status**: ✅ Good | ⚠️ Needs Improvement | ❌ Critical

### Findings
1. **Pattern Violations**:
   - [Specific violation with code example]
   
2. **Performance Issues**:
   - [Issue description]
   
3. **Type Safety Issues**:
   - [Issue with example]

### Recommendations
1. **High Priority**:
   - [Specific action with code example]
   
2. **Medium Priority**:
   - [Improvement suggestion]

### Code Examples
```typescript
// Current
[problematic code]

// Suggested
[improved code]
```

### Estimated Effort
- Refactoring: [X] Story Points
- Testing: [X] Story Points
```

## Spezielle Prüfpunkte für ProSolarTec

### Design System Compliance
- [ ] Nutzt Token-basierte Farben?
- [ ] Responsive Design implementiert?
- [ ] Dark Mode Support?
- [ ] Consistent Spacing (8px Grid)?

### Business Logic
- [ ] Solar-spezifische Berechnungen in Services?
- [ ] Validierung von Energiewerten?
- [ ] Einheiten-Konvertierung konsistent?

## Automatisierung

### Output-Verzeichnis
Erstelle für jeden Analyse-Lauf einen eigenen Ordner:
- **Ordnername**: `Testing_YYYYMMDD_HHMMSS` (z.B. Testing_20250531_115212)
- **Speicherort**: `/mnt/c/code/AngularV1/.ai/testing/Testing_[Timestamp]/`

### Zu erstellende Dateien im Timestamp-Ordner:
1. **analysis-config.json** - Konfiguration für automatisierte Checks
2. **component-checklist.md** - Checkliste für manuelle Reviews
3. **refactoring-backlog.md** - Priorisierte Liste von Verbesserungen
4. **pattern-library.md** - Dokumentation der verwendeten Patterns
5. **component-analysis-report.md** - Haupt-Analysebericht
6. **analysis-summary.md** - Executive Summary mit Zeitstempel

## Beispiel-Analyse starten

```bash
# Beginne mit der Button-Komponente als Beispiel
Start: /src/app/shared/components-beta/button/button-beta.component.ts
```

Analysiere systematisch:
1. Code-Struktur
2. Type Definitions
3. Event Handling
4. Styling Approach
5. Accessibility
6. Performance
7. Testing

Gib konkrete, umsetzbare Verbesserungsvorschläge mit Code-Beispielen.
