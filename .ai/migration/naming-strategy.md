# Migrations-Naming-Strategie

## Mögliche Ansätze

### 1. ❌ V2-Suffix (BadgeV2Component)
**Nachteile:**
- Zwei Versionen gleichzeitig im Code
- Verwirrung welche Version wo verwendet wird
- Doppelte Wartung
- Aufwändige Umstellung aller Imports

### 2. ✅ In-Place-Migration (Empfohlen)
**Vorteile:**
- Keine Breaking Changes
- Keine Import-Änderungen nötig
- Sofortiger Nutzen überall
- Keine Verwirrung

**Ablauf:**
1. Komponente direkt updaten
2. Tests anpassen
3. Git Commit mit klarer Message
4. Bei Problemen: Git Revert möglich

### 3. 🤔 Feature-Branch-Strategie
```bash
git checkout -b feature/token-migration
# Alle Komponenten migrieren
# Ausführlich testen
git merge main
```

## Empfehlung: In-Place-Migration

### Warum?
1. **Atomic Commits**: Jede Komponente einzeln
2. **Rollback-fähig**: Git history hilft
3. **Keine Duplicates**: Sauberer Code
4. **CI/CD**: Tests laufen automatisch

### Migrations-Reihenfolge

**Phase 1 - Einfache Komponenten:**
- ✅ Button
- ✅ Badge  
- ⏳ Logo (nur Farben)
- ⏳ Divider (nur Farben)
- ⏳ Spinner (nur Farben)

**Phase 2 - Mittlere Komponenten:**
- ⏳ Input (Farben + Spacing)
- ⏳ Checkbox (Farben + Sizes)
- ⏳ Radio (Farben + Sizes)
- ⏳ Toggle (Farben + Sizes)

**Phase 3 - Komplexe Komponenten:**
- ⏳ Select (viele Varianten)
- ⏳ Modal (Layout + Farben)
- ⏳ Card (viele Styles)

### Git Commit Messages

```bash
# Klar und nachvollziehbar
git commit -m "refactor(badge): migrate to TokenUtils for design tokens

- Replace hardcoded Tailwind classes with TokenUtils
- Update color mappings (gray -> neutral)
- Remove inline styles from template
- Update tests for new token-based classes

Breaking: None - API bleibt gleich"
```

## Migration Checklist pro Komponente

- [ ] ESLint Fehler identifizieren
- [ ] TokenUtils importieren
- [ ] Hardcoded Werte ersetzen
- [ ] Template anpassen
- [ ] Tests updaten
- [ ] TypeScript Check
- [ ] Visuell testen
- [ ] Commit mit guter Message

## Fallback-Plan

Falls Probleme:
```bash
# Einfacher Rollback
git revert HEAD

# Oder spezifischen Commit
git revert abc123
```

## Kommunikation

### Team-Message Template:
```
🔄 Component Migration: [Name]

Migriert zu TokenUtils:
- Keine Breaking Changes
- Alle Tests grün
- Performance gleich

Falls Probleme: @mention me
```