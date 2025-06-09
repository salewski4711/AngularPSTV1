import { Component, Input, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { SelectOption, SelectSize } from './select.types';
import { cn, formClasses } from '../../utils/tailwind.utils';

@Component({
  selector: 'pst-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="w-full">
      <!-- Label -->
      <label 
        *ngIf="label"
        [for]="selectId"
        [class]="labelClasses()"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>
      
      <!-- Select Container -->
      <div class="relative">
        <select
          [id]="selectId"
          [value]="value()"
          [disabled]="disabled"
          [required]="required"
          [class]="selectClasses()"
          (change)="handleChange($event)"
          (focus)="handleFocus()"
          (blur)="handleBlur()"
        >
          <!-- Placeholder Option -->
          <option value="" [disabled]="!allowEmpty">
            {{ placeholder || 'Bitte wählen' }}
          </option>
          
          <!-- Options without groups -->
          <ng-container *ngIf="!hasGroups()">
            <option 
              *ngFor="let option of options" 
              [value]="option.value"
              [disabled]="option.disabled"
            >
              {{ option.label }}
            </option>
          </ng-container>
          
          <!-- Options with groups -->
          <ng-container *ngIf="hasGroups()">
            <optgroup 
              *ngFor="let group of groupedOptions()" 
              [label]="group.label"
            >
              <option 
                *ngFor="let option of group.options" 
                [value]="option.value"
                [disabled]="option.disabled"
              >
                {{ option.label }}
              </option>
            </optgroup>
          </ng-container>
        </select>
        
        <!-- Dropdown Icon -->
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg 
            class="h-5 w-5 text-gray-600 dark:text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
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
export class SelectComponent<T = any> extends FormControlBase {
  @Input() options: SelectOption<T>[] = [];
  @Input() size: SelectSize = 'md';
  @Input() allowEmpty = false;
  
  selectId = `select-${Math.random().toString(36).substr(2, 9)}`;
  
  constructor(injector: Injector) {
    super(injector);
  }
  
  hasGroups = computed(() => {
    return this.options.some(option => option.group !== undefined);
  });
  
  groupedOptions = computed(() => {
    if (!this.hasGroups()) {return [];}
    
    const groups = new Map<string, SelectOption<T>[]>();
    
    this.options.forEach(option => {
      const groupName = option.group || 'Other';
      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }
      groups.get(groupName)!.push(option);
    });
    
    return Array.from(groups.entries()).map(([label, options]) => ({
      label,
      options
    }));
  });
  
  labelClasses = computed(() => {
    const base = formClasses.label.base;
    const state = this.disabled 
      ? formClasses.label.disabled 
      : this.hasError() 
        ? formClasses.label.error 
        : formClasses.label.default;
    
    return cn(base, state);
  });
  
  selectClasses = computed(() => {
    const base = formClasses.input.base;
    const sizeClass = formClasses.sizes[this.size];
    const selectSpecific = 'appearance-none pr-10 cursor-pointer';
    
    let stateClass = formClasses.input.default;
    if (this.disabled) {
      stateClass = formClasses.input.disabled;
    } else if (this.hasError()) {
      stateClass = formClasses.input.error;
    } else if (this.hasSuccess()) {
      stateClass = formClasses.input.success;
    }
    
    return cn(base, sizeClass, stateClass, selectSpecific);
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
  
  handleChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value === '' ? null : select.value;
    this.updateValue(value);
  }
}