import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent, LogoVariant } from '../logo/logo.component';
import { SearchComponent } from '../search/search.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { topNavigationClasses } from '../../../core/design-system/component-classes/organisms.classes.static';
import { cn } from '../../utils/tailwind.utils';

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
    return cn(
      topNavigationClasses.wrapper.base,
      this.config.sticky && topNavigationClasses.wrapper.sticky
    );
  }

  get getInnerContainerClasses(): string {
    return cn(
      topNavigationClasses.innerContainer.base,
      this.config.transparent && topNavigationClasses.innerContainer.transparent,
      this.config.elevated && !this.config.transparent && topNavigationClasses.innerContainer.elevated,
      this.config.customClass
    );
  }

  get containerClasses(): string {
    return topNavigationClasses.container;
  }

  get innerFlexClasses(): string {
    return topNavigationClasses.innerFlex;
  }

  get desktopNavClasses(): string {
    return topNavigationClasses.desktopNav;
  }

  get searchContainerClasses(): string {
    return topNavigationClasses.searchContainer;
  }

  get rightSectionClasses(): string {
    return topNavigationClasses.rightSection;
  }

  get mobileMenuButtonClasses(): string {
    return topNavigationClasses.mobileMenuButton;
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