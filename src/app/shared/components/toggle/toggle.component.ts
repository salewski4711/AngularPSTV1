import { Component, Input, computed, ChangeDetectionStrategy, forwardRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlBase } from '../../utils/form-control.base';
import { cn } from '../../utils/tailwind.utils';
import { toggleClasses, inputClasses } from '../../../core/design-system/component-classes/atoms.classes';

type ToggleSize = 'sm' | 'md' | 'lg';
type LabelPosition = 'left' | 'right';

@Component({
  selector: 'pst-toggle',
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
        <span *ngIf="required" [class]="requiredAsteriskClasses">*</span>
      </span>
      
      <!-- Toggle Button -->
      <button
        type="button"
        role="switch"
        [attr.aria-checked]="value()"
        [attr.aria-label]="ariaLabel || label"
        [disabled]="disabled"
        [class]="toggleButtonClasses()"
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
        <span *ngIf="required" [class]="requiredAsteriskClasses">*</span>
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
  
  requiredAsteriskClasses = toggleClasses.requiredAsterisk;
  
  containerClasses = computed(() => {
    const base = 'flex items-center';
    const justify = this.label && this.labelPosition === 'left' 
      ? 'justify-between' 
      : '';
    
    return cn(base, justify);
  });
  
  toggleButtonClasses = computed(() => {
    const sizeConfig = toggleClasses.handle.sizes[this.size];
    const base = cn(
      toggleClasses.container.base,
      sizeConfig.container
    );
    
    const state = this.value() 
      ? toggleClasses.container.on 
      : toggleClasses.container.off;
    
    const disabled = this.disabled 
      ? 'opacity-50 cursor-not-allowed' 
      : 'cursor-pointer';
    
    return cn(base, state, disabled);
  });
  
  handleClasses = computed(() => {
    const sizeConfig = toggleClasses.handle.sizes[this.size];
    const base = cn(
      toggleClasses.handle.base,
      sizeConfig.handle
    );
    
    const translate = this.value() 
      ? sizeConfig.translate.on 
      : sizeConfig.translate.off;
    
    return cn(base, translate);
  });
  
  labelClasses = computed(() => {
    const base = toggleClasses.label.base;
    const position = toggleClasses.label.position[this.labelPosition];
    const color = this.disabled 
      ? toggleClasses.label.disabled 
      : toggleClasses.label.default;
    
    return cn(base, position, color);
  });
  
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
  
  toggle(): void {
    if (!this.disabled) {
      this.updateValue(!this.value());
    }
  }
}