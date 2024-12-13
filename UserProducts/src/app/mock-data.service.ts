import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  users = [
    { id: 1, name: 'John', familyName: 'Doe', role: 'admin', nationalCode: '1234567890', phoneNumber: '123456789', username: 'admin', password: 'admin123' },
    { id: 2, name: 'Jane', familyName: 'Smith', role: 'user', nationalCode: '9876543210', phoneNumber: '987654321', username: 'user', password: 'user123' },
  ];

  constructor() { }

  addUser(user: any): Observable<any> {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return of(newUser); 
  }

  deleteUser(id: number): Observable<any>{
    this.users = this.users.filter((u) => u.id !== id);
    return of({ success: true });
  }

  getUsers(): Observable<any[]> {
    return of(this.users); 
  }

  updateUser(updatedUser: any): Observable<any>{
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    this.users[index] = updatedUser;
    return of(updatedUser);
  }
}
