import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from 'src/app/service/airline';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  constructor(private api:CrudService,private reroute:Router) { }
  
  readUser!: Airline[];
  ngOnInit(): void {

        //#region login validation

        let loginPath = "\login"        
        this.api.CheckTokenValidation(localStorage.getItem("uname")).subscribe((res)=>{
          if(res != "Yes"){
            this.reroute.navigate([`${loginPath}`])
          }
        },
        (err) => {      
          console.log(err.error.text)
          if(err.error.text != "Yes"){
            this.reroute.navigate([`${loginPath}`])
          }
        });
        
    //#endregion
    


    this.api.GetFlights().subscribe((res) =>
    {
      console.log('Get All Flight Details', res);
      this.readUser = res;
      console.log('fetch data',this.readUser);
      this.readUser.forEach(element => {
        if(element.detailsUpdated == "1")
          element.detailsUpdated = 'Yes'
        else
          element.detailsUpdated = 'No'
      });
    })
  }

}
