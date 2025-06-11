import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { ContactCardComponent } from './contact-card.component';
import { availableCities, availableCustomerTypes, availableInterests } from '../../../mocks/data/contacts.mock';

@Component({
  selector: 'pst-contacts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EntityListViewComponent,
    ButtonComponent,
    IconComponent,
    ContactCardComponent
  ],
  template: `
    <div class="contacts-page container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8 max-w-7xl">
      <!-- Page Header -->
      <div class="mb-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              Kontakte
            </h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Verwalten Sie Ihre Kontakte
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- View Toggle -->
            <pst-button
              variant="secondary"
              size="md"
              (click)="toggleView()">
              <pst-icon [name]="currentView() === 'list' ? 'grid' : 'list'" [size]="16" />
              {{ currentView() === 'list' ? 'Karten' : 'Liste' }}
            </pst-button>
            
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
      
      <!-- Custom Grid View für Contacts -->
      @if (currentView() === 'grid') {
        <!-- Search and Filters -->
        <div class="mb-6 space-y-4">
          <!-- Search Bar -->
          <div class="relative">
            <pst-icon 
              name="search" 
              [size]="20" 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              [ngModel]="searchTerm()"
              (ngModelChange)="searchTerm.set($event)"
              placeholder="Name, E-Mail, Telefon oder Stadt suchen..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <!-- Filter Toggle -->
          <div>
            <button
              type="button"
              (click)="showFilters.set(!showFilters())"
              class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
              <pst-icon name="filter" [size]="16" />
              Erweiterte Filter
              <pst-icon 
                [name]="showFilters() ? 'chevron-up' : 'chevron-down'" 
                [size]="16" />
            </button>
          </div>
          
          <!-- Filter Panel -->
          @if (showFilters()) {
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- PLZ Filter -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    PLZ
                  </label>
                  <input
                    type="text"
                    [value]="filterValues().postalCode"
                    (input)="onPostalCodeInput($event)"
                    placeholder="z.B. 10115"
                    maxlength="5"
                    pattern="[0-9]*"
                    class="w-full h-9 px-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                </div>
                
                <!-- Stadt Filter -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Stadt
                  </label>
                  <select
                    [ngModel]="filterValues().city"
                    (ngModelChange)="updateFilterValue('city', $event)"
                    class="w-full h-9 px-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Alle Städte</option>
                    @for (city of availableCities; track city) {
                      <option [value]="city">{{ city }}</option>
                    }
                  </select>
                </div>
                
                <!-- Kundentyp Filter -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Kundentyp
                  </label>
                  <select
                    [ngModel]="filterValues().customerType"
                    (ngModelChange)="updateFilterValue('customerType', $event)"
                    class="w-full h-9 px-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">Alle Typen</option>
                    @for (type of availableCustomerTypes; track type) {
                      <option [value]="type">{{ type }}</option>
                    }
                  </select>
                </div>
                
                <!-- Filter Mode -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Filter-Verknüpfung
                  </label>
                  <select
                    [ngModel]="filterMode()"
                    (ngModelChange)="filterMode.set($event)"
                    class="w-full h-9 px-3 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="AND">UND (alle Kriterien)</option>
                    <option value="OR">ODER (mindestens ein Kriterium)</option>
                  </select>
                </div>
              </div>
              
              <!-- Interessen Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Interessen
                </label>
                <div class="flex flex-wrap gap-2">
                  @for (interest of availableInterests; track interest) {
                    <label class="inline-flex items-center">
                      <input
                        type="checkbox"
                        [checked]="selectedInterests().includes(interest)"
                        (change)="toggleInterest(interest)"
                        class="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ interest }}</span>
                    </label>
                  }
                </div>
              </div>
              
              <!-- Active Filters -->
              @if (hasActiveFilters()) {
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Aktive Filter:</span>
                  <div class="flex flex-wrap gap-2">
                    @if (filterValues().postalCode) {
                      <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                        PLZ: {{ filterValues().postalCode }}
                        <button (click)="updateFilterValue('postalCode', '')" class="hover:text-purple-600">
                          <pst-icon name="x" [size]="12" />
                        </button>
                      </span>
                    }
                    @if (filterValues().city) {
                      <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        Stadt: {{ filterValues().city }}
                        <button (click)="updateFilterValue('city', '')" class="hover:text-blue-600">
                          <pst-icon name="x" [size]="12" />
                        </button>
                      </span>
                    }
                    @if (filterValues().customerType) {
                      <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Typ: {{ filterValues().customerType }}
                        <button (click)="updateFilterValue('customerType', '')" class="hover:text-green-600">
                          <pst-icon name="x" [size]="12" />
                        </button>
                      </span>
                    }
                    @for (interest of selectedInterests(); track interest) {
                      <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                        {{ interest }}
                        <button (click)="toggleInterest(interest)" class="hover:text-orange-600">
                          <pst-icon name="x" [size]="12" />
                        </button>
                      </span>
                    }
                  </div>
                  <button
                    (click)="clearFilters()"
                    class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    Alle zurücksetzen
                  </button>
                </div>
              }
            </div>
          }
        </div>
        
        <!-- Contact Cards Grid -->
        @if (contactsService.loading()) {
          <div class="flex justify-center py-12">
            <pst-icon name="refresh" [size]="32" class="animate-spin text-gray-400" />
          </div>
        } @else if (filteredContacts().length === 0) {
          <div class="text-center py-12">
            <pst-icon name="inbox" [size]="48" class="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p class="text-gray-500 dark:text-gray-400">
              Keine Kontakte gefunden
            </p>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (contact of filteredContacts(); track contact.id) {
              <pst-contact-card
                [contact]="contact"
                (cardClick)="onContactClick($event)"
                (phoneClick)="onPhoneClick($event)"
                (emailClick)="onEmailClick($event)"
              />
            }
          </div>
        }
      }
      
      <!-- Legacy List View -->
      @if (currentView() === 'list') {
        <pst-entity-list-view
          [config]="listConfig"
          [items]="contactsService.contacts"
          [loading]="contactsService.loading"
          [pagination]="contactsService.pagination() || undefined"
          [filters]="filters"
          [view]="'list'"
          (listEvent)="handleListEvent($event)" />
      }
      
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
  
  // View state
  protected currentView = signal<'list' | 'grid'>('grid'); // Grid als Standard
  protected showFilters = signal(false);
  
  // Filter state as signals for reactivity
  protected searchTerm = signal('');
  protected filterValues = signal({
    city: '',
    customerType: '',
    postalCode: ''
  });
  protected selectedInterests = signal<string[]>([]);
  protected filterMode = signal<'AND' | 'OR'>('AND');
  
  // Available filter options
  protected availableCities = availableCities;
  protected availableCustomerTypes = availableCustomerTypes;
  protected availableInterests = availableInterests;
  
  // Selected contacts
  protected selectedContacts = signal<Contact[]>([]);
  
  // Filtered contacts for grid view
  protected filteredContacts = computed(() => {
    let contacts = this.contactsService.contacts();
    const searchValue = this.searchTerm();
    const filters = this.filterValues();
    const interests = this.selectedInterests();
    const mode = this.filterMode();
    
    
    // Search filter
    if (searchValue) {
      const search = searchValue.toLowerCase();
      contacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.phone.includes(search) ||
        contact.city.toLowerCase().includes(search)
      );
    }
    
    // Apply filters based on mode
    if (mode === 'AND') {
      // PLZ Filter
      if (filters.postalCode) {
        contacts = contacts.filter(c => c.postalCode.startsWith(filters.postalCode));
      }
      
      // Stadt Filter
      if (filters.city) {
        contacts = contacts.filter(c => c.city === filters.city);
      }
      
      // Kundentyp Filter
      if (filters.customerType) {
        contacts = contacts.filter(c => c.customerType === filters.customerType);
      }
      
      // Interessen Filter
      if (interests.length > 0) {
        contacts = contacts.filter(c => 
          interests.every(interest => c.interests.includes(interest))
        );
      }
    } else {
      // OR mode
      if (filters.postalCode || filters.city || filters.customerType || interests.length > 0) {
        contacts = contacts.filter(c => {
          const plzMatch = !filters.postalCode || c.postalCode.startsWith(filters.postalCode);
          const cityMatch = !filters.city || c.city === filters.city;
          const typeMatch = !filters.customerType || c.customerType === filters.customerType;
          const interestMatch = interests.length === 0 || 
            interests.some(interest => c.interests.includes(interest));
          
          return (filters.postalCode && plzMatch) ||
                 (filters.city && cityMatch) ||
                 (filters.customerType && typeMatch) ||
                 (interests.length > 0 && interestMatch);
        });
      }
    }
    
    return contacts;
  });
  
  // List configuration for legacy view
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
    defaultView: 'list'
  };
  
  // Legacy filters for list view
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
        width: '200px'
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
        key: 'customerType',
        label: 'Kundentyp',
        sortable: true,
        width: '120px'
      },
      {
        key: 'city',
        label: 'Stadt',
        sortable: true,
        width: '120px'
      },
      {
        key: 'score',
        label: 'Score',
        sortable: true,
        width: '100px',
        align: 'center'
      }
    ];
  }
  
  // View methods
  onViewChange(view: 'list' | 'grid'): void {
    this.currentView.set(view);
  }
  
  toggleView(): void {
    this.currentView.set(this.currentView() === 'list' ? 'grid' : 'list');
  }
  
  // Search and filter methods
  onSearchChange(value: string): void {
    // Lokale Filterung für Grid View
    // Für List View würde das über EntityListView laufen
  }
  
  toggleInterest(interest: string): void {
    const current = this.selectedInterests();
    const index = current.indexOf(interest);
    if (index > -1) {
      this.selectedInterests.set(current.filter(i => i !== interest));
    } else {
      this.selectedInterests.set([...current, interest]);
    }
  }
  
  onPostalCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Remove non-numeric characters and limit to 5
    const cleanValue = input.value.replace(/[^0-9]/g, '').slice(0, 5);
    input.value = cleanValue;
    // Update the filter value
    this.updateFilterValue('postalCode', cleanValue);
  }
  
  onPostalCodeChange(value: string): void {
    // Ensure only numbers and max 5 characters
    const cleanValue = value.replace(/[^0-9]/g, '').slice(0, 5);
    this.updateFilterValue('postalCode', cleanValue);
  }
  
  updateFilterValue(key: 'city' | 'customerType' | 'postalCode', value: string): void {
    this.filterValues.update(current => ({
      ...current,
      [key]: value
    }));
  }
  
  applyFilters(): void {
    // Filters werden über computed property angewendet - nothing to do here
  }
  
  hasActiveFilters(): boolean {
    const filters = this.filterValues();
    return !!filters.postalCode ||
           !!filters.city || 
           !!filters.customerType || 
           this.selectedInterests().length > 0;
  }
  
  clearFilters(): void {
    this.filterValues.set({
      postalCode: '',
      city: '',
      customerType: ''
    });
    this.selectedInterests.set([]);
  }
  
  // Contact actions
  onContactClick(contact: Contact): void {
    this.router.navigate(['/contacts', contact.id]);
  }
  
  onPhoneClick(contact: Contact): void {
    console.log('Phone clicked for:', contact.name);
  }
  
  onEmailClick(contact: Contact): void {
    console.log('Email clicked for:', contact.name);
  }
  
  createContact(): void {
    this.router.navigate(['/contacts/new']);
  }
  
  bulkEdit(): void {
    console.log('Bulk edit:', this.selectedContacts());
  }
  
  bulkDelete(): void {
    if (confirm(`Möchten Sie wirklich ${this.selectedContacts().length} Kontakte löschen?`)) {
      const ids = this.selectedContacts().map(c => c.id);
      this.contactsService.bulkDelete(ids).subscribe(() => {
        this.selectedContacts.set([]);
      });
    }
  }
  
  // Legacy list event handler
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
    }
  }
}