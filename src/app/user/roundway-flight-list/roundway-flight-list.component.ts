import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from 'src/app/service/airline';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-roundway-flight-list',
  templateUrl: './roundway-flight-list.component.html',
  styleUrls: ['./roundway-flight-list.component.css']
})
export class RoundwayFlightListComponent implements OnInit {

  constructor(private api: CrudService, private router: ActivatedRoute, private reroute: Router) { }

  errormsg: any
  successMsg: any
  readUser!: Airline[];
  readOneWay: Array<Airline> = [];
  readRound: Array<Airline> = [];
  getParam0: any;
  getParam1: any;
  getParam2!: any;
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
    this.getParam2 = this.router.snapshot.paramMap.get('oneway')

    this.api.GetRoundWaySchedule(this.getParam0, this.getParam1).subscribe((res) => {
      console.log(res);
      this.readUser = res;
      if (res.length == 0) {
        this.errormsg = "Sorry !!! No Flights Available"
      }
      else {
        for (let i = 0; i < res.length; i++) {

          if (this.readUser[i].from == this.getParam2.toUpperCase()) {
            this.readOneWay.push(res[i])
          }
          else {
            this.readRound.push(res[i])
          }

        }
      }

      console.log(this.readOneWay, "One Way")
      console.log(this.readRound, "round Way")


    });

  }


  bookFlight = new FormGroup({
    'oneway': new FormControl('', [Validators.required]),
    'roundway': new FormControl('', [Validators.required])
  })

  get oneway(): FormGroup {
    return this.bookFlight.get('oneway') as FormGroup
  }
  get roundway(): FormGroup {
    return this.bookFlight.get('roundway') as FormGroup
  }

  bookFlights() {

    console.log(this.bookFlight.value);

    let oneWayKey = this.bookFlight.get('oneway')?.value;
    let roundWayKey = this.bookFlight.get('roundway')?.value;
    let path = `\passanger-details/` + oneWayKey + '/' + roundWayKey;

    console.log(path, "Round Way");
    this.reroute.navigate([`${path}`])



  }
}
