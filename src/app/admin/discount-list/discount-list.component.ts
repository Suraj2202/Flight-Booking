import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from 'src/app/service/airline';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  constructor(private api:CrudService, private reroute:Router) { }

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
    

    this.api.GetDiscounts().subscribe((res) =>
    {
      console.log('Get All Discount Details', res);
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
    //delete coupon
    deleteCoupon(couponCode:String){
      let passValue = {
        "Airline":JSON.stringify({"couponCode" : couponCode})        
      };
      this.api.DeleteDiscount(JSON.parse(passValue.Airline)).subscribe((res)=>{
        window.location.reload();
      });
  }

  
}
