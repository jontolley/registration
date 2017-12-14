import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';
import { UsersService } from './users.service';

@Injectable()
export class AssignService {

  constructor(private users:UsersService) { }

  public getAssignments(): Observable<UserWithSubgroups> {
    return new Observable(observer => {
      this.users.getAssignments()
      .subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });    
  }

}
