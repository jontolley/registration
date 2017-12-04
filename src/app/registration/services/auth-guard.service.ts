import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.isAuthenticated()) {
      localStorage.removeItem('unauthenticated_requested_route');
      return true;
    } else {
      //this.router.navigate(['register','unauthorized']);
      let requestedRoute = state.url;
      localStorage.setItem('unauthenticated_requested_route', requestedRoute);
      this.auth.login();
      return false;
    }
  }
}
