import { Injectable } from '@angular/core';
import { CampError } from '../models/error';

@Injectable()
export class ErrorsService {

  constructor() { }

  handleError(error:any) : CampError {
    let campError = new CampError();

    if (error.status) {
      campError.code = error.status;
      campError.message = error.statusText;
    } else {
      campError.code = 0;
      campError.message = error;
    }

    console.error(campError.code, campError.message);

    return campError;
  }

}
