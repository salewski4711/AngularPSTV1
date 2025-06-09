import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  EntityListViewComponent, 
  EntityListConfig, 
  EntityListEvent,
  EntityListColumn 
} from '../../shared/components/entity-list-view/entity-list-view.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/icons/icon.component';
import { ContactsService, Contact } from './contacts.service';

@Component({
  selector: 'pst-contacts',
  standalone: true,
  imports: [
    CommonModule,
    EntityListViewComponent,
    ButtonComponent,
    IconComponent
  ],
  template: `
    <div class="contacts-page py-4 md:py-6 lg:py-8">
      <!-- Page Header -->
      <div class="mb-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Kontakte
            </h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Verwalten Sie Ihre {{ contactsService.totalContacts().toLocaleString('de-DE') }} Kontakte
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- View Toggle -->
            <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-1">
              <button
                type="button"
                (click)="onViewChange('list')"
                [class.bg-white]="currentView() === 'list'"
                [class.dark:bg-gray-800]="currentView() === 'list'"
                [class.text-gray-900]="currentView() === 'list'"
                [class.dark:text-white]="currentView() === 'list'"
                [class.text-gray-500]="currentView() !== 'list'"
                [class.dark:text-gray-400]="currentView() !== 'list'"
                class="px-3 py-1.5 rounded text-sm font-medium transition-colors">
                <pst-icon name="list" [size]="16" class="inline-block mr-1" />
                Liste
              </button>
              <button
                type="button"
                (click)="onViewChange('grid')"
                [class.bg-white]="currentView() === 'grid'"
                [class.dark:bg-gray-800]="currentView() === 'grid'"
                [class.text-gray-900]="currentView() === 'grid'"
                [class.dark:text-white]="currentView() === 'grid'"
                [class.text-gray-500]="currentView() !== 'grid'"
                [class.dark:text-gray-400]="currentView() !== 'grid'"
                class="px-3 py-1.5 rounded text-sm font-medium transition-colors">
                <pst-icon name="grid" [size]="16" class="inline-block mr-1" />
                Karten
              </button>
            </div>
            
            <!-- New Contact Button -->
            <pst-button
              variant="primary"
              size="md"
              (click)="createContact()">
              <pst-icon name="plus" [size]="16" />
              Neuer Kontakt
            </pst-button>
          </div>
        </div>
      </div>
      
      <!-- Entity List View -->
      <pst-entity-list-view
        [config]="listConfig"
        [items]="contactsService.contacts"
        [loading]="contactsService.loading"
        [pagination]="contactsService.pagination() || undefined"
        [filters]="filters"
        [view]="currentView()"
        (listEvent)="handleListEvent($event)" />
      
      <!-- Selected Actions -->
      @if (selectedContacts().length > 0) {
        <div class="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            {{ selectedContacts().length }} ausgewählt
          </span>
          <pst-button
            variant="outline-primary"
            size="sm"
            (click)="bulkEdit()">
            <pst-icon name="edit" [size]="16" />
            Bearbeiten
          </pst-button>
          <pst-button
            variant="danger"
            size="sm"
            (click)="bulkDelete()">
            <pst-icon name="trash" [size]="16" />
            Löschen
          </pst-button>
        </div>
      }
    </div>
  `
})
export class ContactsComponent implements OnInit {
  protected contactsService = inject(ContactsService);
  private router = inject(Router);
  
  // Selected contacts
  protected selectedContacts = signal<Contact[]>([]);
  
  // View state
  protected currentView = signal<'list' | 'grid'>('list');
  
  // List configuration
  protected listConfig: EntityListConfig<Contact> = {
    columns: this.getColumns(),
    searchable: true,
    searchPlaceholder: 'Name, E-Mail oder Telefon suchen...',
    filterable: true,
    selectable: true,
    multiSelect: true,
    emptyMessage: 'Keine Kontakte gefunden. Erstellen Sie Ihren ersten Kontakt!',
    loadingMessage: 'Kontakte werden geladen...',
    enableViewToggle: false,
    defaultView: 'list',
    gridConfig: {
      cols: 4,
      cardRenderer: (contact) => `
        <div class="space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">${contact.name}</h3>
              ${contact.company ? `<p class="text-sm text-gray-500 dark:text-gray-400">${contact.company}</p>` : ''}
            </div>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              contact.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
              contact.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' :
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            }">
              ${contact.status === 'active' ? 'Aktiv' : contact.status === 'inactive' ? 'Inaktiv' : 'Ausstehend'}
            </span>
          </div>
          <div class="space-y-1 text-sm">
            <p class="text-gray-600 dark:text-gray-400">
              <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              ${contact.email}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              ${contact.phone}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              ${contact.city}
            </p>
          </div>
          <div class="pt-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-400">Score: ${contact.score}</span>
            <div class="flex gap-1">
              <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Bearbeiten" onclick="event.stopPropagation()">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Details" onclick="event.stopPropagation()">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `
    },
    performance: {
      virtualScrolling: true,
      infiniteScroll: true,
      pageSize: 50,
      itemHeight: 60,
      searchDebounce: 300
    }
  };
  
