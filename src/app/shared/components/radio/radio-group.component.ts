import { Component, Input, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { RadioOption } from './radio.types';
import { cn } from '../../utils/tailwind.utils';
import { radioClasses as radioStaticClasses, inputClasses } from '../../../core/design-system/component-classes/atoms.classes';

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
        <span *ngIf="required" [class]="requiredAsteriskClasses">*</span>
      </legend>
      
      <!-- Radio Options -->
      <div [class]="containerClasses()">
        <label 
          *ngFor="let option of options; let i = index"
          [class]="optionContainerClasses(option.disabled)"
        >
          <input
            type="radio"
            [name]="groupName"
            [value]="option.value"
            [checked]="isChecked(option.value)"
            [disabled]="disabled || option.disabled"
            [required]="required"
            [class]="radioClasses(option.disabled)"
            (change)="handleChange(option.value)"
            (focus)="handleFocus()"
            (blur)="handleBlur()"
          />
          <div [class]="labelContainerClasses">
            <span [class]="labelTextClasses(option.disabled)">
              {{ option.label }}
            </span>
            <p 
              *ngIf="option.helperText" 
              [class]="optionHelperTextClasses"
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
export class RadioGroupComponent<T = unknown> extends FormControlBase {
  @Input() options: RadioOption<T>[] = [];
  @Input() size: RadioSize = 'md';
  @Input() orientation: RadioOrientation = 'vertical';
  
  groupName = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  
  constructor(injector: Injector) {
    super(injector);
  }
  
  legendClasses = computed(() => {
    const base = radioStaticClasses.legend.base;
    const state = this.disabled 
      ? radioStaticClasses.legend.disabled
      : this.hasError() 
        ? radioStaticClasses.legend.error
        : radioStaticClasses.legend.default;
    
    return cn(base, state);
  });
  
  containerClasses = computed(() => {
    return this.orientation === 'horizontal' 
      ? radioStaticClasses.group.horizontal 
      : radioStaticClasses.group.vertical;
  });
  
  optionContainerClasses = (optionDisabled?: boolean): string => {
    const isDisabled = this.disabled || optionDisabled;
    const cursor = isDisabled 
      ? radioStaticClasses.optionContainer.disabled 
      : radioStaticClasses.optionContainer.enabled;
    
    return cn(radioStaticClasses.optionContainer.base, cursor);
  };
  
  radioClasses = (optionDisabled?: boolean): string => {
    const isDisabled = this.disabled || optionDisabled;
    const base = radioStaticClasses.input.base;
    const sizeClass = radioStaticClasses.input.sizes[this.size];
    const spacing = radioStaticClasses.input.spacing;
    const state = isDisabled 
      ? radioStaticClasses.input.disabled 
      : radioStaticClasses.input.enabled;
    
    return cn(base, sizeClass, spacing, state);
  };
  
  labelTextClasses = (optionDisabled?: boolean): string => {
    const isDisabled = this.disabled || optionDisabled;
    const base = radioStaticClasses.label.base;
    const state = isDisabled 
      ? radioStaticClasses.label.disabled
      : radioStaticClasses.label.default;
    const cursor = isDisabled 
      ? radioStaticClasses.label.disabledCursor 
      : radioStaticClasses.label.enabled;
    
    return cn(base, state, cursor);
  };
  
  helperTextClasses = computed(() => {
    const base = cn(inputClasses.helperText.base, 'mt-2');
    const state = this.hasError() 
      ? inputClasses.helperText.error 
      : inputClasses.helperText.default;
    
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

  // Static properties for template binding
  requiredAsteriskClasses = radioStaticClasses.requiredAsterisk;
  labelContainerClasses = radioStaticClasses.labelContainer;
  optionHelperTextClasses = radioStaticClasses.optionHelperText;
}