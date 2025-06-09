import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pst-card-beta',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses">
      <!-- Header -->
      @if (showHeader) {
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <ng-content select="[card-header]"></ng-content>
        </div>
      }
      
      <!-- Body -->
      <div [class]="bodyClasses">
        <ng-content></ng-content>
      </div>
      
      <!-- Footer -->
      @if (showFooter) {
        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
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
  @Input() variant: 'default' | 'bordered' | 'elevated' | 'outlined' | 'flat' = 'default';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() showHeader = false;
  @Input() showFooter = false;
  @Input() showBetaBadge = true; // Beta-Indikator
  @Input() hoverable = false;
  @Input() clickable = false;
  
  get cardClasses(): string {
    const base = 'bg-white dark:bg-black-lighter rounded-lg overflow-hidden transition-all duration-200';
    
    const variants = {
      default: 'shadow-md',
      bordered: 'border-2 border-gray-300 dark:border-gray-600',
      elevated: 'shadow-xl hover:shadow-2xl',
      outlined: 'border border-gray-300 dark:border-gray-600',
      flat: 'shadow-sm bg-gray-50 dark:bg-gray-900'
    };
    
    const interactiveClasses = [];
    if (this.hoverable) {
      interactiveClasses.push('hover:shadow-lg hover:scale-[1.02]');
    }
    if (this.clickable) {
      interactiveClasses.push('cursor-pointer active:scale-[0.98]');
    }
    
    return `${base} ${variants[this.variant]} ${interactiveClasses.join(' ')}`;
  }
  
  get bodyClasses(): string {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };
    
    return paddings[this.padding];
  }
}
