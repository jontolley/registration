import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Contact } from '../pages/contact/contact';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  API_URL = 'http://encampment-api.azurewebsites.net/api';
  
  constructor(private http: Http) { }

  public sendContactMessage(contact:Contact): Observable<any> {
    return this.http.post(`${this.API_URL}/contact`, contact);
  }

}
