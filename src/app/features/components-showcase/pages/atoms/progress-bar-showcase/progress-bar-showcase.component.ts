import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { PlaygroundComponent, PlaygroundProp } from '../../../shared/components/playground.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { BaseShowcaseComponent } from '../../../shared/base-showcase.component';

@Component({
  selector: 'app-progress-bar-showcase',
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
        <p class="text-gray-600 dark:text-gray-400">
          {{ description }}
        </p>
      </div>

      <!-- Interactive Playground -->
      <app-playground 
        [config]="playgroundConfig">
      </app-playground>

      <!-- Props Table -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Props</h3>
        <app-props-table [props]="props"></app-props-table>
      </div>

      <!-- Linear Progress -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Linear Progress</h3>
        <app-code-block 
          [code]="examples['linear']"
          language="html">
        </app-code-block>
      </div>

      <!-- Segmented Progress -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Segmented Progress</h3>
        <app-code-block 
          [code]="examples['segmented']"
          language="html">
        </app-code-block>
      </div>

      <!-- Circular Progress -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Circular Progress</h3>
        <app-code-block 
          [code]="examples['circular']"
          language="html">
        </app-code-block>
      </div>

      <!-- Colors -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Progress Colors</h3>
        <app-code-block 
          [code]="examples['colors']"
          language="html">
        </app-code-block>
      </div>

      <!-- Real-world Examples -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Real-world Examples</h3>
        <app-code-block 
          [code]="examples['realWorld']"
          language="html">
        </app-code-block>
      </div>
    </div>
  `
})
export class ProgressBarShowcaseComponent extends BaseShowcaseComponent {
  component = ProgressBarComponent;
  title = 'Progress Bar';
  description = 'Visual indicator for task completion with linear, segmented, and circular variants.';
  props = [
    {
      name: 'variant',
      type: "'linear' | 'segmented' | 'circular'",
      default: 'linear',
      description: 'The visual style of the progress bar'
    },
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Progress value from 0 to 100'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Size of the progress bar'
    },
    {
      name: 'color',
      type: "'primary' | 'success' | 'warning' | 'error' | 'info'",
      default: 'primary',
      description: 'Color variant of the progress bar'
    },
    {
      name: 'label',
      type: 'string',
      default: 'undefined',
      description: 'Label text to display'
    },
    {
      name: 'showLabel',
      type: 'boolean',
      default: 'true',
      description: 'Whether to show the label'
    },
    {
      name: 'animated',
      type: 'boolean',
      default: 'true',
      description: 'Enable animations'
    },
    {
      name: 'segments',
      type: 'number',
      default: '4',
      description: 'Number of segments (for segmented variant)'
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Show indeterminate progress animation'
    }
  ];

  // Override base class methods for custom playground behavior
  protected override transformPropToPlayground(prop: any): PlaygroundProp {
    const playgroundProp = super.transformPropToPlayground(prop);
    
    // Add min/max for value prop
    if (prop.name === 'value') {
      playgroundProp.min = 0;
      playgroundProp.max = 100;
    }
    
    // Add min/max for segments prop
    if (prop.name === 'segments') {
      playgroundProp.min = 2;
      playgroundProp.max = 10;
    }
    
    return playgroundProp;
  }

  protected override createPlaygroundProps(): any {
    // Get base props and add label content prop
    const baseProps = super.createPlaygroundProps();
    return baseProps;
  }

  protected override generateCode(props: any): string {
    const attributes: string[] = [];
    
    if (props.variant && props.variant !== 'linear') {
      attributes.push(`variant="${props.variant}"`);
    }
    
    attributes.push(`[value]="${props.value || 0}"`);
    
    if (props.size && props.size !== 'md') {
      attributes.push(`size="${props.size}"`);
    }
    if (props.color && props.color !== 'primary') {
      attributes.push(`color="${props.color}"`);
    }
    if (props.label) {
      attributes.push(`label="${props.label}"`);
    }
    if (props.showLabel === false) {
      attributes.push('[showLabel]="false"');
    }
    if (props.animated === false) {
      attributes.push('[animated]="false"');
    }
    if (props.variant === 'segmented' && props.segments && props.segments !== 4) {
      attributes.push(`[segments]="${props.segments}"`);
    }
    
    return `<app-progress-bar
  ${attributes.join('\n  ')}>
</app-progress-bar>`;
  }

  examples: Record<string, string> = {
    linear: `<!-- Basic linear progress -->
<app-progress-bar 
  [value]="25">
</app-progress-bar>

<!-- With custom label -->
<app-progress-bar 
  [value]="60" 
  label="Uploading files...">
</app-progress-bar>

<!-- Without label -->
<app-progress-bar 
  [value]="75" 
  [showLabel]="false">
</app-progress-bar>

<!-- Different sizes -->
<app-progress-bar [value]="40" size="sm"></app-progress-bar>
<app-progress-bar [value]="40" size="md"></app-progress-bar>
<app-progress-bar [value]="40" size="lg"></app-progress-bar>`,

    segmented: `<!-- 4 segments (default) -->
<app-progress-bar 
  variant="segmented" 
  [value]="50"
  label="Step 2 of 4">
</app-progress-bar>

<!-- 5 segments -->
<app-progress-bar 
  variant="segmented" 
  [value]="60"
  [segments]="5"
  label="Installation Progress">
</app-progress-bar>

<!-- Custom segments with color -->
<app-progress-bar 
  variant="segmented" 
  [value]="75"
  [segments]="8"
  color="success">
</app-progress-bar>`,

    circular: `<!-- Basic circular progress -->
<app-progress-bar 
  variant="circular" 
  [value]="35">
</app-progress-bar>

<!-- Different sizes -->
<div class="flex gap-4 items-center">
  <app-progress-bar variant="circular" [value]="25" size="sm"></app-progress-bar>
  <app-progress-bar variant="circular" [value]="50" size="md"></app-progress-bar>
  <app-progress-bar variant="circular" [value]="75" size="lg"></app-progress-bar>
</div>

<!-- Without label -->
<app-progress-bar 
  variant="circular" 
  [value]="80"
  [showLabel]="false">
</app-progress-bar>`,

    colors: `<!-- Primary (default) -->
<app-progress-bar [value]="20" color="primary"></app-progress-bar>

<!-- Success -->
<app-progress-bar [value]="40" color="success"></app-progress-bar>

<!-- Warning -->
<app-progress-bar [value]="60" color="warning"></app-progress-bar>

<!-- Error -->
<app-progress-bar [value]="80" color="error"></app-progress-bar>

<!-- Info -->
<app-progress-bar [value]="100" color="info"></app-progress-bar>`,

    realWorld: `<!-- File upload progress -->
<div class="space-y-4">
  <div class="p-4 border rounded-lg">
    <div class="flex justify-between mb-2">
      <span class="font-medium">document.pdf</span>
      <span class="text-sm text-gray-500">2.4 MB</span>
    </div>
    <app-progress-bar 
      [value]="67" 
      size="sm"
      label="Uploading...">
    </app-progress-bar>
  </div>
</div>

<!-- Multi-step process -->
<div class="space-y-6">
  <div>
    <h4 class="font-medium mb-3">Installation Progress</h4>
    <app-progress-bar 
      variant="segmented" 
      [value]="60"
      [segments]="5"
      color="primary"
      label="Step 3: Configuring settings">
    </app-progress-bar>
  </div>
</div>

<!-- Dashboard stats -->
<div class="grid grid-cols-3 gap-4">
  <div class="text-center">
    <app-progress-bar 
      variant="circular" 
      [value]="85"
      color="success"
      size="lg">
    </app-progress-bar>
    <p class="mt-2 text-sm font-medium">Storage Used</p>
  </div>
  <div class="text-center">
    <app-progress-bar 
      variant="circular" 
      [value]="42"
      color="warning"
      size="lg">
    </app-progress-bar>
    <p class="mt-2 text-sm font-medium">CPU Usage</p>
  </div>
  <div class="text-center">
    <app-progress-bar 
      variant="circular" 
      [value]="95"
      color="error"
      size="lg">
    </app-progress-bar>
    <p class="mt-2 text-sm font-medium">Memory Usage</p>
  </div>
</div>`
  };
}