import { Component, Input, ChangeDetectionStrategy, ContentChild, ElementRef, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/tailwind.utils';
import { formFieldClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="formFieldClasses.container">
      <!-- Label -->
      <label 
        *ngIf="label"
        [for]="inputId"
        [class]="getLabelClasses()"
      >
        {{ label }}
        <span *ngIf="required" [class]="formFieldClasses.required">*</span>
      </label>
      
      <!-- Input Container -->
      <div [class]="formFieldClasses.inputContainer">
        <ng-content></ng-content>
      </div>
      
      <!-- Error Message -->
      <p 
        *ngIf="error && !helpText" 
        [class]="getErrorClasses()"
      >
        <svg 
          [class]="formFieldClasses.error.icon" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        {{ error }}
      </p>
      
      <!-- Help Text (only shown when no error) -->
      <p 
        *ngIf="helpText && !error" 
        [class]="getHelpTextClasses()"
      >
        {{ helpText }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements AfterContentInit {
  // Input properties
  @Input() label?: string;
  @Input() name?: string;
  @Input() required = false;
  @Input() error?: string;
  @Input() helpText?: string;
  @Input() labelClass?: string;
  @Input() errorClass?: string;
  @Input() helpTextClass?: string;
  
  @ContentChild('input', { read: ElementRef }) inputElement?: ElementRef;
  @ContentChild('select', { read: ElementRef }) selectElement?: ElementRef;
  @ContentChild('textarea', { read: ElementRef }) textareaElement?: ElementRef;
  
  readonly formFieldClasses = formFieldClasses;
  inputId = `form-field-${Math.random().toString(36).substr(2, 9)}`;
  
  // Class getter methods
  getLabelClasses(): string {
    const baseClasses = formFieldClasses.label.base;
    const stateClasses = this.error 
      ? formFieldClasses.label.error 
      : formFieldClasses.label.default;
    
    return cn(baseClasses, stateClasses, this.labelClass);
  }
  
  getErrorClasses(): string {
    return cn(formFieldClasses.error.container, this.errorClass);
  }
  
  getHelpTextClasses(): string {
    return cn(formFieldClasses.helpText, this.helpTextClass);
  }
  
  ngAfterContentInit(): void {
    // Set the ID on the projected input/select/textarea element
    const element = this.inputElement || this.selectElement || this.textareaElement;
    if (element && this.label) {
      element.nativeElement.id = this.inputId;
      
      // Also set the name attribute if provided
      if (this.name && !element.nativeElement.name) {
        element.nativeElement.name = this.name;
      }
    }
  }
}