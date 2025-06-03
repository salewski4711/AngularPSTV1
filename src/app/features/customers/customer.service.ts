import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../../models/api.model';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  type: 'private' | 'business';
  totalProjects: number;
  totalRevenue: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private apiUrl = '/api/customers';

  // Alle Kunden abrufen
  getCustomers(): Observable<Customer[]> {
    return this.http.get<ApiResponse<Customer[]>>(this.apiUrl)
      .pipe(
        map(response => response.data || [])
      );
  }

  // Einzelnen Kunden abrufen
  getCustomer(id: string): Observable<Customer> {
    return this.http.get<ApiResponse<Customer>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data!)
      );
  }

  // Kunde erstellen
  createCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<ApiResponse<Customer>>(this.apiUrl, customer)
      .pipe(
        map(response => response.data!)
      );
  }

  // Kunde aktualisieren
  updateCustomer(id: string, customer: Partial<Customer>): Observable<Customer> {
    return this.http.put<ApiResponse<Customer>>(`${this.apiUrl}/${id}`, customer)
      .pipe(
        map(response => response.data!)
      );
  }

  // Kunde löschen
  deleteCustomer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
