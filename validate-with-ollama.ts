#!/usr/bin/env node
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

// Ollama KI-Integration
async function askOllama(prompt: string): Promise<any> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'codellama', // oder 'llama2', 'mistral'
        prompt: prompt,
        format: 'json',
        stream: false,
        options: {
          temperature: 0.2, // Niedrig für konsistente Antworten
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return JSON.parse(data.response);
  } catch (error) {
    console.warn('⚠️  Ollama nicht verfügbar, nutze Mock-Analyse');
    return null;
  }
}

// KI-Prompt für Code-Analyse
function createAnalysisPrompt(content: string, filePath: string): string {
  return `
Analysiere diese Angular-Komponente und prüfe die Qualität der Token-Verwendung.

Datei: ${path.basename(filePath)}

Code:
\`\`\`typescript
${content}
\`\`\`

Prüfe speziell:
1. Werden TokenUtils.getColor() mit semantisch sinnvollen Tokens verwendet?
   - primary.500 für Hauptaktionen
   - success.500 NUR für Erfolgsmeldungen
   - error.500 NUR für Fehlermeldungen
   - neutral.* für normale Texte

2. Sind die Component-Klassen korrekt?
   - Keine hardcodierten Klassen im Template
   - TokenUtils.getComponentClasses() für komplexe Komponenten

3. Accessibility:
   - Buttons brauchen aria-label oder aussagekräftigen Text
   - Interaktive Elemente müssen fokussierbar sein

4. Best Practices:
   - Konsistente Token-Verwendung
   - Keine Mischung von Inline-Styles und Klassen

Antworte NUR mit diesem JSON-Format:
{
  "score": <0-100>,
  "issues": [
    "<Problem-Beschreibung>"
  ],
  "suggestions": [
    "<Verbesserungsvorschlag>"
  ],
  "tokenUsage": {
    "correct": ["<Korrekte Verwendung>"],
    "questionable": ["<Fragwürdige Verwendung>"]
  }
}
`;
}

// Erweiterte KI-Validierung
async function validateWithAI(content: string, filePath: string) {
  const prompt = createAnalysisPrompt(content, filePath);
  
  // Versuche echte KI-Analyse
  const aiResponse = await askOllama(prompt);
  
  if (aiResponse) {
    return aiResponse;
  }
  
  // Fallback zu regelbasierter Analyse
  return performRuleBasedAnalysis(content, filePath);
}

