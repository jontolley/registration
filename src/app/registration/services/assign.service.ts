import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { UsersService } from './users.service';
import { ErrorsService } from './errors.service';
import { AuthHttp } from 'angular2-jwt';
import { SubgroupWithPin } from '../models/subgroupWithPin';

@Injectable()
export class AssignService {

  constructor(private authHttp: AuthHttp, private data: DataService,
    private errorsService: ErrorsService, private users:UsersService) {
  }
  
  public getAssignments(): Observable<UserWithSubgroups> {
    return new Observable(observer => {
      this.authHttp.get(`${this.data.API_URL}/users/current/assignment`)
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

  public makeAssignment(assignment:SubgroupWithPin): Observable<boolean> {
    return new Observable(observer => {
      this.authHttp.put(`${this.data.API_URL}/users/current/assignment`, assignment)
      .map(res => res.json())
      .subscribe(
        data => {
          observer.next(true);
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

  public removeAssignment(subgroupId:number): Observable<boolean> {
    return new Observable(observer => {
      this.authHttp.delete(`${this.data.API_URL}/users/current/assignment/${subgroupId}`)
      .map(res => res.json())
      .subscribe(
        data => {
          observer.next(true);
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
