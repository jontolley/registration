import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import { DataService } from './data.service';
import { Group } from '../models/group';
import { Subgroup } from '../models/subgroup';
import { Attendee } from '../models/attendee';
import { ErrorsService } from './errors.service';

@Injectable()
export class RegisterService {

  constructor(private authHttp: AuthHttp, private dataService: DataService,
    private errorsService: ErrorsService) { }

  public getGroups(): Observable<Group[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.dataService.API_URL}/groups`)
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
      this.authHttp.get(`${this.dataService.API_URL}/groups/${groupId}/subgroups`)
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

  public getAttendeeStubs(groupId:number, subgroupId:number): Observable<Attendee[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.dataService.API_URL}/groups/${groupId}/subgroups/${subgroupId}/attendeestubs`)
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

  public getAttendee(groupId:number, subgroupId:number, attendeeId:number): Observable<Attendee> {
    return new Observable(observer => {
      this.authHttp.get(`${this.dataService.API_URL}/groups/${groupId}/subgroups/${subgroupId}/attendees/${attendeeId}`)
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
