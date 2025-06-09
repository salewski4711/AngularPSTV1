import { Component, Input, Output, EventEmitter, computed, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icons/icon.component';
import { IconName } from '../../icons/icon-definitions';
import { RippleDirective } from '../../directives/ripple.directive';
import { SpinnerComponent } from '../spinner/spinner.component';

export type ButtonVariant = 'primary' | 'secondary' | 'outline-primary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'pst-button',
  standalone: true,
  imports: [CommonModule, IconComponent, RippleDirective, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses()"
      [attr.aria-label]="ariaLabel"
      [attr.aria-busy]="loading"
      [appRipple]="ripple && !disabled && !loading"
      (click)="handleClick($event)"
    >
      <span class="inline-flex items-center justify-center gap-2">
        @if (loading) {
          <pst-spinner [type]="spinnerType" [size]="size"></pst-spinner>
        }
        @if (icon && iconPosition === 'left' && !loading) {
          <pst-icon [name]="icon" [size]="iconSize()"></pst-icon>
        }
        @if (!iconOnly) {
          @if (loading && loadingText) {
            <span>{{ loadingText }}</span>
          } @else if (!loading) {
            <ng-content></ng-content>
          }
        }
        @if (icon && iconPosition === 'right' && !loading && !iconOnly) {
          <pst-icon [name]="icon" [size]="iconSize()"></pst-icon>
        }
      </span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText?: string;
  @Input() spinnerType: 'circle' | 'dots' | 'bars' = 'circle';
  @Input() fullWidth = false;
  @Input() icon?: IconName;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconOnly = false;
  @Input() ariaLabel?: string;
  @Input() ripple = false;
  
  @Output() clicked = new EventEmitter<MouseEvent>();
  
  constructor(public elementRef: ElementRef) {}

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  buttonClasses = computed(() => {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
    
    const sizes = this.iconOnly 
      ? {
          xs: 'p-1 rounded',
          sm: 'p-1.5 rounded',
          md: 'p-2 rounded-md',
          lg: 'p-2.5 rounded-md',
          xl: 'p-3 rounded-lg'
        }
      : {
          xs: 'text-xs px-2.5 py-1.5 rounded',
          sm: 'text-sm px-3 py-2 rounded-md',
          md: 'text-base px-4 py-2.5 rounded-md',
          lg: 'text-lg px-5 py-3 rounded-lg',
          xl: 'text-xl px-6 py-3.5 rounded-lg'
        };
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary',
      secondary: 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700 focus:ring-secondary',
      'outline-primary': 'bg-transparent border border-primary text-primary hover:bg-primary-50 dark:hover:bg-primary/10 active:bg-primary-100 dark:active:bg-primary/20 focus:ring-primary',
      tertiary: 'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 focus:ring-gray-500',
      ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500'
    };
    
    const width = this.fullWidth ? 'w-full' : '';
    
    return `${base} ${sizes[this.size]} ${variants[this.variant]} ${width}`;
  });

  spinnerSize = computed(() => {
    const sizes = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-7 w-7'
    };
    return sizes[this.size];
  });

  iconSize = computed(() => {
    const sizes = {
      xs: 14,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 28
    };
    return sizes[this.size];
  });
}