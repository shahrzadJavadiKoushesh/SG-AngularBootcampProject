import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'addUser', component: AddUserComponent},
    {path: 'usersList', component: UsersListComponent},
    {path: 'editUser/:id', component: EditUserComponent},
    {path: '**', redirectTo: 'login' },
];
