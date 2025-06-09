import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent, Tab } from '../../../../../shared/components/tabs';

@Component({
  selector: 'pst-tabs-showcase',
  standalone: true,
  imports: [CommonModule, TabsComponent],
  template: `
    <div class="p-8 max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Tabs Component</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">Navigation component for organizing content into tabbed sections.</p>

      <!-- Line Variant -->
      <section class="showcase-section">
        <h2>Line Variant (Default)</h2>
        <div class="example-container">
          <pst-tabs 
            [tabs]="basicTabs" 
            variant="line"
            (tabChange)="onTabChange($event)"
          >
            <div *ngFor="let tab of basicTabs" [hidden]="activeTab !== tab.id" class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ tab.label }}</h3>
              <p class="text-gray-600 dark:text-gray-400">
                This is the content for the {{ tab.label }} tab. You can put any content here.
              </p>
            </div>
          </pst-tabs>
        </div>
      </section>

      <!-- Pills Variant -->
      <section class="showcase-section">
        <h2>Pills Variant</h2>
        <div class="example-container">
          <pst-tabs 
            [tabs]="basicTabs" 
            variant="pills"
            (tabChange)="onTabChange($event)"
          ></pst-tabs>
        </div>
      </section>

      <!-- Bordered Variant -->
      <section class="showcase-section">
        <h2>Bordered Variant</h2>
        <div class="example-container bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <pst-tabs 
            [tabs]="basicTabs" 
            variant="bordered"
            (tabChange)="onTabChange($event)"
          ></pst-tabs>
        </div>
      </section>

      <!-- With Icons -->
      <section class="showcase-section">
        <h2>Tabs with Icons</h2>
        <div class="example-container">
          <pst-tabs 
            [tabs]="tabsWithIcons" 
            variant="line"
            (tabChange)="onTabChange($event)"
          ></pst-tabs>
        </div>
      </section>

      <!-- With Badges -->
      <section class="showcase-section">
        <h2>Tabs with Badges</h2>
        <div class="example-container">
          <pst-tabs 
            [tabs]="tabsWithBadges" 
            variant="line"
            (tabChange)="onTabChange($event)"
          ></pst-tabs>
        </div>
      </section>

      <!-- Disabled Tabs -->
      <section class="showcase-section">
        <h2>Disabled Tabs</h2>
        <div class="example-container">
          <pst-tabs 
            [tabs]="tabsWithDisabled" 
            variant="line"
            (tabChange)="onTabChange($event)"
          ></pst-tabs>
        </div>
      </section>

      <!-- Scrollable Tabs -->
      <section class="showcase-section">
        <h2>Scrollable Tabs</h2>
        <div class="example-container">
          <pst-tabs 
            [tabs]="manyTabs" 
            variant="line"
            [scrollable]="true"
            (tabChange)="onTabChange($event)"
          ></pst-tabs>
        </div>
      </section>

      <!-- Real-world Example -->
      <section class="showcase-section">
        <h2>Real-world Example: Product Details</h2>
        <div class="example-container">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <!-- Product Header -->
            <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Solar Panel Trina Vertex S TSM-425NEG9R.28 425Wp
              </h2>
              <div class="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span><strong>SKU:</strong> SOL-TRI-425-V</span>
                <span><strong>Category:</strong> Solar Panels</span>
                <span><strong>Price:</strong> €285.00</span>
              </div>
            </div>
            
            <!-- Product Tabs -->
            <pst-tabs 
              [tabs]="productTabs" 
              variant="bordered"
              (tabChange)="onTabChange($event)"
              class="block"
            >
              <!-- Product Information -->
              <div *ngIf="activeProductTab === 'info'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Product Name
                    </label>
                    <input type="text" value="Solar Panel Trina Vertex S TSM-425NEG9R.28 425Wp" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Manufacturer
                    </label>
                    <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                      <option>Trina Solar</option>
                      <option>JA Solar</option>
                      <option>Longi Solar</option>
                    </select>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      SKU
                    </label>
                    <input type="text" value="SOL-TRI-425-V" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Discontinued</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Technical Specs -->
              <div *ngIf="activeProductTab === 'specs'" class="prose dark:prose-invert max-w-none">
                <h3>Technical Specifications</h3>
                <table class="w-full">
                  <tbody>
                    <tr>
                      <td class="font-medium">Power Output</td>
                      <td>425 Wp</td>
                    </tr>
                    <tr>
                      <td class="font-medium">Technology</td>
                      <td>Monocrystalline</td>
                    </tr>
                    <tr>
                      <td class="font-medium">Efficiency</td>
                      <td>21.3%</td>
                    </tr>
                    <tr>
                      <td class="font-medium">Dimensions</td>
                      <td>1754 x 1096 x 30 mm</td>
                    </tr>
                    <tr>
                      <td class="font-medium">Weight</td>
                      <td>21.8 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Images -->
              <div *ngIf="activeProductTab === 'images'" class="space-y-4">
                <h3 class="font-medium">Product Images</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400">Image 1</span>
                  </div>
                  <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400">Image 2</span>
                  </div>
                  <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400">Image 3</span>
                  </div>
                  <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400">Image 4</span>
                  </div>
                </div>
              </div>

              <!-- Stock -->
              <div *ngIf="activeProductTab === 'stock'" class="space-y-4">
                <h3 class="font-medium">Stock Information</h3>
                <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div class="text-2xl font-bold text-gray-900 dark:text-gray-100">156</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">In Stock</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-gray-900 dark:text-gray-100">24</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Reserved</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-gray-900 dark:text-gray-100">132</div>
                      <div class="text-sm text-gray-600 dark:text-gray-400">Available</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Documents -->
              <div *ngIf="activeProductTab === 'docs'" class="space-y-4">
                <h3 class="font-medium">Documents</h3>
                <div class="space-y-2">
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span class="text-sm">Technical Datasheet.pdf</span>
                    <button class="text-primary-600 hover:text-primary-700 text-sm">Download</button>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span class="text-sm">Installation Manual.pdf</span>
                    <button class="text-primary-600 hover:text-primary-700 text-sm">Download</button>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span class="text-sm">Warranty Certificate.pdf</span>
                    <button class="text-primary-600 hover:text-primary-700 text-sm">Download</button>
                  </div>
                </div>
              </div>
            </pst-tabs>
          </div>
        </div>
      </section>

      <!-- Props Table -->
      <section class="showcase-section">
        <h2>Component API</h2>
        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>tabs</td>
                <td>Tab[]</td>
                <td>[]</td>
                <td>Array of tab objects with id, label, icon, disabled, and badge properties</td>
              </tr>
              <tr>
                <td>variant</td>
                <td>'line' | 'pills' | 'bordered'</td>
                <td>'line'</td>
                <td>Visual style variant of the tabs</td>
              </tr>
              <tr>
                <td>activeTab</td>
                <td>string</td>
                <td>undefined</td>
                <td>ID of the initially active tab</td>
              </tr>
              <tr>
                <td>scrollable</td>
                <td>boolean</td>
                <td>false</td>
                <td>Enable horizontal scrolling for overflow tabs</td>
              </tr>
              <tr>
                <td>ariaLabel</td>
                <td>string</td>
                <td>'Tab navigation'</td>
                <td>Accessibility label for the tab list</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 class="mt-6">Events</h3>
        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>tabChange</td>
                <td>TabChangeEvent</td>
                <td>Emitted when the active tab changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class TabsShowcaseComponent {
  activeTab = 'overview';
  activeProductTab = 'info';

  basicTabs: Tab[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'specs', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' }
  ];

  tabsWithIcons: Tab[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' }
  ];

  tabsWithBadges: Tab[] = [
    { id: 'inbox', label: 'Inbox', badge: 12 },
    { id: 'sent', label: 'Sent', badge: 3 },
    { id: 'drafts', label: 'Drafts', badge: 2 },
    { id: 'spam', label: 'Spam', badge: 0 }
  ];

  tabsWithDisabled: Tab[] = [
    { id: 'active', label: 'Active Tab' },
    { id: 'disabled1', label: 'Disabled Tab', disabled: true },
    { id: 'enabled', label: 'Enabled Tab' },
    { id: 'disabled2', label: 'Another Disabled', disabled: true }
  ];

  manyTabs: Tab[] = [
    { id: 'tab1', label: 'General' },
    { id: 'tab2', label: 'Security' },
    { id: 'tab3', label: 'Privacy' },
    { id: 'tab4', label: 'Notifications' },
    { id: 'tab5', label: 'Integrations' },
    { id: 'tab6', label: 'Advanced' },
    { id: 'tab7', label: 'Experimental' },
    { id: 'tab8', label: 'Developer' },
    { id: 'tab9', label: 'About' }
  ];

  productTabs: Tab[] = [
    { id: 'info', label: 'Product Information' },
    { id: 'specs', label: 'Technical Data' },
    { id: 'images', label: 'Images & Media', badge: 4 },
    { id: 'stock', label: 'Stock' },
    { id: 'docs', label: 'Documents', badge: 3 }
  ];

  onTabChange(event: any) {
    console.log('Tab changed:', event);
    if (event.tab.id.startsWith('tab')) {
      this.activeTab = event.currentTab;
    } else if (this.productTabs.some(t => t.id === event.currentTab)) {
      this.activeProductTab = event.currentTab;
    }
  }
}