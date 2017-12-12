import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthHttp } from "angular2-jwt/angular2-jwt";

import { User } from '../models/user';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { Group } from '../models/group';

@Injectable()
export class DataService {

  //private API_URL = 'http://localhost:19671/api';
  private API_URL = 'https://encampment-api.azurewebsites.net/api';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  public getUser(): Observable<User> {
    return new Observable(observer => {        
      this.authHttp.get(`${this.API_URL}/users/current`)
      .map(res => res.json())
      .subscribe(
        data => {
          observer.next(data);
        },
        error => {
          observer.error(error);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public saveUser(user): Observable<User> {
    return new Observable(observer => {
      this.authHttp.post(`${this.API_URL}/users`, user)
      .map(res => res.json())
      .subscribe(
        data => {
          observer.next(data);
        },
        error => {
          observer.error(error);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public getAssignments(): Observable<UserWithSubgroups> {
    return new Observable(observer => {
      this.authHttp.get(`${this.API_URL}/users/assignment`)
      .map(res => res.json())
      .subscribe(
        data => {
          observer.next(data);
        },
        error => {
          observer.error(error);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public getGroups(): Observable<Group[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.API_URL}/groups`)
      .map(res => res.json())
      .subscribe(
        data => {
          observer.next(data);
        },
        error => {
          observer.error(error);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
}
