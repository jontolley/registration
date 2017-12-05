import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AuthHttp, AuthConfig } from 'angular2-jwt';

// MODULES
import { SharedModule } from './shared/shared.module';

// ROUTING AND COMPONENTS
import { RegistrationRoutingModule } from './registration-routing.module';
import { AssignComponent } from './assign/assign.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { SignupComponent } from './signup/signup.component';

// SERVICES
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AuthGuardService } from './services/auth-guard.service';
import { DeactivateDelayService } from './services/deactivate-delay.service';
import { AssignService } from './services/assign.service';
import { RegisterService } from './services/register.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule
  ],
  declarations: [
    AssignComponent,
    RegisterComponent,
    UnauthorizedComponent,
    ProfileComponent,
    CallbackComponent,
    SignupComponent
  ],
  providers: [
    AssignService,
    RegisterService,
    DataService,
    AuthService,    
    UsersService,
    AuthGuardService,
    DeactivateDelayService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class RegistrationModule {
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
}
