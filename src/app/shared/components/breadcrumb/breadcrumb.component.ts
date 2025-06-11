import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BreadcrumbItem } from './breadcrumb.types';
import { IconComponent } from '../../icons/icon.component';
import { breadcrumbClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-breadcrumb',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Breadcrumb" class="flex">
      <ol [class]="breadcrumbClasses.list">
        @for (item of displayItems(); track item.label; let i = $index) {
          <li [class]="breadcrumbClasses.item">
            @if (i > 0) {
              <span 
                [class]="breadcrumbClasses.separator" 
                [innerHTML]="getSeparator()"
                aria-hidden="true"
              ></span>
            }
            
            @if (item.path && !item.active) {
              <a
                [href]="item.path"
                (click)="handleItemClick($event, item)"
                class="flex items-center transition-colors duration-200"
                [class]="getLinkClasses(item)"
                [attr.aria-current]="item.active ? 'page' : null"
              >
                @if (i === 0 && showHomeSignal() && !item.icon) {
                  <pst-icon name="home" size="xs" class="mr-1.5" />
                } @else if (item.icon) {
                  <pst-icon [name]="item.icon" size="xs" class="mr-1.5" />
                }
                <span [class.truncate]="shouldTruncate()" [class.max-w-[150px]="shouldTruncate()">
                  {{ item.label }}
                </span>
              </a>
            } @else {
              <span 
                class="flex items-center"
                [class]="getTextClasses(item)"
                [attr.aria-current]="item.active ? 'page' : null"
              >
                @if (i === 0 && showHomeSignal() && !item.icon) {
                  <pst-icon name="home" size="xs" class="mr-1.5" />
                } @else if (item.icon) {
                  <pst-icon [name]="item.icon" size="xs" class="mr-1.5" />
                }
                <span [class.truncate]="shouldTruncate()" [class.max-w-[150px]="shouldTruncate()">
                  {{ item.label }}
                </span>
              </span>
            }
          </li>
        }
        
        @if (hasCollapsedItems()) {
          <li class="flex items-center">
            <span [class]="breadcrumbClasses.separator" aria-hidden="true">{{ separatorSignal() }}</span>
            <button
              type="button"
              (click)="toggleCollapsed()"
              class="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 px-1"
              aria-label="Show all breadcrumb items"
            >
              ...
            </button>
          </li>
        }
      </ol>
    </nav>
  `,
  styles: []
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: BreadcrumbItem[] = [];
  @Input() separator: string = '/';
  @Input() showHome: boolean = true;
  @Input() maxItems: number = 0;
  @Input() autoGenerateFromRoute: boolean = false;
  @Output() itemClick = new EventEmitter<BreadcrumbItem>();

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private showAll = signal(false);
  private generatedItems = signal<BreadcrumbItem[]>([]);
  
  // Create signals from inputs
  itemsSignal = signal<BreadcrumbItem[]>([]);
  separatorSignal = signal<string>('/');
  showHomeSignal = signal<boolean>(true);
  maxItemsSignal = signal<number>(0);
  autoGenerateFromRouteSignal = signal<boolean>(false);

  displayItems = computed(() => {
    const allItems = this.autoGenerateFromRouteSignal() ? this.generatedItems() : this.itemsSignal();
    const max = this.maxItemsSignal();
    
    if (max <= 0 || this.showAll() || allItems.length <= max) {
      return allItems;
    }

    // Show first item, ellipsis, and last items
    if (allItems.length > max) {
      const firstItem = allItems[0];
      const lastItems = allItems.slice(-(max - 1));
      return [firstItem, ...lastItems];
    }

    return allItems;
  });

  hasCollapsedItems = computed(() => {
    const allItems = this.autoGenerateFromRouteSignal() ? this.generatedItems() : this.itemsSignal();
    const max = this.maxItemsSignal();
    return max > 0 && !this.showAll() && allItems.length > max;
  });

  shouldTruncate = computed(() => {
    return this.maxItemsSignal() > 0 && this.maxItemsSignal() < 5;
  });
  
  // Static classes reference
  breadcrumbClasses = breadcrumbClasses;

  ngOnInit(): void {
    // Update signals from inputs
    this.itemsSignal.set(this.items);
    this.separatorSignal.set(this.separator);
    this.showHomeSignal.set(this.showHome);
    this.maxItemsSignal.set(this.maxItems);
    this.autoGenerateFromRouteSignal.set(this.autoGenerateFromRoute);
    
    if (this.autoGenerateFromRoute) {
      this.generateFromRoute();
      
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => this.generateFromRoute())
        )
        .subscribe();
    }
  }

  private generateFromRoute(): void {
    const items: BreadcrumbItem[] = [];
    let route = this.activatedRoute.root;
    let path = '';

    // Add home
    items.push({
      label: 'Home',
      path: '/',
      icon: 'home'
    });

    while (route) {
      if (route.snapshot.url.length > 0) {
        path += '/' + route.snapshot.url.map(segment => segment.path).join('/');
        const label = route.snapshot.data['breadcrumb'] || 
                     route.snapshot.url[route.snapshot.url.length - 1]?.path || 
                     'Page';
        
        items.push({
          label: this.humanizeLabel(label),
          path: path
        });
      }
      
      route = route.firstChild as ActivatedRoute;
    }

    // Mark last item as active
    if (items.length > 0) {
      items[items.length - 1].active = true;
      items[items.length - 1].path = undefined;
    }

    this.generatedItems.set(items);
  }

  private humanizeLabel(label: string): string {
    return label
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  handleItemClick(event: Event, item: BreadcrumbItem): void {
    event.preventDefault();
    this.itemClick.emit(item);
    
    if (item.path) {
      this.router.navigate([item.path]);
    }
  }

  toggleCollapsed(): void {
    this.showAll.set(!this.showAll());
  }

  getSeparator(): string {
    const sep = this.separatorSignal();
    switch (sep) {
      case '>':
        return '&gt;';
      case '<':
        return '&lt;';
      default:
        return sep;
    }
  }

  getLinkClasses(item: BreadcrumbItem): string {
    return item.active 
      ? breadcrumbClasses.link.active
      : `${breadcrumbClasses.link.base} ${breadcrumbClasses.link.inactive}`;
  }

  getTextClasses(item: BreadcrumbItem): string {
    return item.active 
      ? breadcrumbClasses.link.active
      : 'text-neutral-500 dark:text-neutral-400';
  }
}