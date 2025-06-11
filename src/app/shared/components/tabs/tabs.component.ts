import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ContentChildren,
  QueryList,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab, TabVariant, TabChangeEvent, TabsConfig } from './tabs.types';
import { TabPanelComponent } from './tab-panel.component';
import { IconComponent } from '../../icons/icon.component';
import { tabClasses } from '../../../core/design-system/component-classes/molecules.classes.static';

@Component({
  selector: 'pst-tabs',
  standalone: true,
  imports: [CommonModule, IconComponent, TabPanelComponent],
  template: `
    <div class="relative">
      <!-- Tab Headers -->
      <div 
        #tabsWrapper
        [ngClass]="getWrapperClasses()"
        role="tablist"
        [attr.aria-label]="ariaLabel"
      >
        <div 
          class="flex gap-1 overflow-x-auto"
          [ngClass]="scrollable ? 'pr-8' : ''"
          #tabsScroll
          [style.scrollbar-width]="'none'"
          [style.msOverflowStyle]="'none'"
          [style.webkitScrollbar]="'none'"
        >
          <button
            *ngFor="let tab of tabs; let i = index"
            [attr.data-tab]="tab.id"
            [attr.id]="tab.id + '-tab'"
            [attr.aria-selected]="activeTabId === tab.id"
            [attr.aria-controls]="tab.id + '-panel'"
            [attr.tabindex]="activeTabId === tab.id ? 0 : -1"
            [disabled]="tab.disabled"
            role="tab"
            [ngClass]="getTabButtonClasses(tab)"
            (click)="selectTab(tab)"
            (keydown)="onKeyDown($event, i)"
          >
            <pst-icon 
              *ngIf="tab.icon" 
              [name]="tab.icon" 
              [size]="16"
              class="mr-2"
            ></pst-icon>
            <span>{{ tab.label }}</span>
            <span 
              *ngIf="tab.badge !== undefined && tab.badge !== null" 
              [ngClass]="getBadgeClasses(tab)"
            >
              {{ tab.badge }}
            </span>
          </button>
        </div>
        
        <!-- Scroll Indicators -->
        <div 
          *ngIf="scrollable && showScrollIndicators" 
          [ngClass]="getScrollIndicatorClasses('left')"
          (click)="scrollLeft()"
        >
          <pst-icon name="chevron-left" [size]="16"></pst-icon>
        </div>
        <div 
          *ngIf="scrollable && showScrollIndicators" 
          [ngClass]="getScrollIndicatorClasses('right')"
          (click)="scrollRight()"
        >
          <pst-icon name="chevron-right" [size]="16"></pst-icon>
        </div>
      </div>

      <!-- Tab Content -->
      <div [ngClass]="getContentWrapperClasses()">
        <!-- Content projection for custom content -->
        <ng-content></ng-content>
        
        <!-- Or render tab panels if using structured data -->
        <pst-tab-panel
          *ngFor="let tab of tabs"
          [tabId]="tab.id"
          [labelledBy]="tab.id + '-tab'"
          [hidden]="activeTabId !== tab.id"
        >
          <ng-container *ngIf="tab.content">
            <ng-container *ngIf="isTemplateRef(tab.content); else stringContent">
              <ng-container *ngTemplateOutlet="tab.content"></ng-container>
            </ng-container>
            <ng-template #stringContent>
              {{ tab.content }}
            </ng-template>
          </ng-container>
        </pst-tab-panel>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    /* Hide scrollbar for Webkit browsers */
    :host ::ng-deep div::-webkit-scrollbar {
      display: none;
    }
  `]
})
export class TabsComponent implements OnInit, AfterViewInit {
  @Input() tabs: Tab[] = [];
  @Input() variant: TabVariant = 'line';
  @Input() activeTab?: string;
  @Input() scrollable = false;
  @Input() ariaLabel = 'Tab navigation';
  
  @Output() tabChange = new EventEmitter<TabChangeEvent>();
  
  @ViewChild('tabsScroll') tabsScroll!: ElementRef<HTMLDivElement>;
  
  activeTabId: string | null = null;
  showScrollIndicators = false;
  canScrollLeft = false;
  canScrollRight = false;
  
  private previousTabId: string | null = null;

  ngOnInit() {
    this.initializeActiveTab();
  }

  ngAfterViewInit() {
    if (this.scrollable) {
      this.setupScrollObserver();
    }
  }

