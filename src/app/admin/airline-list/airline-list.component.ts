import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from 'src/app/service/airline';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.css']
})
export class AirlineListComponent implements OnInit {

  constructor(private api:CrudService, private reroute:Router) { }

  readUser!: Airline[];
  ngOnInit(): void {

    
        //#region login validation

        let loginPath = "\login"        
        this.api.CheckTokenValidation(localStorage.getItem("uname")).subscribe((res)=>{
          if(res != "Yes"){
            
          console.log(res)
            this.reroute.navigate([`${loginPath}`])
          }
        },
        (err) => {      
          console.log(err)
          if(err.error.text != "Yes"){
            this.reroute.navigate([`${loginPath}`])
          }
        });
        
    //#endregion
    


    this.api.GetAirlineDetails().subscribe((res) =>
    {
      console.log('Get All Airline Details', res);
      this.readUser = res;
      console.log('fetch data',this.readUser);
      this.readUser.forEach(element => {
        if(element.blocked !="1")
          element.blocked = 'False'
        else
          element.blocked = 'True'
      });
    })
  }

  //Block Airline
  blockAirline(flightNumber:String){
    let passValue = {
      "Airline":JSON.stringify({"flightNumber" : flightNumber})
    };
    
    console.log(JSON.parse(passValue.Airline), "FlightNumber only");
   // console.log(JSON.stringify({"flightNumber" : flightNumber}), "FlightNumber only");
    this.api.BlockAirline(JSON.parse(passValue.Airline)).subscribe((res)=>{
    window.location.reload();
    });
  }

}
