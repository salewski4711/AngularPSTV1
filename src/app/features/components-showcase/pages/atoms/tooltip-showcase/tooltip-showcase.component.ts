import { Component } from '@angular/core';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';

@Component({
  selector: 'pst-tooltip-showcase',
  standalone: true,
  imports: [ShowcaseTemplateComponent],
  template: `
    <pst-showcase-template
      [title]="title"
      [description]="description"
      [props]="props"
      [sections]="sections"
      [bestPractices]="bestPractices">
    </pst-showcase-template>
  `
})
export class TooltipShowcaseComponent {
  title = 'Tooltip';
  description = 'A directive-based tooltip component that displays helpful text when users hover, click, or focus on an element.';

  props = [
    {
      name: 'appTooltip',
      type: 'string',
      default: "''",
      description: 'The text content to display in the tooltip'
    },
    {
      name: 'tooltipPosition',
      type: "'top' | 'bottom' | 'left' | 'right' | 'auto'",
      default: "'top'",
      description: 'Position of the tooltip relative to the element'
    },
    {
      name: 'tooltipTrigger',
      type: "'hover' | 'click' | 'focus' | TooltipTrigger[]",
      default: "'hover'",
      description: 'Event(s) that trigger the tooltip'
    },
    {
      name: 'tooltipDelay',
      type: 'number',
      default: '0',
      description: 'Delay in milliseconds before showing the tooltip'
    },
    {
      name: 'tooltipMaxWidth',
      type: 'string',
      default: "'200px'",
      description: 'Maximum width of the tooltip'
    },
    {
      name: 'tooltipDisabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the tooltip is disabled'
    }
  ];

