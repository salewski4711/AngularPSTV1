import { Component, Input, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { RadioOption } from './radio.types';
import { cn, formClasses } from '../../utils/tailwind.utils';

type RadioSize = 'sm' | 'md' | 'lg';
type RadioOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'pst-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ],
  template: `
    <fieldset>
      <!-- Group Label -->
      <legend 
        *ngIf="label"
        [class]="legendClasses()"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </legend>
      
      <!-- Radio Options -->
      <div [class]="containerClasses()">
        <label 
          *ngFor="let option of options; let i = index"
          [class]="optionContainerClasses()"
        >
          <input
            type="radio"
            [name]="groupName"
            [value]="option.value"
            [checked]="isChecked(option.value)"
            [disabled]="disabled || option.disabled"
            [required]="required"
            [class]="radioClasses()"
            (change)="handleChange(option.value)"
            (focus)="handleFocus()"
            (blur)="handleBlur()"
          />
          <div class="ml-2.5">
            <span [class]="labelTextClasses(option.disabled)">
              {{ option.label }}
            </span>
            <p 
              *ngIf="option.helperText" 
              class="text-xs text-gray-600 dark:text-gray-400 mt-0.5"
            >
              {{ option.helperText }}
            </p>
          </div>
        </label>
      </div>
      
      <!-- Group Helper Text / Error -->
      <p 
        *ngIf="currentHelperText()" 
        [class]="helperTextClasses()"
      >
        {{ currentHelperText() }}
      </p>
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioGroupComponent<T = any> extends FormControlBase {
  @Input() options: RadioOption<T>[] = [];
  @Input() size: RadioSize = 'md';
  @Input() orientation: RadioOrientation = 'vertical';
  
  groupName = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  
  constructor(injector: Injector) {
    super(injector);
  }
  
  legendClasses = computed(() => {
    const base = 'text-sm font-medium mb-3';
    const color = this.disabled 
      ? 'text-gray-500 dark:text-gray-500' 
      : this.hasError() 
        ? 'text-red-600 dark:text-red-400'
        : 'text-gray-900 dark:text-gray-100';
    
    return cn(base, color);
  });
  
  containerClasses = computed(() => {
    const base = 'flex';
    const direction = this.orientation === 'horizontal' 
      ? 'flex-row flex-wrap gap-4' 
      : 'flex-col gap-3';
    
    return cn(base, direction);
  });
  
  optionContainerClasses = computed(() => {
    const base = 'flex items-start';
    const cursor = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    
    return cn(base, cursor);
  });
  
  radioClasses = computed(() => {
    const base = formClasses.radio.base;
    const sizeClass = formClasses.checkbox.sizes[this.size]; // Reuse checkbox sizes
    const marginTop = 'mt-0.5';
    const cursor = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    const opacity = this.disabled ? 'opacity-50' : '';
    
    return cn(base, sizeClass, marginTop, cursor, opacity);
  });
  
  labelTextClasses(optionDisabled?: boolean): string {
    const base = 'text-sm';
    const isDisabled = this.disabled || optionDisabled;
    const color = isDisabled 
      ? 'text-gray-500 dark:text-gray-500' 
      : 'text-gray-600 dark:text-gray-400';
    const cursor = isDisabled ? 'cursor-not-allowed' : 'cursor-pointer';
    
    return cn(base, color, cursor);
  }
  
  helperTextClasses = computed(() => {
    const base = cn(formClasses.helperText.base, 'mt-3');
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
  
  isChecked(value: T): boolean {
    return this.value() === value;
  }
  
  handleChange(value: T): void {
    if (!this.disabled) {
      this.updateValue(value);
    }
  }
}