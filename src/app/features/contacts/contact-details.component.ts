import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'pst-contact-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Kontakt Details</h1>
      <p class="text-gray-600 mb-4">Diese Seite wird noch implementiert.</p>
      <pst-button (click)="goBack()">Zurück</pst-button>
    </div>
  `
})
export class ContactDetailsComponent {
  private router = inject(Router);
  
  goBack(): void {
    this.router.navigate(['/contacts']);
  }
}