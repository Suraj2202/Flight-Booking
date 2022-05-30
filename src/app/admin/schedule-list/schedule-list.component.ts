import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from 'src/app/service/airline';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

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
    


    this.api.GetSchedule().subscribe((res) =>
    {
      console.log('Get All Schedule Details', res);
      this.readUser = res;
      console.log('fetch data',this.readUser);
      this.readUser.forEach(element => {
        if(element.blocked == '0')
          element.blocked = 'False'
        else
          element.blocked = 'True'
      });
    });

    
  }
//Delete

deleteSchedule(confirmationNumber:String){
  let passValue = {
    "Airline":JSON.stringify({"couponCode" : confirmationNumber})        
  };
  this.api.DeleteSchedule(JSON.parse(passValue.Airline)).subscribe((res)=>{
    window.location.reload();
  });
}
}
