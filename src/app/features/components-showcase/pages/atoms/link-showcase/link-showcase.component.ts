import { Component } from '@angular/core';
import { ShowcaseTemplateComponent } from '../../../shared/showcase-template.component';

@Component({
  selector: 'pst-link-showcase',
  standalone: true,
  imports: [ShowcaseTemplateComponent],
  template: `
    <pst-showcase-template
      [title]="title"
      [description]="description"
      [sections]="sections"
      [props]="props"
      [bestPractices]="bestPractices">
    </pst-showcase-template>
  `
})
export class LinkShowcaseComponent {
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

  sections = [
    {
      title: 'Basic Links',
      description: 'Links come in different visual variants for various use cases.',
      code: `<!-- Basic link variants -->
<pst-link href="#">Default Link</pst-link>
<pst-link href="#" variant="primary">Primary Link</pst-link>
<pst-link href="#" variant="muted">Muted Link</pst-link>`
    },
    {
      title: 'Link Sizes',
      description: 'Links can be displayed in three different sizes to match your design needs.',
      code: `<!-- Different link sizes -->
<pst-link href="#" size="sm">Small Link</pst-link>
<pst-link href="#" size="md">Medium Link (default)</pst-link>
<pst-link href="#" size="lg">Large Link</pst-link>`
    },
    {
      title: 'External Links',
      description: 'External links automatically show an indicator icon and open in a new tab.',
      code: `<!-- External links with indicator -->
<pst-link href="https://angular.io" [external]="true">
  Angular Documentation
</pst-link>

<!-- Auto-detection of external links -->
<pst-link href="https://example.com">
  External Site (auto-detected)
</pst-link>`
    },
    {
      title: 'Router Links',
      description: 'Integrate seamlessly with Angular Router for internal navigation.',
      code: `<!-- Basic router link -->
<pst-link routerLink="/dashboard">Dashboard</pst-link>

<!-- Router link with params -->
<pst-link 
  [routerLink]="['/user', userId]" 
  [queryParams]="{tab: 'profile'}">
  User Profile
</pst-link>

<!-- Router link with fragment -->
<pst-link 
  routerLink="/docs" 
  fragment="installation">
  Installation Guide
</pst-link>`
    },
    {
      title: 'Link States',
      description: 'Links support various states including disabled and no-underline options.',
      code: `<!-- Disabled state -->
<pst-link href="#" [disabled]="true">Disabled Link</pst-link>

<!-- No underline on hover -->
<pst-link href="#" [underline]="false">No Underline</pst-link>

<!-- Combined states -->
<pst-link 
  href="#" 
  [disabled]="true" 
  variant="primary">
  Disabled Primary Link
</pst-link>`
    },
    {
      title: 'Links with Icons',
      description: 'Combine links with icons for enhanced visual communication.',
      code: `<!-- Link with icon -->
<pst-link href="#">
  <pst-icon name="download" size="sm"></pst-icon>
  Download Report
</pst-link>

<!-- External link with custom icon -->
<pst-link href="https://github.com" [external]="true">
  <pst-icon name="github" size="sm"></pst-icon>
  View on GitHub
</pst-link>

<!-- Icon after text -->
<pst-link href="#" variant="primary">
  Continue
  <pst-icon name="arrow-right" size="sm"></pst-icon>
</pst-link>`
    }
  ];

  bestPractices = {
    do: [
      'Use descriptive link text that clearly indicates the destination',
      'Use the primary variant for main call-to-action links',
      'Use routerLink for internal navigation and href for external links',
      'Include the external prop for links that leave your application',
      'Provide appropriate context when disabling links'
    ],
    dont: [
      'Use generic text like "click here" or "read more"',
      'Mix href and routerLink on the same component',
      'Disable links without providing alternative actions or explanations',
      'Use links for actions that should be buttons (e.g., form submissions)',
      'Forget to test keyboard navigation and screen reader accessibility'
    ]
  };
}