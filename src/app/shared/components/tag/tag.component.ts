import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/tailwind.utils';
import { IconComponent } from '../../icons/icon.component';
import { tagClasses as staticTagClasses } from '../../../core/design-system/component-classes/atoms.classes';

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
          [cssClasses]="iconClasses('leading')"
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
  
  tagClasses = computed(() => {
    const base = staticTagClasses.base;
    const sizeClass = staticTagClasses.sizes[this.size].base;
    const colorClass = staticTagClasses.variants[this.variant][this.color].base;
    const shapeClass = staticTagClasses.shapes[this.shape];
    const disabledClass = this.disabled ? staticTagClasses.disabled : '';
    
    return cn(base, sizeClass, colorClass, shapeClass, disabledClass);
  });
  
  iconSize = computed(() => {
    return staticTagClasses.sizes[this.size].icon;
  });
  
  iconClasses(position: 'leading' | 'trailing' = 'leading'): string {
    return staticTagClasses.iconSpacing[position];
  }
  
  removeButtonClasses = computed(() => {
    const base = staticTagClasses.removeButton.base;
    const sizeClass = staticTagClasses.sizes[this.size].removeButton;
    const colorClass = staticTagClasses.variants[this.variant][this.color].removeButton;
    const disabledClass = this.disabled ? 'cursor-not-allowed' : '';
    
    return cn(base, sizeClass, colorClass, disabledClass);
  });
  
  removeIconClasses = computed(() => {
    return staticTagClasses.sizes[this.size].removeIcon;
  });
  
  onRemove(event: Event): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.remove.emit();
    }
  }
}