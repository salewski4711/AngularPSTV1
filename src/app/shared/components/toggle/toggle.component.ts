import { Component, Input, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { cn, formClasses } from '../../utils/tailwind.utils';

type ToggleSize = 'sm' | 'md' | 'lg';
type LabelPosition = 'left' | 'right';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true
    }
  ],
  template: `
    <div [class]="containerClasses()">
      <!-- Label Left -->
      <span 
        *ngIf="label && labelPosition === 'left'"
        [class]="labelClasses()"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </span>
      
      <!-- Toggle Button -->
      <button
        type="button"
        role="switch"
        [attr.aria-checked]="value()"
        [attr.aria-label]="ariaLabel || label"
        [disabled]="disabled"
        [class]="toggleClasses()"
        (click)="toggle()"
        (focus)="handleFocus()"
        (blur)="handleBlur()"
      >
        <span
          [class]="handleClasses()"
          aria-hidden="true"
        ></span>
      </button>
      
      <!-- Label Right -->
      <span 
        *ngIf="label && labelPosition === 'right'"
        [class]="labelClasses()"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </span>
    </div>
    
    <!-- Helper Text -->
    <p 
      *ngIf="showHelperText && currentHelperText()" 
      [class]="helperTextClasses()"
    >
      {{ currentHelperText() }}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent extends FormControlBase {
  @Input() size: ToggleSize = 'md';
  @Input() labelPosition: LabelPosition = 'right';
  @Input() ariaLabel?: string;
  @Input() showHelperText = false;
  
  constructor(injector: Injector) {
    super(injector);
  }
  
  containerClasses = computed(() => {
    const base = 'flex items-center';
    const justify = this.label && this.labelPosition === 'left' 
      ? 'justify-between' 
      : '';
    
    return cn(base, justify);
  });
  
  toggleClasses = computed(() => {
    const sizeConfig = formClasses.toggle.handle.sizes[this.size];
    const base = cn(
      formClasses.toggle.container.base,
      sizeConfig.container
    );
    
    const state = this.value() 
      ? formClasses.toggle.container.on 
      : formClasses.toggle.container.off;
    
    const disabled = this.disabled 
      ? 'opacity-50 cursor-not-allowed' 
      : 'cursor-pointer';
    
    return cn(base, state, disabled);
  });
  
  handleClasses = computed(() => {
    const sizeConfig = formClasses.toggle.handle.sizes[this.size];
    const base = cn(
      formClasses.toggle.handle.base,
      sizeConfig.handle
    );
    
    const translate = this.value() 
      ? sizeConfig.translate.on 
      : sizeConfig.translate.off;
    
    return cn(base, translate);
  });
  
  labelClasses = computed(() => {
    const base = 'text-sm font-medium';
    const margin = this.labelPosition === 'left' ? 'mr-3' : 'ml-3';
    const color = this.disabled 
      ? 'text-gray-500 dark:text-gray-500' 
      : 'text-gray-900 dark:text-gray-100';
    
    return cn(base, margin, color);
  });
  
  helperTextClasses = computed(() => {
    const base = cn(formClasses.helperText.base, 'mt-2');
    const state = this.hasError() 
      ? formClasses.helperText.error 
      : formClasses.helperText.default;
    
    return cn(base, state);
  });
  
  currentHelperText = computed(() => {
    if (this.hasError() && this.errorMessage) {
      return this.errorMessage;
    }
    return this.helperText;
  });
  
  toggle(): void {
    if (!this.disabled) {
      this.updateValue(!this.value());
    }
  }
}