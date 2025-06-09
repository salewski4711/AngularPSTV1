import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-input-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    InputComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Input Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          A versatile input field component with various types, states, and validation support.
        </p>
      </div>

      <!-- Import Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Import
        </h2>
        <pst-code-block
          [code]="importCode"
          language="typescript"
        ></pst-code-block>
      </section>

      <!-- Examples -->
      <section class="space-y-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Examples
        </h2>

        <!-- Basic Input -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Input
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md space-y-4">
              <pst-input 
                label="Full Name"
                placeholder="Enter your full name"
                [(ngModel)]="basicValue"
              ></pst-input>
              <p class="text-sm text-gray-600 dark:text-gray-400">Value: {{ basicValue() }}</p>
            </div>
          </div>
          <pst-code-block
            [code]="basicCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Input Types -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Input Types
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md space-y-4">
              <pst-input 
                type="text"
                label="Text Input"
                placeholder="Enter text"
              ></pst-input>
              <pst-input 
                type="email"
                label="Email"
                placeholder="email@example.com"
              ></pst-input>
              <pst-input 
                type="password"
                label="Password"
                placeholder="Enter password"
              ></pst-input>
              <pst-input 
                type="number"
                label="Number"
                placeholder="Enter a number"
              ></pst-input>
              <pst-input 
                type="tel"
                label="Phone"
                placeholder="+1 (555) 000-0000"
              ></pst-input>
              <pst-input 
                type="url"
                label="Website"
                placeholder="https://example.com"
              ></pst-input>
            </div>
          </div>
          <pst-code-block
            [code]="typesCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- States -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            States
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md space-y-4">
              <pst-input 
                label="Normal Input"
                placeholder="Normal state"
              ></pst-input>
              <pst-input 
                label="Disabled Input"
                placeholder="This input is disabled"
                [disabled]="true"
              ></pst-input>
              <pst-input 
                label="Required Input"
                placeholder="This field is required"
                [required]="true"
              ></pst-input>
              <pst-input 
                label="Read-only Input"
                value="This is read-only"
                [readonly]="true"
              ></pst-input>
            </div>
          </div>
          <pst-code-block
            [code]="statesCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- With Helper Text and Error -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Helper Text and Validation
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md space-y-4">
              <pst-input 
                label="Username"
                placeholder="Choose a username"
                helperText="Username must be 3-20 characters"
              ></pst-input>
              <pst-input 
                label="Email"
                placeholder="Enter your email"
                errorMessage="Please enter a valid email address"
              ></pst-input>
            </div>
          </div>
          <pst-code-block
            [code]="validationCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- With Icons -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Icons
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md space-y-4">
              <pst-input 
                label="Search"
                placeholder="Search..."
                leadingIcon="fas fa-search"
              ></pst-input>
              <pst-input 
                label="Email"
                placeholder="Enter email"
                leadingIcon="fas fa-envelope"
              ></pst-input>
              <pst-input 
                type="password"
                label="Password"
                placeholder="Enter password"
                leadingIcon="fas fa-lock"
              ></pst-input>
            </div>
          </div>
          <pst-code-block
            [code]="iconsCode"
            language="html"
          ></pst-code-block>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class InputShowcaseComponent {
  basicValue = signal('');

  importCode = `import { InputComponent } from '@app/shared/components/input/input.component';

@Component({
  // ...
  imports: [InputComponent, FormsModule]
})`;

  basicCode = `<pst-input 
  label="Full Name"
  placeholder="Enter your full name"
  [(ngModel)]="fullName"
></pst-input>`;

  typesCode = `<pst-input type="text" label="Text Input" placeholder="Enter text"></pst-input>
<pst-input type="email" label="Email" placeholder="email@example.com"></pst-input>
<pst-input type="password" label="Password" placeholder="Enter password"></pst-input>
<pst-input type="number" label="Number" placeholder="Enter a number"></pst-input>
<pst-input type="tel" label="Phone" placeholder="+1 (555) 000-0000"></pst-input>
<pst-input type="url" label="Website" placeholder="https://example.com"></pst-input>`;

  statesCode = `<pst-input label="Normal Input" placeholder="Normal state"></pst-input>
<pst-input label="Disabled Input" placeholder="This input is disabled" [disabled]="true"></pst-input>
<pst-input label="Required Input" placeholder="This field is required" [required]="true"></pst-input>
<pst-input label="Read-only Input" value="This is read-only" [readonly]="true"></pst-input>`;

  validationCode = `<pst-input 
  label="Username"
  placeholder="Choose a username"
  helperText="Username must be 3-20 characters"
></pst-input>

<pst-input 
  label="Email"
  placeholder="Enter your email"
  errorMessage="Please enter a valid email address"
></pst-input>`;

  iconsCode = `<pst-input label="Search" placeholder="Search..." leadingIcon="fas fa-search"></pst-input>
<pst-input label="Email" placeholder="Enter email" leadingIcon="fas fa-envelope"></pst-input>
<pst-input type="password" label="Password" placeholder="Enter password" leadingIcon="fas fa-lock"></pst-input>`;
}