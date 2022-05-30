import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.css']
})
export class ManageTicketsComponent implements OnInit {

  constructor(private api:CrudService, private reroute:Router) { }

  readUser:any
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
    
    this.api.GetAllTickets(localStorage.getItem("uname")).subscribe((res)=>{

       this.readUser = res;       
       console.log(res,"Manage Tickets");
     });
  }

  
  cancel(data:string){
   console.log(data, "BookingId")
   this.api.CancelTicket(data).subscribe((res)=>{
      window.location.reload();
   })    
  }
}
