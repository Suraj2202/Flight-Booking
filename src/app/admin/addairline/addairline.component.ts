import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addairline',
  templateUrl: './addairline.component.html',
  styleUrls: ['./addairline.component.css']
})
export class AddairlineComponent implements OnInit {

  constructor(private api:CrudService,private router:ActivatedRoute,private reroute:Router) { }

  errormsg:any;
  successMsg:any;
  getParam!:any;
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
    

    this.getParam = this.router.snapshot.paramMap.get('flightNumber');
    console.log(this.getParam1, "got the second");
    if(this.getParam){
      this.api.GetSingleAirlineDetails(this.getParam).subscribe((res)=>{
        console.log(res.flightNumber,"Flight Number")
        this.airlineForm.patchValue({
          flightNumber :  res.flightNumber,
          contactNumber :  res.contactNumber,
          contactAddress :  res.contactAddress,
          instrumentUsed :  res.instrumentUsed,
          businessSeats :  res.businessSeats,
          nonBusinessSeats :  res.businessSeats,
          baseFare :  res.baseFare,
          businessRows :  res.businessRows,
          nonBusinessRows :  res.nonBusinessRows,
          blocked  :  res.blocked
        });
        this.airlineForm.controls['flightNumber'].disable();
        
      });
    }
  }

  airlineForm = new FormGroup({
    'flightNumber': new FormControl('',[ Validators.required]),
    'contactNumber': new FormControl('',[ Validators.required]),
    'contactAddress': new FormControl('',[ Validators.required]),
    'instrumentUsed': new FormControl('',[ Validators.required]),
    'businessSeats': new FormControl('',[ Validators.required]),
    'nonBusinessSeats': new FormControl('',[ Validators.required]),
    'baseFare': new FormControl('',[ Validators.required]),
    'businessRows': new FormControl('',[ Validators.required]),
    'nonBusinessRows': new FormControl('',[ Validators.required]),
    'blocked': new FormControl('',Validators.required)
  });

  get flightNumber():FormControl{
    return this.airlineForm.get("flightNumber") as FormControl;
  }
  get contactNumber():FormControl{
    return this.airlineForm.get("contactNumber") as FormControl;
  }
  get contactAddress():FormControl{
    return this.airlineForm.get("contactAddress") as FormControl;
  }
  get instrumentUsed():FormControl{
    return this.airlineForm.get("instrumentUsed") as FormControl;
  }
  get businessSeats():FormControl{
    return this.airlineForm.get("businessSeats") as FormControl;
  }
  get nonBusinessSeats():FormControl{
    return this.airlineForm.get("nonBusinessSeats") as FormControl;
  }
  get businessRows():FormControl{
    return this.airlineForm.get("businessRows") as FormControl;
  }
  get nonBusinessRows():FormControl{
    return this.airlineForm.get("nonBusinessRows") as FormControl;
  }
  get blocked():FormControl{
    return this.airlineForm.get("blocked") as FormControl;
  }
  get baseFare():FormControl{
    return this.airlineForm.get("baseFare") as FormControl;
  }

  userSubmit(){
    //console.log("User Values inputed", this.airlineForm.value);

    if(!(this.airlineForm.valid)){
      this.errormsg = "All Fields are required";
    }
    else{
      this.api.AddAirlineDetails(this.airlineForm.value).subscribe((res) =>{
        console.log("data airline sent to add", res);
        this.airlineForm.reset();
        this.errormsg = "Added Successfully";
      });
    }

  }


  //Update Airline
  userUpdate(){
    console.log(this.airlineForm.value)
    if(this.airlineForm.valid){
      this.api.UpdateAirlineDetails(this.getParam,this.airlineForm.value).subscribe((res)=>{
        console.log(res, "Updated Airline details")
      });
      this.successMsg = "Updated Successfully"
    }
  }
}
