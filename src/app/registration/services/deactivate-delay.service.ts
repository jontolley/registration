import { Injectable } from '@angular/core';
import { Router, CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CallbackComponent } from '../callback/callback.component';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DeactivateDelayService implements CanDeactivate<CallbackComponent> {

  constructor() {}

  canDeactivate(component: CallbackComponent, currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      return new Observable<boolean>(observer => {
        setTimeout(() => {
          observer.next(true);
          observer.complete();
        }, 1000);
      });
  }
}
