import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

  constructor(private api:CrudService, private router:Router) { }


  uniqueKey:any;
  minDate:any = "yyyy/MM/dd";
  ngOnInit(): void {


    //#region login validation

    let loginPath = "\login"        
    this.api.CheckTokenValidation(localStorage.getItem("uname")).subscribe((res)=>{
      if(res != "Yes"){
        //this.router.navigate([`${loginPath}`])
      }
    },
    (err) => {      
      console.log(err.error.text)
      let check:string = err.error.text
      if(check != 'Yes'){
        //console.log(err.error.text,"dekh to ")
      
        this.router.navigate([`${loginPath}`])
      }
    });
    
//#endregion

    this.getDate();
    this.searchFlight.patchValue({
      flighttype : "one",
      userName : localStorage.getItem("uname")
    })
    //this.searchFlight.controls['userName'].disable()
  }

  getDate(){
    let date:any = new Date();
    let toDate:any = date.getDate();
    if(toDate < 10){
      toDate = "0" + toDate;
    }
    let toMonth = date.getMonth() + 1;
    if(toMonth < 10){
      toMonth = "0" + toMonth;
    } 
    let toYear = date.getFullYear();

    this.minDate = toYear+"-"+toMonth+"-"+toDate;
    console.log(this.minDate);
  }

  searchFlight = new FormGroup({
    'flighttype':new FormControl('',[Validators.required]),
    'from':new FormControl('',[Validators.required]),
    'to':new FormControl('',[Validators.required]),

    'departStartDateTime':new FormControl('',[Validators.required]),

    'returnStartDateTime':new FormControl('',[]),

    'classOption':new FormControl('',[Validators.required]),
    'passanger':new FormControl('',[Validators.required]),
    'userName': new FormControl('', [Validators.required])
  });


  //validators

  get flighttype():FormControl{ 
    return this.searchFlight.get("flighttype") as FormControl
}

get from():FormControl{
  return this.searchFlight.get("from") as FormControl
}

get to():FormControl{
  return this.searchFlight.get("to") as FormControl
}

get departStartDateTime():FormControl{
  return this.searchFlight.get("departStartDateTime") as FormControl
}

get returnStartDateTime():FormControl{
  return this.searchFlight.get("returnStartDateTime") as FormControl
}

get classOption():FormControl{
  return this.searchFlight.get("classOption") as FormControl
}

get passanger():FormControl{
  return this.searchFlight.get("passanger") as FormControl
}

  //search flights
  searchFlights(){

    if(this.searchFlight.valid){
      let check = this.searchFlight.get("flighttype")
      console.log(check?.value,"check value")
      if(check?.value == "one"){
        console.log(this.searchFlight.value, "formcontrolvalues");
          this.api.OneWayScheduleProducer(this.searchFlight.value).subscribe((res)=>{
            this.uniqueKey = res.split(" ")[1];
            console.log(this.uniqueKey);

            let user = localStorage.getItem("uname");
            let key = this.uniqueKey;
            let pathValue = `\oneway-flight/`+ user +`/` +key;

            this.router.navigate([`${pathValue}`])
            /* let passValue = {
              "Airline":JSON.stringify({"userName" : this.searchFlight.get("userName"), "uniqueKey": this.uniqueKey})
            };
            console.log(passValue)
            this.api.GetOneWaySchedule(this.searchFlight.get("userName")?.value,this.uniqueKey).subscribe((res)=>{
                console.log(res);
            }); */
            
          });
        }
        else if(check?.value =="round"){
          
          this.api.TwoWayScheduleProducer(this.searchFlight.value).subscribe((res)=>{
            this.uniqueKey = res.split(" ")[1];

            
            let user = localStorage.getItem("uname");
            let key = this.uniqueKey;
            let way = this.searchFlight.get("from")?.value;
            let pathValue = `\oundway-flight/`+ user +`/` +key +`/`+way;

            this.router.navigate([`${pathValue}`])
            /* console.log(this.uniqueKey);

            this.api.GetRoundWaySchedule(this.searchFlight.get("userName")?.value,this.uniqueKey).subscribe((res)=>{
              console.log(res);
            });
             */
          });
        }

    }
    else{

    }
  }


}
