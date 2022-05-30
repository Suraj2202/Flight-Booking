import { Component, OnInit } from '@angular/core';
import { Airline } from 'src/app/service/airline';

import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oneway-flight-list',
  templateUrl: './oneway-flight-list.component.html',
  styleUrls: ['./oneway-flight-list.component.css']
})
export class OnewayFlightListComponent implements OnInit {

  constructor(private api:CrudService,private router:ActivatedRoute, private reroute:Router) { }
  errormsg:any
  successMsg:any
  readUser!: Airline[];
  getParam0:any;
  getParam1:any;
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
    

    this.getParam0 = localStorage.getItem("uname");
    this.getParam1 = this.router.snapshot.paramMap.get('uniqueKey');

    this.api.GetOneWaySchedule(this.getParam0,this.getParam1).subscribe((res)=>{
      this.readUser = res;
      if(res.length == 0){
        this.errormsg = "Sorry !!! No Flights Available"
      }
      console.log(res,"Everything");
  });
    
    
  }

}
