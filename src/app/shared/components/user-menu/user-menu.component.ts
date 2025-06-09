import { Component, ElementRef, HostListener, ViewChild, signal, computed, inject, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { IconComponent } from '../../icons/icon.component';
import { IconName } from '../../icons/icon-definitions';
import { ThemeService } from '../../../core/services/theme.service';
import { cn } from '../../utils/tailwind.utils';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: IconName;
  action?: () => void;
  route?: string;
  danger?: boolean;
}

@Component({
  selector: 'pst-user-menu',
  standalone: true,
  imports: [CommonModule, AvatarComponent, IconComponent],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
  @ViewChild('dropdown', { static: false }) dropdownElement?: ElementRef<HTMLDivElement>;
  @Output() menuAction = new EventEmitter<string>();
  
  private router = inject(Router);
  private themeService = inject(ThemeService);
  
  isOpen = signal(false);
  focusedIndex = signal(-1);
  
  user: User = {
    id: '1',
    name: 'Max Mustermann',
    email: 'max.mustermann@prosolar.de',
    role: 'Administrator'
  };
  
  isDarkMode = computed(() => this.themeService.isDarkMode());
  
  menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'Mein Profil',
      icon: 'user',
      route: '/profile'
    },
    {
      id: 'settings',
      label: 'Einstellungen',
      icon: 'settings',
      route: '/settings'
    }
  ];
  
  bottomMenuItems: MenuItem[] = [
    {
      id: 'logout',
      label: 'Abmelden',
      icon: 'logout',
      danger: true,
      action: () => this.logout()
    }
  ];
  
  toggleMenu(): void {
    this.isOpen.update(value => !value);
    if (this.isOpen()) {
      this.focusedIndex.set(-1);
      setTimeout(() => {
        this.dropdownElement?.nativeElement.focus();
      }, 0);
    }
  }
  
  closeMenu(): void {
    this.isOpen.set(false);
    this.focusedIndex.set(-1);
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isClickInside = target.closest('pst-user-menu');
    
    if (!isClickInside && this.isOpen()) {
      this.closeMenu();
    }
  }
  
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) {return;}
    
    const allItems = [...this.menuItems, ...this.bottomMenuItems];
    const currentIndex = this.focusedIndex();
    
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.closeMenu();
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex.set(
          currentIndex < allItems.length - 1 ? currentIndex + 1 : 0
        );
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex.set(
          currentIndex > 0 ? currentIndex - 1 : allItems.length - 1
        );
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (currentIndex >= 0) {
          this.handleMenuItemClick(allItems[currentIndex]);
        }
        break;
        
      case 'Home':
        event.preventDefault();
        this.focusedIndex.set(0);
        break;
        
      case 'End':
        event.preventDefault();
        this.focusedIndex.set(allItems.length - 1);
        break;
    }
  }
  
  handleMenuItemClick(item: MenuItem): void {
    this.menuAction.emit(item.id);
    if (item.action) {
      item.action();
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
    this.closeMenu();
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  logout(): void {
    // TODO: Implement actual logout logic
    console.log('Logout');
    this.router.navigate(['/login']);
  }
  
  getMenuItemClasses(item: MenuItem, index: number): string {
    const base = 'w-full flex items-center px-4 py-2 text-sm transition-colors duration-150';
    const hover = 'hover:bg-gray-100 dark:hover:bg-gray-700';
    const focus = this.focusedIndex() === index ? 'bg-gray-100 dark:bg-gray-700' : '';
    const danger = item.danger 
      ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' 
      : 'text-gray-700 dark:text-gray-200';
    
    return cn(base, hover, focus, danger);
  }
  
  getDividerClasses(): string {
    return 'my-1 h-px bg-gray-200 dark:bg-gray-700';
  }
}