# 🤖 KI-AGENT-SPEZIFIKATIONEN - Detaillierte Arbeitsanweisungen

## Agent 1: TOKEN-MASTER 🎨

### Aufgaben:
1. Style Dictionary Setup
2. Token-Konsolidierung aus 4 Dateien
3. Build-Pipeline erstellen
4. Token-Dokumentation

### Arbeitsschritte:
```bash
# 1. Style Dictionary installieren
npm install --save-dev style-dictionary

# 2. Token-Struktur erstellen
mkdir -p tokens/{base,semantic,component}

# 3. Bestehende Tokens analysieren
ki analyze --tokens all

# 4. Master-Token-File erstellen
ki merge-tokens --output tokens/base/colors.json

# 5. Build-Konfiguration
ki create --file tokens/build.js

# 6. NPM Scripts hinzufügen
ki update-package-json --add-token-scripts
```

### Validierung:
```bash
# Token-Master MUSS prüfen:
npm run tokens:build
npm run tokens:validate
npm run tokens:test
```

### Output:
- `tokens/` Verzeichnis mit allen Token-Definitionen
- Generierte Files: `tailwind.config.tokens.js`, `design-tokens.generated.ts`
- Dokumentation: `tokens/README.md`

---

## Agent 2: COMPONENT-AGENT-A (Form Atoms) 📝

### Komponenten:
- Input
- Select  
- Checkbox
- Radio
- Toggle

### Für JEDE Komponente:
```typescript
// 1. Token-Definition prüfen
await ki.checkTokens('input');

// 2. Component erstellen
await ki.createComponent({
  name: 'input',
  extends: 'FormControlBase',
  tokens: true,
  tests: true,
  showcase: true
});

// 3. Validierung
await ki.validate('input', {
  tokenCompliance: true,
  coverage: 85,
  visualTests: true
});
```

### Test-Beispiel:
```typescript
// KI MUSS diese Tests schreiben:
describe('InputComponent Token Compliance', () => {
  it('MUSS Tokens für alle Größen verwenden', () => {
    const sizes = ['sm', 'md', 'lg'];
    sizes.forEach(size => {
      component.size = size;
      fixture.detectChanges();
      
      const classes = component.inputClasses();
      expect(classes).toContain(`size-${size}`);
      expect(classes).not.toContain('p-4'); // Keine hardcodierten Werte!
    });
  });
});
```

---

## Agent 3: COMPONENT-AGENT-B (Display Atoms) 🎯

### Komponenten:
- Button
- Badge
- Tag
- Avatar
- Icon

### Spezielle Anforderungen:
```typescript
// Button-Component Beispiel
class ButtonComponent {
  // KI MUSS Signal-based State verwenden
  loading = signal(false);
  
  // KI MUSS computed für Klassen verwenden
  buttonClasses = computed(() => {
    const base = this.tokenUtils.getBaseClasses('button');
    const variant = this.tokenUtils.getVariantClasses('button', this.variant);
    const size = this.tokenUtils.getSizeClasses('button', this.size);
    const state = this.tokenUtils.getStateClasses('button', {
      loading: this.loading(),
      disabled: this.disabled
    });
    
    return `${base} ${variant} ${size} ${state}`;
  });
}
```

---

## Agent 4: COMPONENT-AGENT-C (Feedback Atoms) ⏳

### Komponenten:
- Spinner
- ProgressBar
- Skeleton
- Tooltip

### Visual Test Requirements:
```typescript
// KI MUSS Visual Tests erstellen:
test('Spinner - alle Varianten', async ({ page }) => {
  await page.goto('/showcase/spinner');
  
  const variants = ['circle', 'dots', 'bars'];
  const sizes = ['sm', 'md', 'lg'];
  
  for (const variant of variants) {
    for (const size of sizes) {
      await page.screenshot({
        path: `screenshots/spinner-${variant}-${size}.png`
      });
    }
  }
});
```

---

## Agent 5: SERVICE-REFACTORING-AGENT 🏛️

### Aufgaben:
1. NavigationService → 3 Services
2. DashboardService → 4 Services
3. Interfaces erstellen
4. Tests migrieren

### Refactoring-Prozess:
```typescript
// 1. Interface definieren
export interface INavigationService {
  navigateTo(path: string): Promise<boolean>;
}

// 2. Service aufteilen
@Injectable({ providedIn: 'root' })
export class NavigationService implements INavigationService {
  // MAX 100 ZEILEN!
}

// 3. Injection Token
export const NAVIGATION_SERVICE = new InjectionToken<INavigationService>('NavigationService');

// 4. Tests anpassen
const mockNavService = jasmine.createSpyObj<INavigationService>(['navigateTo']);
```

