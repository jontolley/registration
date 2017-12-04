import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  errorMessage: string;

  userProfile:any;

  constructor(private http: Http, private authHttp: AuthHttp, private data:DataService) {
  }

  public getUserInfo(): Observable<any> {
    return new Observable(observer => {
      if (this.userProfile) {
        observer.next(this.userProfile);
        observer.complete();
      } else {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          observer.next({});
          observer.complete();
        }
        
        this.authHttp.get(`${this.data.API_URL}/users/current`)
        .map(res => res.json())
        .subscribe(
          data => {
            this.userProfile = data;
            observer.next(data);
          },
          error => {
            this.errorMessage = error;
            observer.error(error);
          },
          () => {
            observer.complete();
          }
        );
      }
    });
  }

  public saveProfile(profile): Observable<any> {
    let user = {
      subscriberId: profile.sub,
      name: profile.name,
      nickname: profile.nickname,
      email: profile.email,
      pictureUrl: profile.picture
    };

    return new Observable(observer => {
      this.authHttp.post(`${this.data.API_URL}/users`, user)
      .map(res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.userProfile = data;
          observer.next(data);
        },
        error => {
          this.errorMessage = error;
          console.log(error);
          observer.error(error);
        },
        () => {
          console.log('User Post Complete');
          observer.complete();
        }
      );
    });
  }

}
