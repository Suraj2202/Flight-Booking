import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {

  constructor(private api: CrudService, private router: ActivatedRoute, private reroute:Router) { }

  errormsg: any;
  successMsg: any;
  getParam!: any;

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
    

    this.getParam = this.router.snapshot.paramMap.get('couponCode');
    if(this.getParam){
      
        this.api.GetSingleDiscounts(this.getParam).subscribe((res)=>
        {
            console.log(res.couponCode,"Selected Discount");          
            this.airlineForm.patchValue(
              {
                 couponCode : res.couponCode,
                 value : res.value,
                 minimumAmount : res.minimumAmount
              });
        this.airlineForm.controls['couponCode'].disable();
      });
    }
  }
  airlineForm = new FormGroup({
    'couponCode': new FormControl('',[ Validators.required]),
    'value': new FormControl('',[ Validators.required]),
    'minimumAmount': new FormControl('',[ Validators.required]),

  });

  userSubmit() {
    //console.log("User Values inputed", this.airlineForm.value);

    if (!(this.airlineForm.valid)) {
      this.errormsg = "All Fields are required";
    }
    else {
      this.api.AddDiscount(this.airlineForm.value).subscribe((res) => {
        console.log("data airline sent to add", res)
        this.airlineForm.reset();

        this.successMsg = "Added Successfully";
      });
    }
  }

  //Update Discounts
  userUpdate(){
      console.log(this.airlineForm.value)

      if(this.airlineForm.valid){
        this.api.UpdateDiscount(this.getParam,this.airlineForm.value).subscribe((res)=>{
          this.successMsg = "Updated Successfully"
        })
      }
  }
}
