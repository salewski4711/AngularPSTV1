import { Component, Input, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { cn, formClasses } from '../../utils/tailwind.utils';

type CheckboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  template: `
    <label [class]="containerClasses()">
      <input
        type="checkbox"
        [id]="checkboxId"
        [checked]="value()"
        [disabled]="disabled"
        [required]="required"
        [indeterminate]="indeterminate"
        [class]="checkboxClasses()"
        (change)="handleChange($event)"
        (focus)="handleFocus()"
        (blur)="handleBlur()"
      />
      <span 
        *ngIf="label" 
        [class]="labelTextClasses()"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </span>
    </label>
    
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
export class CheckboxComponent extends FormControlBase {
  @Input() size: CheckboxSize = 'md';
  @Input() indeterminate = false;
  @Input() showHelperText = false;
  
  checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  constructor(injector: Injector) {
    super(injector);
  }
  
  containerClasses = computed(() => {
    const base = 'flex items-start';
    const cursor = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    
    return cn(base, cursor);
  });
  
  checkboxClasses = computed(() => {
    const base = formClasses.checkbox.base;
    const sizeClass = formClasses.checkbox.sizes[this.size];
    const marginTop = this.size === 'sm' ? 'mt-0.5' : 'mt-0.5';
    const cursor = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    const opacity = this.disabled ? 'opacity-50' : '';
    
    return cn(base, sizeClass, marginTop, cursor, opacity);
  });
  
  labelTextClasses = computed(() => {
    const base = 'ml-2.5 text-sm';
    const color = this.disabled 
      ? 'text-gray-500 dark:text-gray-500' 
      : 'text-gray-600 dark:text-gray-400';
    const cursor = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    
    return cn(base, color, cursor);
  });
  
  helperTextClasses = computed(() => {
    const base = cn(formClasses.helperText.base, 'ml-7');
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
  
  handleChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.updateValue(checkbox.checked);
  }
}