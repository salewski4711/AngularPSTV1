import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SpinnerType = 'circle' | 'dots' | 'bars';

@Component({
  selector: 'pst-spinner',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (type) {
      @case ('dots') {
        <span class="inline-flex gap-1">
          <span class="animate-bounce" [style.animation-delay.ms]="0">●</span>
          <span class="animate-bounce" [style.animation-delay.ms]="150">●</span>
          <span class="animate-bounce" [style.animation-delay.ms]="300">●</span>
        </span>
      }
      @case ('bars') {
        <span class="inline-flex gap-0.5">
          <span class="animate-pulse bg-current" [class]="barSize" [style.animation-delay.ms]="0"></span>
          <span class="animate-pulse bg-current" [class]="barSize" [style.animation-delay.ms]="150"></span>
          <span class="animate-pulse bg-current" [class]="barSize" [style.animation-delay.ms]="300"></span>
        </span>
      }
      @default {
        <svg class="animate-spin" [class]="spinnerSize" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  get spinnerSize(): string {
    const sizes = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-7 w-7'
    };
    return sizes[this.size];
  }
  
  get barSize(): string {
    const sizes = {
      xs: 'w-0.5 h-2',
      sm: 'w-0.5 h-3',
      md: 'w-1 h-4',
      lg: 'w-1 h-5',
      xl: 'w-1.5 h-6'
    };
    return sizes[this.size] + ' rounded-full';
  }
}
