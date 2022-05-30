import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private api: CrudService, private router:Router) { }

  ngOnInit(): void {
  }


  signupForm = new FormGroup({
    'Name' : new FormControl('',[Validators.required]),
    'Email' : new FormControl('',[Validators.required,Validators.email]),
    'userName' : new FormControl('',[Validators.required]),
    'password' : new FormControl('',[Validators.required]),      
  });

  get Name():FormControl{
    return this.signupForm.get("Name") as FormControl; 
}

get Email():FormControl{
  return this.signupForm.get("Email") as FormControl; 
}

get userName():FormControl{
  return this.signupForm.get("userName") as FormControl; 
}

get password():FormControl{
  return this.signupForm.get("password") as FormControl; 
}




//Signup Clicked
signup(){
if(this.signupForm.valid){
  this.api.HandleSignUp(this.signupForm.value).subscribe((res)=>
  {

     
    localStorage.clear();
    let uname:string = this.signupForm.get("userName")?.value 
    localStorage.setItem("uname", uname);
    

    let path = "\search-flight"
    this.router.navigate([`${path}`]);
  });
}
  
}

}
