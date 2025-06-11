import { Component, Input, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { SelectOption, SelectSize } from './select.types';
import { cn } from '../../utils/tailwind.utils';
import { selectClasses } from '../../../core/design-system/component-classes/atoms.classes';

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
    <div [class]="staticSelectClasses.container">
      <!-- Label -->
      <label 
        *ngIf="label"
        [for]="selectId"
        [class]="labelClasses()"
      >
        {{ label }}
        <span *ngIf="required" [class]="staticSelectClasses.requiredAsterisk">*</span>
      </label>
      
      <!-- Select Container -->
      <div [class]="staticSelectClasses.selectWrapper">
        <select
          [id]="selectId"
          [value]="value()"
          [disabled]="disabled"
          [required]="required"
          [class]="selectClass()"
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
        <div [class]="staticSelectClasses.dropdownIcon.container">
          <svg 
            [class]="staticSelectClasses.dropdownIcon.icon" 
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
          [class]="staticSelectClasses.errorIcon" 
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
  readonly staticSelectClasses = selectClasses;
  
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
    const base = this.staticSelectClasses.label.base;
    const state = this.disabled 
      ? this.staticSelectClasses.label.disabled 
      : this.hasError() 
        ? this.staticSelectClasses.label.error 
        : this.staticSelectClasses.label.default;
    
    return cn(base, state);
  });
  
  selectClass = computed(() => {
    const base = this.staticSelectClasses.select.base;
    const sizeClass = this.staticSelectClasses.select.sizes[this.size];
    
    let stateClass = this.staticSelectClasses.select.states.default;
    if (this.disabled) {
      stateClass = this.staticSelectClasses.select.states.disabled;
    } else if (this.hasError()) {
      stateClass = this.staticSelectClasses.select.states.error;
    } else if (this.hasSuccess()) {
      stateClass = this.staticSelectClasses.select.states.success;
    }
    
    return cn(base, sizeClass, stateClass);
  });
  
  helperTextClasses = computed(() => {
    const base = this.staticSelectClasses.helperText.base;
    const state = this.hasError() 
      ? this.staticSelectClasses.helperText.error 
      : this.hasSuccess() && this.successMessage
        ? this.staticSelectClasses.helperText.success
        : this.staticSelectClasses.helperText.default;
    
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