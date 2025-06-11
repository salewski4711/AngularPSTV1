# 🔒 CODE-QUALITÄTS-GATES - Automatische Enforcement

## 🚨 DIESE GATES BLOCKIEREN ALLES!

Kein Commit, kein Build, kein Merge ohne dass ALLE Gates grün sind!

---

## 🎯 Quality Gate Level 1: Pre-Commit (Lokal)

### Gate 1.1: Token Compliance
```javascript
// .eslintrc.js - CUSTOM RULES DIE FEHLER WERFEN!
module.exports = {
  plugins: ['design-tokens'],
  rules: {
    // FEHLER bei hardcodierten Farben
    'design-tokens/no-hex-colors': 'error',
    'design-tokens/no-rgb-colors': 'error',
    'design-tokens/no-tailwind-colors': 'error',
    
    // FEHLER bei falschen Klassen
    'design-tokens/use-token-utils': 'error',
    'design-tokens/no-magic-numbers': 'error',
    
    // Auto-Fix verfügbar!
    'design-tokens/enforce-token-usage': ['error', {
      autoFix: true
    }]
  }
};
```

### Gate 1.2: Component Standards
```bash
#!/bin/bash
# .husky/pre-commit

# Component Prefix Check
if grep -r "selector: '[^p][^s][^t]-" src/app/shared/components/; then
  echo "❌ FEHLER: Component ohne pst- prefix gefunden!"
  exit 1
fi

# OnPush Check
if grep -r "@Component" src/app/shared/components/ | grep -v "OnPush"; then
  echo "❌ FEHLER: Component ohne ChangeDetectionStrategy.OnPush!"
  exit 1
fi
```

### Gate 1.3: Service Size Check
```typescript
// scripts/check-service-size.ts
const MAX_LINES = 100;

const checkServiceSize = (filePath: string) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').length;
  
  if (lines > MAX_LINES) {
    throw new Error(`
      ❌ SERVICE ZU GROSS!
      Datei: ${filePath}
      Zeilen: ${lines} (Maximum: ${MAX_LINES})
      
      Lösung: Service in kleinere Services aufteilen!
    `);
  }
};
```

---

## 🎯 Quality Gate Level 2: CI/CD Pipeline

### Gate 2.1: Automatische Token-Analyse
```yaml
# .github/workflows/token-compliance.yml
name: Token Compliance Check

on: [push, pull_request]

jobs:
  token-check:
    runs-on: ubuntu-latest
    steps:
      - name: Scan für hardcodierte Werte
        run: |
          # Sucht nach Hex-Farben
          ! grep -r "#[0-9A-Fa-f]\{6\}" src/ --include="*.ts" --include="*.html"
          
          # Sucht nach RGB-Farben
          ! grep -r "rgb\(a\?\)(" src/ --include="*.ts" --include="*.html"
          
          # Sucht nach verbotenen Tailwind-Klassen
          ! grep -r "bg-\(red\|blue\|orange\|green\)-[0-9]\{3\}" src/
```

### Gate 2.2: Coverage Gate
```yaml
- name: Test Coverage Check
  run: |
    COVERAGE=$(npm run test:coverage -- --json | jq '.total.lines.pct')
    if (( $(echo "$COVERAGE < 80" | bc -l) )); then
      echo "❌ Coverage nur $COVERAGE% (Minimum: 80%)"
      exit 1
    fi
```

### Gate 2.3: Visual Regression Gate
```yaml
- name: Visual Tests
  run: |
    npm run test:visual
    
    # Wenn Unterschiede gefunden
    if [ -d "test-results/diff" ]; then
      echo "❌ Visual Regression gefunden!"
      echo "Siehe Artifacts für Details"
      exit 1
    fi
```

---

## 🤖 Automatische Fixes

### Auto-Fix Script für Token-Violations
```typescript
// scripts/auto-fix-tokens.ts
const autoFixTokens = {
  // Hex zu Token
  '#F99600': 'tokenUtils.getColor("primary.500")',
  '#1C3661': 'tokenUtils.getColor("secondary.500")',
  
  // Tailwind zu Token
  'bg-orange-500': 'tokenUtils.getColorClass("bg", "primary.500")',
  'text-blue-700': 'tokenUtils.getColorClass("text", "secondary.700")',
  
  // Größen zu Token
  'p-4': 'tokenUtils.getSpacingClass("p", "md")',
  'text-sm': 'tokenUtils.getTextClass("sm")'
};

// Automatisch alle Dateien fixen
const fixFile = (filePath: string) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  Object.entries(autoFixTokens).forEach(([search, replace]) => {
    content = content.replace(new RegExp(search, 'g'), replace);
  });
  
  fs.writeFileSync(filePath, content);
};
```

### Pre-Push Auto-Fix
```bash
#!/bin/bash
# .husky/pre-push

echo "🔧 Auto-Fix läuft..."

# Token Auto-Fix
npm run fix:tokens

# Format Code
npm run prettier:fix

# Fix ESLint Issues
npm run lint:fix

# Wenn Änderungen, dann commit
if [[ $(git diff --stat) != '' ]]; then
  git add .
  git commit -m "🤖 Auto-Fix: Token Compliance & Formatting"
fi
```

---

## 📊 Quality Metrics Dashboard

### Real-Time Monitoring
```typescript
// quality-metrics.service.ts
@Injectable({ providedIn: 'root' })
export class QualityMetricsService {
  private metrics$ = new BehaviorSubject({
    tokenCompliance: 0,
    testCoverage: 0,
    codeSmells: 0,
    technicalDebt: 0,
    performanceScore: 0
  });
  
  updateMetrics(): void {
    this.metrics$.next({
      tokenCompliance: this.calculateTokenCompliance(),
      testCoverage: this.getTestCoverage(),
      codeSmells: this.detectCodeSmells(),
      technicalDebt: this.calculateTechnicalDebt(),
      performanceScore: this.measurePerformance()
    });
  }
}
```

---

## 🚫 Bypass-Verhinderung

### Keine Möglichkeit Gates zu umgehen!

```javascript
// angular.json
{
  "cli": {
    "analytics": false,
    "cache": {
      "enabled": true
    },
    "schematicCollections": ["@angular-eslint/schematics"]
  },
  "schematics": {
    "@angular-eslint/schematics:application": {
      "setParserOptionsProject": true
    }
  }
}
```

### Protected Branches
```yaml
# GitHub Branch Protection Rules
- main:
    - Require pull request reviews
    - Require status checks to pass
    - Require branches to be up to date
    - Include administrators
    - Restrict who can push
```

---

## 📈 Continuous Improvement

### Wöchentlicher Quality Report
```typescript
// Automatisch jeden Montag
const generateWeeklyReport = () => {
  return {
    violations: {
      tokens: getTokenViolations(),
      services: getOversizedServices(),
      components: getNonCompliantComponents()
    },
    trends: {
      coverage: getCoverageTrend(),
      performance: getPerformanceTrend(),
      violations: getViolationTrend()
    },
    recommendations: generateRecommendations()
  };
};
```

### Automatische Alerts
```typescript
// Bei kritischen Violations
if (tokenViolations > 10) {
  sendSlackAlert({
    channel: '#dev-alerts',
    message: '🚨 Kritisch: 10+ Token Violations gefunden!',
    severity: 'high'
  });
}
```

---

## 🏆 Quality Score

### Jede Komponente bekommt einen Score:
```
Quality Score = 
  (Token Compliance × 0.3) +
  (Test Coverage × 0.3) +
  (Performance × 0.2) +
  (Accessibility × 0.2)

Minimum Score: 85%
```

**Build wird BLOCKIERT wenn Score < 85%!**