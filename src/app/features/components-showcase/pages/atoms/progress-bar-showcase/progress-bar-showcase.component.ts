import { Component } from '@angular/core';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { PlaygroundConfig } from '../../../shared/components/playground.component';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'pst-progress-bar-showcase',
  standalone: true,
  imports: [ShowcaseTemplateComponent],
  template: `
    <pst-showcase-template
      title="Progress Bar"
      description="Visual indicator for task completion with linear and circular variants."
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices"
      [playgroundConfig]="playgroundConfig">
    </pst-showcase-template>
  `
})
export class ProgressBarShowcaseComponent {
  props = [
    {
      name: 'variant',
      type: "'linear' | 'circular'",
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
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Show indeterminate progress animation'
    }
  ];

  bestPractices = {
    do: [
      'Use progress bars to show the completion status of tasks',
      'Include labels to provide context about what is loading',
      'Use appropriate colors to indicate status (success, warning, error)',
      'Choose the right variant for your use case (linear for general, circular for space-constrained areas)',
      'Animate progress changes for smooth user experience',
      'Use indeterminate state when progress cannot be calculated'
    ],
    dont: [
      'Don\'t use progress bars for instant operations',
      'Don\'t hide progress bars abruptly - fade them out smoothly',
      'Don\'t use circular progress bars for multi-step processes',
      'Don\'t forget to handle error states in long-running operations',
      'Don\'t mix different progress bar styles in the same context'
    ]
  };

  playgroundConfig: PlaygroundConfig = {
    component: ProgressBarComponent,
    props: [
          {
            name: 'variant',
            type: 'enum' as const,
            defaultValue: 'linear',
            options: ['linear', 'circular']
          },
          {
            name: 'value',
            type: 'number' as const,
            defaultValue: 50,
            min: 0,
            max: 100
          },
          {
            name: 'size',
            type: 'enum' as const,
            defaultValue: 'md',
            options: ['sm', 'md', 'lg']
          },
          {
            name: 'color',
            type: 'enum' as const,
            defaultValue: 'primary',
            options: ['primary', 'success', 'warning', 'error', 'info']
          },
          {
            name: 'label',
            type: 'string' as const,
            defaultValue: 'Loading...'
          },
          {
            name: 'showLabel',
            type: 'boolean' as const,
            defaultValue: true
          },
          {
            name: 'animated',
            type: 'boolean' as const,
            defaultValue: true
          },
          {
            name: 'indeterminate',
            type: 'boolean' as const,
            defaultValue: false
        }
      ],
      code: (props: any) => `<pst-progress-bar${props.variant !== 'linear' ? `
  variant="${props.variant}"` : ''}
  [value]="${props.value}"${props.size !== 'md' ? `
  size="${props.size}"` : ''}${props.color !== 'primary' ? `
  color="${props.color}"` : ''}${props.label ? `
  label="${props.label}"` : ''}${props.showLabel === false ? `
  [showLabel]="false"` : ''}${props.animated === false ? `
  [animated]="false"` : ''}${props.indeterminate ? `
  [indeterminate]="true"` : ''}>
</pst-progress-bar>`
    };

  sections = [
    {
      title: 'Linear Progress',
      description: 'The default progress bar style for showing linear completion.',
      code: `<!-- Basic linear progress -->
<pst-progress-bar 
  [value]="25">
</pst-progress-bar>

<!-- With custom label -->
<pst-progress-bar 
  [value]="60" 
  label="Uploading files...">
</pst-progress-bar>

<!-- Without label -->
<pst-progress-bar 
  [value]="75" 
  [showLabel]="false">
</pst-progress-bar>

<!-- Different sizes -->
<pst-progress-bar [value]="40" size="sm"></pst-progress-bar>
<pst-progress-bar [value]="40" size="md"></pst-progress-bar>
<pst-progress-bar [value]="40" size="lg"></pst-progress-bar>`
    },
    {
      title: 'Circular Progress',
      description: 'Compact circular progress indicator for space-constrained areas.',
      code: `<!-- Basic circular progress -->
<pst-progress-bar 
  variant="circular" 
  [value]="35">
</pst-progress-bar>

<!-- Different sizes -->
<div class="flex gap-4 items-center">
  <pst-progress-bar variant="circular" [value]="25" size="sm"></pst-progress-bar>
  <pst-progress-bar variant="circular" [value]="50" size="md"></pst-progress-bar>
  <pst-progress-bar variant="circular" [value]="75" size="lg"></pst-progress-bar>
</div>

<!-- Without label -->
<pst-progress-bar 
  variant="circular" 
  [value]="80"
  [showLabel]="false">
</pst-progress-bar>`
    },
    {
      title: 'Progress Colors',
      description: 'Different color variants to indicate status or severity.',
      code: `<!-- Primary (default) -->
<pst-progress-bar [value]="20" color="primary"></pst-progress-bar>

<!-- Success -->
<pst-progress-bar [value]="40" color="success"></pst-progress-bar>

<!-- Warning -->
<pst-progress-bar [value]="60" color="warning"></pst-progress-bar>

<!-- Error -->
<pst-progress-bar [value]="80" color="error"></pst-progress-bar>

<!-- Info -->
<pst-progress-bar [value]="100" color="info"></pst-progress-bar>`
    },
    {
      title: 'Real-world Examples',
      description: 'Practical implementations of progress bars in common UI patterns.',
      code: `<!-- File upload progress -->
<div class="space-y-4">
  <div class="p-4 border rounded-lg">
    <div class="flex justify-between mb-2">
      <span class="font-medium">document.pdf</span>
      <span class="text-sm text-gray-500">2.4 MB</span>
    </div>
    <pst-progress-bar 
      [value]="67" 
      size="sm"
      label="Uploading...">
    </pst-progress-bar>
  </div>
</div>

<!-- Dashboard stats -->
<div class="grid grid-cols-3 gap-4">
  <div class="text-center">
    <pst-progress-bar 
      variant="circular" 
      [value]="85"
      color="success"
      size="lg">
    </pst-progress-bar>
    <p class="mt-2 text-sm font-medium">Storage Used</p>
  </div>
  <div class="text-center">
    <pst-progress-bar 
      variant="circular" 
      [value]="42"
      color="warning"
      size="lg">
    </pst-progress-bar>
    <p class="mt-2 text-sm font-medium">CPU Usage</p>
  </div>
  <div class="text-center">
    <pst-progress-bar 
      variant="circular" 
      [value]="95"
      color="error"
      size="lg">
    </pst-progress-bar>
    <p class="mt-2 text-sm font-medium">Memory Usage</p>
  </div>
</div>`
    }
  ];
}