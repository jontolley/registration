import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  private API_URL = 'http://localhost:19671/api';
  //private API_URL = 'https://encampment-api.azurewebsites.net/api';
  
  constructor(private http: Http) { }

  public sendContactMessage(contact:Contact): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.API_URL}/contacts`, contact)
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
