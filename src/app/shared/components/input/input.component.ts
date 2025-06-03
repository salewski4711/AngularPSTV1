import { Component, Input, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { InputType, InputSize } from '../../types/form.types';
import { cn, formClasses } from '../../utils/tailwind.utils';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="w-full">
      <!-- Label -->
      <label 
        *ngIf="label"
        [for]="inputId"
        [class]="labelClasses()"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>
      
      <!-- Input Container -->
      <div class="relative">
        <!-- Leading Icon -->
        <div 
          *ngIf="leadingIcon" 
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <i [class]="leadingIconClasses()"></i>
        </div>
        
        <!-- Input Field -->
        <input
          [id]="inputId"
          [type]="type"
          [value]="value()"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [class]="inputClasses()"
          (input)="handleInput($event)"
          (focus)="handleFocus()"
          (blur)="handleBlur()"
        />
        
        <!-- Trailing Icon / Status Icon -->
        <div 
          *ngIf="trailingIcon || showStatusIcon" 
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
          [class.pointer-events-none]="!trailingClickable"
        >
          <!-- Loading Spinner -->
          <svg 
            *ngIf="loading"
            class="animate-spin h-5 w-5 text-primary" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          
          <!-- Error Icon -->
          <svg 
            *ngIf="!loading && hasError()" 
            class="h-5 w-5 text-red-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          
          <!-- Success Icon -->
          <svg 
            *ngIf="!loading && hasSuccess()" 
            class="h-5 w-5 text-green-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          
          <!-- Custom Trailing Icon -->
          <i 
            *ngIf="!loading && !hasError() && !hasSuccess() && trailingIcon" 
            [class]="trailingIconClasses()"
            (click)="onTrailingIconClick()"
          ></i>
        </div>
      </div>
      
      <!-- Helper Text / Error Message -->
      <p 
        *ngIf="currentHelperText()" 
        [class]="helperTextClasses()"
      >
        <svg 
          *ngIf="hasError()" 
          class="w-4 h-4 mr-1 inline-flex" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        {{ currentHelperText() }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends FormControlBase {
  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'md';
  @Input() leadingIcon?: string;
  @Input() trailingIcon?: string;
  @Input() trailingClickable = false;
  @Input() loading = false;
  @Input() showStatusIcon = true;
  
  inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  
  constructor(injector: Injector) {
    super(injector);
  }
  
  labelClasses = computed(() => {
    const base = formClasses.label.base;
    const state = this.disabled 
      ? formClasses.label.disabled 
      : this.hasError() 
        ? formClasses.label.error 
        : formClasses.label.default;
    
    return cn(base, state);
  });
  
  inputClasses = computed(() => {
    const base = formClasses.input.base;
    const sizeClass = formClasses.sizes[this.size];
    const paddingLeft = this.leadingIcon ? 'pl-10' : '';
    const paddingRight = this.trailingIcon || this.showStatusIcon ? 'pr-10' : '';
    
    let stateClass = formClasses.input.default;
    if (this.disabled) {
      stateClass = formClasses.input.disabled;
    } else if (this.readonly) {
      stateClass = formClasses.input.readonly;
    } else if (this.hasError()) {
      stateClass = formClasses.input.error;
    } else if (this.hasSuccess()) {
      stateClass = formClasses.input.success;
    }
    
    return cn(base, sizeClass, stateClass, paddingLeft, paddingRight);
  });
  
  helperTextClasses = computed(() => {
    const base = formClasses.helperText.base;
    const state = this.hasError() 
      ? formClasses.helperText.error 
      : this.hasSuccess() && this.successMessage
        ? formClasses.helperText.success
        : formClasses.helperText.default;
    
    return cn(base, state);
  });
  
  currentHelperText = computed(() => {
    if (this.hasError() && this.errorMessage) {
      return this.errorMessage;
    }
    if (this.hasSuccess() && this.successMessage) {
      return this.successMessage;
    }
    return this.helperText;
  });
  
  leadingIconClasses = computed(() => {
    const baseClasses = 'h-5 w-5';
    const colorClasses = this.disabled 
      ? 'text-gray-400' 
      : 'text-gray-600 dark:text-gray-400';
    
    return cn(baseClasses, colorClasses, this.leadingIcon);
  });
  
  trailingIconClasses = computed(() => {
    const baseClasses = 'h-5 w-5';
    const colorClasses = this.disabled 
      ? 'text-gray-400' 
      : this.trailingClickable 
        ? 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer'
        : 'text-gray-600 dark:text-gray-400';
    
    return cn(baseClasses, colorClasses, this.trailingIcon);
  });
  
  
  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateValue(input.value);
  }
  
  onTrailingIconClick(): void {
    if (this.trailingClickable && !this.disabled && !this.readonly) {
      // Emit custom event for parent to handle
    }
  }
}