  // Filters configuration
  protected filters = signal([
    {
      key: 'status',
      placeholder: 'Alle Status',
      options: [
        { value: '', label: 'Alle Status' },
        { value: 'active', label: 'Aktiv' },
        { value: 'inactive', label: 'Inaktiv' },
        { value: 'pending', label: 'Ausstehend' }
      ]
    },
    {
      key: 'type',
      placeholder: 'Alle Typen',
      options: [
        { value: '', label: 'Alle Typen' },
        { value: 'private', label: 'Privat' },
        { value: 'business', label: 'Geschäftlich' }
      ]
    }
  ]);
  
  ngOnInit(): void {
    // Load initial data - service handles this automatically
  }
  
  private getColumns(): EntityListColumn<Contact>[] {
    return [
      {
        key: 'name',
        label: 'Name',
        sortable: true,
        width: '200px',
        render: (contact) => `
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400">
                ${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <div class="font-medium text-gray-900 dark:text-white">
                ${contact.name}
              </div>
              ${contact.company ? `<div class="text-xs text-gray-500 dark:text-gray-400">${contact.company}</div>` : ''}
            </div>
          </div>
        `
      },
      {
        key: 'email',
        label: 'E-Mail',
        sortable: true,
        width: '200px'
      },
      {
        key: 'phone',
        label: 'Telefon',
        sortable: true,
        width: '150px'
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        width: '120px',
        align: 'center',
        render: (contact) => {
          const statusConfig = {
            active: { label: 'Aktiv', color: 'success' },
            inactive: { label: 'Inaktiv', color: 'gray' },
            pending: { label: 'Ausstehend', color: 'warning' }
          };
          const config = statusConfig[contact.status];
          return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${config.color}-100 text-${config.color}-800 dark:bg-${config.color}-900/20 dark:text-${config.color}-400">
            ${config.label}
          </span>`;
        }
      },
      {
        key: 'type',
        label: 'Typ',
        sortable: true,
        width: '120px',
        align: 'center',
        render: (contact) => {
          const icon = contact.type === 'business' ? 'building' : 'user';
          const label = contact.type === 'business' ? 'Geschäftlich' : 'Privat';
          return `<div class="flex items-center justify-center gap-1">
            <svg class="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16z"/>
            </svg>
            <span class="text-sm">${label}</span>
          </div>`;
        }
      },
      {
        key: 'score',
        label: 'Score',
        sortable: true,
        width: '100px',
        align: 'center',
        render: (contact) => {
          const color = contact.score >= 80 ? 'text-green-600' : 
                       contact.score >= 50 ? 'text-yellow-600' : 'text-red-600';
          return `<span class="font-semibold ${color}">${contact.score}</span>`;
        }
      },
      {
        key: 'lastActivity',
        label: 'Letzte Aktivität',
        sortable: true,
        width: '150px',
        render: (contact) => {
          const date = new Date(contact.lastActivity);
          const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
          
          if (days === 0) return 'Heute';
          if (days === 1) return 'Gestern';
          if (days < 7) return `vor ${days} Tagen`;
          if (days < 30) return `vor ${Math.floor(days / 7)} Wochen`;
          return `vor ${Math.floor(days / 30)} Monaten`;
        }
      },
      {
        key: 'actions',
        label: '',
        width: '100px',
        align: 'right',
        render: (contact) => `
          <div class="flex items-center justify-end gap-1">
            <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Bearbeiten">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded" title="Details">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
          </div>
        `
      }
    ];
  }
  
  handleListEvent(event: EntityListEvent<Contact>): void {
    switch (event.type) {
      case 'select':
        this.selectedContacts.set(event.items || []);
        break;
        
      case 'search':
        this.contactsService.search((event.data as any).search);
        break;
        
      case 'filter':
        this.contactsService.applyFilters((event.data as any).filters);
        break;
        
      case 'sort':
        this.contactsService.sort((event.data as any).sortBy, (event.data as any).sortOrder);
        break;
        
      case 'page':
        this.contactsService.goToPage((event.data as any).page);
        break;
        
      case 'infinite-scroll':
        this.contactsService.loadNextPage();
        break;
    }
  }
  
  createContact(): void {
    this.router.navigate(['/contacts/new']);
  }
  
  exportContacts(): void {
    this.contactsService.exportContacts('xlsx').subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kontakte_${new Date().toISOString().split('T')[0]}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  
  bulkEdit(): void {
    console.log('Bulk edit:', this.selectedContacts());
    // Implement bulk edit logic
  }
  
  bulkDelete(): void {
    if (confirm(`Möchten Sie wirklich ${this.selectedContacts().length} Kontakte löschen?`)) {
      const ids = this.selectedContacts().map(c => c.id);
      this.contactsService.bulkDelete(ids).subscribe(() => {
        this.selectedContacts.set([]);
      });
    }
  }
  
  onViewChange(view: 'list' | 'grid'): void {
    this.currentView.set(view);
    // Update list config to reflect current view
    this.listConfig = { ...this.listConfig, defaultView: view };
  }
}