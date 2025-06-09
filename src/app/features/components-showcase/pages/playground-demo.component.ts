import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundComponent, PlaygroundConfig } from '../shared/components/playground.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'pst-playground-demo',
  standalone: true,
  imports: [CommonModule, PlaygroundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Playground Component Demo
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Interactive component property editor with live preview
        </p>
      </div>
      
      <div class="space-y-8">
        <!-- Button Playground Example -->
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Button Component Playground
          </h2>
          <pst-playground 
            [config]="buttonPlaygroundConfig"
            (propsChange)="onButtonPropsChange($event)"
          ></pst-playground>
        </section>
        
        <!-- Feature List -->
        <section class="mt-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Playground Features
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ✅ Dynamic Form Controls
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Automatically generates appropriate controls based on prop types
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ✅ Live Preview
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                See component changes instantly as you modify properties
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ✅ Code Generation
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Generates copy-paste ready code based on selected properties
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ✅ Responsive Design
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Works seamlessly on desktop and mobile devices
              </p>
            </div>
          </div>
        </section>
        
        <!-- Control Types -->
        <section class="mt-12">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Supported Control Types
          </h2>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Control
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Example Usage
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    string
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Text Input
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Button text, labels, placeholders
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    boolean
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Toggle Switch
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Disabled, loading, fullWidth
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    enum
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Select Dropdown
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Variants, sizes, types
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    number
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Range Slider + Input
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Width, height, padding
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    color
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Color Picker + Text
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Background, text colors
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: []
})
export class PlaygroundDemoComponent {
  buttonPlaygroundConfig: PlaygroundConfig = {
    component: ButtonComponent,
    props: [
      {
        name: 'variant',
        type: 'enum',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'outline-primary', 'tertiary', 'ghost', 'danger'],
        description: 'Visual style variant of the button'
      },
      {
        name: 'size',
        type: 'enum',
        defaultValue: 'md',
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
        description: 'Size of the button'
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        description: 'Whether the button is disabled'
      },
      {
        name: 'loading',
        type: 'boolean',
        defaultValue: false,
        description: 'Show loading spinner'
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
        description: 'Enable ripple effect on click'
      },
      {
        name: 'iconOnly',
        type: 'boolean',
        defaultValue: false,
        description: 'Show only icon without text'
      },
      {
        name: 'loadingText',
        type: 'string',
        defaultValue: '',
        description: 'Text to show during loading state'
      }
    ],
    code: (props) => {
      const attributes: string[] = [];
      
      // Add non-default attributes
      if (props.variant !== 'primary') {attributes.push(`variant="${props.variant}"`);}
      if (props.size !== 'md') {attributes.push(`size="${props.size}"`);}
      if (props.disabled) {attributes.push('[disabled]="true"');}
      if (props.loading) {attributes.push('[loading]="true"');}
      if (props.fullWidth) {attributes.push('[fullWidth]="true"');}
      if (props.ripple) {attributes.push('[ripple]="true"');}
      if (props.iconOnly) {attributes.push('[iconOnly]="true"');}
      if (props.loadingText) {attributes.push(`loadingText="${props.loadingText}"`);}
      
      const attributesStr = attributes.length > 0 ? '\n  ' + attributes.join('\n  ') : '';
      
      return `<pst-button${attributesStr}>
  ${props.iconOnly ? '' : 'Click me'}
</pst-button>`;
    }
  };
  
  onButtonPropsChange(props: any) {
    console.log('Button props changed:', props);
  }
}