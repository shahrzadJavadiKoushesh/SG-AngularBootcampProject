import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';
  private currentUserKey = 'currentUser';

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  setCurrentUser(user: any) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
}
