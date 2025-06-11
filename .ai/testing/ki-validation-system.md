# KI-Validierung für Code-Qualität

## Konzept: Mehrstufige Validierung

### 1. ESLint (Syntax & Token-Regeln)
```bash
npm run lint
```
- ✅ Keine hardcodierten Farben
- ✅ Keine hardcodierten Pixel-Werte
- ✅ TokenUtils wird verwendet
- ✅ Typescript-Regeln eingehalten

### 2. KI-Validierung (Semantik & Best Practices)
Nach erfolgreichem ESLint-Check prüft eine KI:
- Ist der Code sinnvoll strukturiert?
- Werden die richtigen Token verwendet?
- Ist die Komponente konsistent aufgebaut?
- Werden Angular Best Practices befolgt?

## Implementierung

### Validation Script
```typescript
// validate-with-ai.ts
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { glob } from 'glob';

interface ValidationResult {
  file: string;
  eslintPassed: boolean;
  aiValidation?: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
}

async function validateFile(filePath: string): Promise<ValidationResult> {
  // 1. ESLint Check
  const eslintPassed = await runESLint(filePath);
  
  if (!eslintPassed) {
    return { file: filePath, eslintPassed: false };
  }
  
  // 2. KI Validation
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const aiValidation = await validateWithAI(fileContent, filePath);
  
  return {
    file: filePath,
    eslintPassed: true,
    aiValidation
  };
}

async function validateWithAI(content: string, filePath: string) {
  // Hier würde die KI-Integration kommen
  // z.B. über OpenAI API, Claude API, oder lokale LLMs
  
  const prompt = `
    Analysiere diese Angular-Komponente und prüfe:
    1. Werden die TokenUtils sinnvoll verwendet?
    2. Ist die Komponente gut strukturiert?
    3. Gibt es Verbesserungsmöglichkeiten?
    
    Datei: ${filePath}
    Inhalt:
    ${content}
    
    Antworte im JSON-Format:
    {
      "score": 0-100,
      "issues": ["..."],
      "suggestions": ["..."]
    }
  `;
  
  // Mock Response für Demo
  return {
    score: 85,
    issues: [
      "TokenUtils.getColor('primary.500') sollte für Buttons 'primary.600' für hover verwenden",
      "Fehlende Accessibility-Attribute"
    ],
    suggestions: [
      "Nutze TokenUtils.getComponentClasses() statt einzelner Klassen",
      "Füge aria-label für Screen Reader hinzu"
    ]
  };
}
```

### GitHub Action Integration
```yaml
# .github/workflows/ai-validation.yml
name: AI Code Validation

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run ESLint
        run: npm run lint
        
      - name: Run AI Validation
        if: success()
        run: |
          npx tsx validate-with-ai.ts
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          
      - name: Comment PR
        if: always()
        uses: actions/github-script@v6
        with:
          script: |
            const results = require('./validation-results.json');
            const comment = formatResults(results);
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

## Test-Beispiel

### 1. Komponente mit Problemen
```typescript
// bad-example.component.ts
@Component({
  selector: 'pst-example',
  template: `<button class="btn">Click</button>`
})
export class ExampleComponent {
  // ESLint sagt: OK (keine hardcodierten Werte)
  buttonClass = TokenUtils.getColorClass('bg', 'success.500');
  
  // ABER: KI erkennt semantisches Problem
  // -> Success-Farbe für normalen Button ist ungewöhnlich
}
```

### 2. Validierungs-Output
```json
{
  "eslintPassed": true,
  "aiValidation": {
    "score": 70,
    "issues": [
      "Success-Token für Standard-Button untypisch",
      "Template nutzt nicht die definierten Klassen",
      "Fehlende Button-States (hover, disabled)"
    ],
    "suggestions": [
      "Verwende 'primary.500' für Standard-Buttons",
      "Nutze [class]=\"buttonClass\" im Template",
      "Implementiere TokenUtils.getComponentClasses('button', options)"
    ]
  }
}
```

## Lokale KI-Integration

### Option 1: Ollama (Lokal)
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull codellama

# Use in validation
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    model: 'codellama',
    prompt: validationPrompt,
    format: 'json'
  })
});
```

### Option 2: OpenAI API
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{
    role: "system",
    content: "Du bist ein Angular & Design System Experte..."
  }, {
    role: "user",
    content: validationPrompt
  }],
  response_format: { type: "json_object" }
});
```

## Validierungs-Regeln für KI

### Must-Have Checks
1. **Token-Konsistenz**: Werden die richtigen Tokens für den Kontext verwendet?
2. **Component Best Practices**: Folgt die Komponente Angular-Standards?
3. **Accessibility**: Sind ARIA-Labels vorhanden?
4. **Performance**: Keine unnötigen Re-Renders?

### Nice-to-Have Checks
1. **Namenskonventionen**: Sind Variablennamen aussagekräftig?
2. **Dokumentation**: Sind komplexe Teile kommentiert?
3. **Test-Coverage**: Gibt es Tests für die Komponente?

## Integration in VS Code

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [{
    "label": "Validate with AI",
    "type": "shell",
    "command": "npx tsx validate-with-ai.ts ${file}",
    "group": {
      "kind": "test",
      "isDefault": true
    },
    "presentation": {
      "reveal": "always",
      "panel": "new"
    }
  }]
}
```

Shortcut: `Ctrl+Shift+B` → "Validate with AI"

## Batch-Validierung

```bash
# Validiere alle geänderten Dateien
git diff --name-only main | grep -E '\.(ts|html)$' | xargs -I {} npx tsx validate-with-ai.ts {}

# Validiere alle Komponenten
find src -name "*.component.ts" -exec npx tsx validate-with-ai.ts {} \;
```

## Metriken & Reporting

```typescript
// Generiere Validierungs-Report
async function generateReport(results: ValidationResult[]) {
  const stats = {
    totalFiles: results.length,
    eslintPassed: results.filter(r => r.eslintPassed).length,
    averageAIScore: average(results.map(r => r.aiValidation?.score || 0)),
    commonIssues: findCommonIssues(results),
    improvement: compareWithLastRun(results)
  };
  
  await fs.writeFile('validation-report.html', generateHTML(stats));
}
```

Dieses System würde sicherstellen, dass:
1. Erst die harten Regeln (ESLint) geprüft werden
2. Dann die KI semantische/konzeptionelle Probleme findet
3. Entwickler konkrete Verbesserungsvorschläge bekommen
4. Der Code kontinuierlich besser wird