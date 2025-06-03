import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { BaseShowcaseComponent } from '../../../shared/base-showcase.component';
import { TooltipDirective } from '../../../../../shared/components/tooltip/tooltip.directive';
import { IconComponent } from '../../../../../shared/icons/icon.component';

@Component({
  selector: 'app-tooltip-showcase',
  standalone: true,
  imports: [
    CommonModule,
    TooltipDirective,
    IconComponent,
    PropsTableComponent,
    CodeBlockComponent
  ],
  template: `
    <div class="space-y-12">
      <!-- Header -->
      <div>
        <h2 class="text-3xl font-bold mb-4">{{ title }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ description }}</p>
      </div>

      <!-- Note: Tooltip is a directive, not a component, so no playground -->
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p class="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> Tooltip is implemented as a directive, not a component. 
          Apply it to any element using the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">appTooltip</code> directive.
        </p>
      </div>

      <!-- Props Table -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Directive Inputs</h3>
        <app-props-table [props]="props"></app-props-table>
      </div>

      <!-- Basic Example -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Basic Usage</h3>
        <app-code-block [code]="examples['basic']" language="html"></app-code-block>
        
        <!-- Live Demo -->
        <div class="mt-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div class="flex gap-4 items-center justify-center">
            <button 
              appTooltip="This is a tooltip!" 
              class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
              Hover me
            </button>
            <button 
              appTooltip="Click to see tooltip" 
              tooltipTrigger="click"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Click me
            </button>
          </div>
        </div>
      </div>

      <!-- Positions -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Tooltip Positions</h3>
        <app-code-block [code]="examples['positions']" language="html"></app-code-block>
        
        <!-- Live Demo -->
        <div class="mt-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div class="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div></div>
            <button 
              appTooltip="Top tooltip" 
              tooltipPosition="top"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
              Top
            </button>
            <div></div>
            
            <button 
              appTooltip="Left tooltip" 
              tooltipPosition="left"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
              Left
            </button>
            <button 
              appTooltip="Auto position" 
              tooltipPosition="auto"
              class="px-4 py-2 bg-primary text-white rounded">
              Auto
            </button>
            <button 
              appTooltip="Right tooltip" 
              tooltipPosition="right"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
              Right
            </button>
            
            <div></div>
            <button 
              appTooltip="Bottom tooltip" 
              tooltipPosition="bottom"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
              Bottom
            </button>
            <div></div>
          </div>
        </div>
      </div>

      <!-- Triggers -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Trigger Options</h3>
        <app-code-block [code]="examples['triggers']" language="html"></app-code-block>
        
        <!-- Live Demo -->
        <div class="mt-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div class="flex gap-4 items-center justify-center flex-wrap">
            <button 
              appTooltip="Hover trigger (default)" 
              class="px-4 py-2 border rounded">
              Hover
            </button>
            <button 
              appTooltip="Click trigger" 
              tooltipTrigger="click"
              class="px-4 py-2 border rounded">
              Click
            </button>
            <input 
              appTooltip="Focus trigger" 
              tooltipTrigger="focus"
              placeholder="Focus me"
              class="px-4 py-2 border rounded">
            <button 
              appTooltip="Multiple triggers" 
              [tooltipTrigger]="['hover', 'click']"
              class="px-4 py-2 border rounded">
              Hover or Click
            </button>
          </div>
        </div>
      </div>

      <!-- Advanced Features -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Advanced Features</h3>
        <app-code-block [code]="examples['advanced']" language="html"></app-code-block>
      </div>

      <!-- With Icons -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Tooltips with Icons</h3>
        <app-code-block [code]="examples['withIcons']" language="html"></app-code-block>
        
        <!-- Live Demo -->
        <div class="mt-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div class="flex gap-4 items-center justify-center">
            <button 
              appTooltip="Save your changes"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <app-icon name="save" [size]="20"></app-icon>
            </button>
            <button 
              appTooltip="Delete this item"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-600">
              <app-icon name="trash" [size]="20"></app-icon>
            </button>
            <span 
              appTooltip="This feature requires a premium subscription"
              class="inline-flex items-center gap-1 text-gray-500">
              Premium Feature
              <app-icon name="info" [size]="16"></app-icon>
            </span>
          </div>
        </div>
      </div>

      <!-- Real-world Examples -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Real-world Examples</h3>
        <app-code-block [code]="examples['realWorld']" language="html"></app-code-block>
      </div>
    </div>
  `
})
export class TooltipShowcaseComponent extends BaseShowcaseComponent {
  title = 'Tooltip';
  description = 'A directive-based tooltip component that displays helpful text when users hover, click, or focus on an element.';
  component = TooltipDirective as any; // Directive, not component

