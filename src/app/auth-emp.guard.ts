import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthEmpGuard implements CanActivate {
  constructor(private authService:AuthService , private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable <boolean | UrlTree> | Promise<boolean | UrlTree> |boolean |UrlTree {
 /*   let role = this.authService.loggedInUser.role;
    if (role === 'employe' || role === 'admin' ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    } */


    if (this.authService.LoggedInAdmin() || this.authService.LoggedInUser()) {
      return true;
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  } 
  
}
