import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginCredentials, User, AuthResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  private readonly AUTH_TOKEN_KEY = 'pst_auth_token';
  private readonly USER_KEY = 'pst_current_user';
  
  // Observables for components
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();
  
  constructor() {
    // Check auth state on service initialization
    this.checkAuthState();
  }
  
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap(response => {
        if (response.success && response.user && response.token) {
          // Update auth state
          this.isAuthenticatedSubject.next(true);
          this.currentUserSubject.next({ ...response.user, isAuthenticated: true });
          
          // Store in localStorage if rememberMe is checked
          if (credentials.rememberMe) {
            localStorage.setItem(this.AUTH_TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          } else {
            // Store in sessionStorage for current session only
            sessionStorage.setItem(this.AUTH_TOKEN_KEY, response.token);
            sessionStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          }
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({
          success: false,
          message: error.error?.message || 'Ein Fehler ist aufgetreten'
        });
      })
    );
  }
  
  logout(): Observable<boolean> {
    return this.http.post<{ success: boolean }>('/api/auth/logout', {}).pipe(
      map(response => response.success),
      tap(() => {
        // Clear auth state
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
        
        // Clear storage
        localStorage.removeItem(this.AUTH_TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
        sessionStorage.removeItem(this.USER_KEY);
      }),
      catchError(() => {
        // Even if logout API fails, clear local state
        this.clearAuthState();
        return of(true);
      })
    );
  }
  
  checkAuthState(): void {
    // Check localStorage first (rememberMe), then sessionStorage
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY) || 
                  sessionStorage.getItem(this.AUTH_TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY) || 
                    sessionStorage.getItem(this.USER_KEY);
    
    if (token && userStr) {
      try {
        JSON.parse(userStr); // Validate JSON format
        
        // Validate token with backend
        this.http.get<AuthResponse>('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
          next: (response) => {
            if (response.success && response.user) {
              this.isAuthenticatedSubject.next(true);
              this.currentUserSubject.next({ ...response.user, isAuthenticated: true });
            } else {
              this.clearAuthState();
            }
          },
          error: () => {
            this.clearAuthState();
          }
        });
      } catch {
        this.clearAuthState();
      }
    }
  }
  
  getAuthToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY) || 
           sessionStorage.getItem(this.AUTH_TOKEN_KEY);
  }
  
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  
  private clearAuthState(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }
}