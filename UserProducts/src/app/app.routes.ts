import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'addUser', component:AddUserComponent},
    {path: '**', redirectTo: 'login' },
];
