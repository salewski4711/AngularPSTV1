import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent, ShowcaseSection } from '../../../shared/showcase-template.component';
import { PlaygroundConfig, PlaygroundProp } from '../../../shared/components/playground.component';
import { ShowcaseProp } from '../../../shared/base-showcase.component';
import { SkeletonComponent } from '../../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'pst-skeleton-showcase',
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
export class SkeletonShowcaseComponent {
  title = 'Skeleton';
  description = 'Loading placeholder for content with animated states.';
  
  props: ShowcaseProp[] = [
    {
      name: 'variant',
      type: "'text' | 'circular' | 'rectangular' | 'button'",
      default: 'text',
      description: 'The type of skeleton to display'
    },
    {
      name: 'width',
      type: 'string',
      default: 'undefined',
      description: 'Custom width (CSS value)'
    },
    {
      name: 'height',
      type: 'string',
      default: 'undefined',
      description: 'Custom height (CSS value)'
    },
    {
      name: 'lines',
      type: 'number',
      default: '3',
      description: 'Number of text lines (for text variant)'
    },
    {
      name: 'animation',
      type: "'pulse' | 'wave' | 'none'",
      default: 'pulse',
      description: 'Animation type'
    },
    {
      name: 'rounded',
      type: 'boolean',
      default: 'false',
      description: 'Apply rounded corners to rectangular variant'
    }
  ];

  playgroundConfig: PlaygroundConfig = {
    component: SkeletonComponent,
    props: this.props.map(prop => this.transformPropToPlayground(prop)),
    code: (props: any) => this.generateCode(props)
  };

  sections: ShowcaseSection[] = [
    {
      title: 'Text Skeletons',
      description: 'Different configurations for text placeholders',
      code: `<!-- Basic text skeleton -->
<pst-skeleton></pst-skeleton>

<!-- Single line -->
<pst-skeleton [lines]="1"></pst-skeleton>

<!-- Multiple lines -->
<pst-skeleton [lines]="5"></pst-skeleton>

<!-- Custom width -->
<pst-skeleton [lines]="2" width="200px"></pst-skeleton>`
    },
    {
      title: 'Shape Variants',
      description: 'Different skeleton shapes for various UI elements',
      code: `<!-- Circular (avatar) -->
<pst-skeleton variant="circular"></pst-skeleton>

<!-- Custom sized circle -->
<pst-skeleton 
  variant="circular" 
  width="80px" 
  height="80px">
</pst-skeleton>

<!-- Rectangular (image/card) -->
<pst-skeleton variant="rectangular"></pst-skeleton>

<!-- Rounded rectangular -->
<pst-skeleton 
  variant="rectangular" 
  [rounded]="true"
  height="200px">
</pst-skeleton>

<!-- Button skeleton -->
<pst-skeleton variant="button"></pst-skeleton>

<!-- Custom button size -->
<pst-skeleton 
  variant="button" 
  width="120px" 
  height="40px">
</pst-skeleton>`
    },
    {
      title: 'Animation Types',
      description: 'Different animation effects for loading states',
      code: `<!-- Pulse animation (default) -->
<pst-skeleton animation="pulse"></pst-skeleton>

<!-- Wave animation -->
<pst-skeleton animation="wave"></pst-skeleton>

<!-- No animation -->
<pst-skeleton animation="none"></pst-skeleton>

<!-- Different animations for comparison -->
<div class="space-y-4">
  <div>
    <p class="text-sm font-medium mb-2">Pulse</p>
    <pst-skeleton animation="pulse" [lines]="2"></pst-skeleton>
  </div>
  <div>
    <p class="text-sm font-medium mb-2">Wave</p>
    <pst-skeleton animation="wave" [lines]="2"></pst-skeleton>
  </div>
</div>`
    },
    {
      title: 'Complex Layouts',
      description: 'Combining skeletons for complete UI patterns',
      code: `<!-- Card skeleton -->
<div class="border rounded-lg p-4 space-y-4">
  <div class="flex items-center space-x-4">
    <pst-skeleton variant="circular" width="40px" height="40px"></pst-skeleton>
    <div class="flex-1">
      <pst-skeleton [lines]="1" width="150px"></pst-skeleton>
      <pst-skeleton [lines]="1" width="100px" class="mt-2"></pst-skeleton>
    </div>
  </div>
  <pst-skeleton [lines]="3"></pst-skeleton>
  <div class="flex space-x-2">
    <pst-skeleton variant="button" width="80px"></pst-skeleton>
    <pst-skeleton variant="button" width="80px"></pst-skeleton>
  </div>
</div>

<!-- List skeleton -->
<div class="space-y-4">
  <div class="flex items-center space-x-4" *ngFor="let item of [1, 2, 3]">
    <pst-skeleton variant="circular" width="48px" height="48px"></pst-skeleton>
    <div class="flex-1">
      <pst-skeleton [lines]="1" width="60%"></pst-skeleton>
      <pst-skeleton [lines]="1" width="40%" class="mt-1"></pst-skeleton>
    </div>
  </div>
</div>`
    },
    {
      title: 'Real-world Examples',
      description: 'Practical skeleton patterns for common UI scenarios',
      code: `<!-- Article skeleton -->
<article class="max-w-2xl">
  <pst-skeleton [lines]="1" width="80%" class="mb-4"></pst-skeleton>
  <div class="flex items-center space-x-2 mb-6">
    <pst-skeleton variant="circular" width="32px" height="32px"></pst-skeleton>
    <pst-skeleton [lines]="1" width="120px"></pst-skeleton>
    <pst-skeleton [lines]="1" width="80px"></pst-skeleton>
  </div>
  <pst-skeleton 
    variant="rectangular" 
    height="300px" 
    [rounded]="true"
    class="mb-6">
  </pst-skeleton>
  <pst-skeleton [lines]="4"></pst-skeleton>
</article>

<!-- Product grid skeleton -->
<div class="grid grid-cols-3 gap-4">
  <div class="space-y-3" *ngFor="let item of [1, 2, 3]">
    <pst-skeleton 
      variant="rectangular" 
      height="200px"
      [rounded]="true">
    </pst-skeleton>
    <pst-skeleton [lines]="2"></pst-skeleton>
    <div class="flex justify-between items-center">
      <pst-skeleton [lines]="1" width="60px"></pst-skeleton>
      <pst-skeleton variant="button" width="100px"></pst-skeleton>
    </div>
  </div>
</div>

<!-- Form skeleton -->
<div class="space-y-4 max-w-md">
  <div>
    <pst-skeleton [lines]="1" width="80px" class="mb-2"></pst-skeleton>
    <pst-skeleton variant="rectangular" height="40px"></pst-skeleton>
  </div>
  <div>
    <pst-skeleton [lines]="1" width="100px" class="mb-2"></pst-skeleton>
    <pst-skeleton variant="rectangular" height="40px"></pst-skeleton>
  </div>
  <div>
    <pst-skeleton [lines]="1" width="120px" class="mb-2"></pst-skeleton>
    <pst-skeleton variant="rectangular" height="100px"></pst-skeleton>
  </div>
  <pst-skeleton variant="button" width="100%" height="44px"></pst-skeleton>
</div>`
    }
  ];

