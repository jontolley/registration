import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { UsersService } from "../services/users.service";


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

  constructor(public router: Router, private usersService: UsersService) {}

  public login(): void {
    this.auth0.authorize({ mode: "login" });
  }

  public signup(): void {
    this.auth0.authorize({ mode: "signUp" });
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);

        let afterLoginRedirect:string = localStorage.getItem('unauthenticated_requested_route');
        let destination:string = afterLoginRedirect || '/home';

        this.getProfile((err, profile) => {
          if(!err)
            this.usersService.saveProfile(profile)
            .subscribe(
              data => {
                console.log('hello world');
              },
              error => {
                console.error(error);
              }
            );
          else
            console.error(err);
        });

        this.router.navigate([destination]);
      } else if (err) {
        this.router.navigate(['/unauthorized']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      } else {
        // no error or authResult
        this.getProfile((err, profile) => {
          if(!err)
            this.usersService.saveProfile(profile)
            .subscribe(
              data => {
                console.log('hello world');
              },
              error => {
                console.error(error);
              }
            );
          else
            console.error(err);
        });
      }
    });
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      cb(new Error('Access token must exist to fetch profile'));
      return;
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, cb);
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

