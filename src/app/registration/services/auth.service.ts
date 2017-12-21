import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

import { AuthInfo } from '../models/auth-info';
import { UsersService } from './users.service';
import { ErrorsService } from './errors.service';

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

  constructor(public router: Router, private users: UsersService,
    private errorsService: ErrorsService) {}

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

        this.users.GetUser()
        .subscribe(
          data => {
            console.log('Got User Object', data);
          },
          error => {
            if (error.code === 404) {
              // User not found to create and send to assignment page
              this.fetchAuthInfo()
              .subscribe(
                data => {
                  this.users.createUser(data);
                }
              );

              this.router.navigate(['register','assign']);
            } else {
              this.router.navigate(['error']);
            }
          },
          () => {
            this.router.navigate(['register']);
          }
        );

      } else if (err) {
        this.router.navigate(['register','unauthorized']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      } else {
        if (this.isAuthenticated()) {
          this.users.GetUser()
          .subscribe(
            data => {
              console.log('Got User Object', data);
            },
            error => {
              if (error.code === 404) {
                // User not found to create and send to assignment page
                this.fetchAuthInfo()
                .subscribe(
                  data => {
                    this.users.createUser(data);
                  }
                );
                this.router.navigate(['register','assign']);
              } else {
                this.router.navigate(['error']);
              }
            },
            () => {
              this.router.navigate(['register']);
            }
          );
        } else {
          this.login();
          console.log('Is NOT Authenticated');
        }
      }
    });
  }

  public fetchAuthInfo(): Observable<AuthInfo> {
    
    return new Observable(observer => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        observer.error(this.errorsService.handleError('User is not authenticated'));
      }
  
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if(!err) {
          observer.next(profile);
          observer.complete();
        }
        else {
          observer.error(this.errorsService.handleError(err));
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

