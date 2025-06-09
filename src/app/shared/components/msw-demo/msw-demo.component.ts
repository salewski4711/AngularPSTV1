import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService, Customer } from '../../../features/customers/customer.service';

@Component({
  selector: 'pst-msw-demo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        MSW Demo - Mock API Daten
      </h2>
      
      <div class="bg-orange-100 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-700 rounded-lg p-4 mb-6">
        <p class="text-orange-800 dark:text-orange-200">
          <strong>Info:</strong> Diese Daten kommen von MSW (Mock Service Worker).
          Die API-Calls sind echt, aber die Antworten werden von MSW simuliert!
        </p>
      </div>

      @if (loading) {
        <div class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }

      @if (error) {
        <div class="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4">
          <p class="text-red-800 dark:text-red-200">Fehler: {{ error }}</p>
        </div>
      }

      @if (customers.length > 0) {
        <div class="grid gap-4">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Kunden ({{ customers.length }})
          </h3>
          
          <div class="overflow-x-auto bg-white dark:bg-black-lighter rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-black">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    E-Mail
                  </th>                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Typ
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Projekte
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                @for (customer of customers; track customer.id) {
                  <tr class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {{ customer.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ customer.email }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span [class]="getStatusClass(customer.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {{ getStatusText(customer.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ customer.type === 'business' ? 'Geschäftlich' : 'Privat' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {{ customer.totalProjects }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class MswDemoComponent implements OnInit {
  private customerService = inject(CustomerService);
  
  customers: Customer[] = [];
  loading = true;
  error: string | null = null;
  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const classes = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
      'inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300',
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    };
    return classes[status as keyof typeof classes] || '';
  }

  getStatusText(status: string): string {
    const texts = {
      'active': 'Aktiv',
      'inactive': 'Inaktiv',
      'pending': 'Ausstehend'
    };
    return texts[status as keyof typeof texts] || status;
  }
}