import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  public API_URL = 'http://localhost:19671/api';
  //public API_URL = 'https://encampment-api.azurewebsites.net/api';

  constructor() { }
}
