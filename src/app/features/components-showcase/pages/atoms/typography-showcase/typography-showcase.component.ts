import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent, TypographyVariant, TypographyWeight } from '../../../../../design-system/typography/typography.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { PlaygroundComponent, PlaygroundProp } from '../../../shared/components/playground.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { BaseShowcaseComponent } from '../../../shared/base-showcase.component';

@Component({
  selector: 'app-typography-showcase',
  standalone: true,
  imports: [
    CommonModule,
    TypographyComponent,
    PropsTableComponent,
    PlaygroundComponent,
    CodeBlockComponent
  ],
  template: `
    <div class="space-y-12">
      <!-- Header -->
      <div>
        <app-typography variant="h2">{{ title }}</app-typography>
        <app-typography variant="body1" class="mt-2 text-gray-600 dark:text-gray-400">
          {{ description }}
        </app-typography>
      </div>

      <!-- Interactive Playground -->
      <app-playground 
        [config]="playgroundConfig">
      </app-playground>

      <!-- Props Table -->
      <div>
        <app-typography variant="h3" class="mb-6">Props</app-typography>
        <app-props-table [props]="props"></app-props-table>
      </div>

      <!-- Font Size Scale -->
      <div>
        <app-typography variant="h3" class="mb-6">Font Size Scale</app-typography>
        <div class="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-xs</span>
            <app-typography variant="caption">12px - Caption text</app-typography>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-sm</span>
            <app-typography variant="body2">14px - Small body text</app-typography>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-base</span>
            <app-typography variant="body1">16px - Regular body text</app-typography>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-lg</span>
            <app-typography variant="subtitle1">18px - Subtitle text</app-typography>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-xl</span>
            <app-typography variant="h5">20px - Small heading</app-typography>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-2xl</span>
            <app-typography variant="h4">24px - Medium heading</app-typography>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-3xl</span>
            <app-typography variant="h3">30px - Large heading</app-typography>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-4xl</span>
            <app-typography variant="h2">36px - Extra large heading</app-typography>
          </div>
          <div class="flex items-baseline gap-4">
            <span class="text-xs text-gray-500 w-20">text-5xl</span>
            <app-typography variant="h1">48px - Display heading</app-typography>
          </div>
        </div>
      </div>

      <!-- Font Weights -->
      <div>
        <app-typography variant="h3" class="mb-6">Font Weights</app-typography>
        <app-code-block 
          [code]="examples['weight']"
          language="html">
        </app-code-block>
      </div>

      <!-- Text Variants -->
      <div>
        <app-typography variant="h3" class="mb-6">Text Variants</app-typography>
        <app-code-block 
          [code]="examples['variant']"
          language="html">
        </app-code-block>
      </div>

      <!-- Line Heights -->
      <div>
        <app-typography variant="h3" class="mb-6">Line Heights</app-typography>
        <app-code-block 
          [code]="examples['lineHeight']"
          language="html">
        </app-code-block>
      </div>

      <!-- Real-world Examples -->
      <div>
        <app-typography variant="h3" class="mb-6">Real-world Examples</app-typography>
        <app-code-block 
          [code]="examples['realWorld']"
          language="html">
        </app-code-block>
      </div>

      <!-- Best Practices -->
      <div>
        <app-typography variant="h3" class="mb-6">Best Practices</app-typography>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <app-typography variant="h5" class="text-green-800 dark:text-green-200 mb-3">Do</app-typography>
            <ul class="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li>• Use semantic heading hierarchy (h1 → h6)</li>
              <li>• Maintain consistent font sizes across similar content</li>
              <li>• Use appropriate line heights for readability</li>
              <li>• Consider contrast ratios for accessibility</li>
            </ul>
          </div>
          <div class="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <app-typography variant="h5" class="text-red-800 dark:text-red-200 mb-3">Don't</app-typography>
            <ul class="space-y-2 text-sm text-red-700 dark:text-red-300">
              <li>• Skip heading levels (h1 → h3)</li>
              <li>• Use heading tags for styling only</li>
              <li>• Mix different font families without purpose</li>
              <li>• Use font sizes smaller than 12px for body text</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TypographyShowcaseComponent extends BaseShowcaseComponent {
  component = TypographyComponent;
  title = 'Typography';
  description = 'Consistent typography system for headings, body text, and special text styles.';
  props = [
    {
      name: 'variant',
      type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption' | 'overline'",
      default: 'body1',
      description: 'The typography variant to use'
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right' | 'justify'",
      default: 'left',
      description: 'Text alignment'
    },
    {
      name: 'weight',
      type: "'light' | 'normal' | 'medium' | 'semibold' | 'bold'",
      default: 'undefined',
      description: 'Override the default font weight'
    },
    {
      name: 'color',
      type: 'string',
      default: 'undefined',
      description: 'Custom text color'
    },
    {
      name: 'noMargin',
      type: 'boolean',
      default: 'false',
      description: 'Remove default margins'
    },
    {
      name: 'truncate',
      type: 'boolean',
      default: 'false',
      description: 'Truncate text with ellipsis'
    }
  ];

  // Override base class methods for custom behavior
  protected override createPlaygroundProps(): PlaygroundProp[] {
    const baseProps = super.createPlaygroundProps();
    // Add content prop for text content
    return [
      {
        name: 'content',
        type: 'string' as const,
        defaultValue: 'The quick brown fox jumps over the lazy dog',
        description: 'Text content to display'
      },
      ...baseProps
    ];
  }

  protected override transformPropToPlayground(prop: any): PlaygroundProp {
    const playgroundProp = super.transformPropToPlayground(prop);
    
    // Handle weight prop with empty option
    if (prop.name === 'weight') {
      playgroundProp.options = ['', 'light', 'normal', 'medium', 'semibold', 'bold'];
    }
    
    return playgroundProp;
  }

  protected override generateCode(props: any): string {
    const attributes: string[] = [];
    
    if (props.variant && props.variant !== 'body1') {
      attributes.push(`variant="${props.variant}"`);
    }
    if (props.align && props.align !== 'left') {
      attributes.push(`align="${props.align}"`);
    }
    if (props.weight) {
      attributes.push(`weight="${props.weight}"`);
    }
    if (props.color) {
      attributes.push(`color="${props.color}"`);
    }
    if (props.noMargin) {
      attributes.push('[noMargin]="true"');
    }
    if (props.truncate) {
      attributes.push('[truncate]="true"');
    }
    
    const content = props.content || 'The quick brown fox jumps over the lazy dog';
    
    return `<app-typography${attributes.length > 0 ? '\n  ' + attributes.join('\n  ') : ''}>
  ${content}
</app-typography>`;
  }

  examples: Record<string, string> = {
    weight: `<!-- Font Weight Examples -->
<div class="space-y-4">
  <app-typography variant="h4" weight="light">Light (100) - Elegant and Subtle</app-typography>
  <app-typography variant="h4" weight="normal">Normal (400) - Standard Weight</app-typography>
  <app-typography variant="h4" weight="medium">Medium (500) - Slightly Bold</app-typography>
  <app-typography variant="h4" weight="semibold">Semibold (600) - Emphasis</app-typography>
  <app-typography variant="h4" weight="bold">Bold (700) - Strong Emphasis</app-typography>
</div>`,

    variant: `<!-- Heading Variants -->
<div class="space-y-4">
  <app-typography variant="h1">H1 - Page Title</app-typography>
  <app-typography variant="h2">H2 - Section Title</app-typography>
  <app-typography variant="h3">H3 - Subsection Title</app-typography>
  <app-typography variant="h4">H4 - Card Title</app-typography>
  <app-typography variant="h5">H5 - Widget Title</app-typography>
  <app-typography variant="h6">H6 - Small Title</app-typography>
</div>

<!-- Body and Text Variants -->
<div class="mt-8 space-y-4">
  <app-typography variant="subtitle1">Subtitle 1 - Section Introduction</app-typography>
  <app-typography variant="body1">Body 1 is the default paragraph style.</app-typography>
  <app-typography variant="subtitle2">Subtitle 2 - Smaller Introduction</app-typography>
  <app-typography variant="body2">Body 2 is used for secondary content.</app-typography>
  <app-typography variant="caption">CAPTION - Metadata, timestamps</app-typography>
  <app-typography variant="overline">OVERLINE - LABELS</app-typography>
</div>`,

    lineHeight: `<!-- Tight Line Height -->
<div>
  <app-typography variant="h5" class="mb-2">Tight Line Height</app-typography>
  <app-typography variant="h1">Large Display Text Benefits from Tight Line Height</app-typography>
</div>

<!-- Normal Line Height -->
<div>
  <app-typography variant="h5" class="mb-2">Normal Line Height</app-typography>
  <app-typography variant="h5">This is a heading with normal line height</app-typography>
</div>

<!-- Relaxed Line Height -->
<div>
  <app-typography variant="h5" class="mb-2">Relaxed Line Height</app-typography>
  <app-typography variant="body1">
    Body text benefits from relaxed line height for improved readability.
  </app-typography>
</div>`,

    realWorld: `<!-- Article Example -->
<article class="max-w-3xl">
  <header class="mb-8">
    <app-typography variant="overline" class="text-primary mb-2">TECHNOLOGY</app-typography>
    <app-typography variant="h1" class="mb-4">
      Building Scalable Applications with Angular
    </app-typography>
    <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
      <app-typography variant="caption">By John Doe</app-typography>
      <span>•</span>
      <app-typography variant="caption">March 15, 2024</app-typography>
      <span>•</span>
      <app-typography variant="caption">5 min read</app-typography>
    </div>
  </header>

  <div class="space-y-6">
    <app-typography variant="subtitle1" class="text-gray-700 dark:text-gray-300">
      Learn how to architect and build enterprise-scale applications.
    </app-typography>

    <app-typography variant="body1">
      Angular has evolved significantly over the years...
    </app-typography>

    <app-typography variant="h2" class="mt-8 mb-4">Getting Started</app-typography>
    
    <app-typography variant="body1">
      Before diving into advanced patterns...
    </app-typography>
  </div>
</article>`
  };
}