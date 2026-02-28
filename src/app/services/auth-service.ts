import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Backend URL
  private BASE_URL = 'http://127.0.0.1:5000/api/v1.0/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // 1. REGISTER
  // Matches @auth_bp.route("/api/v1.0/auth/register")
  register(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  // 2. LOGIN
  // Matches @auth_bp.route("/api/v1.0/auth/login")
  login(data: any): Observable<any> {
    
    const credentials = btoa(`${data.username}:${data.password}`);
    
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.BASE_URL}/login`, {}, { headers });
  }

  // 3. LOGOUT
  // Matches @auth_bp.route("/api/v1.0/auth/logout")
  logout() {
    const token = this.getToken();
    
    if (token) {
      const headers = new HttpHeaders({
        'x-access-token': token 
      });

      this.http.post(`${this.BASE_URL}/logout`, {}, { headers }).subscribe();
    }
    
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // --- HELPER METHODS ---

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.logout();
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.admin === true; 
    } catch (error) {
      return false;
    }
  }

  is_Logged_In() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
    
  }
}