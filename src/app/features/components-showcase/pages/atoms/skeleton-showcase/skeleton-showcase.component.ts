import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../../../../shared/components/skeleton/skeleton.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { PlaygroundComponent, PlaygroundProp } from '../../../shared/components/playground.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { BaseShowcaseComponent } from '../../../shared/base-showcase.component';

@Component({
  selector: 'app-skeleton-showcase',
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

      <!-- Text Skeletons -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Text Skeletons</h3>
        <app-code-block 
          [code]="examples['text']"
          language="html">
        </app-code-block>
      </div>

      <!-- Shape Variants -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Shape Variants</h3>
        <app-code-block 
          [code]="examples['shapes']"
          language="html">
        </app-code-block>
      </div>

      <!-- Animations -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Animation Types</h3>
        <app-code-block 
          [code]="examples['animations']"
          language="html">
        </app-code-block>
      </div>

      <!-- Complex Layouts -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Complex Layouts</h3>
        <app-code-block 
          [code]="examples['complex']"
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
export class SkeletonShowcaseComponent extends BaseShowcaseComponent {
  // Properties must be defined before accessing them
  override component = SkeletonComponent;
  override title = 'Skeleton';
  override description = 'Loading placeholder for content with animated states.';
  override props = [
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

  override examples: Record<string, string> = {
    text: `<!-- Basic text skeleton -->
<app-skeleton></app-skeleton>

<!-- Single line -->
<app-skeleton [lines]="1"></app-skeleton>

<!-- Multiple lines -->
<app-skeleton [lines]="5"></app-skeleton>

<!-- Custom width -->
<app-skeleton [lines]="2" width="200px"></app-skeleton>`,

    shapes: `<!-- Circular (avatar) -->
<app-skeleton variant="circular"></app-skeleton>

<!-- Custom sized circle -->
<app-skeleton 
  variant="circular" 
  width="80px" 
  height="80px">
</app-skeleton>

<!-- Rectangular (image/card) -->
<app-skeleton variant="rectangular"></app-skeleton>

<!-- Rounded rectangular -->
<app-skeleton 
  variant="rectangular" 
  [rounded]="true"
  height="200px">
</app-skeleton>

<!-- Button skeleton -->
<app-skeleton variant="button"></app-skeleton>

<!-- Custom button size -->
<app-skeleton 
  variant="button" 
  width="120px" 
  height="40px">
</app-skeleton>`,

    animations: `<!-- Pulse animation (default) -->
<app-skeleton animation="pulse"></app-skeleton>

<!-- Wave animation -->
<app-skeleton animation="wave"></app-skeleton>

<!-- No animation -->
<app-skeleton animation="none"></app-skeleton>

<!-- Different animations for comparison -->
<div class="space-y-4">
  <div>
    <p class="text-sm font-medium mb-2">Pulse</p>
    <app-skeleton animation="pulse" [lines]="2"></app-skeleton>
  </div>
  <div>
    <p class="text-sm font-medium mb-2">Wave</p>
    <app-skeleton animation="wave" [lines]="2"></app-skeleton>
  </div>
</div>`,

    complex: `<!-- Card skeleton -->
<div class="border rounded-lg p-4 space-y-4">
  <div class="flex items-center space-x-4">
    <app-skeleton variant="circular" width="40px" height="40px"></app-skeleton>
    <div class="flex-1">
      <app-skeleton [lines]="1" width="150px"></app-skeleton>
      <app-skeleton [lines]="1" width="100px" class="mt-2"></app-skeleton>
    </div>
  </div>
  <app-skeleton [lines]="3"></app-skeleton>
  <div class="flex space-x-2">
    <app-skeleton variant="button" width="80px"></app-skeleton>
    <app-skeleton variant="button" width="80px"></app-skeleton>
  </div>
</div>

<!-- List skeleton -->
<div class="space-y-4">
  <div class="flex items-center space-x-4" *ngFor="let item of [1, 2, 3]">
    <app-skeleton variant="circular" width="48px" height="48px"></app-skeleton>
    <div class="flex-1">
      <app-skeleton [lines]="1" width="60%"></app-skeleton>
      <app-skeleton [lines]="1" width="40%" class="mt-1"></app-skeleton>
    </div>
  </div>
</div>`,

    realWorld: `<!-- Article skeleton -->
<article class="max-w-2xl">
  <app-skeleton [lines]="1" width="80%" class="mb-4"></app-skeleton>
  <div class="flex items-center space-x-2 mb-6">
    <app-skeleton variant="circular" width="32px" height="32px"></app-skeleton>
    <app-skeleton [lines]="1" width="120px"></app-skeleton>
    <app-skeleton [lines]="1" width="80px"></app-skeleton>
  </div>
  <app-skeleton 
    variant="rectangular" 
    height="300px" 
    [rounded]="true"
    class="mb-6">
  </app-skeleton>
  <app-skeleton [lines]="4"></app-skeleton>
</article>

<!-- Product grid skeleton -->
<div class="grid grid-cols-3 gap-4">
  <div class="space-y-3" *ngFor="let item of [1, 2, 3]">
    <app-skeleton 
      variant="rectangular" 
      height="200px"
      [rounded]="true">
    </app-skeleton>
    <app-skeleton [lines]="2"></app-skeleton>
    <div class="flex justify-between items-center">
      <app-skeleton [lines]="1" width="60px"></app-skeleton>
      <app-skeleton variant="button" width="100px"></app-skeleton>
    </div>
  </div>
</div>

<!-- Form skeleton -->
<div class="space-y-4 max-w-md">
  <div>
    <app-skeleton [lines]="1" width="80px" class="mb-2"></app-skeleton>
    <app-skeleton variant="rectangular" height="40px"></app-skeleton>
  </div>
  <div>
    <app-skeleton [lines]="1" width="100px" class="mb-2"></app-skeleton>
    <app-skeleton variant="rectangular" height="40px"></app-skeleton>
  </div>
  <div>
    <app-skeleton [lines]="1" width="120px" class="mb-2"></app-skeleton>
    <app-skeleton variant="rectangular" height="100px"></app-skeleton>
  </div>
  <app-skeleton variant="button" width="100%" height="44px"></app-skeleton>
</div>`
  };

  // Override base class methods for custom behavior
  protected override transformPropToPlayground(prop: any): PlaygroundProp {
    const playgroundProp = super.transformPropToPlayground(prop);
    
    // Add min/max for lines prop
    if (prop.name === 'lines') {
      playgroundProp.min = 1;
      playgroundProp.max = 10;
    }
    
    return playgroundProp;
  }

  protected override generateCode(props: any): string {
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
    
    return `<app-skeleton${attributes.length > 0 ? '\n  ' + attributes.join('\n  ') : ''}>
</app-skeleton>`;
  }
}