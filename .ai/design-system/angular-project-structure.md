# Angular Projekt-Architektur & Design System

## 1. Ideale Projektstruktur

```
src/
├── app/
│   ├── core/                      # Singleton Services, Guards, Interceptors
│   │   ├── services/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── models/
│   │
│   ├── shared/                    # Wiederverwendbare Module
│   │   ├── components/            # Gemeinsame UI-Komponenten
│   │   ├── directives/            # Custom Directives
│   │   ├── pipes/                 # Custom Pipes
│   │   ├── utils/                 # Utility Functions
│   │   └── models/                # Shared Interfaces/Types
│   │
│   ├── features/                  # Feature Modules (Lazy Loaded)
│   │   ├── dashboard/
│   │   ├── solar-calculator/
│   │   └── customer-management/
│   │
│   ├── layout/                    # App-weite Layout-Komponenten
│   │   ├── header/
│   │   ├── footer/
│   │   ├── sidebar/
│   │   └── main-layout/
│   │
│   └── design-system/             # Design System Core
│       ├── tokens/                # Design Tokens
│       ├── typography/            # Schrift-System
│       ├── grid/                  # Grid & Layout System
│       ├── spacing/               # Spacing System
│       ├── colors/                # Farb-System
│       ├── animations/            # Animations
│       └── breakpoints/           # Responsive Breakpoints
│
├── assets/
│   ├── fonts/                     # Schriftdateien
│   ├── icons/                     # SVG Icons
│   ├── images/
│   └── i18n/                      # Übersetzungen
│
└── styles/
    ├── _variables.scss            # SCSS Variablen
    ├── _mixins.scss              # SCSS Mixins
    ├── _functions.scss           # SCSS Functions
    └── styles.scss               # Globale Styles
```
## 2. Design System Implementation

### A. Typography System