---

## Agent 6: TEST-AUTOMATION-AGENT 🧪

### Aufgaben:
1. Jest-Konfiguration optimieren
2. Puppeteer-Setup
3. Coverage-Reports
4. CI/CD Integration

### Test-Templates erstellen:
```typescript
// test-templates/component.spec.ts
export const componentTestTemplate = `
describe('[Component]Component', () => {
  // Token Compliance
  describe('Token Usage', () => {
    it('MUSS alle Farben aus Tokens verwenden', () => {
      // Test implementation
    });
  });
  
  // Accessibility
  describe('Accessibility', () => {
    it('MUSS ARIA-Labels haben', () => {
      // Test implementation
    });
  });
  
  // Visual Regression
  describe('Visual Tests', () => {
    it('MUSS identisch zum Snapshot sein', () => {
      // Test implementation
    });
  });
});
`;
```

---

## Agent 7: QUALITY-GATES-AGENT 🔒

### Aufgaben:
1. ESLint-Regeln erstellen
2. Pre-Commit Hooks
3. Build-Blockierung
4. Monitoring

### Custom ESLint Rules:
```javascript
// eslint-rules/no-hardcoded-values.js
module.exports = {
  create(context) {
    return {
      Literal(node) {
        // Prüfe auf Hex-Farben
        if (typeof node.value === 'string' && node.value.match(/#[0-9A-Fa-f]{6}/)) {
          context.report({
            node,
            message: 'Hardcodierte Farbe gefunden! Nutze Design Tokens!',
            fix(fixer) {
              const tokenName = getTokenForColor(node.value);
              return fixer.replaceText(node, `DESIGN_TOKENS.${tokenName}`);
            }
          });
        }
      }
    };
  }
};
```

---

## Agent 8: DOCUMENTATION-AGENT 📚

### Aufgaben:
1. Component-Dokumentation
2. Migration-Guides
3. Best Practices
4. Troubleshooting

### Dokumentations-Template:
```markdown
# [Component] Component

## Übersicht
[Beschreibung]

## Token-Usage
\`\`\`typescript
// Verwendete Tokens
- color.primary.500
- spacing.md
- fontSize.base
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | ... |

## Beispiele
[Code-Beispiele]

## Accessibility
[A11y-Hinweise]

## Migration
[Von alter zu neuer Version]
```

---

## Agent 9: INTEGRATION-AGENT 🔧

### Aufgaben:
1. Dependencies aktualisieren
2. Build-Pipeline optimieren
3. Performance-Monitoring
4. Error-Tracking

### Integration-Checks:
```bash
# Integration-Agent MUSS prüfen:
- Bundle Size < 1MB
- First Load JS < 200KB
- Lighthouse Score > 90
- No Console Errors
- No TypeScript Errors
```

---

## Agent 10: COORDINATOR-AGENT 📊

### Aufgaben:
1. Agent-Status überwachen
2. Dependencies koordinieren
3. Merge-Konflikte lösen
4. Progress-Reporting

### Status-Dashboard:
```typescript
interface AgentStatus {
  agent: string;
  progress: number;
  blockers: string[];
  eta: Date;
  quality: number;
}

const dashboard = {
  agents: [
    { agent: 'Token-Master', progress: 100, blockers: [], eta: null, quality: 98 },
    { agent: 'Component-A', progress: 60, blockers: ['waiting for tokens'], eta: '2 days', quality: 95 }
  ]
};
```

---

## 🚀 Agent-Kommunikation

### Shared State:
```typescript
// shared/agent-state.json
{
  "tokens": {
    "ready": true,
    "lastUpdate": "2024-01-10T10:00:00Z"
  },
  "components": {
    "completed": ["button", "input"],
    "inProgress": ["select", "modal"],
    "blocked": []
  },
  "quality": {
    "tokenCompliance": 98,
    "testCoverage": 87,
    "violations": 0
  }
}
```

### Agent-Protokoll:
```bash
# Jeder Agent meldet:
ki report --agent "Component-A" --status "completed" --component "input" --quality 96
```

---

## ✅ Erfolgs-Kriterien pro Agent

1. **100% Token-Compliance**
2. **85%+ Test Coverage**
3. **0 ESLint Errors**
4. **Visual Tests Pass**
5. **Documentation Complete**
6. **Performance Budget Met**
7. **No Security Issues**
8. **Accessibility Score 100%**

**KEIN MERGE ohne 100% Erfüllung!**