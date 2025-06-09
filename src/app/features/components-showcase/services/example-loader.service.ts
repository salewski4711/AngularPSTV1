import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleLoaderService {
  private cache = new Map<string, string>();
  
  // Static map of all available examples
  private examples: Record<string, string> = {
    // Button examples
    'button-showcase/basic': `<pst-button>Click me</pst-button>
<pst-button variant="primary">Primary Button</pst-button>
<pst-button variant="secondary">Secondary Button</pst-button>`,
    
    'button-showcase/variants': `<!-- Primary variant (default) -->
<pst-button variant="primary">Primary Button</pst-button>

<!-- Secondary variant -->
<pst-button variant="secondary">Secondary Button</pst-button>

<!-- Outline Primary variant -->
<pst-button variant="outline-primary">Outline Primary</pst-button>

<!-- Tertiary variant -->
<pst-button variant="tertiary">Tertiary Button</pst-button>

<!-- Ghost variant -->
<pst-button variant="ghost">Ghost Button</pst-button>

<!-- Danger variant -->
<pst-button variant="danger">Danger Button</pst-button>`,
    
    'button-showcase/sizes': `<!-- Extra Small -->
<pst-button size="xs">Extra Small</pst-button>

<!-- Small -->
<pst-button size="sm">Small</pst-button>

<!-- Medium (default) -->
<pst-button size="md">Medium</pst-button>

<!-- Large -->
<pst-button size="lg">Large</pst-button>

<!-- Extra Large -->
<pst-button size="xl">Extra Large</pst-button>`,
    
    'button-showcase/states': `<!-- Normal state -->
<pst-button>Normal</pst-button>

<!-- Disabled state -->
<pst-button [disabled]="true">Disabled</pst-button>

<!-- Loading state -->
<pst-button [loading]="true">Loading</pst-button>

<!-- Loading with custom text -->
<pst-button [loading]="true" loadingText="Saving...">Loading with Text</pst-button>`,
    
    'button-showcase/with-icons': `<!-- Icon on the left (default) -->
<pst-button icon="save">Save</pst-button>

<!-- Icon on the right -->
<pst-button icon="download" iconPosition="right">Download</pst-button>

<!-- Icon with danger variant -->
<pst-button icon="trash" variant="danger">Delete</pst-button>

<!-- Icon only button -->
<pst-button icon="edit" [iconOnly]="true" variant="ghost"></pst-button>

<!-- Different icon sizes -->
<pst-button icon="settings" size="sm">Small with Icon</pst-button>
<pst-button icon="settings" size="lg">Large with Icon</pst-button>`,

    // Link examples
    'link-showcase/basic': `<!-- Basic link -->
<pst-link href="/dashboard">Dashboard Link</pst-link>

<!-- Link with external URL -->
<pst-link href="https://example.com" [external]="true">External Link</pst-link>

<!-- Router link -->
<pst-link routerLink="/profile">Profile Link</pst-link>`,

    'link-showcase/sizes': `<!-- Small -->
<pst-link size="sm" href="#">Small Link</pst-link>

<!-- Medium (default) -->
<pst-link size="md" href="#">Medium Link</pst-link>

<!-- Large -->
<pst-link size="lg" href="#">Large Link</pst-link>`,

    'link-showcase/states': `<!-- Normal -->
<pst-link href="#">Normal Link</pst-link>

<!-- Disabled -->
<pst-link href="#" [disabled]="true">Disabled Link</pst-link>

<!-- With hover effect -->
<pst-link href="#" class="hover:underline">Hover to Underline</pst-link>`,

    'link-showcase/external': `<!-- External link with icon -->
<pst-link href="https://example.com" [external]="true" [showExternalIcon]="true">
  External with Icon
</pst-link>

<!-- External link opening in new tab -->
<pst-link href="https://example.com" [external]="true" target="_blank">
  Opens in New Tab
</pst-link>`,

    'link-showcase/router': `<!-- Router link -->
<pst-link routerLink="/dashboard">Dashboard</pst-link>

<!-- Router link with params -->
<pst-link [routerLink]="['/user', userId]">User Profile</pst-link>

<!-- Router link with active state -->
<pst-link routerLink="/settings" routerLinkActive="font-bold">Settings</pst-link>`,

    'link-showcase/with-icons': `<!-- Link with leading icon -->
<pst-link href="#" leadingIcon="home">Home</pst-link>

<!-- Link with trailing icon -->
<pst-link href="#" trailingIcon="arrow-right">Continue</pst-link>

<!-- External link with custom icon -->
<pst-link href="https://github.com" [external]="true" leadingIcon="github">
  GitHub
</pst-link>`,

    // Tag examples
    'tag-showcase/basic': `<!-- Basic tags -->
<pst-tag>Default Tag</pst-tag>
<pst-tag color="blue">Blue Tag</pst-tag>
<pst-tag color="green">Green Tag</pst-tag>
<pst-tag color="red">Red Tag</pst-tag>
<pst-tag color="yellow">Yellow Tag</pst-tag>`,

    'tag-showcase/variants': `<!-- Solid variant (default) -->
<pst-tag variant="solid" color="blue">Solid</pst-tag>

<!-- Subtle variant -->
<pst-tag variant="subtle" color="blue">Subtle</pst-tag>

<!-- Outline variant -->
<pst-tag variant="outline" color="blue">Outline</pst-tag>`,

    'tag-showcase/sizes': `<!-- Extra small -->
<pst-tag size="xs">XS Tag</pst-tag>

<!-- Small -->
<pst-tag size="sm">Small Tag</pst-tag>

<!-- Medium (default) -->
<pst-tag size="md">Medium Tag</pst-tag>

<!-- Large -->
<pst-tag size="lg">Large Tag</pst-tag>`,

    'tag-showcase/shapes': `<!-- Rounded (default) -->
<pst-tag shape="rounded">Rounded</pst-tag>

<!-- Square -->
<pst-tag shape="square">Square</pst-tag>

<!-- Pill -->
<pst-tag shape="pill">Pill</pst-tag>`,

    'tag-showcase/with-icons': `<!-- Leading icon -->
<pst-tag leadingIcon="star">Featured</pst-tag>

<!-- Trailing icon -->
<pst-tag trailingIcon="check">Verified</pst-tag>

<!-- Both icons -->
<pst-tag leadingIcon="lock" trailingIcon="arrow-right">Secure</pst-tag>`,

    'tag-showcase/removable': `<!-- Removable tags -->
<pst-tag [removable]="true" (remove)="onRemove()">Removable</pst-tag>
<pst-tag [removable]="true" color="red" (remove)="onRemove()">Delete Me</pst-tag>
<pst-tag [removable]="true" variant="outline" (remove)="onRemove()">Click X</pst-tag>`,

    'tag-showcase/use-cases': `<!-- Status tags -->
<pst-tag color="green" leadingIcon="check-circle">Active</pst-tag>
<pst-tag color="yellow" leadingIcon="clock">Pending</pst-tag>
<pst-tag color="red" leadingIcon="x-circle">Inactive</pst-tag>

<!-- Category tags -->
<pst-tag variant="subtle" color="purple">Technology</pst-tag>
<pst-tag variant="subtle" color="blue">Design</pst-tag>
<pst-tag variant="subtle" color="green">Marketing</pst-tag>

<!-- Filter tags -->
<pst-tag variant="outline" [removable]="true">Price: $0-$100</pst-tag>
<pst-tag variant="outline" [removable]="true">Brand: Apple</pst-tag>
<pst-tag variant="outline" [removable]="true">Color: Black</pst-tag>`,

    // Divider examples  
    'divider-showcase/basic': `<!-- Basic horizontal divider -->
<pst-divider></pst-divider>

<!-- With custom margin -->
<pst-divider class="my-8"></pst-divider>`,

    'divider-showcase/orientations': `<!-- Horizontal (default) -->
<pst-divider orientation="horizontal"></pst-divider>

<!-- Vertical -->
<div class="flex items-center h-10">
  <span>Left</span>
  <pst-divider orientation="vertical" class="mx-4"></pst-divider>
  <span>Right</span>
</div>`,

    'divider-showcase/variants': `<!-- Solid (default) -->
<pst-divider variant="solid"></pst-divider>

<!-- Dashed -->
<pst-divider variant="dashed"></pst-divider>

<!-- Dotted -->
<pst-divider variant="dotted"></pst-divider>`,

    'divider-showcase/colors': `<!-- Default gray -->
<pst-divider></pst-divider>

<!-- Primary color -->
<pst-divider color="primary"></pst-divider>

<!-- Secondary color -->
<pst-divider color="secondary"></pst-divider>

<!-- Custom color -->
<pst-divider class="border-red-500"></pst-divider>`,

    'divider-showcase/thickness': `<!-- Thin -->
<pst-divider thickness="thin"></pst-divider>

<!-- Medium (default) -->
<pst-divider thickness="medium"></pst-divider>

<!-- Thick -->
<pst-divider thickness="thick"></pst-divider>`,

    'divider-showcase/spacing': `<!-- Default spacing -->
<pst-divider></pst-divider>

<!-- Tight spacing -->
<pst-divider spacing="tight"></pst-divider>

<!-- Normal spacing -->
<pst-divider spacing="normal"></pst-divider>

<!-- Loose spacing -->
<pst-divider spacing="loose"></pst-divider>`,

    'divider-showcase/labels': `<!-- Divider with centered label -->
<pst-divider label="OR"></pst-divider>

<!-- Label aligned left -->
<pst-divider label="Section Start" labelPosition="left"></pst-divider>

<!-- Label aligned right -->
<pst-divider label="Section End" labelPosition="right"></pst-divider>`,

    'divider-showcase/with-label': `<!-- With text label -->
<pst-divider label="Continue with"></pst-divider>

<!-- With icon label -->
<pst-divider>
  <pst-icon name="star" [size]="16"></pst-icon>
</pst-divider>

<!-- Complex label -->
<pst-divider>
  <span class="flex items-center gap-2 text-sm text-gray-500">
    <pst-icon name="calendar" [size]="16"></pst-icon>
    Today
  </span>
</pst-divider>`,

    'divider-showcase/vertical': `<!-- Vertical divider in flex container -->
<div class="flex items-center gap-4">
  <button class="px-4 py-2">Edit</button>
  <pst-divider orientation="vertical" class="h-8"></pst-divider>
  <button class="px-4 py-2">Delete</button>
  <pst-divider orientation="vertical" class="h-8"></pst-divider>
  <button class="px-4 py-2">Share</button>
</div>`,

    // Skeleton examples
    'skeleton-showcase/text-blocks': `<!-- Basic text skeleton -->
<pst-skeleton></pst-skeleton>

<!-- Single line -->
<pst-skeleton [lines]="1"></pst-skeleton>

<!-- Multiple lines -->
<pst-skeleton [lines]="5"></pst-skeleton>

<!-- Custom width -->
<pst-skeleton [lines]="2" width="200px"></pst-skeleton>`,

    'skeleton-showcase/avatar-placeholders': `<!-- Small avatar -->
<pst-skeleton variant="circular" width="32px" height="32px"></pst-skeleton>

<!-- Medium avatar -->
<pst-skeleton variant="circular" width="48px" height="48px"></pst-skeleton>

<!-- Large avatar -->
<pst-skeleton variant="circular" width="64px" height="64px"></pst-skeleton>

<!-- Avatar with text -->
<div class="flex items-center space-x-3">
  <pst-skeleton variant="circular" width="40px" height="40px"></pst-skeleton>
  <div>
    <pst-skeleton [lines]="1" width="120px"></pst-skeleton>
    <pst-skeleton [lines]="1" width="80px" class="mt-1"></pst-skeleton>
  </div>
</div>`,

    'skeleton-showcase/card-skeletons': `<!-- Basic card skeleton -->
<div class="border rounded-lg p-4 space-y-3">
  <pst-skeleton variant="rectangular" height="200px"></pst-skeleton>
  <pst-skeleton [lines]="2"></pst-skeleton>
  <pst-skeleton variant="button" width="100px"></pst-skeleton>
</div>

<!-- Card with header -->
<div class="border rounded-lg overflow-hidden">
  <pst-skeleton variant="rectangular" height="150px"></pst-skeleton>
  <div class="p-4 space-y-3">
    <pst-skeleton [lines]="1" width="60%"></pst-skeleton>
    <pst-skeleton [lines]="3"></pst-skeleton>
    <div class="flex space-x-2">
      <pst-skeleton variant="button" width="80px"></pst-skeleton>
      <pst-skeleton variant="button" width="80px"></pst-skeleton>
    </div>
  </div>
</div>`,

    'skeleton-showcase/form-skeletons': `<!-- Form field skeleton -->
<div class="space-y-4 max-w-sm">
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
    <pst-skeleton variant="rectangular" height="80px"></pst-skeleton>
  </div>
  <pst-skeleton variant="button" width="100%" height="44px"></pst-skeleton>
</div>`,

    // Typography examples
    'typography-showcase/text-variants': `<!-- Headings -->
<h1 class="text-h1">Heading 1</h1>
<h2 class="text-h2">Heading 2</h2>
<h3 class="text-h3">Heading 3</h3>
<h4 class="text-h4">Heading 4</h4>
<h5 class="text-h5">Heading 5</h5>
<h6 class="text-h6">Heading 6</h6>

<!-- Body text -->
<p class="text-body">Body text for regular content</p>
<p class="text-body-sm">Small body text for secondary content</p>

<!-- Special text -->
<p class="text-lead">Lead text for introductions</p>
<p class="text-caption">Caption text for labels</p>`,

    'typography-showcase/font-weights': `<!-- Font weights -->
<p class="font-thin">Thin (100)</p>
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-black">Black (900)</p>`,

    'typography-showcase/line-heights': `<!-- Line heights -->
<p class="leading-none">No line height (1)</p>
<p class="leading-tight">Tight line height (1.25)</p>
<p class="leading-snug">Snug line height (1.375)</p>
<p class="leading-normal">Normal line height (1.5)</p>
<p class="leading-relaxed">Relaxed line height (1.625)</p>
<p class="leading-loose">Loose line height (2)</p>`,

    'typography-showcase/form-labels': `<!-- Form labels -->
<label class="text-label">Input Label</label>
<input type="text" class="mt-1" />

<label class="text-label-sm">Small Label</label>
<input type="text" class="mt-1" />

<!-- Required field -->
<label class="text-label">
  Email Address
  <span class="text-red-500">*</span>
</label>`,

    'typography-showcase/card-content': `<!-- Card with typography -->
<div class="card p-6">
  <h3 class="text-h3 mb-2">Card Title</h3>
  <p class="text-body text-gray-600 mb-4">
    Card description with body text styling.
  </p>
  <div class="flex items-center justify-between">
    <span class="text-caption text-gray-500">2 hours ago</span>
    <a href="#" class="text-link">Read more →</a>
  </div>
</div>`,

    'typography-showcase/article': `<!-- Article typography -->
<article class="prose max-w-none">
  <h1>Article Title</h1>
  <p class="lead">
    This is a lead paragraph that introduces the article content.
  </p>
  <p>
    Regular paragraph text with proper spacing and line height for readability.
  </p>
  <h2>Section Heading</h2>
  <p>
    Another paragraph with <strong>bold text</strong> and <em>italic text</em>.
  </p>
  <ul>
    <li>Bullet point one</li>
    <li>Bullet point two</li>
  </ul>
</article>`,
  };

  constructor() {}

  loadExample(componentPath: string, exampleName: string): Observable<string> {
    const key = `${componentPath}/${exampleName}`;
    
    // Return from cache if available
    if (this.cache.has(key)) {
      return of(this.cache.get(key)!);
    }

    // Get from static map
    const content = this.examples[key];
    
    if (content) {
      this.cache.set(key, content);
      return of(content);
    }
    
    // Fallback for missing examples
    console.warn(`Example not found: ${key}`);
    return of(`<!-- Example "${exampleName}" not found for ${componentPath} -->`);
  }
}