import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AirlineListComponent } from './admin/airline-list/airline-list.component';
import { AddairlineComponent } from './admin/addairline/addairline.component';
import { AddFlightNumberComponent } from './admin/add-flight-number/add-flight-number.component';
import { ScheduleListComponent } from './admin/schedule-list/schedule-list.component';
import { AddscheduleComponent } from './admin/addschedule/addschedule.component';
import { DiscountListComponent } from './admin/discount-list/discount-list.component';
import { AddDiscountComponent } from './admin/add-discount/add-discount.component';
import { FlightListComponent } from './admin/flight-list/flight-list.component';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { SearchFlightComponent } from './user/search-flight/search-flight.component';
import { OnewayFlightListComponent } from './user/oneway-flight-list/oneway-flight-list.component';
import { RoundwayFlightListComponent } from './user/roundway-flight-list/roundway-flight-list.component';
import { PassangerDetailsComponent } from './user/passanger-details/passanger-details.component';
import { HomeComponent } from './home/home.component';
import { ManageTicketsComponent } from './user/manage-tickets/manage-tickets.component';
import { PnrSearchComponent } from './user/pnr-search/pnr-search.component';
import { FinalTicketComponent } from './user/final-ticket/final-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AirlineListComponent,
    AddairlineComponent,
    AddFlightNumberComponent,
    ScheduleListComponent,
    AddscheduleComponent,
    DiscountListComponent,
    AddDiscountComponent,
    FlightListComponent,
    LoginComponent,
    SignupComponent,
    SearchFlightComponent,
    OnewayFlightListComponent,
    RoundwayFlightListComponent,
    PassangerDetailsComponent,
    HomeComponent,
    ManageTicketsComponent,
    PnrSearchComponent,
    FinalTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
