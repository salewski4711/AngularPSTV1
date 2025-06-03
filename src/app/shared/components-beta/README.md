# 🚧 Beta Components Workflow

## Konzept

Neue Komponenten werden zuerst im `/components-beta` Ordner entwickelt und getestet. Nach erfolgreicher Iteration werden sie in `/components` überführt.

## Workflow

### 1. **Entwicklung** (Beta Phase)
```
components-beta/
├── card/               # 🚧 In Entwicklung
├── table/              # 🚧 In Entwicklung  
├── modal/              # 🚧 In Entwicklung
└── _playground/        # Test-Umgebung
```

### 2. **Review Kriterien**
- [ ] Design abgenommen
- [ ] Alle Varianten implementiert
- [ ] Dark Mode funktioniert
- [ ] Responsive auf allen Größen
- [ ] Barrierefreiheit geprüft
- [ ] Performance OK
- [ ] API stabil

### 3. **Migration** (Beta → Production)
```bash
# Nach erfolgreichem Review
components-beta/card/ → components/card/
```

## Status-Tracking

| Komponente | Status | Version | Review | Migration |
|------------|--------|---------|---------|-----------|
| Button | 🚧 Beta | v0.9 | In Progress | - |
| Card | 🚧 Beta | v0.8 | Pending | - |
| Table | 🚧 Beta | v0.5 | - | - |
| Modal | 📋 Geplant | - | - | - |

## Vorteile

1. **Keine Breaking Changes** in Produktion
2. **Experimente** ohne Risiko
3. **Feedback-Loops** vor Release
4. **Versionierung** möglich
5. **A/B Testing** zwischen Versionen

## Verwendung in der Entwicklung

```typescript
// Beta-Komponenten importieren
import { CardBeta } from '@shared/components-beta/card/card-beta.component';

// Nach Migration
import { Card } from '@shared/components/card/card.component';
```

## Naming Convention

- Beta: `card-beta.component.ts`
- Prod: `card.component.ts`

## Test-Playground

Der `_playground` Ordner enthält eine Test-Seite für alle Beta-Komponenten.
