import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pst-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Projekte</h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p class="text-gray-600 dark:text-gray-400">
          Projektverwaltung - Hier werden Ihre Projekte angezeigt.
        </p>
      </div>
    </div>
  `
})
export class ProjectsComponent {}