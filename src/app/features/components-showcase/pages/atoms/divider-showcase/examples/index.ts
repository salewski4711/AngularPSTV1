// Auto-generated file from example HTML files
// Run "node sync-examples.js" to regenerate

export const basicExample = `<!-- Basic horizontal divider -->
<app-divider></app-divider>

<!-- Divider separating content sections -->
<div class="space-y-4">
  <section>
    <h3>First Section</h3>
    <p>Content for the first section</p>
  </section>
  
  <app-divider></app-divider>
  
  <section>
    <h3>Second Section</h3>
    <p>Content for the second section</p>
  </section>
</div>`;

export const variantsExample = `<!-- Solid variant (default) -->
<app-divider variant="solid"></app-divider>

<!-- Dashed variant -->
<app-divider variant="dashed"></app-divider>

<!-- Dotted variant -->
<app-divider variant="dotted"></app-divider>

<!-- Different variants with colors -->
<app-divider variant="solid" color="primary"></app-divider>
<app-divider variant="dashed" color="secondary"></app-divider>
<app-divider variant="dotted" color="dark"></app-divider>`;

export const withLabelExample = `<!-- Simple label -->
<app-divider label="OR"></app-divider>

<!-- Section title -->
<app-divider label="User Settings"></app-divider>

<!-- With different variants -->
<app-divider label="Continue with" variant="dashed"></app-divider>

<!-- Colored labels -->
<app-divider label="Premium Features" color="primary"></app-divider>
<app-divider label="Advanced Options" color="secondary" variant="dotted"></app-divider>`;

export const spacingExample = `<!-- Small spacing -->
<p>Content with small spacing</p>
<app-divider spacing="sm"></app-divider>
<p>Next content section</p>

<!-- Medium spacing (default) -->
<p>Content with medium spacing</p>
<app-divider spacing="md"></app-divider>
<p>Next content section</p>

<!-- Large spacing -->
<p>Content with large spacing</p>
<app-divider spacing="lg"></app-divider>
<p>Next content section</p>

<!-- Different spacings with labels -->
<app-divider label="Small Gap" spacing="sm"></app-divider>
<app-divider label="Medium Gap" spacing="md"></app-divider>
<app-divider label="Large Gap" spacing="lg"></app-divider>`;

export const colorsExample = `<!-- Default color -->
<app-divider color="default"></app-divider>

<!-- Primary color (ProSolarTec Orange) -->
<app-divider color="primary"></app-divider>

<!-- Secondary color (ProSolarTec Blue) -->
<app-divider color="secondary"></app-divider>

<!-- Light color (for dark backgrounds) -->
<app-divider color="light"></app-divider>

<!-- Dark color (for light backgrounds) -->
<app-divider color="dark"></app-divider>

<!-- Colors with labels -->
<app-divider label="Default Style" color="default"></app-divider>
<app-divider label="Primary Brand" color="primary"></app-divider>
<app-divider label="Secondary Brand" color="secondary"></app-divider>`;

export const verticalExample = `<!-- Vertical divider in navigation -->
<div class="flex items-center">
  <a href="#" class="px-4">Home</a>
  <app-divider orientation="vertical"></app-divider>
  <a href="#" class="px-4">About</a>
  <app-divider orientation="vertical"></app-divider>
  <a href="#" class="px-4">Contact</a>
</div>

<!-- Vertical divider with different variants -->
<div class="flex items-center h-10">
  <span class="px-4">Option A</span>
  <app-divider orientation="vertical" variant="solid"></app-divider>
  <span class="px-4">Option B</span>
  <app-divider orientation="vertical" variant="dashed"></app-divider>
  <span class="px-4">Option C</span>
  <app-divider orientation="vertical" variant="dotted"></app-divider>
  <span class="px-4">Option D</span>
</div>

<!-- Vertical divider with colors -->
<div class="flex items-center h-12">
  <button class="px-4">Edit</button>
  <app-divider orientation="vertical" color="primary" spacing="sm"></app-divider>
  <button class="px-4">Delete</button>
  <app-divider orientation="vertical" color="secondary" spacing="sm"></app-divider>
  <button class="px-4">Share</button>
</div>`;