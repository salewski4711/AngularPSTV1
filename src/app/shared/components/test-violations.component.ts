import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenUtils } from '../../core/design-system/token-utilities';

/**
 * TEST-KOMPONENTE: Diese Komponente demonstriert die korrekte Verwendung
 * von TokenUtils nach der Auto-Fix-Korrektur
 */
@Component({
  selector: 'pst-test-violations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-component">
      <button [style.background-color]="bgColor">Test</button>
    </div>
  `
})
export class TestViolationsComponent {
  // Korrekte Verwendung nach Auto-Fix:
  
  // Farben über TokenUtils
  bgColor = TokenUtils.getColor('primary.500');
  
  // RGB-Farbe muss manuell konvertiert werden  
  textColor = 'rgb(255, 150, 0)';  // TODO: Convert to TokenUtils.getColor()
  
  // Tailwind-Klassen über TokenUtils
  buttonClasses = 'bg-orange-500 text-white p-4 m-2';  // TODO: Use TokenUtils.getComponentClasses()
  
  // Spacing über TokenUtils
  padding = TokenUtils.getSpacing('4');
  margin = TokenUtils.getSpacing('5');
  
  // Weitere Tailwind-Violations
  containerClasses = 'bg-primary text-gray-700 border-red-500';  // TODO: Use TokenUtils classes
  
  // Style-Objekt mit Token-Werten
  styles = {
    padding: TokenUtils.getSpacing('6'),
    margin: TokenUtils.getSpacing('8'),
    color: TokenUtils.getColor('secondary.500'),
    backgroundColor: 'rgb(28, 54, 97)'  // TODO: Convert to TokenUtils.getColor()
  };
}