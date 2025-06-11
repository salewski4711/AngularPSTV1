#!/usr/bin/env node
import { TokenUtils } from './src/app/core/design-system/token-utilities';

console.log('📋 Zeige alle verfügbaren Tokens:\n');
console.log(TokenUtils.listAvailableTokens());

console.log('\n\n🔍 Token-Finder Beispiele:\n');

// Test mit bekannten Farben
const testValues = [
  '#F99600',  // Primary Orange
  '#1C3661',  // Secondary Blue
  '#FF5733',  // Unbekannte Farbe
  '16px',     // Standard spacing
  '23px',     // Nicht-standard spacing
  'rgb(255, 150, 0)'  // RGB
];

testValues.forEach(value => {
  const result = TokenUtils.findClosestToken(value);
  if (result) {
    if (result.exact) {
      console.log(`✅ ${value} → TokenUtils.get*('${result.token}')`);
    } else {
      console.log(`⚠️  ${value} → Empfehlung: TokenUtils.get*('${result.token}') [nicht exakt]`);
    }
  } else {
    console.log(`❌ ${value} → Kein passendes Token gefunden`);
  }
});

console.log('\n\n💡 Tipp: Bei unbekannten Werten immer Token-Request erstellen!');
console.log('📝 Niemals selbst neue Tokens hinzufügen!\n');