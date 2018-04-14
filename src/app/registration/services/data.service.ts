import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { ErrorsService } from './errors.service';

@Injectable()
export class DataService {

  //public API_URL = 'http://localhost:19671/api';
  public API_URL = 'https://encampment-api.azurewebsites.net/api';
  public API_ANALYTICS_URL = 'https://encampment-analytics-api.azurewebsites.net/api';

  constructor(private authHttp: AuthHttp, private errorsService: ErrorsService) { }  

  public getShirtSizes(): Observable<any[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.API_URL}/support/shirtsizes`)
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

  public getAccommodations(): Observable<any[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.API_URL}/support/accommodations`)
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

  public getMeritbadges(): Observable<any[]> {
    return new Observable(observer => {
      this.authHttp.get(`${this.API_URL}/support/meritbadges`)
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
