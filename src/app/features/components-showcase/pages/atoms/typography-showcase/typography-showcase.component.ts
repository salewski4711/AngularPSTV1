import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';
import { PlaygroundConfig } from '../../../shared/components/playground.component';
import { ShowcaseProp } from '../../../shared/base-showcase.component';
import { TypographyComponent } from '../../../../../design-system/typography/typography.component';

@Component({
  selector: 'pst-typography-showcase',
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
export class TypographyShowcaseComponent {
  title = 'Typography';
  description = 'Consistent typography system for headings, body text, and special text styles.';
  
  props: ShowcaseProp[] = [
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

  playgroundConfig: PlaygroundConfig = {
    component: TypographyComponent,
    props: [
      {
        name: 'content',
        type: 'string',
        defaultValue: 'The quick brown fox jumps over the lazy dog',
        description: 'Text content to display'
      },
      {
        name: 'variant',
        type: 'enum',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'subtitle1', 'subtitle2', 'caption', 'overline'],
        defaultValue: 'body1'
      },
      {
        name: 'align',
        type: 'enum',
        options: ['left', 'center', 'right', 'justify'],
        defaultValue: 'left'
      },
      {
        name: 'weight',
        type: 'enum',
        options: ['', 'light', 'normal', 'medium', 'semibold', 'bold'],
        defaultValue: ''
      },
      {
        name: 'color',
        type: 'string',
        defaultValue: ''
      },
      {
        name: 'noMargin',
        type: 'boolean',
        defaultValue: false
      },
      {
        name: 'truncate',
        type: 'boolean',
        defaultValue: false
      }
    ],
    code: (props: any) => {
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
      
      return `<pst-typography${attributes.length > 0 ? '\n  ' + attributes.join('\n  ') : ''}>
  ${content}
</pst-typography>`;
    }
  };

  sections = [
    {
      title: 'Font Size Scale',
      code: `<!-- Font Size Scale -->
<div class="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-xs</span>
    <pst-typography variant="caption">12px - Caption text</pst-typography>
  </div>
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-sm</span>
    <pst-typography variant="body2">14px - Small body text</pst-typography>
  </div>
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-base</span>
    <pst-typography variant="body1">16px - Regular body text</pst-typography>
  </div>
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-lg</span>
    <pst-typography variant="subtitle1">18px - Subtitle text</pst-typography>
  </div>
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-xl</span>
    <pst-typography variant="h5">20px - Small heading</pst-typography>
  </div>
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-2xl</span>
    <pst-typography variant="h4">24px - Medium heading</pst-typography>
  </div>
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-3xl</span>
    <pst-typography variant="h3">30px - Large heading</pst-typography>
  </div>
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-4xl</span>
    <pst-typography variant="h2">36px - Extra large heading</pst-typography>
  </div>
  <div class="flex items-baseline gap-4">
    <span class="text-xs text-gray-500 w-20">text-5xl</span>
    <pst-typography variant="h1">48px - Display heading</pst-typography>
  </div>
</div>`,
      description: 'Our typography scale provides a harmonious set of font sizes for different UI contexts.'
    },
    {
      title: 'Font Weights',
      code: `<!-- Font Weight Examples -->
<div class="space-y-4">
  <pst-typography variant="h4" weight="light">Light (100) - Elegant and Subtle</pst-typography>
  <pst-typography variant="h4" weight="normal">Normal (400) - Standard Weight</pst-typography>
  <pst-typography variant="h4" weight="medium">Medium (500) - Slightly Bold</pst-typography>
  <pst-typography variant="h4" weight="semibold">Semibold (600) - Emphasis</pst-typography>
  <pst-typography variant="h4" weight="bold">Bold (700) - Strong Emphasis</pst-typography>
</div>`,
      description: 'Multiple font weights allow for subtle hierarchy and emphasis without changing font size.'
    },
    {
      title: 'Text Variants',
      code: `<!-- Heading Variants -->
<div class="space-y-4">
  <pst-typography variant="h1">H1 - Page Title</pst-typography>
  <pst-typography variant="h2">H2 - Section Title</pst-typography>
  <pst-typography variant="h3">H3 - Subsection Title</pst-typography>
  <pst-typography variant="h4">H4 - Card Title</pst-typography>
  <pst-typography variant="h5">H5 - Widget Title</pst-typography>
  <pst-typography variant="h6">H6 - Small Title</pst-typography>
</div>

<!-- Body and Text Variants -->
<div class="mt-8 space-y-4">
  <pst-typography variant="subtitle1">Subtitle 1 - Section Introduction</pst-typography>
  <pst-typography variant="body1">Body 1 is the default paragraph style.</pst-typography>
  <pst-typography variant="subtitle2">Subtitle 2 - Smaller Introduction</pst-typography>
  <pst-typography variant="body2">Body 2 is used for secondary content.</pst-typography>
  <pst-typography variant="caption">CAPTION - Metadata, timestamps</pst-typography>
  <pst-typography variant="overline">OVERLINE - LABELS</pst-typography>
</div>`,
      description: 'Predefined text variants ensure consistent typography across the application.'
    },
    {
      title: 'Line Heights',
      code: `<!-- Tight Line Height -->
<div>
  <pst-typography variant="h5" class="mb-2">Tight Line Height</pst-typography>
  <pst-typography variant="h1">Large Display Text Benefits from Tight Line Height</pst-typography>
</div>

<!-- Normal Line Height -->
<div>
  <pst-typography variant="h5" class="mb-2">Normal Line Height</pst-typography>
  <pst-typography variant="h5">This is a heading with normal line height</pst-typography>
</div>

<!-- Relaxed Line Height -->
<div>
  <pst-typography variant="h5" class="mb-2">Relaxed Line Height</pst-typography>
  <pst-typography variant="body1">
    Body text benefits from relaxed line height for improved readability.
  </pst-typography>
</div>`,
      description: 'Appropriate line heights improve readability for different text types.'
    },
    {
      title: 'Real-world Examples',
      code: `<!-- Article Example -->
<article class="max-w-3xl">
  <header class="mb-8">
    <pst-typography variant="overline" class="text-primary mb-2">TECHNOLOGY</pst-typography>
    <pst-typography variant="h1" class="mb-4">
      Building Scalable Applications with Angular
    </pst-typography>
    <div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
      <pst-typography variant="caption">By John Doe</pst-typography>
      <span>•</span>
      <pst-typography variant="caption">March 15, 2024</pst-typography>
      <span>•</span>
      <pst-typography variant="caption">5 min read</pst-typography>
    </div>
  </header>

  <div class="space-y-6">
    <pst-typography variant="subtitle1" class="text-gray-700 dark:text-gray-300">
      Learn how to architect and build enterprise-scale applications.
    </pst-typography>

    <pst-typography variant="body1">
      Angular has evolved significantly over the years...
    </pst-typography>

    <pst-typography variant="h2" class="mt-8 mb-4">Getting Started</pst-typography>
    
    <pst-typography variant="body1">
      Before diving into advanced patterns...
    </pst-typography>
  </div>
</article>`,
      description: 'Example showing how to combine different typography variants in a real article layout.'
    }
  ];

  bestPractices = {
    do: [
      'Use semantic heading hierarchy (h1 → h6)',
      'Maintain consistent font sizes across similar content',
      'Use appropriate line heights for readability',
      'Consider contrast ratios for accessibility'
    ],
    dont: [
      'Skip heading levels (h1 → h3)',
      'Use heading tags for styling only',
      'Mix different font families without purpose',
      'Use font sizes smaller than 12px for body text'
    ]
  };
}