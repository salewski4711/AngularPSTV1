# Architektur-Dokumentation

## 🏗️ Gesamt-Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                        Angular App                           │
├─────────────────────────────────────────────────────────────┤
│                    Feature Modules                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │Customers │  │ Projects │  │Showcase  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    Shared Layer                              │
│  ┌──────────────┐  ┌────────────┐  ┌──────────────────┐   │
│  │  Components  │  │ Directives │  │      Icons       │   │
│  └──────────────┘  └────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     Core Layer                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Services │  │  Guards  │  │Intercept.│  │  Models  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Verzeichnisstruktur

```typescript
src/app/
├── core/                    // Application-wide singleton services
│   ├── design-system/      // Design tokens and theme
│   ├── guards/            // Route guards
│   ├── interceptors/      // HTTP interceptors
│   └── services/          // Core services
│
├── features/              // Feature modules (lazy loaded)
│   ├── auth/             // Authentication feature
│   ├── components-showcase/ // Component documentation
│   ├── customers/        // Customer management
│   ├── home/            // Landing page
│   ├── projects/        // Project management
│   └── workflow/        // Business workflows
│
├── layouts/              // Layout components
│   └── header/          // Main header component
│
├── shared/              // Shared resources
│   ├── components/      // Reusable UI components
│   ├── components-beta/ // Experimental components
│   ├── directives/      // Custom directives
│   ├── icons/          // Icon system
│   ├── pipes/          // Custom pipes
│   └── utils/          // Utility functions
│
└── app.ts              // Root component
```

## 🔌 Dependency Management

### Standalone Components
Alle Komponenten nutzen Angular's Standalone API:

```typescript
@Component({
  selector: 'pst-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  // ...
})
```

### Import-Hierarchie
1. **Core → Keine Abhängigkeiten** (außer Angular)
2. **Shared → Core** (nutzt Core Services)
3. **Features → Shared + Core** (nutzt beide Layer)
4. **App → Features** (lädt Feature Module)

## 🔄 State Management

### Signal-Based Architecture
```typescript
// ThemeService Beispiel
export class ThemeService {
  private isDarkMode = signal(false);
  isDarkMode$ = toSignal(this.isDarkMode);
  
  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }
}
```

### Service Communication
- **Singleton Services** in Core für App-weiten State
- **Feature Services** für Feature-spezifischen State
- **RxJS Observables** für asynchrone Operationen

## 🛣️ Routing-Strategie

### Lazy Loading
```typescript
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
  },
  {
    path: 'components',
    loadChildren: () => import('./features/components-showcase/showcase.routes')
  }
];
```

### Route Guards
- **AuthGuard** - Schützt authentifizierte Routen
- **CanDeactivate** - Verhindert ungespeicherte Änderungen

## 🎨 Component Architecture

### Atomic Design Prinzipien
```
Atoms      → Buttons, Inputs, Icons
Molecules  → Cards, Button Groups, Form Fields
Organisms  → Headers, Navigation, Forms
Templates  → Page Layouts
Pages      → Feature Pages
```

### Component Development Workflow
1. **Start in `/components-beta`** - Experimentelle Phase
2. **Entwicklung & Testing** - Iterative Verbesserung
3. **Review & Stabilisierung** - Code Review
4. **Migration zu `/components`** - Production-ready

## 🔐 Security Architecture

### Authentication Flow
```
User Login → Auth Service → JWT Token → Local Storage
           ↓
    HTTP Interceptor → Add Auth Header → API Requests
           ↓
     Route Guards → Check Auth State → Allow/Deny Access
```

### Security Features
- JWT Token-basierte Authentifizierung
- HTTP-Only Cookies (geplant)
- CSRF Protection (geplant)
- Content Security Policy

## 🚀 Performance Optimierung

### Build Optimierung
- **Tree Shaking** - Ungenutzter Code wird entfernt
- **Lazy Loading** - Module werden bei Bedarf geladen
- **Code Splitting** - Separate Bundles pro Feature
- **Minification** - Komprimierte Bundles

### Runtime Optimierung
- **OnPush Change Detection** - Optimierte Render-Zyklen
- **TrackBy Functions** - Effiziente Listen-Updates
- **Memoization** - Cached Berechnungen
- **Virtual Scrolling** (geplant)

## 📊 Monitoring & Logging

### Entwicklung
- Browser DevTools Integration
- Angular DevTools Support
- Source Maps für Debugging

### Production (geplant)
- Error Tracking (Sentry)
- Performance Monitoring
- User Analytics

## 🔧 Erweiterbarkeit

### Plugin-System (konzeptionell)
```typescript
// Feature Module Registration
export interface FeatureModule {
  id: string;
  routes: Routes;
  navigation?: NavigationItem[];
  permissions?: string[];
}
```

### Theming System
- CSS Custom Properties
- Design Tokens
- Dynamic Theme Switching
- Component-level Theming