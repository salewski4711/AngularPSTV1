# Angular Pattern Library

## Overview
This document outlines the architectural patterns, best practices, and code standards used in the Angular CRM application.

---

## 🏗️ Component Patterns

### Standalone Components
All components use Angular's standalone API:

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: './example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {}
```

### Smart vs Dumb Components

#### Smart (Container) Components
- Manage state and business logic
- Inject services
- Handle routing
- Minimal template logic

```typescript
@Component({
  selector: 'app-customer-list-container',
  standalone: true,
  template: `
    <app-customer-list 
      [customers]="customers()" 
      [loading]="loading()"
      (customerSelected)="onCustomerSelect($event)"
    />
  `
})
export class CustomerListContainerComponent {
  private customerService = inject(CustomerService);
  
  customers = this.customerService.customers;
  loading = this.customerService.loading;
  
  onCustomerSelect(customer: Customer) {
    this.customerService.selectCustomer(customer);
  }
}
```

#### Dumb (Presentational) Components
- Only @Input() and @Output()
- No service dependencies
- Pure presentation logic
- Highly reusable

```typescript
@Component({
  selector: 'app-customer-list',
  standalone: true,
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent {
  @Input() customers: Customer[] = [];
  @Input() loading = false;
  @Output() customerSelected = new EventEmitter<Customer>();
}
```

---

## 📊 State Management Patterns

### Signal-Based State
Use Angular Signals for reactive state management:

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Private state
  private isDarkMode = signal(false);
  
  // Public computed state
  theme = computed(() => this.isDarkMode() ? 'dark' : 'light');
  
  // State mutations
  toggleTheme() {
    this.isDarkMode.update(current => !current);
  }
}
```

### Component State Pattern
```typescript
export class ComponentWithState {
  // UI State
  private loading = signal(false);
  private error = signal<string | null>(null);
  
  // Data State
  private data = signal<Data[]>([]);
  
  // Computed State
  hasData = computed(() => this.data().length > 0);
  canSubmit = computed(() => !this.loading() && this.hasData());
  
  // Expose as readonly
  loading$ = this.loading.asReadonly();
  error$ = this.error.asReadonly();
}
```

---

## 🎨 Styling Patterns

### Design Token System
```typescript
// design-tokens.ts
export const DESIGN_TOKENS = {
  colors: {
    primary: '#F99600',      // ProSolarTec Orange
    secondary: '#1C3661',    // ProSolarTec Blue
    danger: '#DC2626',
    success: '#10B981',
  },
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
  },
  typography: {
    xs: '0.75rem',  // 12px
    sm: '0.875rem', // 14px
    base: '1rem',   // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem',  // 20px
  }
} as const;
```

### Component Styling Pattern
```typescript
@Component({
  styles: [`
    :host {
      display: block;
      /* Component container styles */
    }
    
    /* Never use global styles */
    /* Always scope to :host */
  `]
})
```

---

## 🔌 Service Patterns

### API Service Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class ResourceService {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);
  
  // State
  private resources = signal<Resource[]>([]);
  private loading = signal(false);
  private error = signal<Error | null>(null);
  
  // Public API
  resources$ = this.resources.asReadonly();
  loading$ = this.loading.asReadonly();
  
  // Methods
  loadResources() {
    this.loading.set(true);
    this.error.set(null);
    
    return this.apiService.get<Resource[]>('/resources').pipe(
      tap(data => this.resources.set(data)),
      catchError(error => {
        this.error.set(error);
        return EMPTY;
      }),
      finalize(() => this.loading.set(false))
    );
  }
}
```

### Error Handling Pattern
```typescript
export class ApiErrorHandler {
  handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      // Log error
      console.error(`${operation} failed:`, error);
      
      // User-friendly message
      const message = this.getUserMessage(error);
      this.notificationService.error(message);
      
      // Return safe value
      return of({} as T);
    };
  }
  
  private getUserMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return 'Ein Netzwerkfehler ist aufgetreten';
    }
    
    switch (error.status) {
      case 404: return 'Ressource nicht gefunden';
      case 403: return 'Keine Berechtigung';
      case 500: return 'Serverfehler';
      default: return 'Ein Fehler ist aufgetreten';
    }
  }
}
```

---

## 🧪 Testing Patterns

### Component Testing Pattern
```typescript
describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent]
    });
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });
  
  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  
  describe('Input Properties', () => {
    it('should accept variant input', () => {
      component.variant = 'primary';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList).toContain('bg-[#F99600]');
    });
  });
  
  describe('User Interactions', () => {
    it('should emit click event', () => {
      const clickSpy = jasmine.createSpy();
      component.clicked.subscribe(clickSpy);
      
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});
```

### Service Testing Pattern
```typescript
describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('should load customers', () => {
    const mockCustomers = [{ id: 1, name: 'Test' }];
    
    service.loadCustomers().subscribe();
    
    const req = httpMock.expectOne('/api/customers');
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
    
    expect(service.customers()).toEqual(mockCustomers);
  });
});
```

---

## ♿ Accessibility Patterns

### ARIA Patterns
```typescript
@Component({
  template: `
    <!-- Loading States -->
    <div role="status" aria-live="polite" aria-busy="true">
      <span class="sr-only">Daten werden geladen...</span>
      <app-spinner></app-spinner>
    </div>
    
    <!-- Interactive Elements -->
    <button
      [attr.aria-label]="ariaLabel || buttonText"
      [attr.aria-pressed]="isPressed"
      [attr.aria-expanded]="isExpanded"
      [attr.aria-describedby]="hasError ? errorId : null"
    >
      {{ buttonText }}
    </button>
    
    <!-- Error Messages -->
    <div [id]="errorId" role="alert" aria-live="assertive">
      {{ errorMessage }}
    </div>
  `
})
```

### Keyboard Navigation Pattern
```typescript
@Component({
  template: `
    <div 
      role="listbox"
      [attr.aria-activedescendant]="activeItemId"
      (keydown)="handleKeyboard($event)"
    >
      <div
        *ngFor="let item of items; trackBy: trackById"
        [id]="item.id"
        role="option"
        [attr.aria-selected]="item.id === selectedId"
        tabindex="-1"
      >
        {{ item.label }}
      </div>
    </div>
  `
})
export class ListComponent {
  handleKeyboard(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevious();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectCurrent();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }
}
```

---

## 🚀 Performance Patterns

### Lazy Loading Pattern
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'customers',
    loadComponent: () => import('./features/customers/customer-list.component')
      .then(m => m.CustomerListComponent)
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.routes')
      .then(m => m.SETTINGS_ROUTES)
  }
];
```

