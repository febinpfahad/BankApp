import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  acno=""
  // pswd=""
  // amt=""
  dLogin : Date=new Date()
  //user=this.ds.currentUser
  depositForm=this.fb.group({
    
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amt:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  withdrawForm=this.fb.group({
    
    wacno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    wpswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    wamt:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  // wacno=""
  // wpswd=""
  // wamt=""
 user:any
  constructor(private ds:DataService,private fb:FormBuilder,private router : Router) {
   this.user=localStorage.getItem("currentUser")
   }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("please login...")
      this.router.navigateByUrl("")
    }
  }
  deposit()
  {
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amt=this.depositForm.value.amt
    if(this.depositForm.valid)
    {
    this.ds.deposit(acno,pswd,amt)
    .subscribe((result:any)=>{
      if(result){
          alert(result.message)
      }
    },
    (result)=>{
      alert(result.error.message);
      
    })
    
    
  }
}

  //        alert(amt + "Deposit successfully and new balance is:"+result)
  //   }
  // }
  // else
  // {
  //   alert("invalid form")
  // }
  //}
  deleteAtParent(){
    this.acno=JSON.parse(localStorage.getItem("currentAcc") || '')
  }
  onDelete(event:any){
    
    this.ds.deleteAcc(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        localStorage.removeItem("token")
        this.router.navigateByUrl("")
      }
    },
    (result)=>{
      alert(result.error.message)
    }
      
    )
  }
  onCancel(){
    this.acno=""
  }
    
 withdraw()
   {
     var acno=this.withdrawForm.value.wacno
     var pswd=this.withdrawForm.value.wpswd
    var amt=this.withdrawForm.value.wamt
    if(this.withdrawForm.valid){
      this.ds.withdraw(acno,pswd,amt)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
      }
    },
    (result)=>{
      alert(result.error.message);
      
    }
      )
    }
  }
//     {
//     var result=this.ds.withdraw(acno,pswd,amt)
//     if(result)
//     {
//     alert(amt+"Debited successfully and new balance is:"+result)
//     }
//   }
//   else
//   {
//     alert("invalid form")
//   }
//   }

// }
logout(){
  localStorage.removeItem("token")
  this.router.navigateByUrl("")
}
}