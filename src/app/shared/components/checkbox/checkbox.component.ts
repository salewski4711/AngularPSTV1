import { Component, Input, Output, EventEmitter, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { cn } from '../../utils/tailwind.utils';
import { checkboxClasses as checkboxStaticClasses, inputClasses } from '../../../core/design-system/component-classes/atoms.classes';

type CheckboxSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'pst-checkbox',
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
        [class]="labelClasses()"
      >
        {{ label }}
        <span *ngIf="required" [class]="requiredAsteriskClasses">*</span>
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
  @Input() 
  set checked(value: boolean) {
    this.writeValue(value);
  }
  get checked(): boolean {
    return this.value();
  }
  @Output() checkedChange = new EventEmitter<boolean>();
  
  checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  constructor(injector: Injector) {
    super(injector);
  }
  
  containerClasses = computed(() => {
    const cursor = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    return cn(checkboxStaticClasses.container, cursor);
  });
  
  checkboxClasses = computed(() => {
    const base = checkboxStaticClasses.input.base;
    const sizeClass = checkboxStaticClasses.input.sizes[this.size];
    const marginTop = 'mt-0.5';
    const cursor = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    const opacity = this.disabled ? 'opacity-50' : '';
    const state = this.value() ? checkboxStaticClasses.input.checked : checkboxStaticClasses.input.unchecked;
    
    return cn(base, sizeClass, marginTop, cursor, opacity, state);
  });
  
  labelClasses = computed(() => {
    const state = this.disabled 
      ? checkboxStaticClasses.label.disabled
      : checkboxStaticClasses.label.default;
    const cursor = this.disabled ? 'cursor-not-allowed' : 'cursor-pointer';
    
    return cn(checkboxStaticClasses.label.base, state, cursor);
  });
  
  helperTextClasses = computed(() => {
    const base = cn(inputClasses.helperText.base, 'ml-7');
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
  
  // Static property for required asterisk
  requiredAsteriskClasses = checkboxStaticClasses.requiredAsterisk;
  
  handleChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.updateValue(checkbox.checked);
    this.checkedChange.emit(checkbox.checked);
  }
}