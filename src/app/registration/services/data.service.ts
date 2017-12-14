import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { AuthHttp } from "angular2-jwt/angular2-jwt";

import { User } from '../models/user';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { Group } from '../models/group';
import { ErrorsService } from './errors.service';

@Injectable()
export class DataService {

  public API_URL = 'http://localhost:19671/api';
  //public API_URL = 'https://encampment-api.azurewebsites.net/api';

  constructor(private http: Http, private authHttp: AuthHttp,
    private errorsService: ErrorsService) { }

  public getGroups(): Observable<Group[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.API_URL}/groups`)
      .map(res => res.json())
      .subscribe(
        data => {
          observer.next(data);
        },
        error => {
          observer.error(this.errorsService.handleError(error));
        },
        () => {
          observer.complete();
        }
      );
    });
  }
}
