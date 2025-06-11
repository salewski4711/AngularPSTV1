# 🔄 TOKEN-MIGRATION-PLAN - Von 4 Dateien zu 1 Source of Truth

## Ausgangslage

Sie haben aktuell **4 verschiedene Token-Definitionen**:

1. `/src/app/core/design-system/design-tokens.ts` (322 Zeilen)
2. `/src/app/core/design-system/design-tokens.scss` (78 Zeilen)
3. `/src/app/design-system/tokens/design-tokens.ts` (376 Zeilen)
4. `/src/app/design-system/tokens/colors.json` (82 Zeilen)

## 🎯 Ziel

**Eine einzige Token-Quelle** mit Style Dictionary, die alle anderen Formate generiert.

## 📋 Migrations-Schritte

### Schritt 1: Analyse der bestehenden Tokens

```javascript
// scripts/analyze-existing-tokens.js
const fs = require('fs');
const path = require('path');

// Lese alle Token-Dateien
const tokens1 = require('../src/app/core/design-system/design-tokens.ts');
const tokens2 = fs.readFileSync('../src/app/core/design-system/design-tokens.scss', 'utf8');
const tokens3 = require('../src/app/design-system/tokens/design-tokens.ts');
const tokens4 = require('../src/app/design-system/tokens/colors.json');

// Analysiere Unterschiede
console.log('🔍 Analysiere Token-Unterschiede...\n');

// Extrahiere alle Farben
const colors = new Set();
// ... Analyse-Logik

// Report
console.log(`📊 Gefundene Token-Kategorien:
- Farben: ${colors.size}
- Spacing: ${spacing.size}
- Typography: ${typography.size}
`);
```

### Schritt 2: Master Token-Struktur erstellen

```json
// tokens/base/colors.json
{
  "color": {
    "brand": {
      "primary": {
        "value": "#F99600",
        "type": "color",
        "description": "ProSolarTec Orange"
      },
      "secondary": {
        "value": "#1C3661",
        "type": "color", 
        "description": "ProSolarTec Blau"
      }
    },
    "scale": {
      "orange": {
        "50": { "value": "#FFF7ED" },
        "100": { "value": "#FFEDD5" },
        "200": { "value": "#FED7AA" },
        "300": { "value": "#FDBA74" },
        "400": { "value": "#FB923C" },
        "500": { "value": "#F99600" },
        "600": { "value": "#EA580C" },
        "700": { "value": "#C2410C" },
        "800": { "value": "#9A3412" },
        "900": { "value": "#7C2D12" }
      }
    }
  }
}
```

### Schritt 3: Komponenten-Token-Mapping

```javascript
// scripts/generate-component-tokens.js
const components = {
  button: {
    sizes: {
      xs: { padding: "0.375rem 0.625rem", fontSize: "0.75rem", height: "1.75rem" },
      sm: { padding: "0.5rem 0.75rem", fontSize: "0.875rem", height: "2rem" },
      md: { padding: "0.625rem 1rem", fontSize: "1rem", height: "2.5rem" },
      lg: { padding: "0.75rem 1.25rem", fontSize: "1.125rem", height: "3rem" }
    }
  }
};

// Konvertiere zu Token-Format
const componentTokens = {};
Object.entries(components).forEach(([component, config]) => {
  componentTokens[component] = convertToTokenFormat(config);
});

fs.writeFileSync(
  'tokens/component/generated.json',
  JSON.stringify(componentTokens, null, 2)
);
```

### Schritt 4: Validierung der Migration

```typescript
// scripts/validate-migration.ts
import { DESIGN_TOKENS as OLD_TOKENS } from '../src/app/core/design-system/design-tokens';
import { DESIGN_TOKENS as NEW_TOKENS } from '../src/app/core/design-system/design-tokens.generated';

const validateMigration = () => {
  const missingTokens = [];
  const changedValues = [];
  
  // Prüfe alle alten Tokens
  checkTokens(OLD_TOKENS, NEW_TOKENS, '', missingTokens, changedValues);
  
  // Report
  if (missingTokens.length > 0) {
    console.error('❌ Fehlende Tokens:', missingTokens);
  }
  
  if (changedValues.length > 0) {
    console.warn('⚠️  Geänderte Werte:', changedValues);
  }
  
  if (missingTokens.length === 0 && changedValues.length === 0) {
    console.log('✅ Migration erfolgreich! Alle Tokens migriert.');
  }
};
```

## 🔄 Schrittweise Migration

### Phase 1: Setup (Tag 1)
```bash
# 1. Style Dictionary installieren
npm install --save-dev style-dictionary

# 2. Basis-Struktur erstellen
mkdir -p tokens/{base,semantic,component}

# 3. Config erstellen
cp .ai/doing/style-dictionary.config.js .

# 4. Erste Tokens migrieren (nur Farben)
node scripts/migrate-colors.js
```

### Phase 2: Token-Generation (Tag 2)
```bash
# 1. Tokens builden
npm run tokens:build

# 2. Generierte Dateien prüfen
ls -la src/app/core/design-system/design-tokens.generated.*

# 3. Import in einer Test-Komponente
# Ändere einen Import zum Testen
```

### Phase 3: Komponenten-Migration (Tag 3-5)
```bash
# Pro Komponente:
1. Alte Token-Imports identifizieren
2. Auf neue Imports umstellen
3. Tests ausführen
4. Visual Tests prüfen
```

### Phase 4: Cleanup (Tag 6)
```bash
# 1. Alte Token-Dateien als deprecated markieren
# 2. Nach Übergangsphase löschen
# 3. Imports bereinigen
```

## 📊 Migrations-Tracking

```json
// migration-status.json
{
  "status": "in-progress",
  "phases": {
    "setup": "complete",
    "tokenGeneration": "complete",
    "components": {
      "total": 45,
      "migrated": 12,
      "remaining": 33
    },
    "cleanup": "pending"
  },
  "blockers": [],
  "estimatedCompletion": "2024-01-17"
}
```

## ⚠️ Wichtige Hinweise

### 1. **Keine Breaking Changes**
- Alte Token-Dateien bleiben zunächst bestehen
- Parallelbetrieb während Migration
- Schrittweise Umstellung

### 2. **Testing**
- Jede migrierte Komponente testen
- Visual Regression Tests wichtig!
- Performance-Impact prüfen

### 3. **Team-Kommunikation**
```markdown
## Token-Migration Info

Ab sofort nutzen wir Style Dictionary für Design Tokens.

**Neu:** 
- Tokens aus `design-tokens.generated.ts` importieren
- Keine manuellen Token-Änderungen mehr!

**Alt (deprecated):**
- `design-tokens.ts` (wird entfernt)

**Build:** 
- `npm run tokens:build` läuft automatisch
```

## ✅ Erfolgs-Kriterien

1. **Alle Komponenten** nutzen generierte Tokens
2. **Keine hardcodierten Werte** mehr im Code
3. **Build-Pipeline** integriert
4. **Team** geschult auf neues System
5. **Alte Token-Dateien** entfernt

## 🚀 Quick Win

Starten Sie mit **einer Komponente** als Proof of Concept:

```bash
# 1. Button-Component migrieren
npm run migrate:component -- button

# 2. Testen
npm test -- button.component.spec.ts

# 3. Bei Erfolg: Nächste Komponente
```

Nach erfolgreicher Migration haben Sie:
- **90% weniger** Token-Maintenance
- **100% Konsistenz** garantiert
- **Type-Safety** überall
- **Automatische Updates** bei Token-Änderungen