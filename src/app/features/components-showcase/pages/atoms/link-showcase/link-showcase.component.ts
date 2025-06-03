import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '../../../../../shared/components/link/link.component';
import { PropsTableComponent } from '../../../shared/components/props-table.component';
import { PlaygroundComponent, PlaygroundProp } from '../../../shared/components/playground.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';
import { BaseShowcaseComponent } from '../../../shared/base-showcase.component';

@Component({
  selector: 'app-link-showcase',
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

      <!-- Basic Examples -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Basic Links</h3>
        <app-code-block 
          [code]="examples['basic']"
          language="html">
        </app-code-block>
      </div>

      <!-- Sizes -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Link Sizes</h3>
        <app-code-block 
          [code]="examples['sizes']"
          language="html">
        </app-code-block>
      </div>

      <!-- External Links -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">External Links</h3>
        <app-code-block 
          [code]="examples['external']"
          language="html">
        </app-code-block>
      </div>

      <!-- Router Links -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Router Links</h3>
        <app-code-block 
          [code]="examples['router']"
          language="html">
        </app-code-block>
      </div>

      <!-- States -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Link States</h3>
        <app-code-block 
          [code]="examples['states']"
          language="html">
        </app-code-block>
      </div>

      <!-- With Icons -->
      <div>
        <h3 class="text-2xl font-semibold mb-6">Links with Icons</h3>
        <app-code-block 
          [code]="examples['icons']"
          language="html">
        </app-code-block>
      </div>
    </div>
  `
})
export class LinkShowcaseComponent extends BaseShowcaseComponent {
  component = LinkComponent;
  title = 'Link';
  description = 'Styled hyperlink component with router integration and external link support.';
  props = [
    {
      name: 'href',
      type: 'string',
      default: 'undefined',
      description: 'URL for external links'
    },
    {
      name: 'routerLink',
      type: 'string | any[]',
      default: 'undefined',
      description: 'Angular router link'
    },
    {
      name: 'queryParams',
      type: 'object',
      default: 'undefined',
      description: 'Query parameters for router link'
    },
    {
      name: 'fragment',
      type: 'string',
      default: 'undefined',
      description: 'URL fragment for router link'
    },
    {
      name: 'variant',
      type: "'default' | 'primary' | 'muted'",
      default: 'default',
      description: 'Visual style variant'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Size of the link'
    },
    {
      name: 'external',
      type: 'boolean',
      default: 'false',
      description: 'Show external link indicator'
    },
    {
      name: 'underline',
      type: 'boolean',
      default: 'true',
      description: 'Show underline on hover'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable the link'
    }
  ];

  // Override base class methods for custom behavior
  protected override createPlaygroundProps(): PlaygroundProp[] {
    const baseProps = super.createPlaygroundProps();
    // Add content prop for link text
    return [
      {
        name: 'content',
        type: 'string' as const,
        defaultValue: 'Click me',
        description: 'Link text content'
      },
      ...baseProps
    ];
  }

  protected override generateCode(props: any): string {
    const attributes: string[] = ['href="#"'];
    
    if (props.variant && props.variant !== 'default') {
      attributes.push(`variant="${props.variant}"`);
    }
    if (props.size && props.size !== 'md') {
      attributes.push(`size="${props.size}"`);
    }
    if (props.external) {
      attributes.push('[external]="true"');
    }
    if (props.underline === false) {
      attributes.push('[underline]="false"');
    }
    if (props.disabled) {
      attributes.push('[disabled]="true"');
    }
    
    return `<app-link
  ${attributes.join('\n  ')}>
  ${props.content || 'Click me'}
</app-link>`;
  }

  examples: Record<string, string> = {
    basic: `<!-- Default link -->
<app-link href="#">Default Link</app-link>

<!-- Primary link -->
<app-link href="#" variant="primary">Primary Link</app-link>

<!-- Muted link -->
<app-link href="#" variant="muted">Muted Link</app-link>`,

    sizes: `<!-- Small link -->
<app-link href="#" size="sm">Small Link</app-link>

<!-- Medium link (default) -->
<app-link href="#" size="md">Medium Link</app-link>

<!-- Large link -->
<app-link href="#" size="lg">Large Link</app-link>`,

    external: `<!-- External link with auto icon -->
<app-link 
  href="https://prosolar-tec.de" 
  [external]="true">
  Visit ProSolarTec
</app-link>

<!-- External link opens in new tab -->
<app-link 
  href="https://angular.io/docs" 
  [external]="true"
  variant="primary">
  Angular Documentation
</app-link>`,

    router: `<!-- Simple router link -->
<app-link routerLink="/dashboard">Dashboard</app-link>

<!-- Router link with params -->
<app-link 
  routerLink="/customers/details"
  [queryParams]="{ id: 123 }">
  Customer Details
</app-link>

<!-- Router link with fragment -->
<app-link 
  routerLink="/help"
  fragment="getting-started">
  Getting Started Guide
</app-link>

<!-- Router link as array -->
<app-link 
  [routerLink]="['/projects', projectId, 'edit']">
  Edit Project
</app-link>`,

    states: `<!-- Normal link -->
<app-link href="#">Normal Link</app-link>

<!-- Link without underline -->
<app-link href="#" [underline]="false">No Underline</app-link>

<!-- Disabled link -->
<app-link href="#" [disabled]="true">Disabled Link</app-link>`,

    icons: `<!-- Link with custom icon -->
<app-link href="/settings">
  <app-icon name="settings" [size]="16" class="mr-1"></app-icon>
  Settings
</app-link>

<!-- Download link -->
<app-link href="/download" variant="primary">
  <app-icon name="download" [size]="16" class="mr-1"></app-icon>
  Download Report
</app-link>

<!-- Mail link -->
<app-link href="mailto:support@example.com" [external]="true">
  <app-icon name="mail" [size]="16" class="mr-1"></app-icon>
  Contact Support
</app-link>`
  };
}