// Regelbasierte Analyse als Fallback
function performRuleBasedAnalysis(content: string, filePath: string) {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const correctUsages: string[] = [];
  const questionableUsages: string[] = [];
  
  // Extrahiere alle TokenUtils-Verwendungen
  const tokenPattern = /TokenUtils\.(get\w+)\((?:'([^']+)'|"([^"]+)")\)/g;
  let match;
  
  while ((match = tokenPattern.exec(content)) !== null) {
    const method = match[1];
    const token = match[2] || match[3];
    const usage = `${method}('${token}')`;
    
    // Analysiere Kontext
    const lineStart = content.lastIndexOf('\n', match.index) + 1;
    const lineEnd = content.indexOf('\n', match.index);
    const line = content.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
    
    // Prüfe semantische Korrektheit
    if (token.includes('success') && !line.toLowerCase().includes('success') && 
        !line.toLowerCase().includes('save') && !line.toLowerCase().includes('complete')) {
      questionableUsages.push(usage);
      issues.push(`Success-Token '${token}' in unpassendem Kontext verwendet`);
    } else if (token.includes('error') && !line.toLowerCase().includes('error') && 
               !line.toLowerCase().includes('danger') && !line.toLowerCase().includes('alert')) {
      questionableUsages.push(usage);
      issues.push(`Error-Token '${token}' in unpassendem Kontext verwendet`);
    } else if (token.includes('warning') && !line.toLowerCase().includes('warn') && 
               !line.toLowerCase().includes('caution')) {
      questionableUsages.push(usage);
      issues.push(`Warning-Token '${token}' in unpassendem Kontext verwendet`);
    } else {
      correctUsages.push(usage);
    }
  }
  
  // Template-Analyse
  const templateMatch = content.match(/template:\s*`([^`]+)`/s);
  if (templateMatch) {
    const template = templateMatch[1];
    
    // Hardcodierte Klassen
    if (template.includes('class="') && !template.includes('[class]')) {
      issues.push('Hardcodierte CSS-Klassen im Template gefunden');
      suggestions.push('Nutze [class] Binding mit TokenUtils statt hardcodierter Klassen');
    }
    
    // Accessibility
    const buttonMatches = template.match(/<button[^>]*>/g) || [];
    buttonMatches.forEach(button => {
      if (!button.includes('aria-') && !button.includes('title=')) {
        issues.push('Button ohne Accessibility-Attribute gefunden');
        suggestions.push('Füge aria-label oder title Attribut zum Button hinzu');
      }
    });
    
    // Form-Elemente
    const inputMatches = template.match(/<input[^>]*>/g) || [];
    inputMatches.forEach(input => {
      if (!input.includes('id=') && !input.includes('aria-')) {
        issues.push('Input ohne Label-Verknüpfung gefunden');
        suggestions.push('Füge id und zugehöriges <label> oder aria-label hinzu');
      }
    });
  }
  
  // Best Practice Checks
  if (content.includes('TokenUtils') && content.includes('style=')) {
    issues.push('Mischung von TokenUtils und Inline-Styles gefunden');
    suggestions.push('Verwende konsistent entweder Klassen oder Style-Bindings');
  }
  
  // Score-Berechnung
  const score = Math.max(0, 100 - (issues.length * 15) - (questionableUsages.length * 10));
  
  return {
    score,
    issues,
    suggestions,
    tokenUsage: {
      correct: correctUsages,
      questionable: questionableUsages
    }
  };
}

// ESLint Check (gleich wie vorher)
async function runESLint(filePath: string): Promise<{ passed: boolean; errors: string[] }> {
  try {
    const { stdout } = await execAsync(`npx eslint "${filePath}" --format json`);
    const results = JSON.parse(stdout);
    const fileResult = results[0];
    
    if (fileResult.errorCount === 0) {
      return { passed: true, errors: [] };
    }
    
    const errors = fileResult.messages
      .filter(msg => msg.severity === 2)
      .map(msg => `Line ${msg.line}: ${msg.message}`);
    
    return { passed: false, errors };
  } catch (error) {
    const output = error.stdout || error.message;
    try {
      const results = JSON.parse(output);
      const fileResult = results[0];
      const errors = fileResult.messages
        .filter(msg => msg.severity === 2)
        .map(msg => `Line ${msg.line}: ${msg.message}`);
      return { passed: false, errors };
    } catch {
      return { passed: false, errors: ['ESLint check failed'] };
    }
  }
}

// Main validation
async function validateFile(filePath: string) {
  console.log(`\n🔍 Validating: ${filePath}`);
  
  // 1. ESLint Check
  const eslintResult = await runESLint(filePath);
  
  if (!eslintResult.passed) {
    console.log('❌ ESLint Check fehlgeschlagen');
    return { 
      file: filePath, 
      eslintPassed: false,
      eslintErrors: eslintResult.errors
    };
  }
  
  console.log('✅ ESLint Check bestanden');
  
  // 2. KI-Validierung
  const content = await fs.readFile(filePath, 'utf-8');
  console.log('🤖 Starte KI-Validierung...');
  const aiValidation = await validateWithAI(content, filePath);
  
  return {
    file: filePath,
    eslintPassed: true,
    aiValidation
  };
}

// Formatierung
function formatResults(result: any): string {
  let output = `\n${'='.repeat(60)}\n`;
  output += `📄 ${result.file}\n`;
  output += `${'='.repeat(60)}\n`;
  
  if (!result.eslintPassed) {
    output += `\n❌ ESLint Fehler:\n`;
    result.eslintErrors?.forEach(error => {
      output += `   - ${error}\n`;
    });
    output += `\n⚠️  KI-Validierung übersprungen (erst ESLint-Fehler beheben)\n`;
    return output;
  }
  
  output += `\n✅ ESLint: Bestanden\n`;
  
  if (result.aiValidation) {
    output += `\n🤖 KI-Validierung:\n`;
    output += `   Score: ${result.aiValidation.score}/100\n`;
    
    if (result.aiValidation.tokenUsage?.correct?.length > 0) {
      output += `\n   ✅ Korrekte Token-Verwendung:\n`;
      result.aiValidation.tokenUsage.correct.forEach(usage => {
        output += `      - TokenUtils.${usage}\n`;
      });
    }
    
    if (result.aiValidation.tokenUsage?.questionable?.length > 0) {
      output += `\n   ⚠️  Fragwürdige Token-Verwendung:\n`;
      result.aiValidation.tokenUsage.questionable.forEach(usage => {
        output += `      - TokenUtils.${usage}\n`;
      });
    }
    
    if (result.aiValidation.issues?.length > 0) {
      output += `\n   ❌ Probleme:\n`;
      result.aiValidation.issues.forEach(issue => {
        output += `      - ${issue}\n`;
      });
    }
    
    if (result.aiValidation.suggestions?.length > 0) {
      output += `\n   💡 Verbesserungsvorschläge:\n`;
      result.aiValidation.suggestions.forEach(suggestion => {
        output += `      - ${suggestion}\n`;
      });
    }
  }
  
  return output;
}

// Main
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: npx tsx validate-with-ollama.ts <file-path>');
    console.log('\nStelle sicher, dass Ollama läuft:');
    console.log('  curl -fsSL https://ollama.com/install.sh | sh');
    console.log('  ollama pull codellama');
    console.log('  ollama serve');
    process.exit(1);
  }
  
  const filePath = path.resolve(args[0]);
  
  try {
    const result = await validateFile(filePath);
    console.log(formatResults(result));
    
    await fs.writeFile(
      'validation-result.json',
      JSON.stringify(result, null, 2)
    );
    
    if (!result.eslintPassed || (result.aiValidation && result.aiValidation.score < 70)) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Fehler:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}