# 🔧 AUTOMATISCHE VALIDIERUNGS-SCRIPTS - NPM Scripts & Tools

## Package.json Scripts

```json
{
  "scripts": {
    "// ============ TOKEN SCRIPTS ============": "",
    "tokens:build": "style-dictionary build --config ./tokens/build.js",
    "tokens:watch": "chokidar 'tokens/**/*.json' -c 'npm run tokens:build'",
    "tokens:validate": "node scripts/validate-tokens.js",
    "tokens:check": "node scripts/check-token-usage.js",
    "tokens:fix": "node scripts/auto-fix-tokens.js",
    
    "// ============ COMPONENT VALIDATION ============": "",
    "validate:component": "node scripts/validate-component.js",
    "validate:all-components": "node scripts/validate-all-components.js",
    "component:create": "node scripts/create-component.js",
    "component:check-standards": "node scripts/check-component-standards.js",
    
    "// ============ SERVICE VALIDATION ============": "",
    "check:service-size": "node scripts/check-service-size.js",
    "check:service-deps": "node scripts/check-service-dependencies.js",
    "service:analyze": "node scripts/analyze-services.js",
    "service:split": "node scripts/split-large-service.js",
    
    "// ============ TEST AUTOMATION ============": "",
    "test:component": "jest --testPathPattern=src/app/shared/components",
    "test:visual": "playwright test --config=playwright.config.ts",
    "test:visual:update": "playwright test --update-snapshots",
    "test:coverage": "jest --coverage --coverageThreshold='{\"global\":{\"branches\":80,\"functions\":80,\"lines\":80,\"statements\":80}}'",
    "test:a11y": "node scripts/run-accessibility-tests.js",
    
    "// ============ QUALITY GATES ============": "",
    "lint:tokens": "eslint . --ext .ts,.html --plugin design-tokens",
    "lint:fix": "npm run lint:tokens -- --fix",
    "quality:check": "node scripts/quality-check.js",
    "quality:report": "node scripts/generate-quality-report.js",
    
    "// ============ KI VALIDATION ============": "",
    "ki:validate": "npm run tokens:check && npm run test:component && npm run test:visual && npm run quality:check",
    "ki:fix-all": "npm run tokens:fix && npm run lint:fix",
    "ki:report": "node scripts/ki-report.js",
    
    "// ============ FULL VALIDATION ============": "",
    "validate:all": "npm run tokens:validate && npm run validate:all-components && npm run check:service-size && npm run test:coverage && npm run quality:check",
    "precommit": "npm run validate:all",
    "prepush": "npm run test:visual && npm run test:coverage"
  }
}
```

## 📁 Script-Implementierungen

### 1. Token Validation Script
```typescript
// scripts/validate-tokens.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const validateTokens = () => {
  console.log('🔍 Validating Design Tokens...\n');
  
  const errors = [];
  
  // Check 1: Alle Token-Files valid JSON
  const tokenFiles = glob.sync('tokens/**/*.json');
  tokenFiles.forEach(file => {
    try {
      JSON.parse(fs.readFileSync(file, 'utf8'));
      console.log(`✅ ${file} - Valid JSON`);
    } catch (e) {
      errors.push(`❌ ${file} - Invalid JSON: ${e.message}`);
    }
  });
  
  // Check 2: Keine duplizierten Token-Namen
  const allTokens = {};
  tokenFiles.forEach(file => {
    const tokens = JSON.parse(fs.readFileSync(file, 'utf8'));
    checkDuplicates(tokens, file, allTokens, errors);
  });
  
  // Check 3: Alle Farben im HEX-Format
  tokenFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const nonHexColors = content.match(/(?<!#)[0-9]{3,6}(?![\dA-Fa-f])/g);
    if (nonHexColors) {
      errors.push(`❌ ${file} - Non-HEX colors found`);
    }
  });
  
  // Report
  if (errors.length > 0) {
    console.error('\n❌ Token Validation Failed:');
    errors.forEach(e => console.error(e));
    process.exit(1);
  } else {
    console.log('\n✅ All tokens valid!');
  }
};

validateTokens();
```

