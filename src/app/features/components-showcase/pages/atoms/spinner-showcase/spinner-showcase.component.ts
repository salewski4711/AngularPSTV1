import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-spinner-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    SpinnerComponent, 
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Spinner Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Loading indicators with various styles and sizes.
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

        <!-- Basic Spinner -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Spinner
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-8">
              <pst-spinner></pst-spinner>
            </div>
          </div>
          <pst-code-block
            [code]="basicCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Spinner Types -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Spinner Types
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-8">
              <div class="text-center">
                <pst-spinner type="circle"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Circle</p>
              </div>
              <div class="text-center">
                <pst-spinner type="dots"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Dots</p>
              </div>
              <div class="text-center">
                <pst-spinner type="bars"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Bars</p>
              </div>
            </div>
          </div>
          <pst-code-block
            [code]="typesCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Sizes -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Sizes
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-8">
              <div class="text-center">
                <pst-spinner size="xs"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">XS</p>
              </div>
              <div class="text-center">
                <pst-spinner size="sm"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Small</p>
              </div>
              <div class="text-center">
                <pst-spinner size="md"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Medium</p>
              </div>
              <div class="text-center">
                <pst-spinner size="lg"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Large</p>
              </div>
              <div class="text-center">
                <pst-spinner size="xl"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">XL</p>
              </div>
            </div>
          </div>
          <pst-code-block
            [code]="sizesCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Colors -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Colors
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-8">
              <div class="text-center">
                <pst-spinner color="primary"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Primary</p>
              </div>
              <div class="text-center">
                <pst-spinner color="secondary"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Secondary</p>
              </div>
              <div class="text-center">
                <pst-spinner color="success"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Success</p>
              </div>
              <div class="text-center">
                <pst-spinner color="danger"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Danger</p>
              </div>
              <div class="text-center">
                <pst-spinner color="warning"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Warning</p>
              </div>
              <div class="text-center">
                <pst-spinner color="info"></pst-spinner>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">Info</p>
              </div>
            </div>
          </div>
          <pst-code-block
            [code]="colorsCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- With Label -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Label
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <pst-spinner label="Loading..."></pst-spinner>
              <pst-spinner label="Please wait" type="dots"></pst-spinner>
              <pst-spinner label="Saving your changes" color="success" type="bars"></pst-spinner>
            </div>
          </div>
          <pst-code-block
            [code]="labelCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Real-world Examples
          </h3>
          <div class="space-y-6">
            <!-- Loading Button -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Loading Button</h4>
              <div class="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg" disabled>
                  <pst-spinner size="sm" color="white"></pst-spinner>
                  <span>Saving...</span>
                </button>
              </div>
            </div>

            <!-- Page Loading -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Page Loading</h4>
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div class="flex items-center justify-center h-48">
                  <div class="text-center">
                    <pst-spinner size="lg" color="primary"></pst-spinner>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">Loading content...</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Data Table Loading -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Data Table Loading</h4>
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Customer List</h3>
                </div>
                <div class="p-8">
                  <div class="flex items-center justify-center">
                    <pst-spinner type="dots" label="Loading customers..."></pst-spinner>
                  </div>
                </div>
              </div>
            </div>

            <!-- Inline Loading -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Inline Loading</h4>
              <div class="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Checking availability</span>
                    <pst-spinner size="xs"></pst-spinner>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Validating email</span>
                    <span class="text-sm text-green-600 dark:text-green-400">✓ Valid</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Processing payment</span>
                    <pst-spinner size="xs" type="dots"></pst-spinner>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pst-code-block
            [code]="realWorldCode"
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
export class SpinnerShowcaseComponent {
  importCode = `import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';

@Component({
  // ...
  imports: [SpinnerComponent]
})`;

  basicCode = `<pst-spinner></pst-spinner>`;

  typesCode = `<pst-spinner type="circle"></pst-spinner>
<pst-spinner type="dots"></pst-spinner>
<pst-spinner type="bars"></pst-spinner>`;

  sizesCode = `<pst-spinner size="xs"></pst-spinner>
<pst-spinner size="sm"></pst-spinner>
<pst-spinner size="md"></pst-spinner>
<pst-spinner size="lg"></pst-spinner>
<pst-spinner size="xl"></pst-spinner>`;

  colorsCode = `<pst-spinner color="primary"></pst-spinner>
<pst-spinner color="secondary"></pst-spinner>
<pst-spinner color="success"></pst-spinner>
<pst-spinner color="danger"></pst-spinner>
<pst-spinner color="warning"></pst-spinner>
<pst-spinner color="info"></pst-spinner>`;

  labelCode = `<pst-spinner label="Loading..."></pst-spinner>
<pst-spinner label="Please wait" type="dots"></pst-spinner>
<pst-spinner label="Saving your changes" color="success" type="bars"></pst-spinner>`;

  realWorldCode = `<!-- Loading Button -->
<button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg" disabled>
  <pst-spinner size="sm" color="white"></pst-spinner>
  <span>Saving...</span>
</button>

<!-- Page Loading -->
<div class="flex items-center justify-center h-48">
  <div class="text-center">
    <pst-spinner size="lg" color="primary"></pst-spinner>
    <p class="text-sm text-gray-600 mt-4">Loading content...</p>
  </div>
</div>

<!-- Data Table Loading -->
<pst-spinner type="dots" label="Loading customers..."></pst-spinner>

<!-- Inline Loading -->
<div class="flex items-center justify-between">
  <span class="text-sm text-gray-700">Checking availability</span>
  <pst-spinner size="xs"></pst-spinner>
</div>`;
}