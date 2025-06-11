# Pre-Commit-Hooks Erklärt

## Was sind Pre-Commit-Hooks?

Pre-Commit-Hooks sind **automatische Wächter**, die VOR jedem Git-Commit ausgeführt werden. Sie verhindern, dass problematischer Code ins Repository gelangt.

## Wie funktioniert es?

```bash
# Wenn du versuchst zu committen:
git add .
git commit -m "Meine Änderungen"

# Der Pre-Commit-Hook läuft AUTOMATISCH und prüft:
# 1. Wurde die Token-Datei geändert? → BLOCKIERT
# 2. Hat der Code ESLint-Fehler? → BLOCKIERT
# 3. Alles OK? → Commit wird durchgeführt
```

## Unsere Pre-Commit-Hooks

### 1. Token-Datei-Schutz
```bash
❌ ERROR: design-tokens.ts kann nicht direkt geändert werden!
```
**Warum?** Nur das Design-System-Team darf Tokens verwalten.

### 2. ESLint-Check
```bash
🔍 Prüfe Code-Qualität mit ESLint...
❌ Hardcodierte Hex-Farbe "#F99600" gefunden!
```
**Warum?** Verhindert hardcodierte Werte und erzwingt TokenUtils.

## Beispiel: Was passiert beim Commit?

### Szenario 1: Versuch, Token-Datei zu ändern
```bash
$ git add src/app/core/design-system/design-tokens.ts
$ git commit -m "Neue Farbe hinzugefügt"

❌ ERROR: design-tokens.ts kann nicht direkt geändert werden!
📝 Bitte erstelle einen Token-Request:
   https://github.com/[repo]/issues/new?template=token-request.md

# COMMIT WIRD BLOCKIERT!
```

### Szenario 2: Code mit hardcodierten Farben
```bash
$ git add src/app/components/button.component.ts
$ git commit -m "Button Update"

🔍 Prüfe Code-Qualität mit ESLint...

src/app/components/button.component.ts
  12:15  error  ❌ Hardcodierte Hex-Farbe "#F99600" gefunden!

❌ ESLint-Fehler gefunden! Bitte behebe diese vor dem Commit.
💡 Tipp: Nutze 'npm run lint:fix' für automatische Fixes

# COMMIT WIRD BLOCKIERT!
```

### Szenario 3: Alles korrekt
```bash
$ git add src/app/components/button.component.ts
$ git commit -m "Button mit TokenUtils"

🔍 Prüfe Code-Qualität mit ESLint...
✅ Alle Checks bestanden!

[main abc123] Button mit TokenUtils
 1 file changed, 10 insertions(+), 5 deletions(-)

# COMMIT ERFOLGREICH!
```

## Hook umgehen (NUR im Notfall!)

```bash
# WARNUNG: Nur in absoluten Ausnahmefällen!
git commit --no-verify -m "Emergency fix"
```

**⚠️ ACHTUNG:** Dies umgeht ALLE Sicherheitschecks! Nur mit Team-Absprache!

## Installation

Die Hooks wurden bereits mit Husky installiert:
```bash
npm install  # Installiert automatisch die Hooks
```

## Hooks deaktivieren/aktivieren

```bash
# Temporär deaktivieren
mv .husky/pre-commit .husky/pre-commit.bak

# Wieder aktivieren  
mv .husky/pre-commit.bak .husky/pre-commit
```

## Vorteile

1. **Konsistenz**: Jeder Code folgt den gleichen Regeln
2. **Frühe Fehlererkennung**: Probleme werden sofort erkannt
3. **Schutz**: Kritische Dateien sind geschützt
4. **Automatisierung**: Keine manuellen Checks nötig
5. **Team-Alignment**: Alle arbeiten nach gleichen Standards

## Troubleshooting

### "Permission denied"
```bash
chmod +x .husky/pre-commit
```

### Hook läuft nicht
```bash
npx husky init
```

### ESLint zu strikt
1. Nutze `npm run lint:fix` für Auto-Fixes
2. Bei echten Problemen: Issue erstellen
3. NIEMALS den Hook dauerhaft deaktivieren

## Zusammenfassung

Pre-Commit-Hooks sind wie ein **Türsteher für deinen Code**:
- ✅ Guter Code darf rein
- ❌ Schlechter Code muss draußen bleiben
- 🛡️ Token-Datei ist VIP-only

Das Ergebnis: Sauberer, konsistenter Code im gesamten Projekt!