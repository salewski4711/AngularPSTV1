import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../../../../shared/components/form-field/form-field.component';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { SelectComponent } from '../../../../../shared/components/select/select.component';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pst-form-field-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent,
    FormsModule
  ],
  template: `
    <pst-showcase-template
      title="Form Field"
      description="Container component for form inputs with label, help text, and error handling"
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
    />
  `
})
export class FormFieldShowcaseComponent {
  email = '';
  department = '';
  departmentOptions = [
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'hr', label: 'Human Resources' }
  ];

  sections = [
    {
      title: 'Basic Usage',
      description: 'Form fields with labels and help text.',
      content: `
        <div class="space-y-6">
          <pst-form-field label="Email Address" name="email">
            <input
              #input
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
              placeholder="john@example.com"
            />
          </pst-form-field>

          <pst-form-field label="Country" helpText="Select your country of residence">
            <select
              #select
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
            >
              <option>United States</option>
              <option>Germany</option>
              <option>United Kingdom</option>
            </select>
          </pst-form-field>
        </div>
      `,
      code: `<pst-form-field label="Email Address" name="email">
  <input
    #input
    type="email"
    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    placeholder="john@example.com"
  />
</pst-form-field>`
    },
    {
      title: 'Required Fields',
      description: 'Mark fields as required with an asterisk indicator.',
      content: `
        <pst-form-field label="Full Name" [required]="true">
          <input
            #input
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
            placeholder="Enter your full name"
          />
        </pst-form-field>
      `,
      code: `<pst-form-field label="Full Name" [required]="true">
  <input
    #input
    type="text"
    class="w-full px-3 py-2 border border-gray-300 rounded-md"
    placeholder="Enter your full name"
  />
</pst-form-field>`
    },
    {
      title: 'With Help Text',
      description: 'Provide additional guidance with help text.',
      content: `
        <pst-form-field 
          label="Password" 
          helpText="Must be at least 8 characters with one uppercase letter"
        >
          <input
            #input
            type="password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
          />
        </pst-form-field>
      `,
      code: `<pst-form-field 
  label="Password" 
  helpText="Must be at least 8 characters with one uppercase letter"
>
  <input
    #input
    type="password"
    class="w-full px-3 py-2 border border-gray-300 rounded-md"
  />
</pst-form-field>`
    },
    {
      title: 'Error State',
      description: 'Display validation errors clearly.',
      content: `
        <pst-form-field 
          label="Email" 
          error="Please enter a valid email address"
          [required]="true"
        >
          <input
            #input
            type="email"
            class="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-800 dark:border-red-600"
            value="invalid-email"
          />
        </pst-form-field>
      `,
      code: `<pst-form-field 
  label="Email" 
  error="Please enter a valid email address"
  [required]="true"
>
  <input
    #input
    type="email"
    class="w-full px-3 py-2 border border-red-300 rounded-md"
    value="invalid-email"
  />
</pst-form-field>`
    },
    {
      title: 'With Textarea',
      description: 'Form fields work with any input type including textareas.',
      content: `
        <pst-form-field label="Comments" helpText="Optional feedback">
          <textarea
            #textarea
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600"
            placeholder="Enter your comments..."
          ></textarea>
        </pst-form-field>
      `,
      code: `<pst-form-field label="Comments" helpText="Optional feedback">
  <textarea
    #textarea
    rows="4"
    class="w-full px-3 py-2 border border-gray-300 rounded-md"
    placeholder="Enter your comments..."
  ></textarea>
</pst-form-field>`
    },
    {
      title: 'With Custom Components',
      description: 'Integrate with other form components seamlessly.',
      content: `
        <div class="space-y-6">
          <pst-form-field label="Email" [required]="true">
            <pst-input
              type="email"
              placeholder="Enter your email"
              [(ngModel)]="email"
            ></pst-input>
          </pst-form-field>

          <pst-form-field label="Department" helpText="Select your department">
            <pst-select
              [(ngModel)]="department"
              placeholder="Choose department"
              [options]="departmentOptions"
            ></pst-select>
          </pst-form-field>
        </div>
      `,
      code: `<!-- With Input Component -->
<pst-form-field label="Email" [required]="true">
  <pst-input
    type="email"
    placeholder="Enter your email"
    [(ngModel)]="email"
  ></pst-input>
</pst-form-field>

<!-- With Select Component -->
<pst-form-field label="Department" helpText="Select your department">
  <pst-select
    [(ngModel)]="department"
    placeholder="Choose department"
    [options]="departmentOptions"
  ></pst-select>
</pst-form-field>`
    }
  ];

  props = [
    {
      name: 'label',
      type: 'string',
      default: '-',
      description: 'Label text for the form field'
    },
    {
      name: 'name',
      type: 'string',
      default: '-',
      description: 'Name attribute for the input element'
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Shows required indicator (*) next to label'
    },
    {
      name: 'error',
      type: 'string',
      default: '-',
      description: 'Error message to display'
    },
    {
      name: 'helpText',
      type: 'string',
      default: '-',
      description: 'Help text shown below the input (hidden when error is shown)'
    },
    {
      name: 'labelClass',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes for the label'
    },
    {
      name: 'errorClass',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes for the error message'
    },
    {
      name: 'helpTextClass',
      type: 'string',
      default: '-',
      description: 'Additional CSS classes for the help text'
    }
  ];

  bestPractices = {
    do: [
      'Always provide a label for accessibility',
      'Use required indicator (*) for mandatory fields',
      'Show validation errors clearly below the input',
      'Use help text for additional guidance, but keep it concise',
      'Ensure proper ID association between label and input',
      'Maintain consistent spacing between form fields',
      'Group related fields together logically',
      'Use appropriate input types for better mobile experience',
      'Provide clear error messages that explain how to fix the issue'
    ],
    dont: [
      'Don\'t use placeholder text as a replacement for labels',
      'Avoid using red text for labels unless indicating an error',
      'Don\'t hide important information in help text',
      'Avoid overly technical error messages',
      'Don\'t rely solely on color to indicate errors',
      'Don\'t make all fields required unnecessarily',
      'Avoid inconsistent spacing between form fields',
      'Don\'t use ambiguous labels that could confuse users'
    ]
  };
}