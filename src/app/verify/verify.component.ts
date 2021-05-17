import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators,FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent{
  showme:boolean=false;
  resendOtp:boolean=false;
  dis:boolean=true;
  count:number=0;
  
constructor(public http:HttpClient,private vf: FormBuilder) { }

verificationForm = this.vf.group({
otp:['',[Validators.required,Validators.maxLength(4),Validators.minLength(4),
  Validators.pattern('^[0-9]*$')]],
city:['',[Validators.required]],
pannumber:['',[Validators.required,Validators.maxLength(10),
  Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
fullname:['',[Validators.required,Validators.maxLength(140)]],
email:['',[Validators.required,Validators.email,Validators.maxLength(255)]],
mobile:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10),
  Validators.pattern('^[0-9]+$')]]
})

get f()
{
  return this.verificationForm.controls;
}

resendUserOTP()
{
  this.count++;
  if(this.count>3)
  {
    alert("Please try again after an hour");
    this.resendOtp=false;
  }
  else{
    this.getOTP();
  }
}

getOTP(){
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
  httpOptions).toPromise().then((data : any ) => {
  if(data.status=1)
   { 
  this.showme=true;
  this.resendOtp=true;
  this.dis=true;
  alert("Otp is send to "+this.verificationForm.value.mobile);
  setTimeout(() => {
    this.dis=false;
 }, 180000);
   }
  else
  {
    alert("Please try Again");
  }
  });
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
  'otp':this.verificationForm.value.otp}).toPromise().then((data : any )=> 
  {console.log(this.verificationForm.value)
    if(data.status=='1')
  {
  alert("Thank you for verification "+this.verificationForm.value.fullname)
  }
  else
  {
    alert("Please try again, OTP is invalid")
  }
})
}
}
