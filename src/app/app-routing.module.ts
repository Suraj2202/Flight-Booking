import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDiscountComponent } from './admin/add-discount/add-discount.component';
import { AddFlightNumberComponent } from './admin/add-flight-number/add-flight-number.component';
import { AddairlineComponent } from './admin/addairline/addairline.component';
import { AddscheduleComponent } from './admin/addschedule/addschedule.component';
import { AirlineListComponent } from './admin/airline-list/airline-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DiscountListComponent } from './admin/discount-list/discount-list.component';
import { FlightListComponent } from './admin/flight-list/flight-list.component';
import { ScheduleListComponent } from './admin/schedule-list/schedule-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { FinalTicketComponent } from './user/final-ticket/final-ticket.component';
import { ManageTicketsComponent } from './user/manage-tickets/manage-tickets.component';
import { OnewayFlightListComponent } from './user/oneway-flight-list/oneway-flight-list.component';
import { PassangerDetailsComponent } from './user/passanger-details/passanger-details.component';
import { PnrSearchComponent } from './user/pnr-search/pnr-search.component';
import { RoundwayFlightListComponent } from './user/roundway-flight-list/roundway-flight-list.component';
import { SearchFlightComponent } from './user/search-flight/search-flight.component';

const routes: Routes = [
  {
    path:'', redirectTo:'home', pathMatch:'full'
  },
  {
    path:'admin-dashboard', component:DashboardComponent
  },
  {
    path:'airline-list', component:AirlineListComponent
  },
  {
    path:'operation-airline', component:AddairlineComponent
  },
  {
    path:'operation-airline/:flightNumber', component:AddairlineComponent
  },
  {
    path:'add-flight', component:AddFlightNumberComponent
  },
  {
    path:'schedule-list', component:ScheduleListComponent
  },
  {
    path:'operation-schedule', component:AddscheduleComponent
  },
  {
    path:'operation-schedule/:confirmationNumber', component:AddscheduleComponent
  },
  {
    path:'discount-list', component:DiscountListComponent
  },
  {
    path:'operation-discount', component:AddDiscountComponent
  },
  {
    path:'operation-discount/:couponCode', component:AddDiscountComponent
  },
  {
    path:'flight-list', component:FlightListComponent
  },

  //Login Signup Module
  {
    path:'login', component:LoginComponent
  },
  {
    path:'signup', component:SignupComponent
  },

  //User side
  
  {
    path:'search-flight', component:SearchFlightComponent
  },
  
  {
    path:'oneway-flight/:userName/:uniqueKey', component:OnewayFlightListComponent
  },
  {
    path:'oundway-flight/:userName/:uniqueKey/:oneway', component:RoundwayFlightListComponent
  },
  
  {
    path:'passanger-details', component:PassangerDetailsComponent
  }
  ,
  
  {
    path:'passanger-details/:onewaykey/:roundwaykey', component:PassangerDetailsComponent
  }
  ,  
  {
    path:'passanger-details/:onewaykey', component:PassangerDetailsComponent
  }
  ,  
  {
    path:'home', component:HomeComponent
  } ,  
  {
    path:'manage-ticket', component:ManageTicketsComponent
  }
  ,  
  {
    path:'pnr-search', component:PnrSearchComponent
  },  
  {
    path:'ticket-download/:pnr', component:FinalTicketComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
