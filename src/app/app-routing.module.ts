import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { MapsComponent } from './pages/maps/maps.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { Error404Component } from './errors/error-404/error-404.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'activities',
    component: ActivitiesComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'maps',
    component: MapsComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '404',
    component: Error404Component
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
