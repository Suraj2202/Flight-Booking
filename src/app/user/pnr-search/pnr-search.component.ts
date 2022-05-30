import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-pnr-search',
  templateUrl: './pnr-search.component.html',
  styleUrls: ['./pnr-search.component.css']
})
export class PnrSearchComponent implements OnInit {

  constructor(private api:CrudService) { }
  readUser!:any
  ngOnInit(): void {
  }


  pnrForm = new FormGroup({
    'pnr': new FormControl('',[Validators.required])
  })

  seachTicket(){

    if(this.pnrForm.valid){
      let pnrValue = this.pnrForm.get('pnr')?.value;
      this.api.GetSingleTickets(pnrValue).subscribe((res)=>{
        console.log(res)
        this.readUser=res;
      })
    }
  }
}