### 2. Component Token Usage Check
```typescript
// scripts/check-token-usage.js
const fs = require('fs');
const glob = require('glob');

const checkTokenUsage = () => {
  console.log('🔍 Checking Token Usage in Components...\n');
  
  const violations = [];
  const componentFiles = glob.sync('src/app/shared/components/**/*.ts');
  
  componentFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check für hardcodierte Farben
    const hexColors = content.match(/#[0-9A-Fa-f]{6}/g);
    if (hexColors) {
      violations.push({
        file,
        type: 'HARDCODED_HEX',
        found: hexColors,
        line: getLineNumber(content, hexColors[0])
      });
    }
    
    // Check für Tailwind-Farben
    const tailwindColors = content.match(/(?:bg|text|border)-(red|blue|orange|green|yellow|purple|pink)-\d{3}/g);
    if (tailwindColors) {
      violations.push({
        file,
        type: 'HARDCODED_TAILWIND',
        found: tailwindColors,
        line: getLineNumber(content, tailwindColors[0])
      });
    }
    
    // Check für px-Werte
    const pxValues = content.match(/\d+px/g);
    if (pxValues) {
      violations.push({
        file,
        type: 'HARDCODED_PX',
        found: pxValues,
        line: getLineNumber(content, pxValues[0])
      });
    }
  });
  
  // Report
  if (violations.length > 0) {
    console.error('❌ Token Usage Violations Found:\n');
    violations.forEach(v => {
      console.error(`File: ${v.file}:${v.line}`);
      console.error(`Type: ${v.type}`);
      console.error(`Found: ${v.found.join(', ')}\n`);
    });
    process.exit(1);
  } else {
    console.log('✅ All components use tokens correctly!');
  }
};

checkTokenUsage();
```

### 3. Auto-Fix Tokens Script
```typescript
// scripts/auto-fix-tokens.js
const fs = require('fs');
const glob = require('glob');

const tokenMappings = {
  // Farben
  '#F99600': "tokenUtils.getColor('primary.500')",
  '#1C3661': "tokenUtils.getColor('secondary.500')",
  '#FFFFFF': "tokenUtils.getColor('white')",
  '#000000': "tokenUtils.getColor('black')",
  
  // Tailwind Classes
  'bg-orange-500': "tokenUtils.getColorClass('bg', 'primary.500')",
  'bg-primary': "tokenUtils.getColorClass('bg', 'primary.500')",
  'text-white': "tokenUtils.getColorClass('text', 'white')",
  'border-gray-300': "tokenUtils.getColorClass('border', 'neutral.300')",
  
  // Größen
  'p-4': "tokenUtils.getSpacingClass('p', 'md')",
  'px-4': "tokenUtils.getSpacingClass('px', 'md')",
  'py-2': "tokenUtils.getSpacingClass('py', 'sm')",
  'm-2': "tokenUtils.getSpacingClass('m', 'sm')",
  
  // Text Größen
  'text-sm': "tokenUtils.getTextSizeClass('sm')",
  'text-base': "tokenUtils.getTextSizeClass('base')",
  'text-lg': "tokenUtils.getTextSizeClass('lg')",
  
  // Schatten
  'shadow-sm': "tokenUtils.getShadowClass('sm')",
  'shadow-md': "tokenUtils.getShadowClass('md')",
  'shadow-lg': "tokenUtils.getShadowClass('lg')",
  
  // Border Radius
  'rounded': "tokenUtils.getRadiusClass('base')",
  'rounded-md': "tokenUtils.getRadiusClass('md')",
  'rounded-lg': "tokenUtils.getRadiusClass('lg')",
  'rounded-full': "tokenUtils.getRadiusClass('full')"
};

const autoFix = () => {
  console.log('🔧 Auto-fixing token violations...\n');
  
  const files = glob.sync('src/app/shared/components/**/*.ts');
  let totalFixes = 0;
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let fixes = 0;
    
    Object.entries(tokenMappings).forEach(([search, replace]) => {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, replace);
        fixes += matches.length;
      }
    });
    
    if (fixes > 0) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed ${fixes} violations in ${file}`);
      totalFixes += fixes;
    }
  });
  
  console.log(`\n✅ Total fixes applied: ${totalFixes}`);
};

autoFix();
```

### 4. Service Size Check
```typescript
// scripts/check-service-size.js
const fs = require('fs');
const glob = require('glob');

const MAX_SERVICE_LINES = 100;

