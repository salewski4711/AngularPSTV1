import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { badgeClasses as badgeClassDefs } from '../../../core/design-system/component-classes';

export type BadgeVariant = 'filled' | 'outline' | 'subtle';
export type BadgeColor = 'gray' | 'primary' | 'success' | 'error' | 'warning' | 'info';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill' | 'square';
export type BadgePosition = 'static' | 'absolute';

@Component({
  selector: 'pst-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="badgeClasses()" 
      [class.absolute]="position === 'absolute'" 
      [style.top.px]="topPosition"
      [style.right.px]="rightPosition"
      [style.left.px]="leftPosition"
    >
      @if (!dot) {
        <!-- Leading Icon -->
        <i 
          *ngIf="leadingIcon" 
          [class]="iconClasses()"
          aria-hidden="true"
        ></i>
        
        <!-- Badge Content -->
        <ng-content></ng-content>
        
        <!-- Trailing Icon -->
        <i 
          *ngIf="trailingIcon" 
          [class]="iconClasses()"
          aria-hidden="true"
        ></i>
        
        <!-- Remove Button -->
        <button
          *ngIf="removable"
          type="button"
          [class]="removeButtonClasses()"
          (click)="onRemove()"
          aria-label="Remove"
        >
          <svg [class]="removeIconClasses()" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      }
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'filled';
  @Input() color: BadgeColor = 'gray';
  @Input() size: BadgeSize = 'sm';
  @Input() shape: BadgeShape = 'rounded';
  @Input() position: BadgePosition = 'static';
  @Input() leadingIcon?: string;
  @Input() trailingIcon?: string;
  @Input() removable = false;
  @Input() maxCount = 99;
  @Input() showZero = false;
  @Input() dot = false;
  @Input() topPosition?: number;
  @Input() rightPosition?: number;
  @Input() leftPosition?: number;
  @Output() remove = new EventEmitter<void>();
  
  badgeClasses = computed(() => {
    const classes = [badgeClassDefs.base];
    
    if (this.dot) {
      classes.push(badgeClassDefs.dot);
    } else {
      // Size
      classes.push(badgeClassDefs.sizes[this.size]);
      
      // Variant and color combination
      const variantColorKey = `${this.variant}-${this.color}` as keyof typeof badgeClassDefs.variants;
      if (badgeClassDefs.variants[variantColorKey]) {
        classes.push(badgeClassDefs.variants[variantColorKey]);
      }
      
      // Shape
      classes.push(badgeClassDefs.shapes[this.shape]);
    }
    
    return classes.join(' ');
  });
  
  iconClasses = computed(() => {
    const classes: string[] = [badgeClassDefs.iconSizes[this.size]];
    
    if (this.leadingIcon && !this.trailingIcon) {
      classes.push('-ml-0.5 mr-1.5');
    } else if (this.trailingIcon && !this.leadingIcon) {
      classes.push('ml-1.5 -mr-0.5');
    }
    
    return classes.join(' ');
  });
  
  removeButtonClasses = computed(() => {
    const classes = [
      'ml-0.5 -mr-0.5',
      'inline-flex items-center justify-center',
      'hover:opacity-80 focus:outline-none',
      badgeClassDefs.iconSizes[this.size]
    ];
    
    // Special color handling for primary filled variant
    if (this.variant === 'filled' && this.color === 'primary') {
      classes.push('text-primary-200 hover:text-white');
    } else {
      classes.push('text-current');
    }
    
    return classes.join(' ');
  });
  
  removeIconClasses = computed(() => {
    return badgeClassDefs.removeIconSizes[this.size];
  });
  
  onRemove(): void {
    this.remove.emit();
  }
}