import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addschedule',
  templateUrl: './addschedule.component.html',
  styleUrls: ['./addschedule.component.css']
})
export class AddscheduleComponent implements OnInit {

  constructor(private api:CrudService, private router:ActivatedRoute, private reroute:Router) { }

  errormsg:any;
  successMsg:any;
  getParam!:any;

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
    
    this.getParam = this.router.snapshot.paramMap.get('confirmationNumber')
    console.log(this.getParam);
    if(this.getParam){
      this.api.GetSingleSchedule(this.getParam).subscribe((res)=>{
        this.airlineForm.patchValue({
          flightNumber: res.flightNumber,
          from: res.from,
          to: res.to,
          startDateTime: res.startDateTime,
          endDateTime: res.endDateTime,
          schedule: res.schedule,
          meal: res.meal, 
        });
      })
    }
  }

  airlineForm = new FormGroup({
    'flightNumber': new FormControl('',[ Validators.required]),
    'from': new FormControl('',[ Validators.required]),
    'to': new FormControl('',[ Validators.required]),
    'startDateTime': new FormControl('',[ Validators.required]),
    'endDateTime': new FormControl('',[ Validators.required]),
    'schedule': new FormControl('',[ Validators.required]),
    'meal': new FormControl('',[ Validators.required]),    
  });
  userSubmit(){
    //console.log("User Values inputed", this.airlineForm.value);

    if(!(this.airlineForm.valid)){
      this.errormsg = "All Fields are required";
    }
    else{
      this.api.AddSchedule(this.airlineForm.value).subscribe((res) =>{
        console.log("data airline sent to add", res);
        this.airlineForm.reset();
        this.errormsg = "Added Successfully";
      });
    }
  }

  //Update Schedule

  userUpdate(){
    if(this.airlineForm.valid){
      this.api.UpdateSchedule(this.getParam,this.airlineForm.value).subscribe((res)=>{
        this.successMsg = "Updated Successfully for Flight Number " +this.airlineForm.controls['flightNumber'].value
      })
    }
  }
}
