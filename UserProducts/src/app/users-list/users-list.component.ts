import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  imports: [RouterModule, CommonModule],
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
  

  // deleteUser(id: number): void{
  //   if (this.isAdmin){
  //     this.mockdata.deleteUser(id).subscribe(() => {
  //       console.log("User with id " + id + " deleted");
  //       this.fetchUsers();
  //     })
  //   }

  // }

}
