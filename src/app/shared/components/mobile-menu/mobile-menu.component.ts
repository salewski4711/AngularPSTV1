import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IconComponent } from '../../icons/icon.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { BadgeComponent } from '../badge/badge.component';
// import { SearchComponent } from '../search/search.component';
import { ThemeService } from '../../../core/services/theme.service';

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  action?: () => void;
  badge?: string | number;
  children?: MenuItem[];
}

@Component({
  selector: 'pst-mobile-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconComponent,
    AvatarComponent,
    BadgeComponent,
    // SearchComponent
  ],
  templateUrl: './mobile-menu.component.html',
  animations: [
    trigger('slideIn', [
      state('closed', style({
        transform: 'translateX(-100%)'
      })),
      state('open', style({
        transform: 'translateX(0)'
      })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ]),
    trigger('fadeIn', [
      state('closed', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      state('open', style({
        opacity: 1,
        visibility: 'visible'
      })),
      transition('closed <=> open', animate('200ms ease-in-out'))
    ]),
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('collapsed <=> expanded', animate('200ms ease-in-out'))
    ])
  ]
})
export class MobileMenuComponent implements OnInit, OnDestroy, OnChanges {
  @HostBinding('class') hostClass = 'fixed inset-0 z-[9999] pointer-events-none';
  
  @Input() isOpen = false;
  @Input() user: any = null;
  @Input() showSearch = true;
  @Input() showNotifications = true;
  @Input() showUserMenu = true;
  @Output() close = new EventEmitter<void>();
  @Output() searchSubmit = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<any>();
  @Output() userMenuAction = new EventEmitter<string>();

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Projekte',
      icon: 'folder',
      route: '/projects',
      badge: 3
    },
    {
      label: 'Kunden',
      icon: 'users',
      route: '/customers',
      children: [
        { label: 'Alle Kunden', route: '/customers' },
        { label: 'Neuer Kunde', route: '/customers/new' },
        { label: 'Kundengruppen', route: '/customers/groups' }
      ]
    },
    {
      label: 'Angebote',
      icon: 'file-text',
      route: '/quotes',
      badge: 'NEU'
    },
    {
      label: 'Rechnungen',
      icon: 'receipt',
      route: '/invoices'
    },
    {
      label: 'Berichte',
      icon: 'chart',
      route: '/reports'
    },
    {
      label: 'Einstellungen',
      icon: 'settings',
      route: '/settings'
    }
  ];

  expandedItems = new Set<number>();
  private originalBodyOverflow: string = '';

  constructor(
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    if (this.isOpen) {
      this.preventBodyScroll();
    }
  }

  ngOnDestroy() {
    this.restoreBodyScroll();
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.preventBodyScroll();
    } else {
      this.restoreBodyScroll();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOpen) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.close.emit();
    this.restoreBodyScroll();
  }

  navigate(item: MenuItem) {
    if (item.children) {
      this.toggleExpanded(this.menuItems.indexOf(item));
    } else if (item.route) {
      this.router.navigate([item.route]);
      this.closeMenu();
    } else if (item.action) {
      item.action();
      this.closeMenu();
    }
  }

  toggleExpanded(index: number) {
    if (this.expandedItems.has(index)) {
      this.expandedItems.delete(index);
    } else {
      this.expandedItems.add(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedItems.has(index);
  }

  onSearchSubmit(query: string) {
    // Handle search submission
    console.log('Search query:', query);
    this.router.navigate(['/search'], { queryParams: { q: query } });
    this.closeMenu();
  }

  onMobileSearch() {
    // Navigate to search page for mobile
    this.router.navigate(['/search']);
    this.closeMenu();
  }

  logout() {
    // Handle logout
    console.log('Logout');
    this.closeMenu();
  }

  private preventBodyScroll() {
    this.originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private restoreBodyScroll() {
    document.body.style.overflow = this.originalBodyOverflow;
  }
}