import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api';
  private tokenKey = 'authToken';
  private currentUserKey = 'currentUser';

  constructor(private mockdata: MockDataService) { }

  login(username: string, password: string): Observable<{ success: boolean; user?: any; message?: string }> {
    return this.mockdata.getUsers().pipe(
      map((users) => {
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
          this.setToken('mocked-token');
          this.setCurrentUser(user);
          return { success: true, user };
        } else {
          return { success: false, message: 'Invalid credentials' };
        }
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
    if (user){
      return JSON.parse(user); 
    } else{
      return null;
    }
  }
}
