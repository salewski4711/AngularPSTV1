import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent, LogoVariant } from '../logo/logo.component';
import { SearchComponent } from '../search/search.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

export interface HeaderConfig {
  showLogo?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  sticky?: boolean;
  transparent?: boolean;
  elevated?: boolean;
  fullWidth?: boolean;
  logoVariant?: LogoVariant;
  customClass?: string;
}

@Component({
  selector: 'pst-top-navigation',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    SearchComponent,
    NotificationsComponent,
    UserMenuComponent,
    MobileMenuComponent
  ],
  templateUrl: './top-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavigationComponent {
  @Input() config: HeaderConfig = {
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

  @Output() logoClick = new EventEmitter<void>();
  @Output() searchSubmit = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<any>();
  @Output() userMenuAction = new EventEmitter<string>();
  @Output() mobileMenuToggle = new EventEmitter<boolean>();

  mobileMenuOpen = false;

  get headerClasses(): string {
    const classes = ['w-full', 'bg-gray-50', 'dark:bg-black', 'transition-colors', 'duration-300'];
    
    if (this.config.sticky) {
      classes.push('sticky', 'top-0', 'z-50');
    }
    
    return classes.join(' ');
  }

  get getInnerContainerClasses(): string {
    const classes = [
      'bg-white', 
      'dark:bg-gray-800', 
      'border-b',
      'sm:border',
      'border-gray-200',
      'dark:border-gray-700',
      'sm:rounded-b-lg',
      'md:rounded-b-xl',
      'max-w-7xl',
      'w-full',
      'sm:shadow-2xl',
      'transition-colors',
      'duration-300'
    ];
    
    if (this.config.transparent) {
      classes.push('bg-transparent', 'shadow-none', 'border-transparent');
    }
    if (this.config.elevated && !this.config.transparent) {
      classes.push('shadow-lg');
    }
    if (this.config.customClass) {
      classes.push(this.config.customClass);
    }
    
    return classes.join(' ');
  }


  onLogoClick(): void {
    this.logoClick.emit();
  }

  onSearchSubmit(query: string): void {
    this.searchSubmit.emit(query);
  }

  onNotificationClick(notification: any): void {
    this.notificationClick.emit(notification);
  }

  onUserMenuAction(action: string): void {
    this.userMenuAction.emit(action);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.mobileMenuToggle.emit(this.mobileMenuOpen);
  }
}