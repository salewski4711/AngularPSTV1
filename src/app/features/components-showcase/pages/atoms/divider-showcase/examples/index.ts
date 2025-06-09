// Auto-generated file from example HTML files
// Run "node sync-examples.js" to regenerate

export const basicExample = `<!-- Basic horizontal divider -->
<pst-divider></pst-divider>

<!-- Divider separating content sections -->
<div class="space-y-4">
  <section>
    <h3>First Section</h3>
    <p>Content for the first section</p>
  </section>
  
  <pst-divider></pst-divider>
  
  <section>
    <h3>Second Section</h3>
    <p>Content for the second section</p>
  </section>
</div>`;

export const variantsExample = `<!-- Solid variant (default) -->
<pst-divider variant="solid"></pst-divider>

<!-- Dashed variant -->
<pst-divider variant="dashed"></pst-divider>

<!-- Dotted variant -->
<pst-divider variant="dotted"></pst-divider>

<!-- Different variants with colors -->
<pst-divider variant="solid" color="primary"></pst-divider>
<pst-divider variant="dashed" color="secondary"></pst-divider>
<pst-divider variant="dotted" color="dark"></pst-divider>`;

export const withLabelExample = `<!-- Simple label -->
<pst-divider label="OR"></pst-divider>

<!-- Section title -->
<pst-divider label="User Settings"></pst-divider>

<!-- With different variants -->
<pst-divider label="Continue with" variant="dashed"></pst-divider>

<!-- Colored labels -->
<pst-divider label="Premium Features" color="primary"></pst-divider>
<pst-divider label="Advanced Options" color="secondary" variant="dotted"></pst-divider>`;

export const spacingExample = `<!-- Small spacing -->
<p>Content with small spacing</p>
<pst-divider spacing="sm"></pst-divider>
<p>Next content section</p>

<!-- Medium spacing (default) -->
<p>Content with medium spacing</p>
<pst-divider spacing="md"></pst-divider>
<p>Next content section</p>

<!-- Large spacing -->
<p>Content with large spacing</p>
<pst-divider spacing="lg"></pst-divider>
<p>Next content section</p>

<!-- Different spacings with labels -->
<pst-divider label="Small Gap" spacing="sm"></pst-divider>
<pst-divider label="Medium Gap" spacing="md"></pst-divider>
<pst-divider label="Large Gap" spacing="lg"></pst-divider>`;

export const colorsExample = `<!-- Default color -->
<pst-divider color="default"></pst-divider>

<!-- Primary color (ProSolarTec Orange) -->
<pst-divider color="primary"></pst-divider>

<!-- Secondary color (ProSolarTec Blue) -->
<pst-divider color="secondary"></pst-divider>

<!-- Light color (for dark backgrounds) -->
<pst-divider color="light"></pst-divider>

<!-- Dark color (for light backgrounds) -->
<pst-divider color="dark"></pst-divider>

<!-- Colors with labels -->
<pst-divider label="Default Style" color="default"></pst-divider>
<pst-divider label="Primary Brand" color="primary"></pst-divider>
<pst-divider label="Secondary Brand" color="secondary"></pst-divider>`;

export const verticalExample = `<!-- Vertical divider in navigation -->
<div class="flex items-center">
  <a href="#" class="px-4">Home</a>
  <pst-divider orientation="vertical"></pst-divider>
  <a href="#" class="px-4">About</a>
  <pst-divider orientation="vertical"></pst-divider>
  <a href="#" class="px-4">Contact</a>
</div>

<!-- Vertical divider with different variants -->
<div class="flex items-center h-10">
  <span class="px-4">Option A</span>
  <pst-divider orientation="vertical" variant="solid"></pst-divider>
  <span class="px-4">Option B</span>
  <pst-divider orientation="vertical" variant="dashed"></pst-divider>
  <span class="px-4">Option C</span>
  <pst-divider orientation="vertical" variant="dotted"></pst-divider>
  <span class="px-4">Option D</span>
</div>

<!-- Vertical divider with colors -->
<div class="flex items-center h-12">
  <button class="px-4">Edit</button>
  <pst-divider orientation="vertical" color="primary" spacing="sm"></pst-divider>
  <button class="px-4">Delete</button>
  <pst-divider orientation="vertical" color="secondary" spacing="sm"></pst-divider>
  <button class="px-4">Share</button>
</div>`;

export const thicknessExample = `<!-- Different thickness options -->
<div class="space-y-6">
  <div>
    <p class="text-sm text-gray-600 mb-2">Thin (1px - default)</p>
    <pst-divider thickness="thin"></pst-divider>
  </div>

  <div>
    <p class="text-sm text-gray-600 mb-2">Medium (2px)</p>
    <pst-divider thickness="medium"></pst-divider>
  </div>

  <div>
    <p class="text-sm text-gray-600 mb-2">Thick (4px)</p>
    <pst-divider thickness="thick"></pst-divider>
  </div>

  <!-- Different thicknesses with colors -->
  <div>
    <p class="text-sm text-gray-600 mb-2">Thickness with colors</p>
    <pst-divider thickness="thin" color="primary" class="mb-3"></pst-divider>
    <pst-divider thickness="medium" color="secondary" class="mb-3"></pst-divider>
    <pst-divider thickness="thick" color="custom" customColor="#10b981"></pst-divider>
  </div>

  <!-- Vertical dividers with different thicknesses -->
  <div>
    <p class="text-sm text-gray-600 mb-2">Vertical dividers</p>
    <div class="flex items-center gap-4 h-16">
      <span>Thin</span>
      <pst-divider orientation="vertical" thickness="thin"></pst-divider>
      <span>Medium</span>
      <pst-divider orientation="vertical" thickness="medium"></pst-divider>
      <span>Thick</span>
      <pst-divider orientation="vertical" thickness="thick"></pst-divider>
      <span>End</span>
    </div>
  </div>
</div>`;

export const orientationsExample = `<!-- Horizontal divider (default) -->
<div class="space-y-4">
  <p>Content above</p>
  <pst-divider></pst-divider>
  <p>Content below</p>
</div>

<!-- Vertical divider -->
<div class="flex items-center gap-4 h-20">
  <div class="flex-1">
    <h4 class="font-medium">Left Section</h4>
    <p class="text-sm text-gray-600">Left content</p>
  </div>
  <pst-divider orientation="vertical"></pst-divider>
  <div class="flex-1">
    <h4 class="font-medium">Right Section</h4>
    <p class="text-sm text-gray-600">Right content</p>
  </div>
</div>`;