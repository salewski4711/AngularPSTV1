import { signal } from '@angular/core';

export class MockThemeService {
  private isDarkMode = signal(false);
  
  isDarkMode$ = this.isDarkMode.asReadonly();
  
  toggleTheme = jest.fn(() => {
    this.isDarkMode.update(v => !v);
  });
  
  setTheme = jest.fn((isDark: boolean) => {
    this.isDarkMode.set(isDark);
  });
}