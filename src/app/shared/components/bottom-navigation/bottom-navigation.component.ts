import { Component, Input, Output, EventEmitter, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { NavigationItem, NavigationConfig } from './bottom-navigation.types';
import { BadgeComponent } from '../badge/badge.component';
import { cn } from '../../utils/tailwind.utils';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, BadgeComponent],
  templateUrl: './bottom-navigation.component.html',
  styles: [`
    :host {
      display: block;
    }
    
    /* Desktop-spezifische Anpassungen */
    @media (min-width: 768px) {
      .nav-item {
        @apply mx-1;
      }
    }
  `]
})
export class BottomNavigationComponent implements OnInit {
  private router = inject(Router);

  @Input() config: NavigationConfig = {
    items: [],
    position: 'fixed',
    showLabels: true,
    enableBadges: true,
    mobileOnly: false
  };

  @Input() items: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard',
      icon: {
        filled: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z',
        outline: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
      }
    },
    {
      id: 'customers',
      label: 'Kunden',
      route: '/customers',
      icon: {
        filled: 'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z',
        outline: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
      },
      badge: { count: 3, type: 'notification' }
    },
    {
      id: 'offers',
      label: 'Angebote',
      route: '/offers',
      icon: {
        filled: 'M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L14 2.586A2 2 0 0012.586 2H4zm3 7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H8z',
        outline: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      }
    },
    {
      id: 'projects',
      label: 'Projekte',
      route: '/projects',
      icon: {
        filled: 'M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 12a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2H4z',
        outline: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
      },
      badge: { count: 5, type: 'warning' }
    },
    {
      id: 'workflow',
      label: 'Workflow',
      route: '/workflow',
      icon: {
        filled: 'M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 00-2 2v6a2 2 0 002 2h2a1 1 0 100-2H6V7h2a1 1 0 100-2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2a1 1 0 100 2h2v6h-2a1 1 0 100 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a1 1 0 100-2h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V7z',
        outline: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
      }
    },
    {
      id: 'beta',
      label: 'Beta',
      route: '/beta',
      icon: {
        filled: 'M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z',
        outline: 'M13 10V3L4 14h7v7l9-11h-7z'
      },
      badge: { count: 1, type: 'info' }
    },
    {
      id: 'components',
      label: 'Komponenten',
      route: '/components',
      icon: {
        filled: 'M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z',
        outline: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
      }
    }
  ];

  @Output() itemClick = new EventEmitter<NavigationItem>();

  // Reactive signals for current route
  private currentRoute$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url)
  );
  
  currentRoute = toSignal(this.currentRoute$, { initialValue: this.router.url });

  // Computed items with active state
  activeItems = computed(() => {
    const route = this.currentRoute();
    return this.items.map(item => ({
      ...item,
      isActive: route.startsWith(item.route)
    }));
  });

  ngOnInit() {
    // Set initial active state
    this.updateActiveStates(this.router.url);
  }

  onItemClick(item: NavigationItem) {
    this.itemClick.emit(item);
  }

  private updateActiveStates(currentRoute: string) {
    this.items = this.items.map(item => ({
      ...item,
      isActive: currentRoute.startsWith(item.route)
    }));
  }

  trackByItemId(index: number, item: NavigationItem): string {
    return item.id;
  }

  getNavigationClasses(): string {
    const baseClasses = 'bottom-navigation z-50';
    
    const positionClasses = {
      fixed: 'fixed bottom-0 inset-x-0',
      sticky: 'sticky bottom-0',
      relative: 'relative'
    };
    
    const mobileClass = this.config.mobileOnly ? 'md:hidden' : '';
    
    return cn(
      baseClasses,
      positionClasses[this.config.position],
      mobileClass
    );
  }
}