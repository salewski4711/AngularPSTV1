# Navigation Integration Guide

## Overview

The navigation system in this Angular application consists of several integrated components and services that work together to provide a complete navigation experience.

## Components

### TopNavigationComponent
The main navigation header that includes:
- Logo display with configurable variants
- Search functionality
- Notifications dropdown
- User menu
- Mobile-responsive menu

### Child Components
- **LogoComponent**: Displays the ProSolarTec logo
- **SearchComponent**: Global search input
- **NotificationsComponent**: Notification bell with dropdown
- **UserMenuComponent**: User avatar with dropdown menu
- **MobileMenuComponent**: Responsive menu for mobile devices

## Services

### NavigationService
Central service for managing navigation state:
- Navigation items management
- Route tracking
- Breadcrumb generation
- Dynamic menu updates
- Badge management

### NotificationsService
Manages application notifications:
- Add/remove notifications
- Mark as read functionality
- Unread count tracking
- Signal-based state management

### AuthService
Handles authentication and user state:
- Login/logout functionality
- User profile data
- Authentication state management

## Integration Points

### 1. App Component Integration
```typescript
// app.ts
export class AppComponent {
  navigationConfig = {
    showLogo: true,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    sticky: true,
    transparent: false,
    elevated: true,
    fullWidth: false,
    logoVariant: 'horizontal'
  };
  
  onUserMenuAction(action: string): void {
    switch (action) {
      case 'logout':
        this.authService.logout().subscribe(() => {
          this.router.navigate(['/auth/login']);
        });
        break;
    }
  }
}
```

### 2. Route Configuration
The navigation demo is accessible at `/navigation-demo` and requires authentication:
```typescript
{
  path: 'navigation-demo',
  component: NavigationDemoComponent,
  canActivate: [authGuard],
  title: 'Navigation Demo - ProSolarTec CRM'
}
```

### 3. State Management
- Navigation items are managed through RxJS BehaviorSubjects
- Notifications use Angular signals for optimal performance
- Authentication state is synchronized across components

## Usage

### Basic Usage
```html
<app-top-navigation
  [config]="navigationConfig"
  (logoClick)="onLogoClick()"
  (searchSubmit)="onSearchSubmit($event)"
  (notificationClick)="onNotificationClick($event)"
  (userMenuAction)="onUserMenuAction($event)"
  (mobileMenuToggle)="onMobileMenuToggle($event)"
></app-top-navigation>
```

### Configuration Options
```typescript
interface HeaderConfig {
  showLogo?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  sticky?: boolean;
  transparent?: boolean;
  elevated?: boolean;
  fullWidth?: boolean;
  logoVariant?: 'horizontal' | 'vertical' | 'icon';
  customClass?: string;
}
```

### Dynamic Navigation Items
```typescript
// Add navigation item
navigationService.addNavigationItem({
  id: 'custom',
  label: 'Custom Page',
  path: '/custom',
  icon: 'star'
});

// Update badge
navigationService.setBadge('dashboard', 5);

// Remove item
navigationService.removeNavigationItem('custom');
```

### Notifications
```typescript
// Add notification
notificationsService.addNotification({
  type: 'success',
  title: 'Success',
  message: 'Operation completed',
  read: false
});

// Mark as read
notificationsService.markAsRead(notificationId);

// Clear all
notificationsService.clearAll();
```

## Demo Page

The navigation demo page (`/navigation-demo`) provides:
- Interactive configuration controls
- Real-time preview of navigation changes
- Event logging
- Notification management
- Navigation item management
- Complete configuration display

## Testing

Run the integration tests:
```bash
ng test --include='**/navigation-integration.spec.ts'
```

## Mobile Responsiveness

The navigation automatically adapts to mobile devices:
- Desktop: Full navigation with all features
- Tablet: Compressed navigation with mobile menu
- Mobile: Hamburger menu with slide-out navigation

## Customization

### Styling
- Uses Tailwind CSS classes
- Supports dark mode
- Custom SCSS in `top-navigation.component.scss`

### Extending
1. Add new navigation items via NavigationService
2. Create custom menu components
3. Extend configuration options
4. Add new event handlers

## Best Practices

1. **State Management**: Use services for shared state
2. **Event Handling**: Emit events from child components
3. **Configuration**: Pass configuration objects for flexibility
4. **Responsiveness**: Test on multiple screen sizes
5. **Accessibility**: Include proper ARIA labels and keyboard navigation