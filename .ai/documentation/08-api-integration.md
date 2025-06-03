# API Integration

## 🌐 Übersicht

Die API-Integration erfolgt über einen zentralisierten ApiService mit Mock Service Worker (MSW) für Development und echte Backend-APIs für Production.

## 🏗️ API Architecture

```
┌─────────────────────────────────────────┐
│         Angular Application              │
├─────────────────────────────────────────┤
│          HTTP Interceptors               │
│  ┌─────────────┐  ┌──────────────────┐ │
│  │Auth Interceptor │Error Interceptor│ │
│  └─────────────┘  └──────────────────┘ │
├─────────────────────────────────────────┤
│            ApiService                    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ GET  │ │ POST │ │ PUT  │ │DELETE│  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
├─────────────────────────────────────────┤
│     MSW (Dev) / Real API (Prod)         │
└─────────────────────────────────────────┘
```

## 🔧 Core API Service

### ApiService Implementation
```typescript
// src/app/core/services/api.service.ts
@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, options)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
```

## 🔐 Authentication

### Auth Interceptor
```typescript
// src/app/core/interceptors/auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}
```

### Auth Service
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  
  constructor(private api: ApiService) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/login', credentials)
      .pipe(
        tap(response => {
          this.storeToken(response.token);
          this.currentUser.set(response.user);
        })
      );
  }

  logout(): void {
    this.removeToken();
    this.currentUser.set(null);
  }

  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }
}
```

## 🎭 Mock Service Worker (MSW)

### MSW Setup
```typescript
// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

### Request Handlers
```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    
    if (email === 'test@example.com' && password === 'password') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User'
        }
      });
    }
    
    return new HttpResponse(null, { status: 401 });
  }),

  // Customer endpoints
  http.get('/api/customers', () => {
    return HttpResponse.json({
      data: mockCustomers,
      total: mockCustomers.length,
      page: 1,
      pageSize: 10
    });
  }),

  http.get('/api/customers/:id', ({ params }) => {
    const customer = mockCustomers.find(c => c.id === Number(params.id));
    
    if (customer) {
      return HttpResponse.json(customer);
    }
    
    return new HttpResponse(null, { status: 404 });
  }),

  http.post('/api/customers', async ({ request }) => {
    const newCustomer = await request.json();
    const created = {
      ...newCustomer,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    return HttpResponse.json(created, { status: 201 });
  })
];
```

### MSW Integration
```typescript
// main.ts
async function prepareApp() {
  if (environment.useMockApi) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass'
    });
  }
  
  return bootstrapApplication(AppComponent, appConfig);
}

prepareApp();
```

## 📊 Data Models

### TypeScript Interfaces
```typescript
// src/app/models/customer.model.ts
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface CustomerCreateDto {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export interface CustomerUpdateDto extends Partial<CustomerCreateDto> {
  status?: Customer['status'];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

## 🔄 Request/Response Handling

### Error Handling
```typescript
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.router.navigate(['/login']);
            this.notificationService.error('Session expired. Please login again.');
            break;
            
          case 403:
            this.notificationService.error('You do not have permission to perform this action.');
            break;
            
          case 404:
            this.notificationService.error('Resource not found.');
            break;
            
          case 500:
            this.notificationService.error('Server error. Please try again later.');
            break;
            
          default:
            this.notificationService.error('An unexpected error occurred.');
        }
        
        return throwError(() => error);
      })
    );
  }
}
```

### Loading States
```typescript
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  
  constructor(private loadingService: LoadingService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);
    
    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
```

## 🚀 Feature Services

### Customer Service Example
```typescript
@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly endpoint = '/customers';
  
  constructor(private api: ApiService) {}
  
  getCustomers(params?: QueryParams): Observable<PaginatedResponse<Customer>> {
    return this.api.get<PaginatedResponse<Customer>>(this.endpoint, { params });
  }
  
  getCustomer(id: number): Observable<Customer> {
    return this.api.get<Customer>(`${this.endpoint}/${id}`);
  }
  
  createCustomer(customer: CustomerCreateDto): Observable<Customer> {
    return this.api.post<Customer>(this.endpoint, customer);
  }
  
  updateCustomer(id: number, updates: CustomerUpdateDto): Observable<Customer> {
    return this.api.put<Customer>(`${this.endpoint}/${id}`, updates);
  }
  
  deleteCustomer(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
  
  // Business logic methods
  searchCustomers(query: string): Observable<Customer[]> {
    return this.api.get<Customer[]>(`${this.endpoint}/search`, {
      params: { q: query }
    });
  }
  
  exportCustomers(format: 'csv' | 'excel'): Observable<Blob> {
    return this.api.get(`${this.endpoint}/export`, {
      params: { format },
      responseType: 'blob'
    });
  }
}
```

## 📝 API Documentation

### OpenAPI/Swagger Integration
```typescript
// Generate TypeScript types from OpenAPI spec
// npm run generate:api-types

// api-docs.service.ts
@Injectable({ providedIn: 'root' })
export class ApiDocsService {
  getSwaggerUrl(): string {
    return `${environment.apiUrl}/swagger`;
  }
  
  getOpenApiSpec(): Observable<OpenAPISpec> {
    return this.http.get<OpenAPISpec>(`${environment.apiUrl}/openapi.json`);
  }
}
```

## 🔒 Security Best Practices

### CORS Configuration
```typescript
// Proxy configuration for development
// proxy.conf.json
{
  "/api/*": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               connect-src 'self' https://api.example.com;
               script-src 'self' 'unsafe-inline';
               style-src 'self' 'unsafe-inline';">
```

### Request Validation
```typescript
// Validate requests before sending
export class RequestValidationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Validate request headers
    if (!req.headers.has('Content-Type') && req.method !== 'GET') {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }
    
    // Add CSRF token
    const csrfToken = this.getCsrfToken();
    if (csrfToken) {
      req = req.clone({
        headers: req.headers.set('X-CSRF-Token', csrfToken)
      });
    }
    
    return next.handle(req);
  }
}
```

## 📈 Performance Optimization

### Caching Strategy
```typescript
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    
    const cached = this.cache.get(req.urlWithParams);
    if (cached) {
      return of(cached);
    }
    
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, event);
        }
      })
    );
  }
}
```

### Request Debouncing
```typescript
// Search with debouncing
@Component({
  template: `
    <input 
      [(ngModel)]="searchTerm" 
      (ngModelChange)="onSearchChange($event)"
    >
  `
})
export class SearchComponent {
  private searchSubject = new Subject<string>();
  
  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.customerService.searchCustomers(term))
    ).subscribe(results => {
      this.searchResults = results;
    });
  }
  
  onSearchChange(term: string) {
    this.searchSubject.next(term);
  }
}
```