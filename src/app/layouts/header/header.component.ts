import { Component, inject, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../features/auth/auth.service';
import { IconComponent } from '../../shared/icons/icon.component';
import { SearchModalComponent } from '../../shared/components/search-modal/search-modal.component';
import { NotificationsComponent } from '../../shared/components/notifications/notifications.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, IconComponent, SearchModalComponent, NotificationsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-white dark:bg-black-lighter shadow-md transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <app-logo size="md"></app-logo>
          
          <!-- Navigation - Ausgeblendet, da wir Bottom Navigation verwenden -->
          <!-- <nav class="hidden md:flex items-center space-x-8">
            Alte Navigation entfernt - siehe Bottom Navigation
          </nav> -->
          
          <!-- Right Section -->
          <div class="flex items-center space-x-4">
            <!-- Search Button -->
            <button
              (click)="toggleSearch()"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Search components (⌘K)"
              title="Search components (⌘K)"
            >
              <app-icon name="search" [size]="20"></app-icon>
            </button>
            
            <!-- Notifications -->
            <app-notifications></app-notifications>
            
            <!-- Theme Toggle -->
            <button
              (click)="toggleTheme()"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              [attr.aria-label]="isDarkMode ? 'Zum Light Mode wechseln' : 'Zum Dark Mode wechseln'"
            >
              @if (isDarkMode) {
                <!-- Sun Icon -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                  </path>
                </svg>
              } @else {
                <!-- Moon Icon -->
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
                  </path>
                </svg>
              }
            </button>
            
            <!-- User Menu -->
            @if (isAuthenticated$ | async) {
              <div class="relative">
                <button
                  (click)="toggleUserMenu()"
                  class="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <app-icon name="user" [size]="20"></app-icon>
                  @if (currentUser$ | async; as user) {
                    <span class="text-sm font-medium">{{ user.username }}</span>
                  }
                  <app-icon name="arrow-down" [size]="16"></app-icon>
                </button>
                
                <!-- Dropdown Menu -->
                @if (showUserMenu()) {
                  <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                      @if (currentUser$ | async; as user) {
                        <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ user.username }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                      }
                    </div>
                    <div class="p-1">
                      <button
                        (click)="logout()"
                        class="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                      >
                        <app-icon name="logout" [size]="16"></app-icon>
                        <span>Abmelden</span>
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </header>
    
    <!-- Search Modal -->
    @if (showSearch()) {
      <app-search-modal (close)="closeSearch()"></app-search-modal>
    }
  `,
  styles: []
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  router = inject(Router);
  showSearch = signal(false);
  showUserMenu = signal(false);
  
  // Auth observables
  isAuthenticated$ = this.authService.isAuthenticated$;
  currentUser$ = this.authService.currentUser$;
  
  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleSearch(): void {
    this.showSearch.update(value => !value);
  }

  closeSearch(): void {
    this.showSearch.set(false);
  }
  
  toggleUserMenu(): void {
    this.showUserMenu.update(value => !value);
  }
  
  logout(): void {
    this.authService.logout().pipe(
      take(1) // Automatisches Complete nach erstem Emit
    ).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent): void {
    // Cmd/Ctrl + K to open search
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.toggleSearch();
    }
  }
}