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
    'button-showcase/basic': `<app-button>Click me</app-button>
<app-button variant="primary">Primary Button</app-button>
<app-button variant="secondary">Secondary Button</app-button>`,
    
    'button-showcase/variants': `<!-- Primary variant (default) -->
<app-button variant="primary">Primary Button</app-button>

<!-- Secondary variant -->
<app-button variant="secondary">Secondary Button</app-button>

<!-- Outline Primary variant -->
<app-button variant="outline-primary">Outline Primary</app-button>

<!-- Tertiary variant -->
<app-button variant="tertiary">Tertiary Button</app-button>

<!-- Ghost variant -->
<app-button variant="ghost">Ghost Button</app-button>

<!-- Danger variant -->
<app-button variant="danger">Danger Button</app-button>`,
    
    'button-showcase/sizes': `<!-- Extra Small -->
<app-button size="xs">Extra Small</app-button>

<!-- Small -->
<app-button size="sm">Small</app-button>

<!-- Medium (default) -->
<app-button size="md">Medium</app-button>

<!-- Large -->
<app-button size="lg">Large</app-button>

<!-- Extra Large -->
<app-button size="xl">Extra Large</app-button>`,
    
    'button-showcase/states': `<!-- Normal state -->
<app-button>Normal</app-button>

<!-- Disabled state -->
<app-button [disabled]="true">Disabled</app-button>

<!-- Loading state -->
<app-button [loading]="true">Loading</app-button>

<!-- Loading with custom text -->
<app-button [loading]="true" loadingText="Saving...">Loading with Text</app-button>`,
    
    'button-showcase/with-icons': `<!-- Icon on the left (default) -->
<app-button icon="save">Save</app-button>

<!-- Icon on the right -->
<app-button icon="download" iconPosition="right">Download</app-button>

<!-- Icon with danger variant -->
<app-button icon="trash" variant="danger">Delete</app-button>

<!-- Icon only button -->
<app-button icon="edit" [iconOnly]="true" variant="ghost"></app-button>

<!-- Different icon sizes -->
<app-button icon="settings" size="sm">Small with Icon</app-button>
<app-button icon="settings" size="lg">Large with Icon</app-button>`,

    // Link examples
    'link-showcase/basic': `<!-- Basic link -->
<app-link href="/dashboard">Dashboard Link</app-link>

<!-- Link with external URL -->
<app-link href="https://example.com" [external]="true">External Link</app-link>

<!-- Router link -->
<app-link routerLink="/profile">Profile Link</app-link>`,

    'link-showcase/sizes': `<!-- Small -->
<app-link size="sm" href="#">Small Link</app-link>

<!-- Medium (default) -->
<app-link size="md" href="#">Medium Link</app-link>

<!-- Large -->
<app-link size="lg" href="#">Large Link</app-link>`,

    'link-showcase/states': `<!-- Normal -->
<app-link href="#">Normal Link</app-link>

<!-- Disabled -->
<app-link href="#" [disabled]="true">Disabled Link</app-link>

<!-- With hover effect -->
<app-link href="#" class="hover:underline">Hover to Underline</app-link>`,

    'link-showcase/external': `<!-- External link with icon -->
<app-link href="https://example.com" [external]="true" [showExternalIcon]="true">
  External with Icon
</app-link>

<!-- External link opening in new tab -->
<app-link href="https://example.com" [external]="true" target="_blank">
  Opens in New Tab
</app-link>`,

    'link-showcase/router': `<!-- Router link -->
<app-link routerLink="/dashboard">Dashboard</app-link>

<!-- Router link with params -->
<app-link [routerLink]="['/user', userId]">User Profile</app-link>

<!-- Router link with active state -->
<app-link routerLink="/settings" routerLinkActive="font-bold">Settings</app-link>`,

    'link-showcase/with-icons': `<!-- Link with leading icon -->
<app-link href="#" leadingIcon="home">Home</app-link>

<!-- Link with trailing icon -->
<app-link href="#" trailingIcon="arrow-right">Continue</app-link>

<!-- External link with custom icon -->
<app-link href="https://github.com" [external]="true" leadingIcon="github">
  GitHub
</app-link>`,

    // Tag examples
    'tag-showcase/basic': `<!-- Basic tags -->
<app-tag>Default Tag</app-tag>
<app-tag color="blue">Blue Tag</app-tag>
<app-tag color="green">Green Tag</app-tag>
<app-tag color="red">Red Tag</app-tag>
<app-tag color="yellow">Yellow Tag</app-tag>`,

    'tag-showcase/variants': `<!-- Solid variant (default) -->
<app-tag variant="solid" color="blue">Solid</app-tag>

<!-- Subtle variant -->
<app-tag variant="subtle" color="blue">Subtle</app-tag>

<!-- Outline variant -->
<app-tag variant="outline" color="blue">Outline</app-tag>`,

    'tag-showcase/sizes': `<!-- Extra small -->
<app-tag size="xs">XS Tag</app-tag>

<!-- Small -->
<app-tag size="sm">Small Tag</app-tag>

<!-- Medium (default) -->
<app-tag size="md">Medium Tag</app-tag>

<!-- Large -->
<app-tag size="lg">Large Tag</app-tag>`,

    'tag-showcase/shapes': `<!-- Rounded (default) -->
<app-tag shape="rounded">Rounded</app-tag>

<!-- Square -->
<app-tag shape="square">Square</app-tag>

<!-- Pill -->
<app-tag shape="pill">Pill</app-tag>`,

    'tag-showcase/with-icons': `<!-- Leading icon -->
<app-tag leadingIcon="star">Featured</app-tag>

<!-- Trailing icon -->
<app-tag trailingIcon="check">Verified</app-tag>

<!-- Both icons -->
<app-tag leadingIcon="lock" trailingIcon="arrow-right">Secure</app-tag>`,

    'tag-showcase/removable': `<!-- Removable tags -->
<app-tag [removable]="true" (remove)="onRemove()">Removable</app-tag>
<app-tag [removable]="true" color="red" (remove)="onRemove()">Delete Me</app-tag>
<app-tag [removable]="true" variant="outline" (remove)="onRemove()">Click X</app-tag>`,

    'tag-showcase/use-cases': `<!-- Status tags -->
<app-tag color="green" leadingIcon="check-circle">Active</app-tag>
<app-tag color="yellow" leadingIcon="clock">Pending</app-tag>
<app-tag color="red" leadingIcon="x-circle">Inactive</app-tag>

<!-- Category tags -->
<app-tag variant="subtle" color="purple">Technology</app-tag>
<app-tag variant="subtle" color="blue">Design</app-tag>
<app-tag variant="subtle" color="green">Marketing</app-tag>

<!-- Filter tags -->
<app-tag variant="outline" [removable]="true">Price: $0-$100</app-tag>
<app-tag variant="outline" [removable]="true">Brand: Apple</app-tag>
<app-tag variant="outline" [removable]="true">Color: Black</app-tag>`,

    // Divider examples  
    'divider-showcase/basic': `<!-- Basic horizontal divider -->
<app-divider></app-divider>

<!-- With custom margin -->
<app-divider class="my-8"></app-divider>`,

    'divider-showcase/orientations': `<!-- Horizontal (default) -->
<app-divider orientation="horizontal"></app-divider>

<!-- Vertical -->
<div class="flex items-center h-10">
  <span>Left</span>
  <app-divider orientation="vertical" class="mx-4"></app-divider>
  <span>Right</span>
</div>`,

    'divider-showcase/variants': `<!-- Solid (default) -->
<app-divider variant="solid"></app-divider>

<!-- Dashed -->
<app-divider variant="dashed"></app-divider>

<!-- Dotted -->
<app-divider variant="dotted"></app-divider>`,

    'divider-showcase/colors': `<!-- Default gray -->
<app-divider></app-divider>

<!-- Primary color -->
<app-divider color="primary"></app-divider>

<!-- Secondary color -->
<app-divider color="secondary"></app-divider>

<!-- Custom color -->
<app-divider class="border-red-500"></app-divider>`,

    'divider-showcase/thickness': `<!-- Thin -->
<app-divider thickness="thin"></app-divider>

<!-- Medium (default) -->
<app-divider thickness="medium"></app-divider>

<!-- Thick -->
<app-divider thickness="thick"></app-divider>`,

    'divider-showcase/spacing': `<!-- Default spacing -->
<app-divider></app-divider>

<!-- Tight spacing -->
<app-divider spacing="tight"></app-divider>

<!-- Normal spacing -->
<app-divider spacing="normal"></app-divider>

<!-- Loose spacing -->
<app-divider spacing="loose"></app-divider>`,

    'divider-showcase/labels': `<!-- Divider with centered label -->
<app-divider label="OR"></app-divider>

<!-- Label aligned left -->
<app-divider label="Section Start" labelPosition="left"></app-divider>

<!-- Label aligned right -->
<app-divider label="Section End" labelPosition="right"></app-divider>`,

    'divider-showcase/with-label': `<!-- With text label -->
<app-divider label="Continue with"></app-divider>

<!-- With icon label -->
<app-divider>
  <app-icon name="star" [size]="16"></app-icon>
</app-divider>

<!-- Complex label -->
<app-divider>
  <span class="flex items-center gap-2 text-sm text-gray-500">
    <app-icon name="calendar" [size]="16"></app-icon>
    Today
  </span>
</app-divider>`,

    'divider-showcase/vertical': `<!-- Vertical divider in flex container -->
<div class="flex items-center gap-4">
  <button class="px-4 py-2">Edit</button>
  <app-divider orientation="vertical" class="h-8"></app-divider>
  <button class="px-4 py-2">Delete</button>
  <app-divider orientation="vertical" class="h-8"></app-divider>
  <button class="px-4 py-2">Share</button>
</div>`,

    // Skeleton examples
    'skeleton-showcase/text-blocks': `<!-- Basic text skeleton -->
<app-skeleton></app-skeleton>

<!-- Single line -->
<app-skeleton [lines]="1"></app-skeleton>

<!-- Multiple lines -->
<app-skeleton [lines]="5"></app-skeleton>

<!-- Custom width -->
<app-skeleton [lines]="2" width="200px"></app-skeleton>`,

    'skeleton-showcase/avatar-placeholders': `<!-- Small avatar -->
<app-skeleton variant="circular" width="32px" height="32px"></app-skeleton>

<!-- Medium avatar -->
<app-skeleton variant="circular" width="48px" height="48px"></app-skeleton>

<!-- Large avatar -->
<app-skeleton variant="circular" width="64px" height="64px"></app-skeleton>

<!-- Avatar with text -->
<div class="flex items-center space-x-3">
  <app-skeleton variant="circular" width="40px" height="40px"></app-skeleton>
  <div>
    <app-skeleton [lines]="1" width="120px"></app-skeleton>
    <app-skeleton [lines]="1" width="80px" class="mt-1"></app-skeleton>
  </div>
</div>`,

    'skeleton-showcase/card-skeletons': `<!-- Basic card skeleton -->
<div class="border rounded-lg p-4 space-y-3">
  <app-skeleton variant="rectangular" height="200px"></app-skeleton>
  <app-skeleton [lines]="2"></app-skeleton>
  <app-skeleton variant="button" width="100px"></app-skeleton>
</div>

<!-- Card with header -->
<div class="border rounded-lg overflow-hidden">
  <app-skeleton variant="rectangular" height="150px"></app-skeleton>
  <div class="p-4 space-y-3">
    <app-skeleton [lines]="1" width="60%"></app-skeleton>
    <app-skeleton [lines]="3"></app-skeleton>
    <div class="flex space-x-2">
      <app-skeleton variant="button" width="80px"></app-skeleton>
      <app-skeleton variant="button" width="80px"></app-skeleton>
    </div>
  </div>
</div>`,

    'skeleton-showcase/form-skeletons': `<!-- Form field skeleton -->
<div class="space-y-4 max-w-sm">
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
    <app-skeleton variant="rectangular" height="80px"></app-skeleton>
  </div>
  <app-skeleton variant="button" width="100%" height="44px"></app-skeleton>
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