import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  users = [
    { id: 1, name: 'John', familyName: 'Doe', role: 'admin', nationalCode: '1234567890', phoneNumber: '123456789', username: 'admin', password: 'admin123' },
    { id: 2, name: 'Jane', familyName: 'Smith', role: 'user', nationalCode: '9876543210', phoneNumber: '987654321', username: 'user', password: 'user123' },
  ];

  constructor() { }

  addUser(user: any) {
    this.users.push({ ...user, id: this.users.length + 1 });
  }
}
