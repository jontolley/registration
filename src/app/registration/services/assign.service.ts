import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { UserWithSubgroups } from '../models/userWithSubgroups';

@Injectable()
export class AssignService {

  constructor(private data:DataService) { }

  public getAssignments(): Observable<UserWithSubgroups> {
    return new Observable(observer => {
      this.data.getAssignments()
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
