import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
  external?: boolean;
  badge?: string | number;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // Main navigation items
  private navigationItems$ = new BehaviorSubject<NavigationItem[]>([
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'dashboard'
    },
    {
      id: 'customers',
      label: 'Customers',
      path: '/customers',
      icon: 'people'
    },
    {
      id: 'projects',
      label: 'Projects',
      path: '/projects',
      icon: 'folder'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      path: '/analytics',
      icon: 'analytics'
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: 'settings'
    },
    {
      id: 'navigation-demo',
      label: 'Navigation Demo',
      path: '/navigation-demo',
      icon: 'menu'
    }
  ]);

  // Current route tracking
  private currentRoute$ = new BehaviorSubject<string>('');
  
  // Breadcrumbs
  private breadcrumbs$ = new BehaviorSubject<BreadcrumbItem[]>([]);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeRouteTracking();
  }

  private initializeRouteTracking(): void {
    // Track route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url),
      distinctUntilChanged()
    ).subscribe(url => {
      this.currentRoute$.next(url);
      this.updateBreadcrumbs(url);
    });
  }

  private updateBreadcrumbs(url: string): void {
    // Simple breadcrumb generation based on URL
    const segments = url.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/', icon: 'home' }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const item = this.findNavigationItemByPath(currentPath);
      
      breadcrumbs.push({
        label: item?.label || this.formatSegmentLabel(segment),
        path: index === segments.length - 1 ? undefined : currentPath,
        icon: item?.icon
      });
    });

    this.breadcrumbs$.next(breadcrumbs);
  }

  private findNavigationItemByPath(path: string): NavigationItem | undefined {
    const items = this.navigationItems$.value;
    return this.findItemRecursive(items, path);
  }

  private findItemRecursive(items: NavigationItem[], path: string): NavigationItem | undefined {
    for (const item of items) {
      if (item.path === path) {
        return item;
      }
      if (item.children) {
        const found = this.findItemRecursive(item.children, path);
        if (found) {return found;}
      }
    }
    return undefined;
  }

  private formatSegmentLabel(segment: string): string {
    // Convert URL segment to readable label
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Public observables
  public get navigationItems(): Observable<NavigationItem[]> {
    return this.navigationItems$.asObservable();
  }

  public get currentRoute(): Observable<string> {
    return this.currentRoute$.asObservable();
  }

  public get breadcrumbs(): Observable<BreadcrumbItem[]> {
    return this.breadcrumbs$.asObservable();
  }

  // Check if a route is active
  public isRouteActive(path: string): Observable<boolean> {
    return this.currentRoute$.pipe(
      map(currentPath => {
        if (path === '/') {
          return currentPath === path;
        }
        return currentPath.startsWith(path);
      })
    );
  }

  // Navigation methods
  public navigate(path: string): Promise<boolean> {
    return this.router.navigate([path]);
  }

  public navigateWithParams(path: string, params: any): Promise<boolean> {
    return this.router.navigate([path], { queryParams: params });
  }

  public navigateToChild(parentPath: string, childPath: string): Promise<boolean> {
    return this.router.navigate([parentPath, childPath]);
  }

  public navigateBack(): void {
    window.history.back();
  }

  public openExternal(url: string): void {
    window.open(url, '_blank');
  }

  // Update navigation items (for dynamic menus)
  public setNavigationItems(items: NavigationItem[]): void {
    this.navigationItems$.next(items);
  }

  public addNavigationItem(item: NavigationItem): void {
    const items = [...this.navigationItems$.value, item];
    this.navigationItems$.next(items);
  }

  public removeNavigationItem(itemId: string): void {
    const items = this.navigationItems$.value.filter(item => item.id !== itemId);
    this.navigationItems$.next(items);
  }

  public updateNavigationItem(itemId: string, updates: Partial<NavigationItem>): void {
    const items = this.navigationItems$.value.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    );
    this.navigationItems$.next(items);
  }

  // Badge management
  public setBadge(itemId: string, badge: string | number | undefined): void {
    this.updateNavigationItem(itemId, { badge });
  }

  // Get navigation item by ID
  public getNavigationItem(itemId: string): NavigationItem | undefined {
    return this.findItemById(this.navigationItems$.value, itemId);
  }

  private findItemById(items: NavigationItem[], itemId: string): NavigationItem | undefined {
    for (const item of items) {
      if (item.id === itemId) {
        return item;
      }
      if (item.children) {
        const found = this.findItemById(item.children, itemId);
        if (found) {return found;}
      }
    }
    return undefined;
  }
}