import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { PlaygroundComponent, PlaygroundConfig } from '../../../shared/components/playground.component';
import * as examples from './examples';
@Component({
  selector: 'app-button-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonComponent, 
    CodeBlockComponent, 
    PlaygroundComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Button Component
          </h1>
          <span class="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
            stable
          </span>
        </div>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          A versatile button component with multiple variants, sizes, and states.
        </p>
      </div>

      <!-- Navigation Tabs -->
      <div class="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav class="-mb-px flex space-x-8">
          @for (tab of tabs; track tab.id) {
            <button
              (click)="activeTab.set(tab.id)"
              [class.border-primary]="activeTab() === tab.id"
              [class.text-primary]="activeTab() === tab.id"
              [class.border-transparent]="activeTab() !== tab.id"
              [class.text-gray-500]="activeTab() !== tab.id"
              class="py-2 px-1 border-b-2 font-medium text-sm transition-colors hover:text-gray-700 dark:hover:text-gray-300"
            >
              {{ tab.label }}
            </button>
          }
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="space-y-12">
        @switch (activeTab()) {
          @case ('overview') {
            <!-- Overview Section -->
            <section>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Overview
              </h2>
              
              <div class="prose dark:prose-invert max-w-none">
                <p>
                  The Button component is a fundamental UI element that triggers actions when clicked. 
                  It supports multiple visual variants, sizes, and states to accommodate different use cases.
                </p>
                
                <h3>When to use</h3>
                <ul>
                  <li>To trigger an action or event, such as submitting a form or opening a dialog</li>
                  <li>To navigate to another page or section</li>
                  <li>To toggle a state or selection</li>
                </ul>
                
                <h3>When not to use</h3>
                <ul>
                  <li>For navigation that looks like a link - use a Link component instead</li>
                  <li>To display static information - use Text or other display components</li>
                  <li>For selecting from multiple options - use Radio, Checkbox, or Select components</li>
                </ul>
              </div>

              <!-- Import Statement -->
              <div class="mt-8">
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Import
                </h3>
                <app-code-block
                  [code]="importCode"
                  language="typescript"
                ></app-code-block>
              </div>
            </section>
          }
          
          @case ('examples') {
            <!-- Examples Section -->
            <section class="space-y-12">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Examples
              </h2>

              <!-- Variants -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Variants
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Six different visual styles to match your design needs.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div class="flex flex-wrap gap-4">
                    <app-button variant="primary">Primary</app-button>
                    <app-button variant="secondary">Secondary</app-button>
                    <app-button variant="outline-primary">Outline</app-button>
                    <app-button variant="tertiary">Tertiary</app-button>
                    <app-button variant="ghost">Ghost</app-button>
                    <app-button variant="danger">Danger</app-button>
                  </div>
                </div>
                
                <app-code-block
                  [code]="variantsCode"
                  language="html"
                ></app-code-block>
              </div>

              <!-- Sizes -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Sizes
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Five sizes from extra small to extra large.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div class="flex flex-wrap items-center gap-4">
                    <app-button size="xs">Extra Small</app-button>
                    <app-button size="sm">Small</app-button>
                    <app-button size="md">Medium</app-button>
                    <app-button size="lg">Large</app-button>
                    <app-button size="xl">Extra Large</app-button>
                  </div>
                </div>
                
                <app-code-block
                  [code]="sizesCode"
                  language="html"
                ></app-code-block>
              </div>

              <!-- States -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  States
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Different states for user interaction feedback.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div class="flex flex-wrap gap-4">
                    <app-button>Normal</app-button>
                    <app-button [disabled]="true">Disabled</app-button>
                    <app-button [loading]="true">Loading</app-button>
                    <app-button [loading]="true" loadingText="Saving...">Loading with Text</app-button>
                  </div>
                </div>
                
                <app-code-block
                  [code]="statesCode"
                  language="html"
                ></app-code-block>
              </div>

              <!-- With Icons -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  With Icons
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Buttons can include icons for better visual communication.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div class="flex flex-wrap gap-4">
                    <app-button icon="save">Save</app-button>
                    <app-button icon="download" iconPosition="right">Download</app-button>
                    <app-button icon="trash" variant="danger">Delete</app-button>
                    <app-button icon="edit" [iconOnly]="true" variant="ghost"></app-button>
                  </div>
                </div>
                
                <app-code-block
                  [code]="iconsCode"
                  language="html"
                ></app-code-block>
              </div>

              <!-- Full Width -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Full Width
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Buttons can expand to fill their container width.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div class="max-w-md mx-auto space-y-4">
                    <app-button [fullWidth]="true">Full Width Primary</app-button>
                    <app-button [fullWidth]="true" variant="secondary">Full Width Secondary</app-button>
                  </div>
                </div>
                
                <app-code-block
                  [code]="fullWidthCode"
                  language="html"
                ></app-code-block>
              </div>
            </section>
          }
          
          @case ('playground') {
            <!-- Playground Section -->
            <section>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Interactive Playground
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-8">
                Experiment with different button configurations in real-time.
              </p>
              
              <app-playground
                [config]="playgroundConfig"
              ></app-playground>
            </section>
          }
          
          @case ('api') {
            <!-- API Documentation Section -->
            <section class="space-y-12">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                API Reference
              </h2>

              <!-- Props Table -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Properties
                </h3>
                
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Property
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Default
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      @for (prop of props; track prop.name) {
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                            {{ prop.name }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                            {{ prop.type }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                            {{ prop.default }}
                          </td>
                          <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {{ prop.description }}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Events Table -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Events
                </h3>
                
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Event
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                          clicked
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                          EventEmitter&lt;MouseEvent&gt;
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          Emitted when the button is clicked
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          }
          
          @case ('accessibility') {
            <!-- Accessibility Section -->
            <section class="space-y-8">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Accessibility
              </h2>

              <div class="prose dark:prose-invert max-w-none">
                <h3>Keyboard Navigation</h3>
                <ul>
                  <li><kbd>Tab</kbd> - Move focus to the button</li>
                  <li><kbd>Space</kbd> or <kbd>Enter</kbd> - Activate the button</li>
                </ul>

                <h3>ARIA Attributes</h3>
                <ul>
                  <li><code>aria-label</code> - Provides accessible label when button has no text content (icon-only buttons)</li>
                  <li><code>aria-busy</code> - Set to true when button is in loading state</li>
                  <li><code>disabled</code> - Native HTML attribute for disabled state</li>
                </ul>

                <h3>Best Practices</h3>
                <ul>
                  <li>Always provide meaningful text content or aria-label for screen readers</li>
                  <li>Use appropriate button variants to convey meaning (e.g., danger for destructive actions)</li>
                  <li>Ensure sufficient color contrast between button text and background</li>
                  <li>Provide visual feedback for interactive states (hover, focus, active)</li>
                  <li>Use loading states instead of disabling buttons during async operations when possible</li>
                </ul>

                <h3>Focus Management</h3>
                <p>
                  The button component includes visible focus indicators that meet WCAG 2.1 success criteria. 
                  Focus is indicated by a ring that uses the primary color of your theme.
                </p>
              </div>
            </section>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .prose h3 {
      @apply text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3;
    }
    
    .prose ul {
      @apply list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400;
    }
    
    .prose code {
      @apply bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono;
    }
    
    kbd {
      @apply bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm font-mono;
    }
  `]
})
export class ButtonShowcaseComponent {
  activeTab = signal('overview');
  
  tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'examples', label: 'Examples' },
    { id: 'playground', label: 'Playground' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' }
  ];

  importCode = `import { ButtonComponent } from '@app/shared/components/button/button.component';

@Component({
  // ...
  imports: [ButtonComponent]
})`;

  // Import examples from HTML files
  variantsCode = examples.variantsExample;
  sizesCode = examples.sizesExample;
  statesCode = examples.statesExample;
  iconsCode = examples.withIconsExample;
  fullWidthCode = `<app-button [fullWidth]="true">Full Width Primary</app-button>
<app-button [fullWidth]="true" variant="secondary">Full Width Secondary</app-button>`;

  playgroundConfig: PlaygroundConfig = {
    component: ButtonComponent,
    props: [
      {
        name: 'variant',
        type: 'enum',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'outline-primary', 'tertiary', 'ghost', 'danger'],
        description: 'Visual style variant'
      },
      {
        name: 'size',
        type: 'enum',
        defaultValue: 'md',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
        description: 'Button size'
      },
      {
        name: 'type',
        type: 'enum',
        defaultValue: 'button',
        options: ['button', 'submit', 'reset'],
        description: 'HTML button type'
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        description: 'Disable the button'
      },
      {
        name: 'loading',
        type: 'boolean',
        defaultValue: false,
        description: 'Show loading state'
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        defaultValue: false,
        description: 'Make button full width'
      },
      {
        name: 'ripple',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable ripple effect'
      },
      {
        name: 'iconOnly',
        type: 'boolean',
        defaultValue: false,
        description: 'Show only icon'
      },
      {
        name: 'icon',
        type: 'enum',
        defaultValue: '',
        options: ['', 'save', 'edit', 'trash', 'download', 'plus', 'check', 'x', 'arrow-left', 'arrow-right'],
        description: 'Icon to display'
      },
      {
        name: 'iconPosition',
        type: 'enum',
        defaultValue: 'left',
        options: ['left', 'right'],
        description: 'Icon position'
      },
      {
        name: 'loadingText',
        type: 'string',
        defaultValue: '',
        description: 'Text during loading'
      }
    ],
    code: (props) => {
      const attributes: string[] = [];
      
      // Add non-default attributes
      if (props.variant !== 'primary') {attributes.push(`variant="${props.variant}"`);}
      if (props.size !== 'md') {attributes.push(`size="${props.size}"`);}
      if (props.type !== 'button') {attributes.push(`type="${props.type}"`);}
      if (props.disabled) {attributes.push('[disabled]="true"');}
      if (props.loading) {attributes.push('[loading]="true"');}
      if (props.fullWidth) {attributes.push('[fullWidth]="true"');}
      if (props.ripple) {attributes.push('[ripple]="true"');}
      if (props.iconOnly) {attributes.push('[iconOnly]="true"');}
      if (props.icon) {attributes.push(`icon="${props.icon}"`);}
      if (props.iconPosition !== 'left') {attributes.push(`iconPosition="${props.iconPosition}"`);}
      if (props.loadingText) {attributes.push(`loadingText="${props.loadingText}"`);}
      
      const attributesStr = attributes.length > 0 ? '\n  ' + attributes.join('\n  ') : '';
      
      return `<app-button${attributesStr}>
  ${props.iconOnly ? '' : 'Button Text'}
</app-button>`;
    }
  };

  props = [
    {
      name: 'variant',
      type: 'ButtonVariant',
      default: "'primary'",
      description: 'The visual style of the button'
    },
    {
      name: 'size',
      type: 'ButtonSize',
      default: "'md'",
      description: 'The size of the button'
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: 'The HTML button type attribute'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show loading spinner'
    },
    {
      name: 'loadingText',
      type: 'string',
      default: "''",
      description: 'Text to display during loading state'
    },
    {
      name: 'spinnerType',
      type: "'circle' | 'dots' | 'bars'",
      default: "'circle'",
      description: 'Type of loading spinner'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      default: 'false',
      description: 'Whether button should fill container width'
    },
    {
      name: 'icon',
      type: 'IconName',
      default: 'undefined',
      description: 'Icon to display in the button'
    },
    {
      name: 'iconPosition',
      type: "'left' | 'right'",
      default: "'left'",
      description: 'Position of the icon relative to text'
    },
    {
      name: 'iconOnly',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show only icon without text'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible label for screen readers'
    },
    {
      name: 'ripple',
      type: 'boolean',
      default: 'false',
      description: 'Whether to show ripple effect on click'
    },
  ];
}