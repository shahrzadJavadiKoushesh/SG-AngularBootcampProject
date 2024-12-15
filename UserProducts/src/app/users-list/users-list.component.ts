import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../mock-data.service';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [RouterModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users: any[] = [];
  isAdmin: boolean = false;
  currentUser: any;

  constructor(private mockdata: MockDataService, private authService: AuthService){}

  ngOnInit(): void {
    this.isAdmin = this.authService.getCurrentUser()?.role === 1;
    this.currentUser = this.authService.getCurrentUser();
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.mockdata.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: number): void{
    if (this.isAdmin){
      this.mockdata.deleteUser(id).subscribe(() => {
        console.log("User with id " + id + " deleted");
        this.fetchUsers();
      })
    }

  }

}
