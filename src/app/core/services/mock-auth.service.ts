import { Injectable } from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  constructor(private authService: AuthService) {}

  /**
   * Automatically login for development
   */
  autoLogin(): void {
    // Set mock user data
    const mockUser = {
      id: 'dev-user',
      email: 'dev@prosalartec.de',
      name: 'Developer',
      role: 'admin',
      isAuthenticated: true
    };

    // Directly update the auth state
    (this.authService as any).isAuthenticatedSubject.next(true);
    (this.authService as any).currentUserSubject.next(mockUser);
    
    // Store in session
    sessionStorage.setItem('pst_auth_token', 'mock-dev-token');
    sessionStorage.setItem('pst_current_user', JSON.stringify(mockUser));
  }
}