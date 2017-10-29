import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { MapsComponent } from './pages/maps/maps.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: []
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
    children: []
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    children: []
  },
  {
    path: 'maps',
    component: MapsComponent,
    children: []
  },
  {
    path: 'faq',
    component: FaqComponent,
    children: []
  },
  {
    path: 'contact',
    component: ContactComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
