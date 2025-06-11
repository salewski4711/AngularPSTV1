#!/usr/bin/env node

/**
 * Test-Script für ESLint Token-Regeln
 * Führt ESLint mit den neuen Token-Regeln aus und zeigt Violations
 */

const { ESLint } = require('eslint');
const path = require('path');

async function testTokenRules() {
  console.log('🔍 Teste ESLint Token-Enforcement Regeln...\n');

  const eslint = new ESLint({
    overrideConfigFile: path.join(__dirname, '..', '.eslintrc.json'),
    extensions: ['.ts', '.html']
  });

  try {
    // Teste spezifische Dateien
    const testFiles = [
      'src/app/shared/components/button/button.component.ts',
      'src/app/shared/components/input/input.component.ts',
      'src/app/shared/components/badge/badge.component.ts'
    ];

    console.log('📁 Prüfe Dateien:');
    testFiles.forEach(f => console.log(`   - ${f}`));
    console.log('');

    const results = await eslint.lintFiles(testFiles);
    
    let totalErrors = 0;
    let totalWarnings = 0;
    const violations = {
      colors: 0,
      spacing: 0,
      tailwind: 0,
      tokenUtils: 0
    };

    // Analysiere Ergebnisse
    results.forEach(result => {
      if (result.errorCount > 0 || result.warningCount > 0) {
        console.log(`\n📄 ${result.filePath}`);
        
        result.messages.forEach(message => {
          const icon = message.severity === 2 ? '❌' : '⚠️';
          console.log(`${icon} Line ${message.line}: ${message.message}`);
          
          // Kategorisiere Violations
          if (message.ruleId === 'design-tokens/no-hardcoded-colors') violations.colors++;
          if (message.ruleId === 'design-tokens/no-hardcoded-spacing') violations.spacing++;
          if (message.ruleId === 'design-tokens/no-tailwind-colors') violations.tailwind++;
          if (message.ruleId === 'design-tokens/use-token-utils') violations.tokenUtils++;
        });
        
        totalErrors += result.errorCount;
        totalWarnings += result.warningCount;
      }
    });

    // Zusammenfassung
    console.log('\n' + '='.repeat(60));
    console.log('📊 ZUSAMMENFASSUNG\n');
    console.log(`Errors:   ${totalErrors}`);
    console.log(`Warnings: ${totalWarnings}`);
    console.log(`\nViolations nach Typ:`);
    console.log(`- Hardcodierte Farben:     ${violations.colors}`);
    console.log(`- Hardcodiertes Spacing:   ${violations.spacing}`);
    console.log(`- Tailwind-Farben:         ${violations.tailwind}`);
    console.log(`- Fehlende TokenUtils:     ${violations.tokenUtils}`);
    
    if (totalErrors > 0) {
      console.log('\n💡 Lösungsvorschläge:');
      console.log('1. Auto-Fix versuchen: npm run lint:fix');
      console.log('2. Manuelle Migration mit TokenUtils');
      console.log('3. Siehe .ai/doing/14-ESLINT-TOKEN-ENFORCEMENT.md für Details');
    } else {
      console.log('\n✅ Keine Token-Violations gefunden!');
    }

  } catch (error) {
    console.error('❌ Fehler beim Ausführen von ESLint:', error);
    process.exit(1);
  }
}

// Script ausführen
testTokenRules();