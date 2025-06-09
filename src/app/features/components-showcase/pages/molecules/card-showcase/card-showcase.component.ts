import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBetaComponent } from '../../../../../shared/components-beta/card/card-beta.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../../../shared/components/badge/badge.component';
import { AvatarComponent } from '../../../../../shared/components/avatar/avatar.component';
import { IconComponent } from '../../../../../shared/icons/icon.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'pst-card-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    CardBetaComponent,
    ButtonComponent,
    BadgeComponent,
    AvatarComponent,
    IconComponent,
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Card Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          A flexible container component for grouping related content.
        </p>
      </div>

      <!-- Import Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Import
        </h2>
        <pst-code-block
          [code]="importCode"
          language="typescript"
        ></pst-code-block>
      </section>

      <!-- Examples -->
      <section class="space-y-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Examples
        </h2>

        <!-- Basic Card -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Card
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md">
              <pst-card-beta>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Card Title</h3>
                <p class="text-gray-600 dark:text-gray-400">
                  This is a basic card with some content. Cards are great for organizing related information.
                </p>
              </pst-card-beta>
            </div>
          </div>
          <pst-code-block
            [code]="basicCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Card with Header and Footer -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Card with Header and Footer
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="max-w-md">
              <pst-card-beta>
                <div card-header>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Account Settings</h3>
                </div>
                <div card-body>
                  <p class="text-gray-600 dark:text-gray-400">
                    Manage your account settings and preferences here.
                  </p>
                </div>
                <div card-footer>
                  <div class="flex gap-2">
                    <pst-button variant="primary">Save Changes</pst-button>
                    <pst-button variant="ghost">Cancel</pst-button>
                  </div>
                </div>
              </pst-card-beta>
            </div>
          </div>
          <pst-code-block
            [code]="headerFooterCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Variants -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Variants
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              <pst-card-beta variant="default">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Default Card</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Standard card with subtle shadow and border.
                </p>
              </pst-card-beta>
              
              <pst-card-beta variant="outlined">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Outlined Card</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Card with border but no shadow.
                </p>
              </pst-card-beta>
              
              <pst-card-beta variant="elevated">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Elevated Card</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Card with more prominent shadow.
                </p>
              </pst-card-beta>
              
              <pst-card-beta variant="flat">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Flat Card</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Card with no shadow or border.
                </p>
              </pst-card-beta>
            </div>
          </div>
          <pst-code-block
            [code]="variantsCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Interactive Cards -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Interactive Cards
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              <pst-card-beta [hoverable]="true">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Hoverable Card</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  This card responds to hover with elevation change.
                </p>
              </pst-card-beta>
              
              <pst-card-beta [clickable]="true" (click)="onCardClick()">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Clickable Card</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  This entire card is clickable.
                </p>
              </pst-card-beta>
            </div>
          </div>
          <pst-code-block
            [code]="interactiveCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Padding Options -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Padding Options
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
              <pst-card-beta padding="none">
                <div class="p-4">
                  <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">No Padding</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Card with no default padding.
                  </p>
                </div>
              </pst-card-beta>
              
              <pst-card-beta padding="sm">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Small Padding</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Card with small padding.
                </p>
              </pst-card-beta>
              
              <pst-card-beta padding="md">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Medium Padding</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Card with medium padding (default).
                </p>
              </pst-card-beta>
              
              <pst-card-beta padding="lg">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Large Padding</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Card with large padding.
                </p>
              </pst-card-beta>
            </div>
          </div>
          <pst-code-block
            [code]="paddingCode"
            language="html"
          ></pst-code-block>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Real-world Examples
          </h3>
          <div class="space-y-6">
            <!-- User Profile Card -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">User Profile Card</h4>
              <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
                <div class="max-w-sm">
                  <pst-card-beta>
                    <div card-body>
                      <div class="flex items-center gap-4 mb-4">
                        <pst-avatar 
                          name="John Doe" 
                          image="https://i.pravatar.cc/150?img=1"
                          size="lg"
                        ></pst-avatar>
                        <div>
                          <h3 class="font-semibold text-gray-900 dark:text-gray-100">John Doe</h3>
                          <p class="text-sm text-gray-600 dark:text-gray-400">Product Designer</p>
                        </div>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Passionate about creating beautiful and functional user experiences.
                      </p>
                      <div class="flex gap-2">
                        <pst-badge color="primary">UI/UX</pst-badge>
                        <pst-badge color="gray">Figma</pst-badge>
                        <pst-badge color="gray">Prototyping</pst-badge>
                      </div>
                    </div>
                    <div card-footer class="bg-gray-50 dark:bg-gray-800/50">
                      <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600 dark:text-gray-400">
                          <pst-icon name="map-pin" [size]="16" class="inline mr-1"></pst-icon>
                          San Francisco, CA
                        </span>
                        <pst-button variant="ghost" size="sm">
                          View Profile
                        </pst-button>
                      </div>
                    </div>
                  </pst-card-beta>
                </div>
              </div>
            </div>

            <!-- Product Card -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Product Card</h4>
              <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
                <div class="max-w-sm">
                  <pst-card-beta [hoverable]="true" padding="none">
                    <img 
                      src="https://via.placeholder.com/400x200/F99600/FFFFFF?text=Solar+Panel" 
                      alt="Solar Panel"
                      class="w-full h-48 object-cover"
                    >
                    <div class="p-4">
                      <div class="flex justify-between items-start mb-2">
                        <h3 class="font-semibold text-gray-900 dark:text-gray-100">
                          Premium Solar Panel
                        </h3>
                        <pst-badge color="success" size="sm">In Stock</pst-badge>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        High-efficiency monocrystalline solar panel with 25-year warranty.
                      </p>
                      <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-primary">$299</span>
                        <pst-button variant="primary" size="sm">
                          Add to Cart
                        </pst-button>
                      </div>
                    </div>
                  </pst-card-beta>
                </div>
              </div>
            </div>

            <!-- Stats Card -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Stats Card</h4>
              <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                  <pst-card-beta variant="outlined">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">$12,345</p>
                        <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                          <pst-icon name="arrow-up" [size]="12" class="mr-1"></pst-icon>
                          12% from last month
                        </p>
                      </div>
                      <div class="p-3 bg-primary/10 rounded-lg">
                        <pst-icon name="dollar-sign" [size]="24" class="text-primary"></pst-icon>
                      </div>
                    </div>
                  </pst-card-beta>
                  
                  <pst-card-beta variant="outlined">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">New Customers</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">248</p>
                        <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                          <pst-icon name="arrow-up" [size]="12" class="mr-1"></pst-icon>
                          8% from last month
                        </p>
                      </div>
                      <div class="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <pst-icon name="users" [size]="24" class="text-green-600 dark:text-green-400"></pst-icon>
                      </div>
                    </div>
                  </pst-card-beta>
                  
                  <pst-card-beta variant="outlined">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">42</p>
                        <p class="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                          <pst-icon name="arrow-down" [size]="12" class="mr-1"></pst-icon>
                          3% from last month
                        </p>
                      </div>
                      <div class="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <pst-icon name="folder" [size]="24" class="text-blue-600 dark:text-blue-400"></pst-icon>
                      </div>
                    </div>
                  </pst-card-beta>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardShowcaseComponent {
  onCardClick(): void {
    console.log('Card clicked!');
  }

  importCode = `import { CardBetaComponent } from '@app/shared/components-beta/card/card-beta.component';

@Component({
  // ...
  imports: [CardBetaComponent]
})`;

  basicCode = `<pst-card-beta>
  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Card Title</h3>
  <p class="text-gray-600 dark:text-gray-400">
    This is a basic card with some content. Cards are great for organizing related information.
  </p>
</pst-card-beta>`;

  headerFooterCode = `<pst-card-beta>
  <div card-header>
    <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Account Settings</h3>
  </div>
  <div card-body>
    <p class="text-gray-600 dark:text-gray-400">
      Manage your account settings and preferences here.
    </p>
  </div>
  <div card-footer>
    <div class="flex gap-2">
      <pst-button variant="primary">Save Changes</pst-button>
      <pst-button variant="ghost">Cancel</pst-button>
    </div>
  </div>
</pst-card-beta>`;

  variantsCode = `<pst-card-beta variant="default">Default Card</pst-card-beta>
<pst-card-beta variant="outlined">Outlined Card</pst-card-beta>
<pst-card-beta variant="elevated">Elevated Card</pst-card-beta>
<pst-card-beta variant="flat">Flat Card</pst-card-beta>`;

  interactiveCode = `<!-- Hoverable Card -->
<pst-card-beta [hoverable]="true">
  <h4 class="font-medium">Hoverable Card</h4>
  <p class="text-sm">This card responds to hover.</p>
</pst-card-beta>

<!-- Clickable Card -->
<pst-card-beta [clickable]="true" (click)="onCardClick()">
  <h4 class="font-medium">Clickable Card</h4>
  <p class="text-sm">This entire card is clickable.</p>
</pst-card-beta>`;

  paddingCode = `<pst-card-beta padding="none">No Padding</pst-card-beta>
<pst-card-beta padding="sm">Small Padding</pst-card-beta>
<pst-card-beta padding="md">Medium Padding (default)</pst-card-beta>
<pst-card-beta padding="lg">Large Padding</pst-card-beta>`;
}