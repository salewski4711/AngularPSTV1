import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
import { environment } from './environments/environment';

// MSW für Development
async function enableMocking(): Promise<void> {
  if (!environment.production) {
    try {
      const { worker } = await import('./mocks/browser');
      
      // Start the worker with error handling
      await worker.start({
        onUnhandledRequest: 'bypass', // Ignoriere nicht gemockte Requests
        serviceWorker: {
          url: '/mockServiceWorker.js',
          options: {
            scope: '/'
          }
        }
      });
      
      console.info('[MSW] Mock Service Worker started successfully');
    } catch (error) {
      console.warn('[MSW] Failed to start Mock Service Worker:', error);
      // Continue without MSW - app should still work
    }
  }
}

// Bootstrap application with proper error handling
async function bootstrap(): Promise<void> {
  try {
    await enableMocking();
  } catch (error) {
    console.error('[MSW] Error during mock setup:', error);
  }
  
  try {
    await bootstrapApplication(AppComponent, appConfig);
  } catch (error) {
    console.error('[Angular] Failed to bootstrap application:', error);
  }
}

bootstrap();
