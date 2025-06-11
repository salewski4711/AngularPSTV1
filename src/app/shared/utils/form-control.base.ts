import { Directive, Input, computed, signal, Optional, Self, Injector } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormControlConfig, FormFieldState } from '../types/form.types';

@Directive()
export abstract class FormControlBase implements ControlValueAccessor {
  protected ngControl: NgControl | null = null;
  
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() helperText?: string;
  @Input() errorMessage?: string;
  @Input() successMessage?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  
  protected touched = signal(false);
  protected focused = signal(false);
  protected value = signal<any>(null);
  
  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};
  
  constructor(protected injector: Injector) {
    // Delay the injection to avoid circular dependency
    setTimeout(() => {
      try {
        this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
        if (this.ngControl) {
          this.ngControl.valueAccessor = this;
        }
      } catch (err) {
        // NgControl not found, which is fine for standalone usage
      }
    });
  }
  
  writeValue(value: any): void {
    this.value.set(value);
  }
  
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  protected handleFocus(): void {
    this.focused.set(true);
  }
  
  protected handleBlur(): void {
    this.focused.set(false);
    if (!this.touched()) {
      this.touched.set(true);
      this.onTouched();
    }
  }
  
  protected updateValue(value: any): void {
    this.value.set(value);
    this.onChange(value);
  }
  
  protected hasError = computed(() => {
    if (!this.ngControl) {return false;}
    return this.touched() && this.ngControl.invalid;
  });
  
  protected hasSuccess = computed(() => {
    if (!this.ngControl) {return false;}
    return this.touched() && this.ngControl.valid && this.value() !== null && this.value() !== '';
  });
  
  protected fieldState = computed<FormFieldState>(() => ({
    touched: this.touched(),
    dirty: this.ngControl?.dirty ?? false,
    errors: this.ngControl?.errors ?? null
  }));
}