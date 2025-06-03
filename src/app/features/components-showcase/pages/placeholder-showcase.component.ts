import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Component Showcase</h1>
      <p class="text-gray-600 dark:text-gray-400">
        This showcase page is under construction. The component documentation will appear here.
      </p>
    </div>
  `
})
export class PlaceholderShowcaseComponent {}