# Testing Strategy

## 🎯 Testing-Philosophie

### Testing Pyramid
```
         E2E Tests
        /    5%    \
       /            \
      Integration Tests
     /      20%       \
    /                  \
   Unit Tests (75%)
```

## 🧪 Test-Setup

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/environments/*.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Setup File
```typescript
// setup-jest.ts
import 'jest-preset-angular/setup-jest';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Global Mocks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## 🔍 Unit Tests

### Component Testing
```typescript
describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default variant as primary', () => {
      expect(component.variant).toBe('primary');
    });
  });

  describe('Click Events', () => {
    it('should emit click event', () => {
      const clickSpy = jest.spyOn(component.onClick, 'emit');
      const button = fixture.nativeElement.querySelector('button');
      
      button.click();
      
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not emit when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const clickSpy = jest.spyOn(component.onClick, 'emit');
      const button = fixture.nativeElement.querySelector('button');
      
      button.click();
      
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('should show spinner when loading', () => {
      component.loading = true;
      fixture.detectChanges();
      
      const spinner = fixture.nativeElement.querySelector('app-spinner');
      expect(spinner).toBeTruthy();
    });

    it('should disable button when loading', () => {
      component.loading = true;
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });
  });
});
```

### Service Testing
```typescript
describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('GET requests', () => {
    it('should fetch data successfully', () => {
      const mockData = { id: 1, name: 'Test' };

      service.get<any>('/api/test').subscribe(data => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne('/api/test');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should retry on failure', () => {
      service.get('/api/test').subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne('/api/test');
      req.flush('Error', { status: 500, statusText: 'Server Error' });
      
      // Expect retry attempts
      httpMock.expectOne('/api/test');
      httpMock.expectOne('/api/test');
    });
  });
});
```

### Directive Testing
```typescript
describe('RippleDirective', () => {
  @Component({
    template: `<button appRipple>Click me</button>`
  })
  class TestComponent {}

  let fixture: ComponentFixture<TestComponent>;
  let button: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [RippleDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    button = fixture.nativeElement.querySelector('button');
  });

  it('should create ripple effect on click', () => {
    const event = new MouseEvent('click', {
      clientX: 100,
      clientY: 100
    });

    button.dispatchEvent(event);
    fixture.detectChanges();

    const ripple = button.querySelector('.ripple');
    expect(ripple).toBeTruthy();
  });
});
```

## 🔗 Integration Tests

### Component Integration
```typescript
describe('LoginComponent Integration', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should login and navigate on success', async () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    jest.spyOn(authService, 'login').mockReturnValue(
      of({ token: 'fake-token', user: { id: 1, name: 'Test' } })
    );

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });

    await component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
});
```

### MSW Integration Tests
```typescript
describe('Customer Service with MSW', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CustomerService]
    });

    service = TestBed.inject(CustomerService);
  });

  it('should fetch customers from mock API', (done) => {
    service.getCustomers().subscribe(customers => {
      expect(customers).toHaveLength(3);
      expect(customers[0]).toHaveProperty('name');
      done();
    });
  });
});
```

## 🎭 E2E Tests (Playwright)

### Setup
```typescript
// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:4201',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
};

export default config;
```

### E2E Test Example
```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');

    // Fill form
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify navigation
    await expect(page).toHaveURL('/dashboard');
    
    // Verify welcome message
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    // Verify error message
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page.locator('.error-message')).toContainText('Invalid credentials');
  });
});
```

## 📊 Test Coverage

### Coverage Reports
```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/lcov-report/index.html
```

### Coverage Goals
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Exclude from Coverage
```typescript
// istanbul ignore next
private handleError(error: any): void {
  console.error('An error occurred:', error);
}

// istanbul ignore file
// Entire file excluded from coverage
```

## 🔧 Testing Best Practices

### 1. Test Structure (AAA)
```typescript
it('should do something', () => {
  // Arrange
  const input = 'test';
  
  // Act
  const result = component.process(input);
  
  // Assert
  expect(result).toBe('expected');
});
```

### 2. Test Isolation
```typescript
// Good: Isolated test
it('should calculate total', () => {
  const items = [{ price: 10 }, { price: 20 }];
  expect(calculateTotal(items)).toBe(30);
});

// Bad: Dependent on external state
it('should calculate total', () => {
  // Depends on global state
  expect(calculateTotal()).toBe(30);
});
```

### 3. Descriptive Test Names
```typescript
// Good
describe('UserService', () => {
  describe('when user is authenticated', () => {
    it('should return user profile data', () => {});
    it('should include authentication token in requests', () => {});
  });
});

// Bad
describe('UserService', () => {
  it('test1', () => {});
  it('works', () => {});
});
```

### 4. Mock External Dependencies
```typescript
// Mock HTTP calls
const httpMock = TestBed.inject(HttpTestingController);

// Mock services
const mockAuthService = {
  isAuthenticated: jest.fn().mockReturnValue(true),
  getUser: jest.fn().mockReturnValue({ id: 1, name: 'Test' })
};

// Mock browser APIs
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
  }
});
```

## 🚦 Continuous Testing

### Pre-commit Hook
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test -- --bail --findRelatedTests"
    }
  }
}
```

### CI Pipeline Testing
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test -- --ci --coverage
      - uses: codecov/codecov-action@v3
```

## 📈 Testing Metrics

### Key Metrics to Track
- **Test Execution Time**: < 5 minutes for unit tests
- **Flaky Test Rate**: < 1%
- **Coverage Trend**: Increasing or stable
- **Test Failure Rate**: < 5% per sprint

### Testing Dashboard
```typescript
// Generate test report
npm test -- --json --outputFile=test-results.json

// Visualize with custom dashboard
// or integrate with tools like Allure, Jest-HTML-Reporter
```