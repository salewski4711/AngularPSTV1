import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../../shared/components/divider/divider.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { PlaygroundComponent } from '../../../shared/components/playground.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { BaseShowcaseComponent } from '../../../shared/base-showcase.component';

@Component({
  selector: 'app-divider-showcase',
  standalone: true,
  imports: [
    CommonModule,
    PlaygroundComponent,
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

      <!-- Interactive Playground -->
      <app-playground [config]="playgroundConfig"></app-playground>

      <!-- Props Table -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Props</h3>
        <app-props-table [props]="props"></app-props-table>
      </div>

      <!-- Examples -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Basic Dividers</h3>
        <app-code-block [code]="examples['basic']" language="html"></app-code-block>
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-6">Divider Variants</h3>
        <app-code-block [code]="examples['variants']" language="html"></app-code-block>
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-6">Dividers with Labels</h3>
        <app-code-block [code]="examples['labels']" language="html"></app-code-block>
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-6">Vertical Dividers</h3>
        <app-code-block [code]="examples['vertical']" language="html"></app-code-block>
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-6">Real-world Examples</h3>
        <app-code-block [code]="examples['realWorld']" language="html"></app-code-block>
      </div>
    </div>
  `
})
export class DividerShowcaseComponent extends BaseShowcaseComponent {
  title = 'Divider';
  description = 'Visual separator for content sections with horizontal and vertical orientations.';
  component = DividerComponent;

  props = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: 'horizontal',
      description: 'The orientation of the divider'
    },
    {
      name: 'variant',
      type: "'solid' | 'dashed' | 'dotted'",
      default: 'solid',
      description: 'The style variant of the divider'
    },
    {
      name: 'spacing',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'The spacing around the divider'
    },
    {
      name: 'label',
      type: 'string',
      default: 'undefined',
      description: 'Optional label text to display on the divider'
    },
    {
      name: 'color',
      type: 'string',
      default: 'undefined',
      description: 'Custom color classes for the divider'
    }
  ];

  examples = {
    basic: `<!-- Basic horizontal divider -->
<app-divider></app-divider>

<!-- With spacing variations -->
<app-divider spacing="sm"></app-divider>
<app-divider spacing="md"></app-divider>
<app-divider spacing="lg"></app-divider>`,

    variants: `<!-- Solid divider (default) -->
<app-divider variant="solid"></app-divider>

<!-- Dashed divider -->
<app-divider variant="dashed"></app-divider>

<!-- Dotted divider -->
<app-divider variant="dotted"></app-divider>`,

    labels: `<!-- Divider with label -->
<app-divider label="OR"></app-divider>

<!-- Divider with longer label -->
<app-divider label="Continue with"></app-divider>

<!-- Colored divider with label -->
<app-divider 
  label="Section Break" 
  color="border-primary">
</app-divider>`,

    vertical: `<!-- Vertical divider in flex container -->
<div class="flex items-center h-12">
  <span>Option 1</span>
  <app-divider orientation="vertical"></app-divider>
  <span>Option 2</span>
  <app-divider orientation="vertical"></app-divider>
  <span>Option 3</span>
</div>`,

    realWorld: `<!-- Login form with social options -->
<div class="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg">
  <form class="space-y-4">
    <input type="email" placeholder="Email" class="w-full px-4 py-2 border rounded">
    <input type="password" placeholder="Password" class="w-full px-4 py-2 border rounded">
    <button class="w-full bg-primary text-white py-2 rounded">Sign In</button>
  </form>
  
  <app-divider label="OR" spacing="lg"></app-divider>
  
  <div class="space-y-2">
    <button class="w-full border py-2 rounded">Continue with Google</button>
    <button class="w-full border py-2 rounded">Continue with GitHub</button>
  </div>
</div>

<!-- Card sections -->
<div class="bg-white dark:bg-gray-800 rounded-lg p-6">
  <div>
    <h3 class="font-semibold text-lg">User Profile</h3>
    <p class="text-gray-600">john&#64;example.com</p>
  </div>
  
  <app-divider spacing="md"></app-divider>
  
  <div>
    <h4 class="font-medium mb-2">Preferences</h4>
    <label class="flex items-center">
      <input type="checkbox" class="mr-2"> Email notifications
    </label>
  </div>
</div>`
  };
}