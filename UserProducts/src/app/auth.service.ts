import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';
  private currentUserKey = 'currentUser';
  user1 = {
    username: 'shahrzad',
    password: '123456',
  }

  constructor(private router: Router) { }

  login(username: string, password: string) {
    if (username === this.user1.username && password === this.user1.password) {
      const user = { username: 'shahrzad', role: '123456' };
      this.setToken('mocked-token');
      this.setCurrentUser(user);
      return { success: true, user };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  setCurrentUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
}
