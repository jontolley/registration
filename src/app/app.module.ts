
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { MapsComponent } from './pages/maps/maps.component';
import { FaqComponent } from './pages/faq/faq.component';
import { Error404Component } from './errors/error-404/error-404.component';

import { AgmCoreModule } from '@agm/core';
import { APP_CONFIG } from './app.config';
import { ScheduleDayComponent } from './components/schedule-day/schedule-day.component';
import { ShrinkOnScrollDirective } from './directives/shrink-on-scroll.directive';
import { JtPhonePipe } from './pipes/jt-phone.pipe';
import { CloseMenuDirective } from './directives/close-menu.directive';
import { TextMaskModule } from 'angular2-text-mask';
import { ErrorUnexpectedComponent } from './errors/error-unexpected/error-unexpected.component';
import { InformationComponent } from './pages/information/information.component';

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
    ScheduleDayComponent,
    ShrinkOnScrollDirective,
    JtPhonePipe,
    Error404Component,
    CloseMenuDirective,
    ErrorUnexpectedComponent,
    InformationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TextMaskModule,
    AgmCoreModule.forRoot({
      apiKey: APP_CONFIG.GOOGLE_MAPS_API_KEY
    }),
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
