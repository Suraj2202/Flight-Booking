import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flight-number',
  templateUrl: './add-flight-number.component.html',
  styleUrls: ['./add-flight-number.component.css']
})
export class AddFlightNumberComponent implements OnInit {

  constructor(private api:CrudService, private reroute:Router) { }

  errormsg:any;
  successMsg:any;
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
    

  }

  airlineForm = new FormGroup({
    'flightNumber': new FormControl('',[ Validators.required])
  });

  userSubmit(){
    //console.log("User Values inputed", this.airlineForm.value);

    if(!(this.airlineForm.valid)){
      this.errormsg = "All Fields are required";
    }
    else{
      this.api.AddFlight(this.airlineForm.value).subscribe((res) =>{
        console.log("data airline sent to add", res)
        this.airlineForm.reset();

        this.successMsg = "Added Successfully";
      });
    }
  }
}