### Virtual Scrolling Pattern
```typescript
@Component({
  template: `
    <cdk-virtual-scroll-viewport 
      itemSize="60" 
      class="h-96"
    >
      <div 
        *cdkVirtualFor="let item of items; trackBy: trackById"
        class="item"
      >
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
```

### Debouncing Pattern
```typescript
@Component({
  template: `
    <input 
      (input)="onSearch($event)" 
      placeholder="Suchen..."
    />
  `
})
export class SearchComponent {
  private searchSubject = new Subject<string>();
  
  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchService.search(term))
    ).subscribe(results => {
      this.results.set(results);
    });
  }
  
  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchSubject.next(term);
  }
}
```

---

## 📁 File Organization Patterns

### Component File Structure
```
feature-name/
├── feature-name.component.ts
├── feature-name.component.html    # For complex templates
├── feature-name.component.scss    # For complex styles
├── feature-name.component.spec.ts
├── feature-name.service.ts
├── feature-name.service.spec.ts
├── feature-name.model.ts
└── README.md                      # Component documentation
```

### Barrel Exports Pattern
```typescript
// index.ts
export * from './button.component';
export * from './button.model';
export * from './button.types';
```

---

## 🔒 Security Patterns

### Input Sanitization
```typescript
@Component({
  template: `
    <!-- Safe HTML binding -->
    <div [innerHTML]="sanitizedHtml"></div>
    
    <!-- Safe URL binding -->
    <a [href]="sanitizedUrl">Link</a>
  `
})
export class SafeComponent {
  private sanitizer = inject(DomSanitizer);
  
  get sanitizedHtml(): SafeHtml {
    return this.sanitizer.sanitize(
      SecurityContext.HTML, 
      this.userContent
    ) || '';
  }
  
  get sanitizedUrl(): SafeUrl {
    return this.sanitizer.sanitize(
      SecurityContext.URL,
      this.userUrl
    ) || '';
  }
}
```

---

## 📝 Documentation Patterns

### Component Documentation
```typescript
/**
 * Displays a customizable button with multiple style variants.
 * Supports loading states, icons, and different sizes.
 * 
 * @example Basic usage
 * ```html
 * <app-button variant="primary" (clicked)="save()">
 *   Save
 * </app-button>
 * ```
 * 
 * @example With loading state
 * ```html
 * <app-button 
 *   [loading]="saving$ | async"
 *   loadingText="Saving..."
 * >
 *   Save
 * </app-button>
 * ```
 */
@Component({...})
export class ButtonComponent {
  /**
   * Visual style variant
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = 'primary';
}
```

---

## 🎯 Best Practices Summary

### Do's ✅
- Use OnPush change detection
- Use Signals for state management
- Type everything (no `any`)
- Document public APIs
- Write tests first (TDD)
- Follow single responsibility
- Use design tokens
- Handle errors gracefully

### Don'ts ❌
- Don't use `any` type
- Don't manipulate DOM directly
- Don't use global styles
- Don't forget accessibility
- Don't ignore performance
- Don't skip tests
- Don't hardcode values
- Don't mix concerns