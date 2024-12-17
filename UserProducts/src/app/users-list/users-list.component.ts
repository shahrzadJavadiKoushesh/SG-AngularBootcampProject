import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RolePipe } from '../role.pipe';

@Component({
  selector: 'app-users-list',
  imports: [RouterModule, CommonModule, RolePipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users: any[] = [];
  isAdmin: boolean = false;
  currentUser: any;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.isAdmin = this.authService.getCurrentUser()?.role === 1;
    this.currentUser = this.authService.getCurrentUser();
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getHeaders();
    this.authService.http.get<any>('http://localhost:3000/api/users', {
      headers: this.authService.getHeaders(),
    }).subscribe({
      next: (users) => {
        console.log(users);
        // convert object users to array
        this.users = Object.values(users);  
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
  
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.fetchUsers(); 
        },
        (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
        }
      );
    }
  }
}
