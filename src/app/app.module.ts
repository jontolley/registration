
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';

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
import { RegistrationComponent } from './pages/registration/registration.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ErrorHeaderComponent } from './components/error-header/error-header.component';
import { Error404Component } from './errors/error-404/error-404.component';

import { AgmCoreModule } from '@agm/core';
import { APP_CONFIG } from './app.config';
import { ScheduleDayComponent } from './components/schedule-day/schedule-day.component';
import { ShrinkOnScrollDirective } from './directives/shrink-on-scroll.directive';
import { ContactFormComponent } from './pages/contact/contact-form/contact-form.component';
import { JtPhonePipe } from './pipes/jt-phone.pipe';
import { DataService } from './services/data.service';
import { CloseMenuDirective } from './directives/close-menu.directive';

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
    ScheduleDayComponent,
    ShrinkOnScrollDirective,
    ContactFormComponent,
    JtPhonePipe,
    ErrorHeaderComponent,
    Error404Component,
    RegistrationComponent,
    CloseMenuDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: APP_CONFIG.GOOGLE_MAPS_API_KEY
    })
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
