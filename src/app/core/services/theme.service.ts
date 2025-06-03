import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = signal<boolean>(false);
  
  constructor() {
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.darkMode.set(savedTheme ? savedTheme === 'dark' : prefersDark);
    
    // Apply theme on change
    effect(() => {
      const isDark = this.darkMode();
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  toggleTheme(): void {
    this.darkMode.update(value => !value);
  }
  
  isDarkMode(): boolean {
    return this.darkMode();
  }
  
  setDarkMode(value: boolean): void {
    this.darkMode.set(value);
  }
}
