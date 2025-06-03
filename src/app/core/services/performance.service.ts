import { Injectable, isDevMode } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private navigationStartTime = 0;

  constructor(private router: Router) {
    if (!isDevMode()) {
      this.initializePerformanceMonitoring();
    }
  }

  private initializePerformanceMonitoring(): void {
    // Monitor route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.navigationStartTime = performance.now();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const loadTime = performance.now() - this.navigationStartTime;
      this.logNavigationMetrics(event.url, loadTime);
    });

    // Monitor initial page load
    this.monitorInitialLoad();
  }

  private monitorInitialLoad(): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (perfData) {
            this.logInitialLoadMetrics(perfData);
          }
        }, 0);
      });
    }
  }

  private logNavigationMetrics(url: string, loadTime: number): void {
    // In production, this would send to analytics service
    if (loadTime > 1000) {
      console.warn(`[Performance] Slow navigation to ${url}: ${loadTime.toFixed(2)}ms`);
    }
  }

  private logInitialLoadMetrics(perfData: PerformanceNavigationTiming): void {
    const metrics = {
      dns: perfData.domainLookupEnd - perfData.domainLookupStart,
      tcp: perfData.connectEnd - perfData.connectStart,
      ttfb: perfData.responseStart - perfData.requestStart,
      download: perfData.responseEnd - perfData.responseStart,
      domInteractive: perfData.domInteractive - perfData.fetchStart,
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
      totalTime: perfData.loadEventEnd - perfData.fetchStart
    };

    // Log slow metrics
    if (metrics.totalTime > 3000) {
      console.warn('[Performance] Slow initial load:', metrics);
    }
  }

  // Manual performance marking
  public mark(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  }

  public measure(name: string, startMark: string, endMark?: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        if (endMark) {
          window.performance.measure(name, startMark, endMark);
        } else {
          window.performance.measure(name, startMark);
        }
        
        const measure = window.performance.getEntriesByName(name, 'measure')[0];
        if (measure && measure.duration > 100) {
          console.warn(`[Performance] Slow operation "${name}": ${measure.duration.toFixed(2)}ms`);
        }
      } catch (_e) {
        // Ignore errors from invalid marks
      }
    }
  }
}