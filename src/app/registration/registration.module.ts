import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

// ROUTING AND COMPONENTS
import { RegistrationRoutingModule } from './registration-routing.module';
import { AssignComponent } from './assign/assign.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';

// SERVICES
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AuthGuardService } from './services/auth-guard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ],
  declarations: [
    AssignComponent,
    RegisterComponent,
    UnauthorizedComponent,
    ProfileComponent,
    CallbackComponent
  ],
  providers: [
    DataService,
    AuthService,
    UsersService,
    AuthGuardService
  ]
})
export class RegistrationModule { }
