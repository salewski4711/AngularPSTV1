# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm start` - Start development server on port 4201
- `npm run build` - Build production bundle
- `npm run watch` - Build and watch for changes

### Testing
- `npm test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests for CI environment

### Code Quality
- `npm run lint` - Run ESLint on TypeScript and HTML files
- `npm run lint:fix` - Run ESLint and automatically fix issues

## Architecture Overview

This is an Angular v20 CRM application using modern standalone components architecture (no NgModules).

### Key Architectural Decisions

1. **Standalone Components**: All components use Angular's standalone API with direct imports
2. **Signal-based State**: Uses Angular signals for reactive state management (see ThemeService)
3. **Mock Service Worker**: API mocking in development via MSW
4. **Beta Component Workflow**: New components developed in `/shared/components-beta` before promotion to `/shared/components`

### Directory Structure

```
src/app/
├── core/           # Application-wide services, guards, interceptors
├── features/       # Feature modules (customers, etc.)
├── layouts/        # Layout components (header)
├── shared/         # Shared across features
│   ├── components/      # Production-ready components
│   ├── components-beta/ # Experimental components (see MIGRATION.md)
│   └── icons/          # Icon system with centralized definitions
```

### Important Patterns

1. **API Service**: Generic API client in `core/services/api.service.ts` with retry logic and error handling
2. **Theme Service**: Dark/light mode management using signals in `core/services/theme.service.ts`
3. **Component Development**: Always develop new components in beta folder first
4. **Styling**: Tailwind CSS with custom ProSolarTec theme (orange: #F99600, blue: #1C3661)
5. **TypeScript**: Strict mode enabled - ensure all code is properly typed

### Component Development Workflow

When creating new components:
1. Start in `/shared/components-beta/`
2. Follow existing patterns (see button-beta.component.ts for reference)
3. Use Angular signals for state
4. Include comprehensive documentation in README.md
5. Once stable, migrate to `/shared/components/` following MIGRATION.md guide

### Testing Approach

- Unit tests use Karma/Jasmine
- Test files adjacent to source files (*.spec.ts)
- Mock dependencies using Jasmine spies
- No E2E testing framework configured

### API Integration

- All API calls go through `ApiService`
- Mock responses defined in `/mocks/handlers.ts`
- TypeScript interfaces in `app/models/`
- MSW intercepts requests in development mode