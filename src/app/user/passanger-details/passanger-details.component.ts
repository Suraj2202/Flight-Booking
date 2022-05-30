import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passanger-details',
  templateUrl: './passanger-details.component.html',
  styleUrls: ['./passanger-details.component.css']
})
export class PassangerDetailsComponent implements OnInit {

  constructor(private api: CrudService, private router: ActivatedRoute, private reroute: Router, private fb: FormBuilder) { }

  //#region all variables
  getParam!: any;
  getParam0!: any;

  PassangerName0!: String;
  PassangerAge0!: String;
  SeatNumber0!: String;
  Gender0!: String;
  PassangerName1!: String;
  PassangerAge1!: String;
  SeatNumber1!: String;
  Gender1!: String;
  PassangerName2!: String;
  PassangerAge2!: String;
  SeatNumber2!: String;
  Gender2!: String;

  Add0: Number = 1;
  Add1: Number = 0;

  Div0: Number = 1;
  Div1: Number = 0;
  Div2: Number = 0;
  //#endregion
  ngOnInit(): void {

    //#region login validation

    let loginPath = "\login"
    this.api.CheckTokenValidation(localStorage.getItem("uname")).subscribe((res) => {
      if (res != "Yes") {
        this.reroute.navigate([`${loginPath}`])
      }
    },
      (err) => {
        console.log(err.error.text)
        if (err.error.text != "Yes") {
          this.reroute.navigate([`${loginPath}`])
        }
      });

    //#endregion

    this.getParam = this.router.snapshot.paramMap.get('onewaykey');
    this.getParam0 = this.router.snapshot.paramMap.get('roundwaykey');

    this.passangerForm.patchValue(
      {
        UserName: localStorage.getItem("uname"),
        SentOneUniqueId: this.getParam,
        SentRoundUniqueId: this.getParam0
      });
  }

  passangerForm = new FormGroup({
    'EmailId': new FormControl('', [Validators.required, Validators.email]),
    'UserName': new FormControl('', []),
    'PassangerName0': new FormControl('', [Validators.required]),
    'PassangerAge0': new FormControl('', [Validators.required]),
    'SeatNumber0': new FormControl('', [Validators.required]),
    'Gender0': new FormControl('', [Validators.required]),
    'PassangerName1': new FormControl('', []),
    'PassangerAge1': new FormControl('', []),
    'SeatNumber1': new FormControl('', []),
    'Gender1': new FormControl('', []),
    'PassangerName2': new FormControl('', []),
    'PassangerAge2': new FormControl('', []),
    'SeatNumber2': new FormControl('', []),
    'Gender2': new FormControl('', []),
    'SentOneUniqueId': new FormControl('', []),
    'SentRoundUniqueId': new FormControl('', [])
  });

  //#region Validators

  get PassangerName(): FormControl {
    return this.passangerForm.get("PassangerName0") as FormControl
  }

  get PassangerAge(): FormControl {
    return this.passangerForm.get("PassangerAge0") as FormControl
  }

  get SeatNumber(): FormControl {
    return this.passangerForm.get("SeatNumber0") as FormControl
  }

  get Gender(): FormControl {
    return this.passangerForm.get("Gender0") as FormControl
  }

  get EmailId(): FormControl {
    return this.passangerForm.get("EmailId") as FormControl
  }


  //#endregion

  //#region Add Button Control
  add0() {
    this.Add0 = 0;
  }

  add1() {
    this.Add1 = 1;
  }

  //#endregion

  //#region Confirm Booking
  confirmBooking() {

    console.log(this.passangerForm.value)
    if (this.passangerForm.valid) {
      if (this.getParam0 == null) {
        this.api.BookFlight(this.passangerForm.value).subscribe((res) => {
          console.log(res);
          let path = `\manage-ticket`;
          this.reroute.navigate([`${path}`]);

        })
      }
      else {
        this.api.BookFlights(this.passangerForm.value).subscribe((res) => {
          console.log(res);
          let path = `\manage-ticket`;
          this.reroute.navigate([`${path}`]);

        });
      }
    }
  }

  //#endregion
}
