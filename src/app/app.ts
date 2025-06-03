import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './shared/components/top-navigation/top-navigation.component';
import { BottomNavigationComponent } from './shared/components/bottom-navigation';
import { AuthService } from './features/auth/auth.service';
import { NavigationService } from './core/services/navigation.service';
import { NotificationsService } from './shared/services/notifications.service';
import { MockAuthService } from './core/services/mock-auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, TopNavigationComponent, BottomNavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-crm-app';
  router = inject(Router);
  authService = inject(AuthService);
  navigationService = inject(NavigationService);
  notificationsService = inject(NotificationsService);
  mockAuthService = inject(MockAuthService);
  
  isAuthenticated$ = this.authService.isAuthenticated$;
  currentUser$ = this.authService.currentUser$;
  
  // Navigation configuration
  navigationConfig = {
    showLogo: true,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    sticky: true,
    transparent: false,
    elevated: true,
    fullWidth: false,
    logoVariant: 'horizontal' as const
  };
  
  ngOnInit(): void {
    // Auto-login for development
    if (!environment.production) {
      this.mockAuthService.autoLogin();
    }
  }
  
  onLogoClick(): void {
    this.router.navigate(['/dashboard']);
  }
  
  onSearchSubmit(_query: string): void {
    // TODO: Implement search functionality
    // This could navigate to a search results page or filter current content
  }
  
  onNotificationClick(notification: { id: string }): void {
    this.notificationsService.markAsRead(notification.id);
  }
  
  onUserMenuAction(action: string): void {
    switch (action) {
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'settings':
        this.router.navigate(['/settings']);
        break;
      case 'logout':
        this.authService.logout().subscribe(() => {
          this.router.navigate(['/auth/login']);
        });
        break;
      default:
        // Unknown action - could log to error service in production
        break;
    }
  }
  
  onMobileMenuToggle(_isOpen: boolean): void {
    // Handle mobile menu state if needed
    // Could emit event or update service state
  }
}
