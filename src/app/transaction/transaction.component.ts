import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
   transactions:any
   accno:any
  constructor(private ds:DataService) { 
    this.accno=JSON.parse(localStorage.getItem("currentAcc")|| '')
    this.ds.getTransaction(this.accno)
    .subscribe((result:any)=>{
      if(result){
        this.transactions=result.transaction
      }
    },
    (result)=>{
      alert(result.error.message);
      
    }
    )
    console.log(this.transactions)
  }

  ngOnInit(): void {
  }

}
