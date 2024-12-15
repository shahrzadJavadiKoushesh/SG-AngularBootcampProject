import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api';
  private tokenKey!: string; 

  private currentUserKey = 'currentUser';

  constructor(public http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ sessionId: string }>(`${this.baseUrl}/auth`, { username, password })
      .pipe(
        map(response => {
          this.setToken(response.sessionId);
          return response;
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  setCurrentUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({ Authorization: token || '' });
  }

  getCurrentUserFromApi(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/current`, {
      headers: this.getHeaders(),
    });
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user, {
      headers: this.getHeaders(),
    });
  } 
  
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`, {
      headers: this.getHeaders(),
    });
  }
  
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users`, user, {
      headers: this.getHeaders(),
    });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product, {
      headers: this.getHeaders(),
    });
  } 
  
}
