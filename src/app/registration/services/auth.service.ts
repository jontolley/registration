import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

import { AuthProfile } from '../models/auth-profile';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.apiUrl,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid profile email'
  });

  constructor(public router: Router, private users: UsersService) {}

  public login(): void {
    this.auth0.authorize({ mode: "login" });
  }

  public signup(): void {
    this.auth0.authorize({ mode: "signUp" });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {

      if (authResult && authResult.accessToken && authResult.idToken) {
        // User just logged in so save session to local storage and load profile
        window.location.hash = '';
        this.setSession(authResult);

        let afterLoginRedirect:string = localStorage.getItem('unauthenticated_requested_route');
        let destination:string = afterLoginRedirect || '/register';

        // Post User information to API, this could be a first time user
        this.getProfile()
        .subscribe(
          data => {
            this.users.saveUser(data)
            .subscribe();
          },
          error => {
            console.error(error);
          }
        );

        this.router.navigate([destination]);
      } else if (err) {
        // There was a error with authentication
        this.router.navigate(['/unauthorized']);
        console.error(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }

      if (!this.isAuthenticated()) return;

      // TODO:load profile information (maybe)
    });
  }

  public getProfile(): Observable<AuthProfile> {
    return new Observable(observer => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        observer.error(new Error('Access token must exist to fetch profile'));
      }

      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) observer.error(err)
        else {
          observer.next(profile);
          observer.complete();
        }
      });
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}

