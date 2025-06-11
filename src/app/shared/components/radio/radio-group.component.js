var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input, computed, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { cn } from '../../utils/tailwind.utils';
import { radioClasses as radioStaticClasses, inputClasses } from '../../../core/design-system/component-classes/atoms.classes';
let RadioGroupComponent = class RadioGroupComponent extends FormControlBase {
    options = [];
    size = 'md';
    orientation = 'vertical';
    groupName = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
    constructor(injector) {
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
    optionContainerClasses = (optionDisabled) => {
        const isDisabled = this.disabled || optionDisabled;
        const cursor = isDisabled
            ? radioStaticClasses.optionContainer.disabled
            : radioStaticClasses.optionContainer.enabled;
        return cn(radioStaticClasses.optionContainer.base, cursor);
    };
    radioClasses = (optionDisabled) => {
        const isDisabled = this.disabled || optionDisabled;
        const base = radioStaticClasses.input.base;
        const sizeClass = radioStaticClasses.input.sizes[this.size];
        const spacing = radioStaticClasses.input.spacing;
        const state = isDisabled
            ? radioStaticClasses.input.disabled
            : radioStaticClasses.input.enabled;
        return cn(base, sizeClass, spacing, state);
    };
    labelTextClasses = (optionDisabled) => {
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
    isChecked(value) {
        return this.value() === value;
    }
    handleChange(value) {
        if (!this.disabled) {
            this.updateValue(value);
        }
    }
    // Static properties for template binding
    requiredAsteriskClasses = radioStaticClasses.requiredAsterisk;
    labelContainerClasses = radioStaticClasses.labelContainer;
    optionHelperTextClasses = radioStaticClasses.optionHelperText;
};
__decorate([
    Input()
], RadioGroupComponent.prototype, "options", void 0);
__decorate([
    Input()
], RadioGroupComponent.prototype, "size", void 0);
__decorate([
    Input()
], RadioGroupComponent.prototype, "orientation", void 0);
RadioGroupComponent = __decorate([
    Component({
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
], RadioGroupComponent);
export { RadioGroupComponent };