  props = [
    {
      name: 'appTooltip',
      type: 'string',
      default: "''",
      description: 'The tooltip content to display'
    },
    {
      name: 'tooltipPosition',
      type: "'top' | 'bottom' | 'left' | 'right' | 'auto'",
      default: 'top',
      description: 'Position of the tooltip relative to the element'
    },
    {
      name: 'tooltipTrigger',
      type: 'string',
      default: 'hover',
      description: 'Event(s) that trigger the tooltip (space-separated)'
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
      default: '200px',
      description: 'Maximum width of the tooltip'
    },
    {
      name: 'tooltipDisabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable the tooltip'
    }
  ];

  examples = {
    basic: `<!-- Basic tooltip on hover -->
<button appTooltip="This is a helpful tooltip!">
  Hover over me
</button>

<!-- Tooltip on click -->
<button 
  appTooltip="Click triggered tooltip" 
  tooltipTrigger="click">
  Click me
</button>

<!-- Tooltip on focus -->
<input 
  appTooltip="This field is required" 
  tooltipTrigger="focus"
  placeholder="Focus to see tooltip">`,

    positions: `<!-- Top (default) -->
<button appTooltip="Top tooltip" tooltipPosition="top">
  Top
</button>

<!-- Bottom -->
<button appTooltip="Bottom tooltip" tooltipPosition="bottom">
  Bottom
</button>

<!-- Left -->
<button appTooltip="Left tooltip" tooltipPosition="left">
  Left
</button>

<!-- Right -->
<button appTooltip="Right tooltip" tooltipPosition="right">
  Right
</button>

<!-- Auto (adjusts based on available space) -->
<button appTooltip="Auto-positioned tooltip" tooltipPosition="auto">
  Auto Position
</button>`,

    triggers: `<!-- Hover (default) -->
<button appTooltip="Hover tooltip">
  Hover trigger
</button>

<!-- Click -->
<button appTooltip="Click tooltip" tooltipTrigger="click">
  Click trigger
</button>

<!-- Focus -->
<input 
  appTooltip="Focus tooltip" 
  tooltipTrigger="focus"
  placeholder="Focus trigger">

<!-- Multiple triggers -->
<button 
  appTooltip="Multiple triggers" 
  tooltipTrigger="hover click">
  Hover or Click
</button>`,

    advanced: `<!-- With delay -->
<button 
  appTooltip="Delayed tooltip" 
  [tooltipDelay]="500">
  Wait 500ms
</button>

<!-- Custom max width -->
<button 
  appTooltip="This is a very long tooltip text that will wrap based on the max width setting" 
  tooltipMaxWidth="300px">
  Long tooltip
</button>

<!-- Disabled tooltip -->
<button 
  appTooltip="This won't show" 
  [tooltipDisabled]="true">
  Disabled tooltip
</button>

<!-- Conditional tooltip -->
<button 
  [appTooltip]="isLoggedIn ? 'Click to view profile' : 'Please log in first'"
  [tooltipDisabled]="!showTooltips">
  Profile
</button>`,

    withIcons: `<!-- Icon with tooltip -->
<button appTooltip="Save your changes" class="icon-button">
  <app-icon name="save" [size]="20"></app-icon>
</button>

<!-- Help icon with info -->
<span appTooltip="This field accepts only numbers">
  <app-icon name="info" [size]="16" class="text-gray-500"></app-icon>
</span>

<!-- Icon button group -->
<div class="button-group">
  <button appTooltip="Bold" tooltipPosition="top">
    <app-icon name="bold"></app-icon>
  </button>
  <button appTooltip="Italic" tooltipPosition="top">
    <app-icon name="italic"></app-icon>
  </button>
  <button appTooltip="Underline" tooltipPosition="top">
    <app-icon name="underline"></app-icon>
  </button>
</div>`,

    realWorld: `<!-- Form field with validation tooltip -->
<div class="form-group">
  <label>Email Address</label>
  <input 
    type="email"
    appTooltip="Please enter a valid email address"
    tooltipTrigger="focus"
    tooltipPosition="right"
    [tooltipDisabled]="!hasError">
</div>

<!-- Truncated text with full content in tooltip -->
<p class="truncate w-48" 
   [appTooltip]="fullText"
   tooltipMaxWidth="400px">
  {{ truncatedText }}
</p>

<!-- Action buttons with descriptions -->
<div class="action-bar">
  <button 
    appTooltip="Export data as CSV file"
    tooltipPosition="bottom">
    <app-icon name="download"></app-icon>
    Export
  </button>
  
  <button 
    appTooltip="Share with team members"
    tooltipPosition="bottom">
    <app-icon name="users"></app-icon>
    Share
  </button>
  
  <button 
    appTooltip="Delete permanently (cannot be undone)"
    tooltipPosition="bottom"
    class="text-red-600">
    <app-icon name="trash"></app-icon>
    Delete
  </button>
</div>

<!-- Disabled feature with explanation -->
<button 
  appTooltip="This feature is available in the Pro plan"
  tooltipTrigger="hover"
  disabled
  class="opacity-50 cursor-not-allowed">
  <app-icon name="star"></app-icon>
  Premium Feature
</button>`
  };
}