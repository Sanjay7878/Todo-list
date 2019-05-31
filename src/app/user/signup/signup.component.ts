import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName;
  public lastName;
  public country;
  public countryCode;
  public mobileNumber;
  public email;
  public password;

  constructor(public _http: HttpService, private toastr: ToastrManager, public router: Router) { }

  ngOnInit() {
  }

  public signupFunction: any = ()=>{
    if(!this.firstName){
      this.toastr.warningToastr("Please provide your First Name")
    } else if(!this.lastName){
      this.toastr.warningToastr("Please provide your Last Name")
    }else if(!this.country){
      this.toastr.warningToastr("Please provide your Country Name")
    }else if(!this.countryCode){
      this.toastr.warningToastr("Please provide your Country Code")
    }else if(!this.mobileNumber){
      this.toastr.warningToastr("Please provide your Mobile Number/Contact Number")
    }else if(!this.email){
      this.toastr.warningToastr("Please provide your Email Address")
    }else if(!this.password){
      this.toastr.warningToastr("Please provide a Password")
    } else {
      let data = {
        firstName: this.firstName.toLowerCase(),
        lastName: this.lastName.toLowerCase(),
        country: this.country.toLowerCase(),
        countryCode: this.countryCode.toLowerCase(),
        mobileNumber: this.mobileNumber,
        email: this.email.toLowerCase(),
        password: this.password.toLowerCase()
      }

      this._http.signupFunction(data).subscribe(
        (apiResponse)=>{
          if(apiResponse.status === 200){
            this.toastr.successToastr('Registration Succesfull')
            setTimeout(()=>{
              this.router.navigate(['/login'])
            }, 2000)
          } else {
            this.toastr.warningToastr(apiResponse.message)
          }
        },
        (err)=>{
          console.log(err)
          this.toastr.errorToastr("Some Error Occured")
        }
      )
    }
  } // end signup function
}
