import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: CrudService, private router: Router) { }

  errormsg: any
  ngOnInit(): void {
    sessionStorage.clear();
  }

  loginForm = new FormGroup({
    'userName': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
  });

  get userName(): FormControl {
    return this.loginForm.get("userName") as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  Login() {

    if (this.loginForm.valid)
      this.api.HandleLogin(this.loginForm.value).subscribe((res) => {

        if (res.includes("Role 1")) {
          
          localStorage.clear();
          let uname:string = this.loginForm.get("userName")?.value 
          localStorage.setItem("uname", uname);
          let path = "\admin-dashboard"
          this.router.navigate([`${path}`]);

        }
        else if (res.includes("Role 0")) {
          
          localStorage.clear();
          let uname:string = this.loginForm.get("userName")?.value 
          localStorage.setItem("uname", uname);
          
          let path = "\manage-ticket";
          this.router.navigate([`${path}`]);
          
        }
        else {
          this.errormsg = "Either Username or Password is wrong";
        }
      });
    else {
      this.errormsg = "All fields are required"
    }



    // console.log(this.response)


  }

}
