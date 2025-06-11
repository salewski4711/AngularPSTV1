# 🧪 AUTOMATISIERTE TEST-STRATEGIE - 100% Qualitätssicherung

## 🚨 TEST-PFLICHTEN (Blockiert Build bei Nicht-Erfüllung!)

### Automatische Checks die FEHLER werfen:

1. **Token-Usage-Test** ❌
```typescript
// Dieser Test FAILED wenn hardcodierte Werte gefunden werden!
describe('Token Compliance Test', () => {
  it('MUSS Token für ALLE Farben verwenden', () => {
    const component = fixture.debugElement.nativeElement;
    const styles = component.querySelector('[class*="bg-"]');
    
    // FEHLER wenn: bg-orange-500, text-#F99600, etc.
    expect(styles).not.toMatch(/bg-(red|blue|orange|green)-\d{3}/);
    expect(styles).not.toMatch(/#[0-9A-Fa-f]{6}/);
  });
});
```

2. **Size-Limit-Test** ❌
```typescript
// Service-Größen-Test
describe('Service Size Compliance', () => {
  it('Service DARF NICHT mehr als 100 Zeilen haben', () => {
    const serviceFile = fs.readFileSync('./service.ts', 'utf8');
    const lineCount = serviceFile.split('\n').length;
    
    expect(lineCount).toBeLessThan(100); // FEHLER wenn > 100
  });
});
```

## 🔍 Automatische Token-Violation-Detection

### Custom ESLint Plugin
```javascript
// eslint-plugin-design-tokens/index.js
module.exports = {
  rules: {
    'no-hardcoded-colors': {
      create(context) {
        return {
          Literal(node) {
            // Prüft auf Hex-Farben
            if (/#[0-9A-Fa-f]{6}/.test(node.value)) {
              context.report({
                node,
                message: 'FEHLER: Hardcodierte Farbe! Nutze Design Tokens!',
                fix(fixer) {
                  // Auto-Fix zu Token
                  return fixer.replaceText(node, 'DESIGN_TOKENS.color.primary[500]');
                }
              });
            }
          },
          
          TemplateElement(node) {
            // Prüft auf Tailwind-Klassen
            const forbidden = [
              /bg-(red|blue|orange|green|yellow|purple|pink)-\d{3}/,
              /text-(red|blue|orange|green|yellow|purple|pink)-\d{3}/,
              /border-(red|blue|orange|green|yellow|purple|pink)-\d{3}/
            ];
            
            forbidden.forEach(pattern => {
              if (pattern.test(node.value.raw)) {
                context.report({
                  node,
                  message: 'FEHLER: Hardcodierte Tailwind-Farbe! Nutze TokenUtils!',
                });
              }
            });
          }
        };
      }
    }
  }
};
```

### Pre-Commit Hook (BLOCKIERT Commit!)
```bash
#!/bin/bash
# .husky/pre-commit

echo "🔍 Prüfe auf Token-Violations..."

# 1. ESLint Token Check
npm run lint:tokens || {
  echo "❌ FEHLER: Hardcodierte Werte gefunden!"
  echo "Nutze: npm run lint:tokens --fix"
  exit 1
}

# 2. Service Size Check
npm run check:service-size || {
  echo "❌ FEHLER: Service zu groß (>100 Zeilen)!"
  exit 1
}

# 3. Test Coverage Check
npm run test:coverage -- --min=80 || {
  echo "❌ FEHLER: Test Coverage unter 80%!"
  exit 1
}

echo "✅ Alle Checks bestanden!"
```

## 🤖 Puppeteer Visual Testing

### Automatischer Screenshot-Vergleich
```typescript
// visual-tests/component-visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Component Visual Tests', () => {
  const components = [
    'button', 'input', 'select', 'card', 'modal'
  ];
  
  components.forEach(component => {
    test(`${component} - Alle Varianten`, async ({ page }) => {
      await page.goto(`/showcase/${component}`);
      
      // Screenshot von jeder Variante
      const variants = ['primary', 'secondary', 'outline'];
      for (const variant of variants) {
        await page.screenshot({
          path: `screenshots/${component}-${variant}.png`,
          fullPage: false,
          clip: await page.locator(`[data-variant="${variant}"]`).boundingBox()
        });
        
        // Vergleich mit Referenz
        expect(await page.screenshot()).toMatchSnapshot(`${component}-${variant}.png`, {
          maxDiffPixels: 100 // FEHLER wenn > 100 Pixel Unterschied
        });
      }
    });
  });
});
```

### Visual Regression CI Pipeline
```yaml
# .github/workflows/visual-tests.yml
name: Visual Regression Tests

on: [push, pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
        
      - name: Build tokens
        run: npm run tokens:build
        
      - name: Run visual tests
        run: npm run test:visual
        
      - name: Upload diff images
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: visual-diff
          path: test-results/
```

## 📊 Coverage-Enforcement

### Jest Config mit Coverage-Thresholds
```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    // Spezifische Komponenten MÜSSEN 90% haben
    './src/app/shared/components/**/*.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/index.ts'
  ]
};
```

## 🔐 Automatische Security-Checks

### Component Security Test
```typescript
describe('Security Compliance', () => {
  it('DARF KEINE unsicheren Bindings haben', () => {
    const template = component.template;
    
    // FEHLER bei innerHTML
    expect(template).not.toContain('[innerHTML]');
    
    // FEHLER bei bypassSecurityTrust
    expect(template).not.toContain('bypassSecurityTrust');
  });
  
  it('MUSS XSS-sichere Inputs haben', () => {
    component.userInput = '<script>alert("XSS")</script>';
    fixture.detectChanges();
    
    const output = fixture.nativeElement.textContent;
    expect(output).not.toContain('<script>');
  });
});
```

## 🎯 Test-Kategorien & Automation

### 1. Unit Tests (Jest) - Läuft bei jedem Commit
```bash
npm test -- --coverage
```

### 2. Visual Tests (Puppeteer) - Läuft bei PR
```bash
npm run test:visual
```

### 3. Token Compliance (ESLint) - Läuft pre-commit
```bash
npm run lint:tokens
```

### 4. E2E Tests (Playwright) - Läuft nightly
```bash
npm run test:e2e
```

### 5. Performance Tests - Läuft bei Release
```bash
npm run test:performance
```

## 📈 Test-Reports & Monitoring

### Automatisches Dashboard
```typescript
// test-reporter.js
const generateReport = () => {
  return {
    tokenCompliance: getTokenComplianceScore(),
    coverage: getCoverageScore(),
    visualTests: getVisualTestResults(),
    performance: getPerformanceMetrics(),
    timestamp: new Date()
  };
};

// Webhook zu Monitoring-Tool
fetch('https://monitoring.example.com/test-results', {
  method: 'POST',
  body: JSON.stringify(generateReport())
});
```

## 🚫 Build-Blocker

### Diese Tests MÜSSEN grün sein für erfolgreichen Build:

1. ✅ Keine hardcodierten Werte (0 Violations)
2. ✅ Alle Services < 100 Zeilen
3. ✅ Test Coverage > 80%
4. ✅ Keine Visual Regression
5. ✅ Keine Security Violations
6. ✅ Performance Budget eingehalten

```json
// angular.json
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "options": {
            "budgets": [
              {
                "type": "initial",
                "maximumWarning": "500kb",
                "maximumError": "1mb"
              }
            ]
          }
        }
      }
    }
  }
}
```