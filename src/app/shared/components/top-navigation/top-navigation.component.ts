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
  selector: 'app-top-navigation',
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
  styleUrls: ['./top-navigation.component.scss'],
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
    const classes = ['top-navigation'];
    
    if (this.config.sticky) {classes.push('sticky-header');}
    if (this.config.transparent) {classes.push('transparent-header');}
    if (this.config.elevated) {classes.push('elevated-header');}
    if (this.config.fullWidth) {classes.push('full-width');}
    if (this.config.customClass) {classes.push(this.config.customClass);}
    
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