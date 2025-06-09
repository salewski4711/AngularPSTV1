import { Component, Input, ChangeDetectionStrategy, ContentChild, ElementRef, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../utils/tailwind.utils';

@Component({
  selector: 'pst-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <!-- Label -->
      <label 
        *ngIf="label"
        [for]="inputId"
        [class]="computedLabelClass()"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-0.5">*</span>
      </label>
      
      <!-- Input Container -->
      <div class="relative">
        <ng-content></ng-content>
      </div>
      
      <!-- Error Message -->
      <p 
        *ngIf="error && !helpText" 
        [class]="computedErrorClass()"
      >
        <svg 
          class="w-3.5 h-3.5 mr-1 inline-flex flex-shrink-0" 
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
        [class]="computedHelpTextClass()"
      >
        {{ helpText }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements AfterContentInit {
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
  
  inputId = `form-field-${Math.random().toString(36).substr(2, 9)}`;
  
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
  
  computedLabelClass(): string {
    const defaultClasses = 'text-sm font-medium mb-1.5 block';
    const colorClasses = this.error 
      ? 'text-red-600 dark:text-red-400' 
      : 'text-gray-700 dark:text-gray-300';
    
    return cn(defaultClasses, colorClasses, this.labelClass);
  }
  
  computedErrorClass(): string {
    const defaultClasses = 'text-xs mt-1 text-red-500 dark:text-red-400 flex items-start';
    return cn(defaultClasses, this.errorClass);
  }
  
  computedHelpTextClass(): string {
    const defaultClasses = 'text-xs mt-1 text-gray-500 dark:text-gray-400';
    return cn(defaultClasses, this.helpTextClass);
  }
}