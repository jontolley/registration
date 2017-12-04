import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AssignComponent } from './assign/assign.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { DeactivateDelayService } from './services/deactivate-delay.service';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,    
    canActivate: [AuthGuardService]
  },
  {
    path: 'assign',
    component: AssignComponent,    
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,    
    canActivate: [AuthGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
