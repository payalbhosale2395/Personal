import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent{
 
  data:any;
  pannumber?:string; 
  city?: string;
  fullname?: string;
  email?: string;
  mobile?: string;
  showme:boolean=false;
  resendOtp:boolean=false;
  count:number=0;
  stringJson: any;

verificationForm= new FormGroup({
  otp:new FormControl('',[Validators.required,Validators.maxLength(4),Validators.minLength(4),Validators.pattern('^[0-9]*$')]),
city:new FormControl('',[Validators.required]),
pannumber:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
fullname:new FormControl('',[Validators.required,Validators.maxLength(140)]),
email:new FormControl('',[Validators.required,Validators.email,Validators.maxLength(255)]),
mobile:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9]+$')])
})

get f()
{
  return this.verificationForm.controls;
}

constructor(public http:HttpClient) { }


resendUserOTP()
{
  this.count++;
  if(this.count>3)
  {
    alert("Please try again after an hour");
    this.resendOtp=false;
  }
  else{
    this.submit();
  }
}
submit(){
  this.showme=true;
  this.resendOtp=true;
  
  let url =  "http://lab.thinkoverit.com/api/getOTP.php";
  const httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };
  
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  
  /* {"panNumber": "AAFNZ2078H,", "city": "Pune,", "fullname": "Ajay Sharma,",
   "email": "applicant@pixel6.co", "mobile": 9455566777 }*/
  return this.http.post(url,{'panNumber': this.verificationForm.value.pannumber,
   'city': this.verificationForm.value.city,
  'fullname': this.verificationForm.value.fullname, 
  'email': this.verificationForm.value.email, 
  'mobile': this.verificationForm.value.mobile},
  httpOptions).toPromise().then((data : any ) => {(data.status)  
  console.log(data);});
}
verifyOtp()
{
  const httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  return this.http.post('http://lab.thinkoverit.com/api/verifyOTP.php',
  {'mobile':this.verificationForm.value.mobile,
  'otp':this.verificationForm.value.otp}).toPromise().then((data : any )=> {
  alert("Thank you for verification "+this.verificationForm.value.fullname)
})
}
}
