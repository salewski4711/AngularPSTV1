import { Component, Input, Output, EventEmitter, computed, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icons/icon.component';
import { IconName } from '../../icons/icon-definitions';
import { RippleDirective } from '../../directives/ripple.directive';
import { SpinnerComponent } from '../spinner/spinner.component';
import { buttonClasses as buttonClassDefs } from '../../../core/design-system/component-classes';

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
  @Input() loadingText?: string; // Text während Loading-State
  @Input() spinnerType: 'circle' | 'dots' | 'bars' = 'circle'; // Spinner-Typ
  @Input() fullWidth = false;
  @Input() icon?: IconName;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconOnly = false;
  @Input() ariaLabel?: string;
  @Input() ripple = false; // Ripple-Effekt standardmäßig deaktiviert
  
  @Output() clicked = new EventEmitter<MouseEvent>();
  
  constructor(public elementRef: ElementRef) {}

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  buttonClasses = computed(() => {
    const classes = [buttonClassDefs.base];
    
    // Variant
    if (buttonClassDefs.variants[this.variant]) {
      classes.push(buttonClassDefs.variants[this.variant]);
    }
    
    // Size
    if (buttonClassDefs.sizes[this.size]) {
      classes.push(buttonClassDefs.sizes[this.size]);
    }
    
    // Full width
    if (this.fullWidth) {
      classes.push('w-full');
    }
    
    // Icon only adjustments
    if (this.iconOnly) {
      classes.push('!p-0');
      // Adjust padding based on size for icon-only buttons
      const iconPadding: Record<ButtonSize, string> = {
        xs: 'p-1',
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-2.5',
        xl: 'p-3'
      };
      classes.push(iconPadding[this.size]);
    }
    
    // Disabled state
    if (this.disabled || this.loading) {
      classes.push('disabled:opacity-50 disabled:cursor-not-allowed');
    }
    
    return classes.join(' ');
  });

  spinnerSize = computed(() => {
    // Nutze Token-basierte Größen für Spinner
    const sizeMap: Record<ButtonSize, string> = {
      xs: `h-3 w-3`,
      sm: `h-4 w-4`,
      md: `h-5 w-5`,
      lg: `h-6 w-6`,
      xl: `h-7 w-7`
    };
    return sizeMap[this.size];
  });

  iconSize = computed(() => {
    // Icon-Größen aus Token-System
    const iconSizeMap: Record<ButtonSize, number> = {
      xs: 14,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 28
    };
    return iconSizeMap[this.size];
  });
}