import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { Group } from '../models/group';
import { Subgroup } from '../models/subgroup';
import { AuthHttp } from 'angular2-jwt';
import { ErrorsService } from './errors.service';

@Injectable()
export class RegisterService {

  constructor(private authHttp: AuthHttp, private data: DataService,
    private errorsService: ErrorsService) { }

  public getGroups(): Observable<Group[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.data.API_URL}/groups`)
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

  public getSubgroups(groupId:number): Observable<Subgroup[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.data.API_URL}/groups/${groupId}/subgroups`)
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
