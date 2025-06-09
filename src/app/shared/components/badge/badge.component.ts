import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/tailwind.utils';

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
    <span [class]="badgeClasses()" [style.top.px]="topPosition" [style.right.px]="rightPosition" [style.left.px]="leftPosition">
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
  
  private sizeConfig = {
    xs: { base: 'h-5 px-1.5 py-0.5 text-xs', icon: 'w-3.5 h-3.5', removeIcon: 'w-3 h-3' },
    sm: { base: 'h-6 px-2 py-1 text-xs', icon: 'w-3.5 h-3.5', removeIcon: 'w-3 h-3' },
    md: { base: 'h-7 px-2.5 py-1 text-sm', icon: 'w-4 h-4', removeIcon: 'w-3.5 h-3.5' },
    lg: { base: 'h-8 px-3 py-1.5 text-base', icon: 'w-5 h-5', removeIcon: 'w-4 h-4' }
  };
  
  private colorConfig = {
    filled: {
      gray: 'bg-gray-100 text-gray-700',
      primary: 'bg-primary text-white',
      success: 'bg-green-100 text-green-700',
      error: 'bg-red-100 text-red-700',
      warning: 'bg-amber-100 text-amber-700',
      info: 'bg-blue-100 text-blue-700'
    },
    outline: {
      gray: 'bg-transparent text-gray-700 border border-gray-400',
      primary: 'bg-transparent text-primary border border-primary',
      success: 'bg-transparent text-green-600 border border-green-600',
      error: 'bg-transparent text-red-600 border border-red-600',
      warning: 'bg-transparent text-amber-600 border border-amber-600',
      info: 'bg-transparent text-blue-600 border border-blue-600'
    },
    subtle: {
      gray: 'bg-gray-700/10 text-gray-700',
      primary: 'bg-primary/10 text-primary',
      success: 'bg-green-600/10 text-green-600',
      error: 'bg-red-600/10 text-red-600',
      warning: 'bg-amber-600/10 text-amber-600',
      info: 'bg-blue-600/10 text-blue-600'
    }
  };
  
  private shapeConfig = {
    rounded: 'rounded-md',
    pill: 'rounded-full',
    square: 'rounded-none'
  };
  
  badgeClasses = computed(() => {
    const base = 'inline-flex items-center font-medium uppercase tracking-wider';
    const sizeClass = this.dot ? 'w-2 h-2 p-0' : this.sizeConfig[this.size].base;
    const colorClass = this.colorConfig[this.variant][this.color];
    const shapeClass = this.shapeConfig[this.shape];
    const positionClass = this.position === 'absolute' ? 'absolute' : '';
    
    return cn(base, sizeClass, colorClass, shapeClass, positionClass);
  });
  
  iconClasses = computed(() => {
    const sizeClass = this.sizeConfig[this.size].icon;
    const marginClass = this.leadingIcon ? 'mr-1.5' : 'ml-1.5';
    
    return cn(sizeClass, marginClass);
  });
  
  removeButtonClasses = computed(() => {
    const base = 'ml-1.5 inline-flex items-center justify-center hover:opacity-80';
    const sizeClass = this.sizeConfig[this.size].icon;
    
    const colorClass = this.variant === 'filled' && this.color === 'primary'
      ? 'text-primary-200 hover:text-white'
      : 'text-current';
    
    return cn(base, sizeClass, colorClass);
  });
  
  removeIconClasses = computed(() => {
    return this.sizeConfig[this.size].removeIcon;
  });
  
  onRemove(): void {
    this.remove.emit();
  }
}