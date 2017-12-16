import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { Group } from '../models/group';
import { Subgroup } from '../models/subgroup';

@Injectable()
export class RegisterService {

  constructor(private data:DataService) { }

  public getGroups(): Observable<Group[]> {
    return new Observable(observer => {
      this.data.getGroups()
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

  public getSubgroups(groupId:number): Observable<Subgroup[]> {
    return new Observable(observer => {
      this.data.getSubgroups(groupId)
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
