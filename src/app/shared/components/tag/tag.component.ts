import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/tailwind.utils';
import { IconComponent } from '../../icons/icon.component';

export type TagVariant = 'filled' | 'outline' | 'subtle';
export type TagColor = 'gray' | 'primary' | 'success' | 'error' | 'warning' | 'info';
export type TagSize = 'xs' | 'sm' | 'md' | 'lg';
export type TagShape = 'rounded' | 'pill' | 'square';

@Component({
  selector: 'pst-tag',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <span [class]="tagClasses()">
      <!-- Leading Icon -->
      @if (leadingIcon) {
        <pst-icon 
          [name]="leadingIcon" 
          [size]="iconSize()"
          [cssClasses]="iconClasses()"
        />
      }
      
      <!-- Tag Content -->
      <span class="tag-content">
        <ng-content></ng-content>
      </span>
      
      <!-- Trailing Icon -->
      @if (trailingIcon) {
        <pst-icon 
          [name]="trailingIcon" 
          [size]="iconSize()"
          [cssClasses]="iconClasses('trailing')"
        />
      }
      
      <!-- Remove Button -->
      @if (removable) {
        <button
          type="button"
          [class]="removeButtonClasses()"
          (click)="onRemove($event)"
          [attr.aria-label]="removeAriaLabel"
        >
          <svg [class]="removeIconClasses()" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      }
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    
    .tag-content {
      display: inline-flex;
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {
  @Input() variant: TagVariant = 'filled';
  @Input() color: TagColor = 'gray';
  @Input() size: TagSize = 'sm';
  @Input() shape: TagShape = 'rounded';
  @Input() leadingIcon?: string;
  @Input() trailingIcon?: string;
  @Input() removable = false;
  @Input() removeAriaLabel = 'Remove tag';
  @Input() disabled = false;
  @Output() remove = new EventEmitter<void>();
  
  private sizeConfig = {
    xs: { 
      base: 'h-5 px-1.5 py-0.5 text-xs', 
      icon: 14,
      removeIcon: 'w-3 h-3',
      removeButton: 'w-4 h-4'
    },
    sm: { 
      base: 'h-6 px-2 py-1 text-xs', 
      icon: 14,
      removeIcon: 'w-3 h-3',
      removeButton: 'w-4 h-4'
    },
    md: { 
      base: 'h-7 px-2.5 py-1 text-sm', 
      icon: 16,
      removeIcon: 'w-3.5 h-3.5',
      removeButton: 'w-4 h-4'
    },
    lg: { 
      base: 'h-8 px-3 py-1.5 text-base', 
      icon: 20,
      removeIcon: 'w-4 h-4',
      removeButton: 'w-5 h-5'
    }
  };
  
  private colorConfig = {
    filled: {
      gray: {
        base: 'bg-gray-100 text-gray-700',
        hover: 'hover:bg-gray-200',
        removeButton: 'text-gray-400 hover:text-gray-500'
      },
      primary: {
        base: 'bg-primary text-white',
        hover: 'hover:bg-primary/90',
        removeButton: 'text-orange-200 hover:text-white'
      },
      success: {
        base: 'bg-green-100 text-green-700',
        hover: 'hover:bg-green-200',
        removeButton: 'text-green-400 hover:text-green-500'
      },
      error: {
        base: 'bg-red-100 text-red-700',
        hover: 'hover:bg-red-200',
        removeButton: 'text-red-400 hover:text-red-500'
      },
      warning: {
        base: 'bg-amber-100 text-amber-700',
        hover: 'hover:bg-amber-200',
        removeButton: 'text-amber-400 hover:text-amber-500'
      },
      info: {
        base: 'bg-blue-100 text-blue-700',
        hover: 'hover:bg-blue-200',
        removeButton: 'text-blue-400 hover:text-blue-500'
      }
    },
    outline: {
      gray: {
        base: 'bg-transparent text-gray-700 border border-gray-400',
        hover: 'hover:bg-gray-50',
        removeButton: 'text-gray-700'
      },
      primary: {
        base: 'bg-transparent text-primary border border-primary',
        hover: 'hover:bg-primary/5',
        removeButton: 'text-primary'
      },
      success: {
        base: 'bg-transparent text-green-600 border border-green-600',
        hover: 'hover:bg-green-50',
        removeButton: 'text-green-600'
      },
      error: {
        base: 'bg-transparent text-red-600 border border-red-600',
        hover: 'hover:bg-red-50',
        removeButton: 'text-red-600'
      },
      warning: {
        base: 'bg-transparent text-amber-600 border border-amber-600',
        hover: 'hover:bg-amber-50',
        removeButton: 'text-amber-600'
      },
      info: {
        base: 'bg-transparent text-blue-600 border border-blue-600',
        hover: 'hover:bg-blue-50',
        removeButton: 'text-blue-600'
      }
    },
    subtle: {
      gray: {
        base: 'bg-gray-700/10 text-gray-700',
        hover: 'hover:bg-gray-700/20',
        removeButton: 'text-gray-700'
      },
      primary: {
        base: 'bg-primary/10 text-primary',
        hover: 'hover:bg-primary/20',
        removeButton: 'text-primary'
      },
      success: {
        base: 'bg-green-600/10 text-green-600',
        hover: 'hover:bg-green-600/20',
        removeButton: 'text-green-600'
      },
      error: {
        base: 'bg-red-600/10 text-red-600',
        hover: 'hover:bg-red-600/20',
        removeButton: 'text-red-600'
      },
      warning: {
        base: 'bg-amber-600/10 text-amber-600',
        hover: 'hover:bg-amber-600/20',
        removeButton: 'text-amber-600'
      },
      info: {
        base: 'bg-blue-600/10 text-blue-600',
        hover: 'hover:bg-blue-600/20',
        removeButton: 'text-blue-600'
      }
    }
  };
  
  private shapeConfig = {
    rounded: 'rounded-md',
    pill: 'rounded-full',
    square: 'rounded-none'
  };
  
  tagClasses = computed(() => {
    const base = 'inline-flex items-center font-medium uppercase tracking-wider transition-colors';
    const sizeClass = this.sizeConfig[this.size].base;
    const colorClass = this.colorConfig[this.variant][this.color].base;
    const hoverClass = this.colorConfig[this.variant][this.color].hover;
    const shapeClass = this.shapeConfig[this.shape];
    const disabledClass = this.disabled ? 'opacity-50 cursor-not-allowed' : '';
    
    return cn(base, sizeClass, colorClass, hoverClass, shapeClass, disabledClass);
  });
  
  iconSize = computed(() => {
    return this.sizeConfig[this.size].icon;
  });
  
  iconClasses(position: 'leading' | 'trailing' = 'leading'): string {
    return position === 'leading' ? 'mr-1.5' : 'ml-1.5';
  }
  
  removeButtonClasses = computed(() => {
    const base = 'ml-1.5 inline-flex items-center justify-center hover:opacity-80 transition-opacity';
    const sizeClass = this.sizeConfig[this.size].removeButton;
    const colorClass = this.colorConfig[this.variant][this.color].removeButton;
    const disabledClass = this.disabled ? 'cursor-not-allowed' : '';
    
    return cn(base, sizeClass, colorClass, disabledClass);
  });
  
  removeIconClasses = computed(() => {
    return this.sizeConfig[this.size].removeIcon;
  });
  
  onRemove(event: Event): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.remove.emit();
    }
  }
}