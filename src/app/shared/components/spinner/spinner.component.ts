import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { spinnerClasses } from '../../../core/design-system/component-classes';

export type SpinnerType = 'circle' | 'dots' | 'bars';
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'pst-spinner',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (type) {
      @case ('dots') {
        <span class="inline-flex" [class.gap-1]="size === 'xs' || size === 'sm'" [class.gap-1.5]="size === 'md' || size === 'lg' || size === 'xl'">
          <span class="animate-bounce" [style.animation-delay.ms]="0">●</span>
          <span class="animate-bounce" [style.animation-delay.ms]="150">●</span>
          <span class="animate-bounce" [style.animation-delay.ms]="300">●</span>
        </span>
      }
      @case ('bars') {
        <span class="inline-flex" [style.gap.rem]="size === 'xs' || size === 'sm' ? 0.125 : 0.25">
          <span class="animate-pulse bg-current" [class]="barSize()" [style.animation-delay.ms]="0"></span>
          <span class="animate-pulse bg-current" [class]="barSize()" [style.animation-delay.ms]="150"></span>
          <span class="animate-pulse bg-current" [class]="barSize()" [style.animation-delay.ms]="300"></span>
        </span>
      }
      @default {
        <svg class="animate-spin" [class]="spinnerSize()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      }
    }
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
    }
    
    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `]
})
export class SpinnerComponent {
  @Input() type: SpinnerType = 'circle';
  @Input() size: SpinnerSize = 'md';
  
  spinnerSize = computed(() => {
    return spinnerClasses.sizes[this.size];
  });
  
  barSize = computed(() => {
    return spinnerClasses.barSizes[this.size];
  });
}