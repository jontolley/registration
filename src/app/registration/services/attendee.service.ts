import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { Group } from '../models/group';
import { Subgroup } from '../models/subgroup';
import { Attendee } from '../models/attendee';
import { AuthHttp } from 'angular2-jwt';
import { ErrorsService } from './errors.service';

@Injectable()
export class AttendeeService {

  constructor(private authHttp: AuthHttp, private data: DataService,
    private errorsService: ErrorsService) { }

  public addAttendee(groupId:number, subgroupId:number, attendee:Attendee): Observable<Attendee> {
    return new Observable(observer => {
      this.authHttp.post(`${this.data.API_URL}/groups/${groupId}/subgroups/${subgroupId}/attendees`, attendee)
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

  public updateAttendee(groupId:number, subgroupId:number, attendee:Attendee): Observable<boolean> {
    return new Observable(observer => {
      this.authHttp.put(`${this.data.API_URL}/groups/${groupId}/subgroups/${subgroupId}/attendees/${attendee.id}`, attendee)
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

  public deleteAttendee(groupId:number, subgroupId:number, attendee:Attendee): Observable<boolean> {
    return new Observable(observer => {
      this.authHttp.delete(`${this.data.API_URL}/groups/${groupId}/subgroups/${subgroupId}/attendees/${attendee.id}`)
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
