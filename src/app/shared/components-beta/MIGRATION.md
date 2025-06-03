# Beta → Production Migration Guide

## Wann ist eine Komponente bereit für Production?

### ✅ Checkliste
- [ ] Alle geplanten Features implementiert
- [ ] Design-Review abgeschlossen
- [ ] Dark Mode getestet
- [ ] Responsive auf allen Breakpoints
- [ ] Barrierefreiheit (a11y) geprüft
- [ ] Performance optimiert
- [ ] API ist stabil (keine Breaking Changes mehr erwartet)
- [ ] Dokumentation vorhanden
- [ ] Von mindestens 2 Entwicklern getestet

## Migration Schritte

### 1. Komponente vorbereiten
```bash
# Beta-Badge entfernen
@Input() showBetaBadge = false; # ❌ Löschen

# Suffix entfernen
card-beta.component.ts → card.component.ts
CardBetaComponent → CardComponent
```

### 2. Dateien kopieren
```bash
# Von Beta nach Production
cp -r components-beta/card/* components/card/
```

### 3. Imports aktualisieren
```typescript
// Alt (Beta)
import { CardBetaComponent } from '@shared/components-beta/card/card-beta.component';

// Neu (Production)
import { CardComponent } from '@shared/components/card/card.component';
```

### 4. Tests anpassen
- Unit Tests migrieren
- E2E Tests aktualisieren
- Visual Regression Tests

### 5. Dokumentation
- README.md aktualisieren
- Storybook Stories (falls vorhanden)
- Beispiele in UI-Showcase

### 6. Beta-Version archivieren
```bash
# Optional: Beta-Version behalten für Referenz
mv components-beta/card components-beta/_archived/card-v0.8
```

## Versionierung

### Beta Versions
- v0.1 - v0.9: Beta Phase
- v0.x: Breaking Changes erlaubt

### Production Versions
- v1.0+: Stable API
- Breaking Changes nur in Major Versions (v2.0)

## Rollback Plan

Falls Probleme nach Migration:
1. Production-Version zurücksetzen
2. Beta-Version reaktivieren
3. Fixes in Beta implementieren
4. Erneut migrieren

## Best Practices

1. **Nie direkt in Production entwickeln**
2. **Beta mindestens 1 Woche testen**
3. **Migration dokumentieren**
4. **Alte Beta-Versionen archivieren**
5. **Breaking Changes kommunizieren**
