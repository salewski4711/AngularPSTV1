import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { PerformanceService } from './core/services/performance.service';

// Register German locale data
registerLocaleData(localeDE, 'de-DE');

// Initialize performance monitoring
function initializePerformance(performanceService: PerformanceService): () => void {
  return () => {
    // Service auto-initializes, but we ensure it's injected early
    performanceService.mark('app-init-start');
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'de-DE' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializePerformance,
      deps: [PerformanceService],
      multi: true
    }
  ]
};
