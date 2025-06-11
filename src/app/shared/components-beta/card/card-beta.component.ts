import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cardClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-card-beta',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses()">
      <!-- Header -->
      @if (showHeader) {
        <div [class]="headerClasses">
          <ng-content select="[card-header]"></ng-content>
        </div>
      }
      
      <!-- Body -->
      <div [class]="bodyClasses()">
        <ng-content></ng-content>
      </div>
      
      <!-- Footer -->
      @if (showFooter) {
        <div [class]="footerClasses">
          <ng-content select="[card-footer]"></ng-content>
        </div>
      }
    </div>
    
    <!-- Beta Badge -->
    @if (showBetaBadge) {
      <div class="mt-2 text-xs text-orange-600 dark:text-orange-400 text-center">
        🚧 Beta Component v0.8
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardBetaComponent {
  @Input() variant: 'default' | 'elevated' | 'flat' | 'outlined' = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() showHeader = false;
  @Input() showFooter = false;
  @Input() showBetaBadge = true; // Beta-Indikator
  @Input() hoverable = false;
  @Input() clickable = false;
  
  // Using static classes from molecules.classes.static.ts
  readonly headerClasses = cardClasses.header.base;
  readonly footerClasses = cardClasses.footer;
  
  cardClasses = computed(() => {
    const classes: string[] = [cardClasses.base];
    
    // Add variant classes
    if (this.variant !== 'default') {
      classes.push(cardClasses.variants[this.variant]);
    }
    
    // Add interactive classes
    if (this.hoverable) {
      classes.push('hover:shadow-lg hover:scale-[1.02]');
    }
    if (this.clickable) {
      classes.push('cursor-pointer active:scale-[0.98]');
    }
    
    return classes.join(' ');
  });
  
  bodyClasses = computed(() => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: cardClasses.body,
      lg: 'p-8'
    };
    
    return paddings[this.padding];
  });
}
