import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, Observable, Subject } from 'rxjs';
import { map, takeUntil, throttleTime, distinctUntilChanged } from 'rxjs/operators';

export interface HeaderState {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isProfileMenuOpen: boolean;
  isNotificationsOpen: boolean;
  scrollProgress: number;
  activeNavItem: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  // State management using BehaviorSubject
  private state$ = new BehaviorSubject<HeaderState>({
    isScrolled: false,
    isMobileMenuOpen: false,
    isSearchOpen: false,
    isProfileMenuOpen: false,
    isNotificationsOpen: false,
    scrollProgress: 0,
    activeNavItem: null
  });

  // Public observables for individual state properties
  public isScrolled$ = this.state$.pipe(
    map(state => state.isScrolled),
    distinctUntilChanged()
  );

  public isMobileMenuOpen$ = this.state$.pipe(
    map(state => state.isMobileMenuOpen),
    distinctUntilChanged()
  );

  public isSearchOpen$ = this.state$.pipe(
    map(state => state.isSearchOpen),
    distinctUntilChanged()
  );

  public isProfileMenuOpen$ = this.state$.pipe(
    map(state => state.isProfileMenuOpen),
    distinctUntilChanged()
  );

  public isNotificationsOpen$ = this.state$.pipe(
    map(state => state.isNotificationsOpen),
    distinctUntilChanged()
  );

  public scrollProgress$ = this.state$.pipe(
    map(state => state.scrollProgress),
    distinctUntilChanged()
  );

  public activeNavItem$ = this.state$.pipe(
    map(state => state.activeNavItem),
    distinctUntilChanged()
  );

  // Computed observables
  public isAnyMenuOpen$ = combineLatest([
    this.isMobileMenuOpen$,
    this.isSearchOpen$,
    this.isProfileMenuOpen$,
    this.isNotificationsOpen$
  ]).pipe(
    map(([mobile, search, profile, notifications]) => 
      mobile || search || profile || notifications
    )
  );

  public headerClasses$ = combineLatest([
    this.isScrolled$,
    this.isAnyMenuOpen$
  ]).pipe(
    map(([isScrolled, isAnyMenuOpen]) => ({
      'bg-white dark:bg-gray-900': isScrolled || isAnyMenuOpen,
      'bg-transparent': !isScrolled && !isAnyMenuOpen,
      'shadow-lg': isScrolled,
      'backdrop-blur-md': isScrolled
    }))
  );

  constructor() {
    this.initializeScrollListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Private methods
  private initializeScrollListener(): void {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(50),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        this.updateState({
          isScrolled: scrollTop > 20,
          scrollProgress: Math.min(100, Math.max(0, scrollProgress))
        });
      });
  }

  private updateState(partial: Partial<HeaderState>): void {
    this.state$.next({
      ...this.state$.value,
      ...partial
    });
  }

  // Public methods to update state
  public toggleMobileMenu(): void {
    this.updateState({
      isMobileMenuOpen: !this.state$.value.isMobileMenuOpen,
      // Close other menus when opening mobile menu
      isSearchOpen: false,
      isProfileMenuOpen: false,
      isNotificationsOpen: false
    });
  }

  public toggleSearch(): void {
    this.updateState({
      isSearchOpen: !this.state$.value.isSearchOpen,
      // Close other menus when opening search
      isMobileMenuOpen: false,
      isProfileMenuOpen: false,
      isNotificationsOpen: false
    });
  }

  public toggleProfileMenu(): void {
    this.updateState({
      isProfileMenuOpen: !this.state$.value.isProfileMenuOpen,
      // Close other menus when opening profile
      isMobileMenuOpen: false,
      isSearchOpen: false,
      isNotificationsOpen: false
    });
  }

  public toggleNotifications(): void {
    this.updateState({
      isNotificationsOpen: !this.state$.value.isNotificationsOpen,
      // Close other menus when opening notifications
      isMobileMenuOpen: false,
      isSearchOpen: false,
      isProfileMenuOpen: false
    });
  }

  public setActiveNavItem(itemId: string | null): void {
    this.updateState({ activeNavItem: itemId });
  }

  public closeAllMenus(): void {
    this.updateState({
      isMobileMenuOpen: false,
      isSearchOpen: false,
      isProfileMenuOpen: false,
      isNotificationsOpen: false
    });
  }

  public resetScrollState(): void {
    this.updateState({
      isScrolled: false,
      scrollProgress: 0
    });
  }

  // Getter for current state
  public get currentState(): HeaderState {
    return this.state$.value;
  }

  // Observable for entire state
  public get state(): Observable<HeaderState> {
    return this.state$.asObservable();
  }
}