  sections = [
    {
      title: 'Basic Usage',
      description: 'Tooltip is implemented as a directive. Apply it to any element using the appTooltip directive.',
      code: `<!-- Basic tooltip on hover -->
<button 
  appTooltip="This is a helpful tooltip!"
  class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
  Hover over me
</button>

<!-- Tooltip on click -->
<button 
  appTooltip="Click triggered tooltip" 
  tooltipTrigger="click"
  class="px-4 py-2 border border-gray-300 rounded">
  Click me
</button>

<!-- Tooltip on focus -->
<input 
  appTooltip="This field is required" 
  tooltipTrigger="focus"
  placeholder="Focus to see tooltip"
  class="px-4 py-2 border rounded">`
    },
    {
      title: 'Tooltip Positions',
      description: 'Tooltips can be positioned on any side of the element or use auto-positioning.',
      code: `<!-- Top (default) -->
<button 
  appTooltip="Top tooltip" 
  tooltipPosition="top"
  class="px-4 py-2 bg-gray-200 rounded">
  Top
</button>

<!-- Bottom -->
<button 
  appTooltip="Bottom tooltip" 
  tooltipPosition="bottom"
  class="px-4 py-2 bg-gray-200 rounded">
  Bottom
</button>

<!-- Left -->
<button 
  appTooltip="Left tooltip" 
  tooltipPosition="left"
  class="px-4 py-2 bg-gray-200 rounded">
  Left
</button>

<!-- Right -->
<button 
  appTooltip="Right tooltip" 
  tooltipPosition="right"
  class="px-4 py-2 bg-gray-200 rounded">
  Right
</button>

<!-- Auto (adjusts based on available space) -->
<button 
  appTooltip="Auto-positioned tooltip" 
  tooltipPosition="auto"
  class="px-4 py-2 bg-primary text-white rounded">
  Auto Position
</button>`
    },
    {
      title: 'Trigger Options',
      description: 'Control how tooltips are triggered - hover, click, focus, or combinations.',
      code: `<!-- Hover (default) -->
<button 
  appTooltip="Hover tooltip"
  class="px-4 py-2 border rounded">
  Hover trigger
</button>

<!-- Click -->
<button 
  appTooltip="Click tooltip" 
  tooltipTrigger="click"
  class="px-4 py-2 border rounded">
  Click trigger
</button>

<!-- Focus -->
<input 
  appTooltip="Focus tooltip" 
  tooltipTrigger="focus"
  placeholder="Focus trigger"
  class="px-4 py-2 border rounded">

<!-- Multiple triggers -->
<button 
  appTooltip="Multiple triggers" 
  [tooltipTrigger]="['hover', 'click']"
  class="px-4 py-2 border rounded">
  Hover or Click
</button>`
    },
    {
      title: 'Advanced Features',
      description: 'Customize tooltip behavior with delays, max width, and conditional display.',
      code: `<!-- With delay -->
<button 
  appTooltip="Delayed tooltip" 
  [tooltipDelay]="500"
  class="px-4 py-2 bg-primary text-white rounded">
  Wait 500ms
</button>

<!-- Custom max width -->
<button 
  appTooltip="This is a very long tooltip text that will wrap based on the max width setting" 
  tooltipMaxWidth="300px"
  class="px-4 py-2 bg-secondary text-white rounded">
  Long tooltip
</button>

<!-- Disabled tooltip -->
<button 
  appTooltip="This tooltip won't show" 
  [tooltipDisabled]="true"
  class="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed">
  Disabled tooltip
</button>

<!-- Conditional tooltip -->
<button 
  [appTooltip]="isLoading ? 'Processing...' : 'Click to submit'"
  class="px-4 py-2 bg-primary text-white rounded">
  Dynamic tooltip
</button>`
    },
    {
      title: 'With Icons',
      description: 'Tooltips work great with icon buttons and inline help indicators.',
      code: `<!-- Icon buttons -->
<div class="flex gap-4">
  <button 
    appTooltip="Save your changes"
    class="p-2 hover:bg-gray-100 rounded">
    <pst-icon name="save" [size]="20"></pst-icon>
  </button>
  
  <button 
    appTooltip="Delete this item"
    class="p-2 hover:bg-gray-100 rounded text-red-600">
    <pst-icon name="trash" [size]="20"></pst-icon>
  </button>
  
  <button 
    appTooltip="Share this document"
    class="p-2 hover:bg-gray-100 rounded">
    <pst-icon name="share" [size]="20"></pst-icon>
  </button>
</div>

<!-- Inline help -->
<span class="inline-flex items-center gap-1 text-gray-500">
  Premium Feature
  <span appTooltip="This feature requires a premium subscription">
    <pst-icon name="info" [size]="16"></pst-icon>
  </span>
</span>`
    },
    {
      title: 'Form Field Hints',
      description: 'Use tooltips to provide helpful hints and validation messages for form fields.',
      code: `<!-- Password requirements -->
<div class="space-y-4">
  <label class="block">
    <span class="text-sm font-medium">Password</span>
    <span 
      appTooltip="Must be at least 8 characters with uppercase, lowercase, and numbers"
      class="ml-1 text-gray-400">
      <pst-icon name="info" [size]="14"></pst-icon>
    </span>
    <input 
      type="password" 
      class="mt-1 block w-full px-4 py-2 border rounded">
  </label>

  <!-- Validation error -->
  <label class="block">
    <span class="text-sm font-medium">Email</span>
    <input 
      type="email" 
      appTooltip="Please enter a valid email address"
      tooltipTrigger="focus"
      class="mt-1 block w-full px-4 py-2 border border-red-500 rounded">
  </label>
</div>`
    }
  ];

  bestPractices = {
    do: [
      'Keep tooltip text concise and helpful',
      'Use tooltips to clarify icon-only buttons',
      'Position tooltips to avoid covering important content',
      'Provide keyboard accessibility with focus triggers',
      'Use consistent positioning throughout your application',
      'Add delays for hover tooltips to prevent accidental triggers'
    ],
    dont: [
      'Don\'t put essential information only in tooltips',
      'Don\'t use tooltips for very long text - consider a modal instead',
      'Don\'t use tooltips on mobile without click triggers',
      'Don\'t rely solely on hover triggers for important information',
      'Don\'t use tooltips on disabled elements without proper handling',
      'Don\'t nest interactive elements inside tooltips'
    ]
  };

  // Example dynamic property for template
  isLoading = false;
}