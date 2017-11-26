import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { Group } from '../models/group';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  API_URL = 'https://encampment-api.azurewebsites.net/api';
  //API_URL = 'http://localhost:19671/api';
  
  constructor(private http: Http) { }

  public sendContactMessage(contact:Contact): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.API_URL}/contact`, contact)
      .map(response => response.json())
      .subscribe(
        data => {
          observer.next(data);
        },
        error => {          
          let err = new Error(`Status Code: ${error.status}; ${error.statusText}`);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

  public getGroups(): Observable<Group[]> {
    return new Observable(observer => {
      this.http.get(`${this.API_URL}/groups`)
      .map(response => response.json())
      .subscribe(
        data => {
          observer.next(data);
        },
        error => {          
          let err = new Error(`Status Code: ${error.status}; ${error.statusText}`);
          observer.error(err);
        },
        () => {
          observer.complete();
        }
      );
    });
  }

}
