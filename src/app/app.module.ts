import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { MapsComponent } from './pages/maps/maps.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

import { AgmCoreModule } from '@agm/core';
import config from '../config';
import { ScheduleDayComponent } from './components/schedule-day/schedule-day.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CountdownComponent,
    ActivitiesComponent,
    ScheduleComponent,
    MapsComponent,
    FaqComponent,
    ContactComponent,
    PageHeaderComponent,
    ScheduleDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: config.GOOGLE_MAPS_API_KEY
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
