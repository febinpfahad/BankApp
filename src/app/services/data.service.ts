import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={
  withCredential:true,
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})


export class DataService {

 
  currentUser=""
  AccountNum=""
 
 
  user:any={
    1000:{uname:"abhi",accno:1000,password:"userone",balance:5000,transaction:[]},
    1001:{uname:"lini",accno:1001,password:"usertwo",balance:5000,transaction:[]},
  
    1002:{uname:"hema",accno:1002,password:"userthree",balance:5000,transaction:[]}
  
  
  }

  constructor(private http:HttpClient) {
    //this.getDetails()
   }
  saveDetails()
  {
    if(this.user)
    {
      localStorage.setItem("user",JSON.stringify(this.user))
    }
    if(this.currentUser)
    {
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
    }
    if(this.AccountNum)
    {
      localStorage.setItem("AccountNum",JSON.stringify(this.AccountNum))
    }
  }
  getDetails()
  {
    if(localStorage.getItem("user"))
    {
    this.user=JSON.parse(localStorage.getItem("user") || '')
    }
    if(localStorage.getItem("currentUser"))
    {
      this.currentUser=JSON.parse(localStorage.getItem("currentUser") || '')
    }
  }
  register(uname:any,accno:any,password:any,balance:any){
    const data={
      uname,
      accno,
     password,
      balance
    }
    return this.http.post("http://localhost:3000/register",data)
  }
  //   let accDetails=this.user
  //   if(accno in accDetails)
  //   {
  //     return false
  //   }
  //   else{

  //     accDetails[accno]={
  //       uname,
  //       accno,password,balance,transaction:[]
  //     }
  //     console.log(this.user)
  //     this.saveDetails()
  //     return true
  //   }
  
  // }
  getTransaction(accno:any)
  {
    const data={
      accno
    }
    return this.http.post("http://localhost:3000/transaction",data,this.getOptions())
  }
  login(accno:any,password:any)
  {
    const data={
      accno,
      password
    }
    return this.http.post("http://localhost:3000/login",data,options)
  }
  //   let accDetails=this.user
  //   if(accno in accDetails)
  //   {
  //     if(password==accDetails[accno]["password"])
  //     {
  //       this.currentUser=accDetails[accno]["uname"]
  //       this.AccountNum=accno
  //       this.saveDetails()

  //       return true
  //     }
  //     else
  //     {
  //       alert("invalid password")
  //       return false
  //     }
  //   }
  //   else{
  //     alert("invalid user")
  //     return false
  //   }
  // }
  getOptions(){
    const token=localStorage.getItem("token")
    let headers=new HttpHeaders
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers=headers
    }
    return options
  }
  deposit(accno:any,password:any,amount:any)
  {
    const data={
      accno,
      password,
      amount
    }
    
    return this.http.post("http://localhost:3000/deposit",data,this.getOptions())
  }

   // var amt=parseInt(amount)
  //   let accDetails=this.user
  //   if(accno in accDetails)
  //   {
  //     if(password == accDetails[accno]["password"])
  //     {
  //       accDetails[accno]["balance"]+=Number(amount)
  //       accDetails[accno]["transaction"].push({
  //         amount:amount,
  //         type:"CREDIT"
  //       })
  //       this.saveDetails()

  //       return accDetails[accno]["balance"]
  //     }
  //     else
  //     {
  //       alert("invalid password")
  //       return false
  //     }

  //   }
  //   else
  //   {
  //     alert("invalid user")
  //     return false
  //   }
  // }
  deleteAcc(accno:any){
    return this.http.delete("http://localhost:3000/deleteAcc/"+accno,this.getOptions())

  }
    withdraw(accno:any,password:any,amount:any)
  {

    const data={
      accno,
      password,
      amount
    }
  
    
    return this.http.post("http://localhost:3000/withdraw",data,this.getOptions())
  }
}
  
//     var amt=parseInt(amount)
//     let accDetails=this.user
//     if(acno in accDetails)
//     {
//       if(password == accDetails[acno]["password"])
//       {
//         if(accDetails[acno]["balance"]>amt)
//         {
//         accDetails[acno]["balance"]-=amt
//         accDetails[acno]["transaction"].push({
//           amount:amt,
//           type:"DEBIT"
//         })
//         this.saveDetails()
//         return accDetails[acno]["balance"]
//       }
//       else
//       {
//         alert("insufficient balane")
//         return false
//       }

//     }
//     else
//     {
//       alert("invalid password")
//       return false
//     }

//   }
//   else
//   {
//     alert("invalid uset")
//     return false
//   }
// }