const checkServiceSize = () => {
  console.log('🔍 Checking Service Sizes...\n');
  
  const violations = [];
  const serviceFiles = glob.sync('src/app/**/services/**/*.service.ts');
  
  serviceFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n').length;
    
    if (lines > MAX_SERVICE_LINES) {
      violations.push({
        file,
        lines,
        excess: lines - MAX_SERVICE_LINES
      });
    } else {
      console.log(`✅ ${file}: ${lines} lines`);
    }
  });
  
  if (violations.length > 0) {
    console.error('\n❌ Service Size Violations:');
    violations.forEach(v => {
      console.error(`\n${v.file}`);
      console.error(`  Lines: ${v.lines} (${v.excess} over limit)`);
      console.error(`  Solution: Split into smaller services`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ All services within size limit!');
  }
};

checkServiceSize();
```

### 5. Component Standards Check
```typescript
// scripts/check-component-standards.js
const fs = require('fs');
const glob = require('glob');

const checkComponentStandards = () => {
  console.log('🔍 Checking Component Standards...\n');
  
  const violations = [];
  const componentFiles = glob.sync('src/app/shared/components/**/*.component.ts');
  
  componentFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check 1: pst- prefix
    if (!content.includes("selector: 'pst-")) {
      violations.push(`${file}: Missing pst- prefix`);
    }
    
    // Check 2: OnPush Change Detection
    if (!content.includes('ChangeDetectionStrategy.OnPush')) {
      violations.push(`${file}: Missing OnPush strategy`);
    }
    
    // Check 3: Standalone
    if (!content.includes('standalone: true')) {
      violations.push(`${file}: Not standalone`);
    }
    
    // Check 4: Token Utils Import
    if (!content.includes('TokenUtils')) {
      violations.push(`${file}: Not using TokenUtils`);
    }
  });
  
  if (violations.length > 0) {
    console.error('❌ Component Standard Violations:\n');
    violations.forEach(v => console.error(`  - ${v}`));
    process.exit(1);
  } else {
    console.log('✅ All components follow standards!');
  }
};

checkComponentStandards();
```

### 6. Quality Report Generator
```typescript
// scripts/generate-quality-report.js
const fs = require('fs');
const { execSync } = require('child_process');

const generateQualityReport = () => {
  console.log('📊 Generating Quality Report...\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    metrics: {
      tokenCompliance: getTokenCompliance(),
      testCoverage: getTestCoverage(),
      serviceCompliance: getServiceCompliance(),
      componentStandards: getComponentStandards(),
      bundleSize: getBundleSize(),
      performance: getPerformanceScore()
    },
    violations: {
      tokens: getTokenViolations(),
      services: getServiceViolations(),
      components: getComponentViolations()
    }
  };
  
  // Generate HTML Report
  const html = generateHTMLReport(report);
  fs.writeFileSync('quality-report.html', html);
  
  // Generate JSON Report
  fs.writeFileSync('quality-report.json', JSON.stringify(report, null, 2));
  
  console.log('✅ Quality report generated!');
  console.log(`   - HTML: quality-report.html`);
  console.log(`   - JSON: quality-report.json`);
  
  // Overall Score
  const score = calculateOverallScore(report.metrics);
  console.log(`\n📊 Overall Quality Score: ${score}%`);
  
  if (score < 85) {
    console.error('❌ Quality score below threshold (85%)');
    process.exit(1);
  }
};

generateQualityReport();
```

## 🚀 Verwendung in CI/CD

### GitHub Actions Workflow
```yaml
name: Quality Gates
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Dependencies
        run: npm ci
        
      - name: Build Tokens
        run: npm run tokens:build
        
      - name: Validate Tokens
        run: npm run tokens:validate
        
      - name: Check Token Usage
        run: npm run tokens:check
        
      - name: Check Component Standards
        run: npm run component:check-standards
        
      - name: Check Service Sizes
        run: npm run check:service-size
        
      - name: Run Tests
        run: npm run test:coverage
        
      - name: Run Visual Tests
        run: npm run test:visual
        
      - name: Generate Quality Report
        run: npm run quality:report
        
      - name: Upload Reports
        uses: actions/upload-artifact@v3
        with:
          name: quality-reports
          path: |
            quality-report.html
            quality-report.json
            coverage/
```

## 🎯 Lokale Entwicklung

### Pre-Commit Hook
```bash
#!/bin/bash
# .husky/pre-commit

echo "🚀 Running Quality Checks..."

# Token Validation
npm run tokens:check || {
  echo "❌ Token violations found! Run: npm run tokens:fix"
  exit 1
}

# Component Standards
npm run component:check-standards || {
  echo "❌ Component standard violations!"
  exit 1
}

# Service Size
npm run check:service-size || {
  echo "❌ Service too large!"
  exit 1
}

echo "✅ All checks passed!"
```

Diese Scripts stellen sicher, dass KEIN Code committed werden kann, der nicht den Standards entspricht!