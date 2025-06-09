import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { ButtonGroupComponent } from '../../../../../shared/components/button-group/button-group.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-button-group-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    ButtonComponent,
    ButtonGroupComponent,
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Button Group Component
          </h1>
          <span class="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
            stable
          </span>
        </div>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Group related buttons together for better organization and interaction.
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
                  The Button Group component allows you to group multiple buttons together, 
                  providing a cohesive visual appearance and optional toggle functionality.
                </p>
                
                <h3>Features</h3>
                <ul>
                  <li>Horizontal and vertical orientations</li>
                  <li>Default grouping for visual coherence</li>
                  <li>Toggle mode for single selection</li>
                  <li>Toggle-multiple mode for multi-selection</li>
                  <li>Seamless visual connection between buttons</li>
                  <li>Accessibility support with ARIA attributes</li>
                  <li>Two-way binding for controlled components</li>
                </ul>
                
                <h3>When to use</h3>
                <ul>
                  <li>To group related actions together</li>
                  <li>For view switching (list/grid/calendar views)</li>
                  <li>For filtering options</li>
                  <li>For pagination controls</li>
                  <li>For toggle selections (single or multiple)</li>
                </ul>
              </div>

              <!-- Import Statement -->
              <div class="mt-8">
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Import
                </h3>
                <pst-code-block
                  [code]="importCode"
                  language="typescript"
                ></pst-code-block>
              </div>
            </section>
          }
          
          @case ('examples') {
            <!-- Examples Section -->
            <section class="space-y-12">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Examples
              </h2>

              <!-- Basic Groups -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Basic Button Groups
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Group buttons together for visual coherence without toggle functionality.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div class="space-y-6">
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Horizontal Group:</p>
                      <pst-button-group ariaLabel="Text formatting">
                        <pst-button variant="tertiary" icon="bold" size="sm">Bold</pst-button>
                        <pst-button variant="tertiary" icon="italic" size="sm">Italic</pst-button>
                        <pst-button variant="tertiary" icon="underline" size="sm">Underline</pst-button>
                      </pst-button-group>
                    </div>
                    
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">With Different Variants:</p>
                      <pst-button-group ariaLabel="Save actions">
                        <pst-button variant="primary">Save</pst-button>
                        <pst-button variant="outline-primary">Save As</pst-button>
                        <pst-button variant="ghost" icon="settings" [iconOnly]="true" ariaLabel="Settings"></pst-button>
                      </pst-button-group>
                    </div>
                  </div>
                </div>
                
                <pst-code-block
                  [code]="basicCode"
                  language="html"
                ></pst-code-block>
              </div>

              <!-- Toggle Mode -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Toggle Mode (Single Selection)
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Allow users to select one option from a group.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div class="space-y-6">
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">View Switcher:</p>
                      <pst-button-group 
                        ariaLabel="View options" 
                        mode="toggle"
                        [(value)]="selectedView"
                      >
                        <pst-button icon="list" variant="tertiary" size="sm">List</pst-button>
                        <pst-button icon="grid" variant="tertiary" size="sm">Grid</pst-button>
                        <pst-button icon="calendar" variant="tertiary" size="sm">Calendar</pst-button>
                      </pst-button-group>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Selected: {{ selectedView() || 'None' }}
                      </p>
                    </div>
                    
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Time Period:</p>
                      <pst-button-group 
                        ariaLabel="Time period" 
                        mode="toggle"
                        [(value)]="selectedPeriod"
                      >
                        <pst-button variant="outline-primary">Day</pst-button>
                        <pst-button variant="outline-primary">Week</pst-button>
                        <pst-button variant="outline-primary">Month</pst-button>
                        <pst-button variant="outline-primary">Year</pst-button>
                      </pst-button-group>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Selected: {{ selectedPeriod() || 'None' }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <pst-code-block
                  [code]="toggleCode"
                  language="html"
                ></pst-code-block>
              </div>

              <!-- Multiple Toggle -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Toggle Mode (Multiple Selection)
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Allow users to select multiple options from a group.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Filter Options:</p>
                    <pst-button-group 
                      ariaLabel="Filter options" 
                      mode="toggle-multiple"
                      [(value)]="selectedFilters"
                    >
                      <pst-button icon="check" variant="ghost" size="sm">Active</pst-button>
                      <pst-button icon="clock" variant="ghost" size="sm">Pending</pst-button>
                      <pst-button icon="folder" variant="ghost" size="sm">Archived</pst-button>
                      <pst-button icon="star" variant="ghost" size="sm">Starred</pst-button>
                    </pst-button-group>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Selected: {{ formatSelectedFilters() }}
                    </p>
                  </div>
                </div>
                
                <pst-code-block
                  [code]="multiToggleCode"
                  language="html"
                ></pst-code-block>
              </div>

              <!-- Vertical Orientation -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Vertical Orientation
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  Stack buttons vertically for sidebar navigation or mobile layouts.
                </p>
                
                <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
                  <div class="flex gap-8">
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Navigation Menu:</p>
                      <pst-button-group orientation="vertical" ariaLabel="Navigation">
                        <pst-button icon="home" variant="ghost">Home</pst-button>
                        <pst-button icon="user" variant="ghost">Profile</pst-button>
                        <pst-button icon="settings" variant="ghost">Settings</pst-button>
                        <pst-button icon="logout" variant="ghost">Logout</pst-button>
                      </pst-button-group>
                    </div>
                    
                    <div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">With Toggle:</p>
                      <pst-button-group 
                        orientation="vertical" 
                        ariaLabel="Actions"
                        mode="toggle"
                        [(value)]="selectedAction"
                      >
                        <pst-button icon="edit" variant="tertiary">Edit</pst-button>
                        <pst-button icon="copy" variant="tertiary">Duplicate</pst-button>
                        <pst-button icon="upload" variant="tertiary">Share</pst-button>
                        <pst-button icon="trash" variant="tertiary">Delete</pst-button>
                      </pst-button-group>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Selected: {{ selectedAction() || 'None' }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <pst-code-block
                  [code]="verticalCode"
                  language="html"
                ></pst-code-block>
              </div>

              <!-- Real-world Examples -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Real-world Examples
                </h3>
                <div class="space-y-6">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Pagination:</p>
                    <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
                      <pst-button-group ariaLabel="Pagination">
                        <pst-button variant="outline-primary" icon="chevron-left" [iconOnly]="true" ariaLabel="Previous"></pst-button>
                        <pst-button variant="outline-primary">1</pst-button>
                        <pst-button variant="outline-primary">2</pst-button>
                        <pst-button variant="outline-primary">3</pst-button>
                        <pst-button variant="outline-primary">...</pst-button>
                        <pst-button variant="outline-primary">10</pst-button>
                        <pst-button variant="outline-primary" icon="chevron-right" [iconOnly]="true" ariaLabel="Next"></pst-button>
                      </pst-button-group>
                    </div>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Toolbar Actions:</p>
                    <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
                      <div class="flex gap-4">
                        <pst-button-group ariaLabel="Text alignment">
                          <pst-button variant="ghost" icon="align-left" [iconOnly]="true" size="sm" ariaLabel="Align left"></pst-button>
                          <pst-button variant="ghost" icon="align-center" [iconOnly]="true" size="sm" ariaLabel="Align center"></pst-button>
                          <pst-button variant="ghost" icon="align-right" [iconOnly]="true" size="sm" ariaLabel="Align right"></pst-button>
                          <pst-button variant="ghost" icon="align-justify" [iconOnly]="true" size="sm" ariaLabel="Justify"></pst-button>
                        </pst-button-group>
                        
                        <pst-button-group ariaLabel="List formatting">
                          <pst-button variant="ghost" icon="list" [iconOnly]="true" size="sm" ariaLabel="Bullet list"></pst-button>
                          <pst-button variant="ghost" icon="list-ordered" [iconOnly]="true" size="sm" ariaLabel="Numbered list"></pst-button>
                        </pst-button-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                          valueChange
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">
                          EventEmitter&lt;string | string[] | null&gt;
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          Emitted when the selected value(s) change in toggle modes
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Types -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Type Definitions
                </h3>
                
                <pst-code-block
                  [code]="typesCode"
                  language="typescript"
                ></pst-code-block>
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
                <h3>ARIA Attributes</h3>
                <ul>
                  <li><code>role="group"</code> - Identifies the container as a group of buttons</li>
                  <li><code>aria-label</code> - Provides accessible label for the button group</li>
                  <li><code>aria-pressed</code> - Indicates toggle state for buttons in toggle modes</li>
                  <li><code>aria-multiselectable</code> - Set to true for toggle-multiple mode</li>
                </ul>

                <h3>Keyboard Navigation</h3>
                <ul>
                  <li><kbd>Tab</kbd> - Move focus to the button group</li>
                  <li><kbd>Arrow Keys</kbd> - Navigate between buttons within the group (when implemented)</li>
                  <li><kbd>Space</kbd> or <kbd>Enter</kbd> - Activate the focused button</li>
                </ul>

                <h3>Best Practices</h3>
                <ul>
                  <li>Always provide a descriptive <code>ariaLabel</code> for the button group</li>
                  <li>Use toggle modes for mutually exclusive options</li>
                  <li>Ensure buttons within the group have clear, descriptive labels or aria-labels</li>
                  <li>Group only related actions together</li>
                  <li>Consider using vertical orientation for better mobile accessibility</li>
                </ul>

                <h3>Screen Reader Support</h3>
                <p>
                  The button group announces itself as a group with the provided aria-label. 
                  In toggle modes, the state of each button (pressed/not pressed) is announced 
                  when focused or activated.
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
export class ButtonGroupShowcaseComponent {
  activeTab = signal('overview');
  
  tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'examples', label: 'Examples' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' }
  ];

  // Toggle states
  selectedView = signal<string | null>('List');
  selectedPeriod = signal<string | null>(null);
  selectedFilters = signal<string[]>(['Active']);
  selectedAction = signal<string | null>(null);

  formatSelectedFilters(): string {
    const filters = this.selectedFilters();
    return filters.length > 0 ? filters.join(', ') : 'None';
  }

  importCode = `import { ButtonGroupComponent } from '@app/shared/components/button-group/button-group.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';

@Component({
  // ...
  imports: [ButtonGroupComponent, ButtonComponent]
})`;

  basicCode = `<!-- Basic horizontal group -->
<pst-button-group ariaLabel="Text formatting">
  <pst-button variant="tertiary" icon="bold" size="sm">Bold</pst-button>
  <pst-button variant="tertiary" icon="italic" size="sm">Italic</pst-button>
  <pst-button variant="tertiary" icon="underline" size="sm">Underline</pst-button>
</pst-button-group>

<!-- Mixed variants -->
<pst-button-group ariaLabel="Save actions">
  <pst-button variant="primary">Save</pst-button>
  <pst-button variant="outline-primary">Save As</pst-button>
  <pst-button variant="ghost" icon="settings" [iconOnly]="true" ariaLabel="Settings"></pst-button>
</pst-button-group>`;

  toggleCode = `<!-- Toggle mode (single selection) -->
<pst-button-group 
  ariaLabel="View options" 
  mode="toggle"
  [(value)]="selectedView">
  <pst-button icon="list" variant="tertiary" size="sm">List</pst-button>
  <pst-button icon="grid" variant="tertiary" size="sm">Grid</pst-button>
  <pst-button icon="calendar" variant="tertiary" size="sm">Calendar</pst-button>
</pst-button-group>

<!-- In component -->
selectedView = signal<string | null>('List');`;

  multiToggleCode = `<!-- Toggle mode (multiple selection) -->
<pst-button-group 
  ariaLabel="Filter options" 
  mode="toggle-multiple"
  [(value)]="selectedFilters">
  <pst-button icon="check" variant="ghost" size="sm">Active</pst-button>
  <pst-button icon="clock" variant="ghost" size="sm">Pending</pst-button>
  <pst-button icon="folder" variant="ghost" size="sm">Archived</pst-button>
  <pst-button icon="star" variant="ghost" size="sm">Starred</pst-button>
</pst-button-group>

<!-- In component -->
selectedFilters = signal<string[]>(['Active']);`;

  verticalCode = `<!-- Vertical orientation -->
<pst-button-group orientation="vertical" ariaLabel="Navigation">
  <pst-button icon="home" variant="ghost">Home</pst-button>
  <pst-button icon="user" variant="ghost">Profile</pst-button>
  <pst-button icon="settings" variant="ghost">Settings</pst-button>
  <pst-button icon="logout" variant="ghost">Logout</pst-button>
</pst-button-group>

<!-- Vertical with toggle -->
<pst-button-group 
  orientation="vertical" 
  ariaLabel="Actions"
  mode="toggle"
  [(value)]="selectedAction">
  <pst-button icon="edit" variant="tertiary">Edit</pst-button>
  <pst-button icon="copy" variant="tertiary">Duplicate</pst-button>
  <pst-button icon="upload" variant="tertiary">Share</pst-button>
  <pst-button icon="trash" variant="tertiary">Delete</pst-button>
</pst-button-group>`;

  typesCode = `export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupMode = 'default' | 'toggle' | 'toggle-multiple';`;

  props = [
    {
      name: 'orientation',
      type: 'ButtonGroupOrientation',
      default: "'horizontal'",
      description: 'Layout direction of the button group'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'undefined',
      description: 'Accessible label for the button group'
    },
    {
      name: 'mode',
      type: 'ButtonGroupMode',
      default: "'default'",
      description: 'Interaction mode: default (no toggle), toggle (single), or toggle-multiple'
    },
    {
      name: 'value',
      type: 'string | string[] | null',
      default: 'undefined',
      description: 'Selected value(s) for controlled toggle modes'
    }
  ];
}