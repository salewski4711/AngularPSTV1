import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl || 'http://localhost:3000/api';

  // Generic GET request
  get<T>(endpoint: string, params?: HttpParams): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<ApiResponse<T>>(url, { params })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Generic POST request
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<ApiResponse<T>>(url, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Generic PUT request
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<ApiResponse<T>>(url, body, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Generic DELETE request
  delete<T>(endpoint: string): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<ApiResponse<T>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ein unbekannter Fehler ist aufgetreten!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Fehler: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Fehlercode: ${error.status}\nNachricht: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}