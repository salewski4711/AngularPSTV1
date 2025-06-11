import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenUtils } from '../../core/design-system/token-utilities';

@Component({
  selector: 'pst-test-ai',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <!-- Problem: Hardcodierte Klasse trotz TokenUtils -->
      <button class="btn-primary">
        Kaufen
      </button>
      
      <!-- Problem: Success-Farbe für normalen Button -->
      <button [class]="successButtonClass">
        Normaler Button
      </button>
      
      <!-- Problem: Error-Farbe für normalen Text -->
      <p [class]="errorTextClass">
        Dies ist ein normaler Text
      </p>
      
      <!-- Gut: Korrekte Verwendung -->
      <div [class]="cardClasses">
        <h2 [class]="headingClass">Überschrift</h2>
      </div>
    </div>
  `
})
export class TestAiValidationComponent {
  // Fragwürdig: Success für normalen Button
  successButtonClass = TokenUtils.getColorClass('bg', 'success.500');
  
  // Fragwürdig: Error für normalen Text  
  errorTextClass = TokenUtils.getColorClass('text', 'error.500');
  
  // Gut: Korrekte Token-Verwendung
  cardClasses = TokenUtils.getComponentClasses('card', { variant: 'outlined' });
  headingClass = TokenUtils.getColorClass('text', 'neutral.900');
  
  // Gut: Primary für Button
  primaryButtonClass = TokenUtils.getComponentClasses('button', { 
    variant: 'primary',
    size: 'md' 
  });
}