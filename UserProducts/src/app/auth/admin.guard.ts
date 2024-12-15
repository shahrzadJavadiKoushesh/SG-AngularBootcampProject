import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree,} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.role === 1) {
      return true;
    } else{
      const attemptedUrl = route.url[0].path; 
      console.log(attemptedUrl);
      if (attemptedUrl === 'addUser') {
        this.router.navigate(['/usersList']); // Redirect normal user from addUser to usersList
      } else if (attemptedUrl === 'addProduct') {
        this.router.navigate(['/productsList']); // Redirect normal user from addProduct to productsList
      } 
      return false;
    }
  }
}
