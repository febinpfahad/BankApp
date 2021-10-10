import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm=this.fb.group({
    
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  })

  constructor(private router : Router,private ds: DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  // accChange(event:any)
  // {
  //   this.acno=event.target.value;
  //   console.log(event.target.value)
  // }
  // pswdChange(event:any)
  // {
  //   this.pswd=event.target.value;
  //   console.log(event.target.value)
  // }
  login()
  {
    var accno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd
    
    if(this.loginForm.valid)
    {

    this.ds.login(accno,pswd)
     .subscribe((result:any)=>{
      if(result)
      { 
        //console.log(result)
        localStorage.setItem("token",result.token)
        localStorage.setItem("currentAcc",accno)

        localStorage.setItem("currentUser",result.currentUser)
        alert(result.message)
        this.router.navigateByUrl("dashboard")
      }
    },
    (result)=>{
      alert(result.error.message)
      
    })
    
    }
     else{
       alert("invalid form")
     }
    }
  }
  //   if(result)
  //   {
  //     alert("Login successful")
  //     this.router.navigateByUrl("dashboard")
  //   }
  // }
  // else
  // {
  //   alert("invalid form")
  // }
  
  // }
//  login(a:any,b:any)
//  {
//    console.log(a)
 
//   var acno=a.value
//   var pwd=b.value
//   let accDetails=this.user
//   if(acno in accDetails)
//   {
//     if(pwd==accDetails[acno]["password"])
//     {
//       alert("login success")
//     }
//     else{
//       alert("invalid user")
//     }
    
    
//   }
//   else
//   {
//     {
//       alert("invalid user")
//     }
//   }
//  }