  bestPractices = {
    do: [
      'Use skeletons for content that takes time to load',
      'Match skeleton dimensions closely to actual content',
      'Use appropriate animations based on user experience needs',
      'Provide skeletons for all visible content during loading',
      'Keep skeleton layouts consistent with loaded content'
    ],
    dont: [
      'Don\'t use skeletons for instant content',
      'Don\'t mix different animation types in the same view',
      'Don\'t show skeletons for too long without progress indication',
      'Don\'t use overly complex skeleton layouts',
      'Don\'t forget to remove skeletons once content loads'
    ]
  };

  private transformPropToPlayground(prop: ShowcaseProp): PlaygroundProp {
    const playgroundProp: PlaygroundProp = {
      name: prop.name,
      type: prop.type.includes('|') ? 'enum' : 
            prop.type === 'boolean' ? 'boolean' : 
            prop.type === 'number' ? 'number' : 'string',
      defaultValue: prop.default
    };

    // Handle select options
    if (prop.type.includes('|')) {
      playgroundProp.options = prop.type
        .split('|')
        .map(option => option.trim().replace(/'/g, ''));
    }

    // Add min/max for lines prop
    if (prop.name === 'lines') {
      playgroundProp.min = 1;
      playgroundProp.max = 10;
    }

    return playgroundProp;
  }

  private generateCode(props: any): string {
    const attributes: string[] = [];
    
    if (props.variant && props.variant !== 'text') {
      attributes.push(`variant="${props.variant}"`);
    }
    if (props.width) {
      attributes.push(`width="${props.width}"`);
    }
    if (props.height) {
      attributes.push(`height="${props.height}"`);
    }
    if (props.variant === 'text' && props.lines && props.lines !== 3) {
      attributes.push(`[lines]="${props.lines}"`);
    }
    if (props.animation && props.animation !== 'pulse') {
      attributes.push(`animation="${props.animation}"`);
    }
    if (props.rounded) {
      attributes.push('[rounded]="true"');
    }
    
    return `<pst-skeleton${attributes.length > 0 ? '\n  ' + attributes.join('\n  ') : ''}>
</pst-skeleton>`;
  }
}