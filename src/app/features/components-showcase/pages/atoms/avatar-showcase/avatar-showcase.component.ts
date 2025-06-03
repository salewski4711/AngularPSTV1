import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../../../shared/components/avatar/avatar.component';
import { CodeBlockComponent } from '../../../shared/components/code-block.component';

@Component({
  selector: 'app-avatar-showcase',
  standalone: true,
  imports: [
    CommonModule, 
    AvatarComponent,
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Avatar Component
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Display user profile pictures, initials, or placeholder icons.
        </p>
      </div>

      <!-- Import Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Import
        </h2>
        <app-code-block
          [code]="importCode"
          language="typescript"
        ></app-code-block>
      </section>

      <!-- Examples -->
      <section class="space-y-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Examples
        </h2>

        <!-- Basic Avatar -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Basic Avatar
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-avatar name="John Doe"></app-avatar>
              <app-avatar name="Jane Smith"></app-avatar>
              <app-avatar name="Robert Johnson"></app-avatar>
              <app-avatar name="Emily Davis"></app-avatar>
            </div>
          </div>
          <app-code-block
            [code]="basicCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Sizes -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Sizes
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-avatar name="John Doe" size="xs"></app-avatar>
              <app-avatar name="John Doe" size="sm"></app-avatar>
              <app-avatar name="John Doe" size="md"></app-avatar>
              <app-avatar name="John Doe" size="lg"></app-avatar>
              <app-avatar name="John Doe" size="xl"></app-avatar>
            </div>
          </div>
          <app-code-block
            [code]="sizesCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- With Images -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Images
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-avatar 
                name="User 1" 
                image="https://i.pravatar.cc/150?img=1"
              ></app-avatar>
              <app-avatar 
                name="User 2" 
                image="https://i.pravatar.cc/150?img=2"
                size="lg"
              ></app-avatar>
              <app-avatar 
                name="User 3" 
                image="https://i.pravatar.cc/150?img=3"
                size="xl"
              ></app-avatar>
              <app-avatar 
                name="Invalid Image" 
                image="https://invalid-url.com/image.jpg"
              ></app-avatar>
            </div>
          </div>
          <app-code-block
            [code]="imagesCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Shapes -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Shapes
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-avatar name="Circle Shape" shape="circle"></app-avatar>
              <app-avatar name="Square Shape" shape="square"></app-avatar>
              <app-avatar 
                name="With Image" 
                shape="square"
                image="https://i.pravatar.cc/150?img=4"
              ></app-avatar>
            </div>
          </div>
          <app-code-block
            [code]="shapesCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- With Status Indicator -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            With Status Indicator
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-avatar name="Online" status="online"></app-avatar>
              <app-avatar name="Away" status="away"></app-avatar>
              <app-avatar name="Busy" status="busy"></app-avatar>
              <app-avatar name="Offline" status="offline"></app-avatar>
              <app-avatar 
                name="With Image" 
                status="online"
                image="https://i.pravatar.cc/150?img=5"
              ></app-avatar>
            </div>
          </div>
          <app-code-block
            [code]="statusCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Custom Colors -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Custom Colors
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-avatar name="Primary" color="primary"></app-avatar>
              <app-avatar name="Secondary" color="secondary"></app-avatar>
              <app-avatar name="Success" color="success"></app-avatar>
              <app-avatar name="Warning" color="warning"></app-avatar>
              <app-avatar name="Danger" color="danger"></app-avatar>
              <app-avatar name="Info" color="info"></app-avatar>
            </div>
          </div>
          <app-code-block
            [code]="colorsCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Icon Fallback -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Icon Fallback
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="flex items-center gap-4">
              <app-avatar></app-avatar>
              <app-avatar size="lg"></app-avatar>
              <app-avatar size="xl" color="primary"></app-avatar>
            </div>
          </div>
          <app-code-block
            [code]="iconFallbackCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Avatar Groups -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Avatar Groups
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-4">
              <div class="flex -space-x-2">
                <app-avatar name="User 1" image="https://i.pravatar.cc/150?img=1" class="ring-2 ring-white dark:ring-gray-900"></app-avatar>
                <app-avatar name="User 2" image="https://i.pravatar.cc/150?img=2" class="ring-2 ring-white dark:ring-gray-900"></app-avatar>
                <app-avatar name="User 3" image="https://i.pravatar.cc/150?img=3" class="ring-2 ring-white dark:ring-gray-900"></app-avatar>
                <app-avatar name="User 4" image="https://i.pravatar.cc/150?img=4" class="ring-2 ring-white dark:ring-gray-900"></app-avatar>
                <div class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-xs font-medium text-gray-600 ring-2 ring-white dark:ring-gray-900">
                  +5
                </div>
              </div>
            </div>
          </div>
          <app-code-block
            [code]="groupCode"
            language="html"
          ></app-code-block>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Real-world Examples
          </h3>
          <div class="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-4">
            <div class="space-y-6">
              <!-- User Profile Card -->
              <div class="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <app-avatar 
                  name="John Doe" 
                  image="https://i.pravatar.cc/150?img=8"
                  size="lg"
                  status="online"
                ></app-avatar>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-gray-100">John Doe</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">john.doe&#64;example.com</p>
                </div>
              </div>

              <!-- Comment Thread -->
              <div class="space-y-4">
                <div class="flex gap-3">
                  <app-avatar name="Alice Johnson" size="sm"></app-avatar>
                  <div class="flex-1">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">Alice Johnson</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Great work on this project!</p>
                    </div>
                  </div>
                </div>
                <div class="flex gap-3">
                  <app-avatar name="Bob Smith" size="sm" color="secondary"></app-avatar>
                  <div class="flex-1">
                    <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">Bob Smith</p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Thanks! Let me know if you need any changes.</p>
                    </div>
                  </div>
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
export class AvatarShowcaseComponent {
  importCode = `import { AvatarComponent } from '@app/shared/components/avatar/avatar.component';

@Component({
  // ...
  imports: [AvatarComponent]
})`;

  basicCode = `<app-avatar name="John Doe"></app-avatar>
<app-avatar name="Jane Smith"></app-avatar>
<app-avatar name="Robert Johnson"></app-avatar>
<app-avatar name="Emily Davis"></app-avatar>`;

  sizesCode = `<app-avatar name="John Doe" size="xs"></app-avatar>
<app-avatar name="John Doe" size="sm"></app-avatar>
<app-avatar name="John Doe" size="md"></app-avatar>
<app-avatar name="John Doe" size="lg"></app-avatar>
<app-avatar name="John Doe" size="xl"></app-avatar>`;

  imagesCode = `<app-avatar 
  name="User 1" 
  image="https://i.pravatar.cc/150?img=1"
></app-avatar>

<app-avatar 
  name="User 2" 
  image="https://i.pravatar.cc/150?img=2"
  size="lg"
></app-avatar>

<!-- Falls back to initials when image fails to load -->
<app-avatar 
  name="Invalid Image" 
  image="https://invalid-url.com/image.jpg"
></app-avatar>`;

  shapesCode = `<app-avatar name="Circle Shape" shape="circle"></app-avatar>
<app-avatar name="Square Shape" shape="square"></app-avatar>
<app-avatar 
  name="With Image" 
  shape="square"
  image="https://i.pravatar.cc/150?img=4"
></app-avatar>`;

  statusCode = `<app-avatar name="Online" status="online"></app-avatar>
<app-avatar name="Away" status="away"></app-avatar>
<app-avatar name="Busy" status="busy"></app-avatar>
<app-avatar name="Offline" status="offline"></app-avatar>
<app-avatar 
  name="With Image" 
  status="online"
  image="https://i.pravatar.cc/150?img=5"
></app-avatar>`;

  colorsCode = `<app-avatar name="Primary" color="primary"></app-avatar>
<app-avatar name="Secondary" color="secondary"></app-avatar>
<app-avatar name="Success" color="success"></app-avatar>
<app-avatar name="Warning" color="warning"></app-avatar>
<app-avatar name="Danger" color="danger"></app-avatar>
<app-avatar name="Info" color="info"></app-avatar>`;

  iconFallbackCode = `<!-- No name provided - shows user icon -->
<app-avatar></app-avatar>
<app-avatar size="lg"></app-avatar>
<app-avatar size="xl" color="primary"></app-avatar>`;

  groupCode = `<div class="flex -space-x-2">
  <app-avatar name="User 1" image="https://i.pravatar.cc/150?img=1" class="ring-2 ring-white dark:ring-gray-900"></app-avatar>
  <app-avatar name="User 2" image="https://i.pravatar.cc/150?img=2" class="ring-2 ring-white dark:ring-gray-900"></app-avatar>
  <app-avatar name="User 3" image="https://i.pravatar.cc/150?img=3" class="ring-2 ring-white dark:ring-gray-900"></app-avatar>
  <app-avatar name="User 4" image="https://i.pravatar.cc/150?img=4" class="ring-2 ring-white dark:ring-gray-900"></app-avatar>
  <div class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-xs font-medium text-gray-600 ring-2 ring-white dark:ring-gray-900">
    +5
  </div>
</div>`;
}