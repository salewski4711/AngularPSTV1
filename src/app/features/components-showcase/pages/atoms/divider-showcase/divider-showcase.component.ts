import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { PlaygroundConfig } from '../../../shared/components/playground.component';
import { DividerComponent } from '../../../../../shared/components/divider/divider.component';
import * as examples from './examples';

@Component({
  selector: 'pst-divider-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ShowcaseTemplateComponent
  ],
  template: `
    <pst-showcase-template
      [title]="title"
      [description]="description"
      [playgroundConfig]="playgroundConfig"
      [props]="props"
      [sections]="sections"
      [bestPractices]="bestPractices">
    </pst-showcase-template>
  `
})
export class DividerShowcaseComponent {
  title = 'Divider';
  description = 'Visual separator for content sections with horizontal and vertical orientations.';

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
      type: "'default' | 'primary' | 'secondary' | 'light' | 'dark'",
      default: 'default',
      description: 'Color variant of the divider'
    },
    {
      name: 'thickness',
      type: "'thin' | 'medium' | 'thick'",
      default: 'medium',
      description: 'Thickness of the divider line'
    }
  ];

  playgroundConfig: PlaygroundConfig = {
    component: DividerComponent,
    props: [
      {
        name: 'orientation',
        type: 'enum' as const,
        options: ['horizontal', 'vertical'],
        defaultValue: 'horizontal'
      },
      {
        name: 'variant',
        type: 'enum' as const,
        options: ['solid', 'dashed', 'dotted'],
        defaultValue: 'solid'
      },
      {
        name: 'spacing',
        type: 'enum' as const,
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md'
      },
      {
        name: 'color',
        type: 'enum' as const,
        options: ['default', 'primary', 'secondary', 'light', 'dark'],
        defaultValue: 'default'
      },
      {
        name: 'thickness',
        type: 'enum' as const,
        options: ['thin', 'medium', 'thick'],
        defaultValue: 'medium'
      },
      {
        name: 'label',
        type: 'string' as const,
        defaultValue: ''
      }
    ],
    code: (props: any) => `<pst-divider${props.orientation !== 'horizontal' ? `
  [orientation]="${props.orientation}"` : ''}${props.variant !== 'solid' ? `
  [variant]="${props.variant}"` : ''}${props.spacing !== 'md' ? `
  [spacing]="${props.spacing}"` : ''}${props.color !== 'default' ? `
  [color]="${props.color}"` : ''}${props.thickness !== 'medium' ? `
  [thickness]="${props.thickness}"` : ''}${props.label ? `
  label="${props.label}"` : ''}>
</pst-divider>`
  };

  sections = [
    {
      title: 'Basic Usage',
      description: 'The most common use cases for dividers.',
      code: examples.basicExample
    },
    {
      title: 'Orientations',
      description: 'Horizontal and vertical divider orientations.',
      code: examples.orientationsExample
    },
    {
      title: 'Variants',
      description: 'Different visual styles for dividers.',
      code: examples.variantsExample
    },
    {
      title: 'With Labels',
      description: 'Dividers can include text labels for section separation.',
      code: examples.withLabelExample
    },
    {
      title: 'Spacing',
      description: 'Control the vertical space around dividers.',
      code: examples.spacingExample
    },
    {
      title: 'Thickness',
      description: 'Different line thickness options.',
      code: examples.thicknessExample
    },
    {
      title: 'Colors',
      description: 'Apply different color schemes to match your design.',
      code: examples.colorsExample
    },
    {
      title: 'Vertical Orientation',
      description: 'Use vertical dividers to separate inline content.',
      code: examples.verticalExample
    }
  ];

  bestPractices = {
    do: [
      'Use dividers to create clear visual separation between content sections',
      'Match divider color to your design system for consistency',
      'Use labels on dividers to provide context for the separation',
      'Choose appropriate spacing based on the surrounding content density',
      'Use vertical dividers in navigation bars or button groups'
    ],
    dont: [
      'Overuse dividers - too many can create visual clutter',
      'Use dividers as the only method of content separation',
      'Mix different divider styles inconsistently within the same context',
      'Use vertical dividers without proper height constraints',
      'Rely on dividers alone for accessibility - use proper semantic HTML'
    ]
  };
}