  // Style utility methods following Single Responsibility Principle
  getWrapperClasses(): string {
    const baseClasses = 'relative';
    const variantClasses = {
      'line': tabClasses.container.default,
      'pills': tabClasses.container.pills,
      'bordered': 'bg-neutral-50 dark:bg-neutral-800/50 px-6 border-b border-neutral-200 dark:border-neutral-700'
    };
    
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  getTabButtonClasses(tab: Tab): string {
    const isActive = this.activeTabId === tab.id;
    const baseClasses = this.variant === 'pills' 
      ? 'flex items-center px-3 py-1.5 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap'
      : 'flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';
    
    const variantClasses = this.getTabVariantClasses(isActive);
    const spacingClasses = this.variant === 'bordered' && !this.isFirstTab(tab) ? 'ml-px' : '';
    
    return `${baseClasses} ${variantClasses} ${spacingClasses}`;
  }

  private getTabVariantClasses(isActive: boolean): string {
    const variantStyles = {
      'line': {
        base: 'border-b-2 -mb-px',
        active: 'border-primary-500 text-primary-600 dark:text-primary-400',
        inactive: 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-600'
      },
      'pills': {
        base: 'rounded-md',
        active: 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm',
        inactive: 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      },
      'bordered': {
        base: 'border border-b-0 rounded-t-lg',
        active: 'bg-primary-500 text-white border-primary-500',
        inactive: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500'
      }
    };

    const styles = variantStyles[this.variant];
    return `${styles.base} ${isActive ? styles.active : styles.inactive}`;
  }

  getBadgeClasses(tab: Tab): string {
    const isActive = this.activeTabId === tab.id;
    const baseClasses = 'ml-2 text-xs px-1.5 py-0.5 rounded transition-colors';
    const stateClasses = isActive 
      ? 'bg-white/20 text-white/90' 
      : 'bg-neutral-200 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300';
    
    return `${baseClasses} ${stateClasses}`;
  }

  getContentWrapperClasses(): string {
    const baseClasses = 'bg-white dark:bg-neutral-800 rounded-b-lg';
    const variantClasses = {
      'line': 'pt-6',
      'pills': 'mt-4',
      'bordered': 'border border-neutral-300 dark:border-neutral-600 border-t-0 p-6'
    };
    
    return `${baseClasses} ${variantClasses[this.variant]}`;
  }

  getScrollIndicatorClasses(side: 'left' | 'right'): string {
    const isVisible = side === 'left' ? this.canScrollLeft : this.canScrollRight;
    const baseClasses = 'absolute top-0 bottom-0 flex items-center justify-center w-8 bg-gradient-to-r transition-opacity cursor-pointer';
    const visibilityClasses = isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';
    const sideClasses = side === 'left' 
      ? `left-0 from-white dark:from-gray-800 to-transparent`
      : `right-0 from-transparent to-white dark:to-gray-800`;
    
    return `${baseClasses} ${visibilityClasses} ${sideClasses}`;
  }

  // Tab management methods
  private initializeActiveTab(): void {
    if (this.activeTab) {
      this.activeTabId = this.activeTab;
    } else if (this.tabs.length > 0) {
      const firstEnabled = this.tabs.find(tab => !tab.disabled);
      if (firstEnabled) {
        this.activeTabId = firstEnabled.id;
      }
    }
  }

  selectTab(tab: Tab): void {
    if (tab.disabled || tab.id === this.activeTabId) {
      return;
    }

    this.previousTabId = this.activeTabId;
    this.activeTabId = tab.id;

    this.tabChange.emit({
      previousTab: this.previousTabId,
      currentTab: tab.id,
      tab: tab
    });

    if (this.scrollable) {
      this.ensureTabVisible(tab.id);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const tabs = this.tabs.filter(tab => !tab.disabled);
    const currentIndex = tabs.findIndex(tab => tab.id === this.activeTabId);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex && tabs[newIndex]) {
      this.selectTab(tabs[newIndex]);
      this.focusTab(tabs[newIndex].id);
    }
  }

  // Scroll management methods
  private setupScrollObserver(): void {
    this.checkScrollIndicators();
    const resizeObserver = new ResizeObserver(() => {
      this.checkScrollIndicators();
    });
    resizeObserver.observe(this.tabsScroll.nativeElement);
  }

  private checkScrollIndicators(): void {
    if (!this.tabsScroll) return;
    
    const element = this.tabsScroll.nativeElement;
    this.showScrollIndicators = element.scrollWidth > element.clientWidth;
    this.canScrollLeft = element.scrollLeft > 0;
    this.canScrollRight = element.scrollLeft < element.scrollWidth - element.clientWidth;
  }

  scrollLeft(): void {
    this.scrollTabs(-200);
  }

  scrollRight(): void {
    this.scrollTabs(200);
  }

  private scrollTabs(distance: number): void {
    if (!this.tabsScroll) return;
    const element = this.tabsScroll.nativeElement;
    element.scrollBy({ left: distance, behavior: 'smooth' });
    setTimeout(() => this.checkScrollIndicators(), 300);
  }

  private ensureTabVisible(tabId: string): void {
    const button = document.querySelector(`[data-tab="${tabId}"]`) as HTMLElement;
    if (button && this.tabsScroll) {
      const container = this.tabsScroll.nativeElement;
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      if (buttonRect.left < containerRect.left) {
        container.scrollBy({ left: buttonRect.left - containerRect.left - 20, behavior: 'smooth' });
      } else if (buttonRect.right > containerRect.right) {
        container.scrollBy({ left: buttonRect.right - containerRect.right + 20, behavior: 'smooth' });
      }
      
      setTimeout(() => this.checkScrollIndicators(), 300);
    }
  }

  // Helper methods
  private isFirstTab(tab: Tab): boolean {
    return this.tabs.indexOf(tab) === 0;
  }

  private focusTab(tabId: string): void {
    setTimeout(() => {
      const button = document.querySelector(`[data-tab="${tabId}"]`) as HTMLElement;
      button?.focus();
    });
  }

  isTemplateRef(content: any): content is TemplateRef<any> {
    return content instanceof TemplateRef;
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element === this.tabsScroll?.nativeElement) {
      this.checkScrollIndicators();
    }
  }

}