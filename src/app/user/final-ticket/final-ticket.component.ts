import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookFlight } from 'src/app/service/book-flight';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-final-ticket',
  templateUrl: './final-ticket.component.html',
  styleUrls: ['./final-ticket.component.css']
})
export class FinalTicketComponent implements OnInit {

  constructor(private api:CrudService, private router:ActivatedRoute,  private reroute:Router) { }

  //#region variables
  user:any;
  email:any;
  gender0:any;
  gender1:any;
  gender2:any;
  age0:any;
  age1:any;
  age2:any;
  name0:any;
  name1:any;
  name2:any;
  seat0:any
  seat1:any;
  seat2:any;
//#endregion

  getParam:any;
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
    
    this.getParam = this.router.snapshot.paramMap.get('pnr');
    this.api.DownloadTicket(this.getParam).subscribe((res)=>{
      
      //#region Variables
      this.user = res.userName;
      this.email=res.emailId;
      this.gender0=res.gender0;
      this.gender1=res.gender1;
      this.gender2=res.gender2;
      this.age0=res.passangerAge0;
      this.age1=res.passangerAge1;
      this.age2=res.passangerAge2;
      this.name0 = res.passangerName0;
      this.name1 = res.passangerName1;
      this.name2 = res.passangerName2;
      this.seat0 =res.SeatNumber0;
      this.seat1 =res.SeatNumber1;
      this.seat2 =res.SeatNumber2;
      //#endregion

      console.log(res);
    })
  }

 
}
