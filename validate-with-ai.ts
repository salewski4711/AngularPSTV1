#!/usr/bin/env node
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import * as path from 'path';

const execAsync = promisify(exec);

interface ValidationResult {
  file: string;
  eslintPassed: boolean;
  eslintErrors?: string[];
  aiValidation?: {
    score: number;
    issues: string[];
    suggestions: string[];
    tokenUsage: {
      correct: string[];
      questionable: string[];
    };
  };
}

// ESLint Check
async function runESLint(filePath: string): Promise<{ passed: boolean; errors: string[] }> {
  try {
    const { stdout, stderr } = await execAsync(`npx eslint "${filePath}" --format json`);
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
    // ESLint returns non-zero exit code when there are errors
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

// KI-Validierung (Mock-Implementation)
async function validateWithAI(content: string, filePath: string) {
  // Analysiere Token-Usage
  const tokenUsagePattern = /TokenUtils\.(get\w+)\(['"]([\w.]+)['"]\)/g;
  const tokenUsages: string[] = [];
  let match;
  
  while ((match = tokenUsagePattern.exec(content)) !== null) {
    tokenUsages.push(`${match[1]}('${match[2]}')`);
  }
  
  // Simuliere KI-Analyse
  const analysis = analyzeComponentQuality(content, filePath, tokenUsages);
  
  return analysis;
}

function analyzeComponentQuality(content: string, filePath: string, tokenUsages: string[]) {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const correctUsages: string[] = [];
  const questionableUsages: string[] = [];
  
  // Prüfe Token-Usage
  tokenUsages.forEach(usage => {
    // Button mit success color?
    if (usage.includes("getColor('success") && content.includes('button')) {
      questionableUsages.push(usage);
      issues.push("Success-Farbe für Standard-Button ist untypisch");
      suggestions.push("Verwende 'primary.500' für Standard-Buttons");
    }
    // Error color für normale Texte?
    else if (usage.includes("getColor('error") && !content.includes('error') && !content.includes('alert')) {
      questionableUsages.push(usage);
      issues.push("Error-Farbe sollte nur für Fehlermeldungen verwendet werden");
    }
    else {
      correctUsages.push(usage);
    }
  });
  
  // Prüfe Component Structure
  if (content.includes('class=') && content.includes('TokenUtils')) {
    issues.push("Hardcodierte Klassen im Template trotz TokenUtils-Import");
    suggestions.push("Nutze [class] oder [ngClass] Binding mit TokenUtils");
  }
  
  // Prüfe Accessibility
  if (content.includes('<button') && !content.includes('aria-')) {
    issues.push("Fehlende Accessibility-Attribute für Button");
    suggestions.push("Füge aria-label oder aria-describedby hinzu");
  }
  
  // Prüfe Best Practices
  if (content.includes('TokenUtils.getColor') && content.includes(':hover')) {
    suggestions.push("Definiere Hover-States über TokenUtils.getComponentClasses()");
  }
  
  // Calculate Score
  const score = Math.max(0, 100 - (issues.length * 10) - (questionableUsages.length * 5));
  
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

// Haupt-Validierungsfunktion
async function validateFile(filePath: string): Promise<ValidationResult> {
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
  
  // 2. Lese Dateiinhalt für KI-Validierung
  const content = await fs.readFile(filePath, 'utf-8');
  
  // 3. KI-Validierung
  console.log('🤖 Starte KI-Validierung...');
  const aiValidation = await validateWithAI(content, filePath);
  
  return {
    file: filePath,
    eslintPassed: true,
    aiValidation
  };
}

// Formatiere Ergebnisse
function formatResults(result: ValidationResult): string {
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
    
    if (result.aiValidation.tokenUsage.correct.length > 0) {
      output += `\n   ✅ Korrekte Token-Verwendung:\n`;
      result.aiValidation.tokenUsage.correct.forEach(usage => {
        output += `      - TokenUtils.${usage}\n`;
      });
    }
    
    if (result.aiValidation.tokenUsage.questionable.length > 0) {
      output += `\n   ⚠️  Fragwürdige Token-Verwendung:\n`;
      result.aiValidation.tokenUsage.questionable.forEach(usage => {
        output += `      - TokenUtils.${usage}\n`;
      });
    }
    
    if (result.aiValidation.issues.length > 0) {
      output += `\n   ❌ Probleme:\n`;
      result.aiValidation.issues.forEach(issue => {
        output += `      - ${issue}\n`;
      });
    }
    
    if (result.aiValidation.suggestions.length > 0) {
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
    console.log('Usage: npx tsx validate-with-ai.ts <file-path>');
    process.exit(1);
  }
  
  const filePath = path.resolve(args[0]);
  
  try {
    const result = await validateFile(filePath);
    console.log(formatResults(result));
    
    // Speichere Ergebnis
    await fs.writeFile(
      'validation-result.json',
      JSON.stringify(result, null, 2)
    );
    
    // Exit code basierend auf Score
    if (!result.eslintPassed) {
      process.exit(1);
    }
    if (result.aiValidation && result.aiValidation.score < 70) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Fehler:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}