import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, tap, catchError, of } from 'rxjs';
import { PaginationInfo } from '../../shared/components/entity-list-view/entity-list-view.component';

export interface Contact {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  address: string;
  street: string;
  city: string;
  postalCode: string;
  status: 'active' | 'inactive' | 'pending';
  type: 'private' | 'business';
  customerType: string; // 'Kunde' | 'Interessent' | 'Lead' | etc.
  interests: string[]; // ['WP', 'PV', 'Klima', 'PV & WP']
  customerStatus: {
    id: string;
    name: string;
    tokenKey: string; // 'success' | 'warning' | 'info' | 'neutral'
  };
  tags: string[];
  notes: string;
  score: number;
  createdAt: string;
  lastContact: string;
  lastActivity: string;
  totalProjects: number;
  totalRevenue: number;
}

export interface ContactsResponse {
  success: boolean;
  data: Contact[];
  pagination: PaginationInfo;
  meta?: {
    searchApplied: boolean;
    filtersApplied: boolean;
    sortedBy: string;
    sortOrder: string;
  };
}

export interface ContactsQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  type?: string;
  customerTypes?: string[];
  interests?: string[];
  cities?: string[];
  filterMode?: 'AND' | 'OR';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private http = inject(HttpClient);
  
  // State management
  private queryParams$ = new BehaviorSubject<ContactsQueryParams>({
    page: 1,
    pageSize: 50,
    sortBy: 'name',
    sortOrder: 'asc'
  });
  
  // Loading state
  loading = signal(false);
  
  // Error state
  error = signal<string | null>(null);
  
  // Current contacts
  contacts = signal<Contact[]>([]);
  
  // Pagination info
  pagination = signal<PaginationInfo | null>(null);
  
  // Query metadata
  meta = signal<ContactsResponse['meta'] | null>(null);
  
  // Computed values
  totalContacts = computed(() => this.pagination()?.totalItems || 0);
  currentPage = computed(() => this.pagination()?.page || 1);
  hasMorePages = computed(() => this.pagination()?.hasNextPage || false);
  
  constructor() {
    // Setup automatic loading when query params change
    this.queryParams$.pipe(
      tap(() => {
        this.loading.set(true);
        this.error.set(null);
      }),
      switchMap(params => this.loadContacts(params)),
      tap(response => {
        if (response.success) {
          const currentParams = this.queryParams$.value;
          // For infinite scroll, append to existing contacts
          if (currentParams.page && currentParams.page > 1 && this.contacts().length > 0) {
            this.contacts.update(current => [...current, ...response.data]);
          } else {
            // For normal pagination or initial load, replace contacts
            this.contacts.set(response.data);
          }
          
          this.pagination.set(response.pagination);
          this.meta.set(response.meta);
        }
        this.loading.set(false);
      }),
      catchError(error => {
        console.error('Failed to load contacts:', error);
        this.error.set('Fehler beim Laden der Kontakte');
        this.loading.set(false);
        return of({ success: false, data: [], pagination: null as any } as ContactsResponse);
      })
    ).subscribe();
  }
  
  /**
   * Load contacts from API
   */
  private loadContacts(params: ContactsQueryParams): Observable<ContactsResponse> {
    const httpParams = new HttpParams({
      fromObject: {
        ...(params.page && { page: params.page.toString() }),
        ...(params.pageSize && { pageSize: params.pageSize.toString() }),
        ...(params.search && { search: params.search }),
        ...(params.status && { status: params.status }),
        ...(params.type && { type: params.type }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder })
      }
    });
    
    return this.http.get<ContactsResponse>('/api/contacts', { params: httpParams });
  }
  
  /**
   * Update query parameters
   */
  updateQuery(params: Partial<ContactsQueryParams>): void {
    const currentParams = this.queryParams$.value;
    
    // Reset to page 1 if search or filters change
    if (params.search !== undefined || params.status !== undefined || params.type !== undefined) {
      params.page = 1;
      // Clear existing contacts for new search/filter
      this.contacts.set([]);
    }
    
    this.queryParams$.next({
      ...currentParams,
      ...params
    });
  }
  
  /**
   * Search contacts
   */
  search(searchTerm: string): void {
    this.updateQuery({ search: searchTerm });
  }
  
  /**
   * Apply filters
   */
  applyFilters(filters: { status?: string; type?: string }): void {
    this.updateQuery(filters);
  }
  
  /**
   * Sort contacts
   */
  sort(sortBy: string, sortOrder: 'asc' | 'desc'): void {
    this.updateQuery({ sortBy, sortOrder });
  }
  
  /**
   * Go to specific page
   */
  goToPage(page: number): void {
    this.updateQuery({ page });
  }
  
  /**
   * Load next page (for infinite scroll)
   */
  loadNextPage(): void {
    const currentPage = this.currentPage();
    if (this.hasMorePages()) {
      this.updateQuery({ page: currentPage + 1 });
    }
  }
  
  /**
   * Refresh current data
   */
  refresh(): void {
    const currentParams = this.queryParams$.value;
    // Clear contacts to force reload
    this.contacts.set([]);
    this.queryParams$.next({ ...currentParams });
  }
  
  /**
   * Reset all filters and search
   */
  reset(): void {
    this.contacts.set([]);
    this.queryParams$.next({
      page: 1,
      pageSize: 50,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  }
  
  /**
   * Get single contact by ID
   */
  getContact(id: string): Observable<Contact> {
    return this.http.get<{ success: boolean; data: Contact }>(`/api/contacts/${id}`)
      .pipe(
        tap(response => {
          if (!response.success) {
            throw new Error('Contact not found');
          }
        }),
        switchMap(response => of(response.data))
      );
  }
  
  /**
   * Create new contact
   */
  createContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<{ success: boolean; data: Contact }>('/api/contacts', contact)
      .pipe(
        tap(response => {
          if (response.success) {
            // Refresh the list to include new contact
            this.refresh();
          }
        }),
        switchMap(response => of(response.data))
      );
  }
  
  /**
   * Update existing contact
   */
  updateContact(id: string, updates: Partial<Contact>): Observable<Contact> {
    return this.http.put<{ success: boolean; data: Contact }>(`/api/contacts/${id}`, updates)
      .pipe(
        tap(response => {
          if (response.success) {
            // Update contact in local state
            this.contacts.update(contacts => 
              contacts.map(c => c.id === id ? { ...c, ...updates } : c)
            );
          }
        }),
        switchMap(response => of(response.data))
      );
  }
  
  /**
   * Delete contact
   */
  deleteContact(id: string): Observable<boolean> {
    return this.http.delete<{ success: boolean }>(`/api/contacts/${id}`)
      .pipe(
        tap(response => {
          if (response.success) {
            // Remove from local state
            this.contacts.update(contacts => contacts.filter(c => c.id !== id));
          }
        }),
        switchMap(response => of(response.success))
      );
  }
  
  /**
   * Bulk operations
   */
  bulkDelete(ids: string[]): Observable<boolean> {
    return this.http.post<{ success: boolean }>('/api/contacts/bulk-delete', { ids })
      .pipe(
        tap(response => {
          if (response.success) {
            // Remove from local state
            this.contacts.update(contacts => 
              contacts.filter(c => !ids.includes(c.id))
            );
          }
        }),
        switchMap(response => of(response.success))
      );
  }
  
  /**
   * Export contacts
   */
  exportContacts(format: 'csv' | 'xlsx' = 'csv'): Observable<Blob> {
    const params = new HttpParams({
      fromObject: {
        format,
        ...this.queryParams$.value
      }
    });
    
    return this.http.get('/api/contacts/export', {
      params,
      responseType: 'blob'
    });
  }
}