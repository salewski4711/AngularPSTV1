import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { IconComponent } from '../../../shared/icons/icon.component';
import { filter } from 'rxjs/operators';
import { showcaseNavigation } from '../showcase-navigation';

@Component({
  selector: 'pst-showcase-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Sidebar -->
      <aside class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div class="p-6">
          <!-- Header -->
          <div class="flex items-center gap-3 mb-8">
            <pst-icon name="package" class="text-orange-600" [size]="24"></pst-icon>
            <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Component Library</h2>
          </div>

          <!-- Navigation -->
          <nav class="space-y-6">
            <div *ngFor="let category of navigation" class="space-y-2">
              <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3">
                {{ category.name }}
              </h3>
              <ul class="space-y-1">
                <li *ngFor="let component of category.components">
                  <a
                    [routerLink]="component.path"
                    routerLinkActive="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                    class="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span>{{ component.name }}</span>
                    <span
                      *ngIf="component.status"
                      class="px-2 py-0.5 text-xs rounded-full"
                      [ngClass]="{
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300': component.status === 'beta',
                        'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300': component.status === 'stable',
                        'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300': component.status === 'deprecated'
                      }"
                    >
                      {{ component.status }}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseLayoutComponent {
  navigation = showcaseNavigation;

  constructor(private router: Router) {
    // Listen to route changes for analytics or other purposes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Could add analytics or other tracking here
      // Example: analyticsService.track('page_view', { url: event.url });
    });
  }
}